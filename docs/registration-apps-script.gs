/**
 * GDG Southeastern website forms: Google Apps Script web app.
 *
 * 1. LionDevs registration: saves each sign up to the "Registrations" tab and
 *    (optionally) sends the person a short confirmation email.
 * 2. Contact form (form=contact): saves each message to the "Messages" tab and
 *    emails it to CONTACT_TO (default info@gdgselu.com) with reply-to set to the sender.
 *
 * Setup steps are in docs/registration-setup.md.
 *
 * Email goes through Resend when the RESEND_API_KEY script property is set,
 * otherwise through this Google account (MailApp). Keys live in
 * Project Settings > Script Properties, never in this file or the website.
 *
 * Columns are kept in the order of COLUMNS below. If the sheet is out of order
 * (or has a column listed in REMOVED_COLUMNS), it is rearranged on the next sign up
 * without losing data. To rearrange right away, select reorderColumns and click Run.
 * Extra columns you add yourself (for example "Notes") are kept at the right edge.
 */

var SHEET_NAME = "Registrations";
var SEND_CONFIRMATION_EMAIL = true;
var FROM_NAME = "GDG Southeastern";
var RESEND_ENDPOINT = "https://api.resend.com/emails";

var MESSAGES_SHEET = "Messages";
var MESSAGE_COLUMNS = ["Timestamp", "Name", "Email", "Topic", "Message", "Emailed"];
var DEFAULT_CONTACT_TO = "info@gdgselu.com";
var CONTACT_COOLDOWN_SECONDS = 60; // one message per email address per minute

var COLUMNS = [
  "Timestamp", "Name", "Email", "Major", "School", "Advisor", "Year", "Active student",
  "Team status", "Team name", "Interests", "Heard from", "Questions",
  "Marketing consent", "Duplicate"
];

// Old columns to delete from the sheet.
var REMOVED_COLUMNS = ["Page"];

var TEAM_LABELS = {
  "have-team": "Has a team (up to 3)",
  "solo": "Competing alone",
  "not-sure": "Not sure yet"
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = e.parameter || {};
    if (p.form === "contact") return handleContact(p);

    var email = String(p.email || "").trim().toLowerCase();
    var name = String(p.name || "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: "invalid" });
    }

    var sheet = getSheet();
    var headers = getHeaders(sheet);
    var duplicate = isDuplicate(sheet, headers, email);

    var values = {
      "Timestamp": new Date(),
      "Name": clean(name),
      "Email": email,
      "School": clean(p.school),
      "Advisor": clean(p.advisor),
      "Major": clean(p.major),
      "Year": clean(p.year),
      "Active student": p.student === "yes" ? "yes" : "no",
      "Team status": TEAM_LABELS[p.team] || clean(p.team),
      "Team name": clean(p.teamName),
      "Interests": clean(p.interests),
      "Heard from": clean(p.heardFrom),
      "Questions": clean(p.questions),
      "Marketing consent": p.consent === "yes" ? "yes" : "no",
      "Duplicate": duplicate ? "yes" : ""
    };

    sheet.appendRow(headers.map(function (h) {
      return values.hasOwnProperty(h) ? values[h] : "";
    }));

    if (SEND_CONFIRMATION_EMAIL && !duplicate) {
      // The sign up is already saved, so a failed email must not fail the request.
      try {
        sendConfirmation(email, name);
      } catch (mailErr) {
        console.error("Confirmation email failed for " + email + ": " + mailErr);
      }
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** The LionDevs confirmation email. */
function sendConfirmation(email, name) {
  var first = escapeHtml(name.split(" ")[0]);
  sendEmail({
    to: email,
    subject: "You are on the LionDevs list",
    html:
      "<p>Hi " + first + ",</p>" +
      "<p>Thanks for signing up for <b>LionDevs</b>, the Innovation &amp; Solutions Competition hosted by GDG Southeastern at Southeastern Louisiana University.</p>" +
      "<p>We will email you when the date and challenge are announced.</p>" +
      "<p>Build. Solve. Pitch.<br>GDG Southeastern</p>",
    text:
      "Hi " + name.split(" ")[0] + ",\n\n" +
      "Thanks for signing up for LionDevs, the Innovation & Solutions Competition hosted by GDG Southeastern at Southeastern Louisiana University.\n\n" +
      "We will email you when the date and challenge are announced.\n\n" +
      "Build. Solve. Pitch.\nGDG Southeastern"
  });
}

/**
 * Sends one email. Uses Resend when RESEND_API_KEY is set, otherwise MailApp.
 * Script properties:
 *   RESEND_API_KEY   the Resend API key (sending access only)
 *   RESEND_FROM      verified sender, e.g. "GDG Southeastern <hello@gdgselu.com>"
 *   RESEND_REPLY_TO  optional, where replies should go
 */
function sendEmail(msg) {
  var props = PropertiesService.getScriptProperties();
  var key = cleanProp(props.getProperty("RESEND_API_KEY"));
  if (!key) {
    var mail = { to: msg.to, name: FROM_NAME, subject: msg.subject, htmlBody: msg.html };
    if (msg.replyTo) mail.replyTo = msg.replyTo;
    MailApp.sendEmail(mail);
    return;
  }

  var from = cleanProp(props.getProperty("RESEND_FROM"));
  if (!from) throw new Error("RESEND_FROM script property is missing");
  if (!isSender(from)) {
    throw new Error(
      'RESEND_FROM must look like "hello@gdgselu.com" or "GDG Southeastern <hello@gdgselu.com>". ' +
      "Current value: [" + from + "]"
    );
  }
  var payload = { from: from, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text };
  var replyTo = msg.replyTo || cleanProp(props.getProperty("RESEND_REPLY_TO"));
  if (replyTo) payload.reply_to = replyTo;

  var res = UrlFetchApp.fetch(RESEND_ENDPOINT, {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + key },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  var code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error("Resend responded " + code + ": " + res.getContentText());
  }
}

/**
 * Contact form. Fields use different names than the registration form
 * (fullName, replyEmail), so an older script version rejects them instead of
 * saving them as LionDevs sign ups.
 */
function handleContact(p) {
  var name = String(p.fullName || "").trim().slice(0, 200);
  var email = String(p.replyEmail || "").trim().toLowerCase().slice(0, 254);
  var topic = String(p.topic || "General").trim().slice(0, 100);
  var message = String(p.message || "").trim().slice(0, 5000);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return json({ ok: false, error: "invalid" });
  }

  var cache = CacheService.getScriptCache();
  var cooldownKey = "contact:" + email;
  if (cache.get(cooldownKey)) return json({ ok: false, error: "too_soon" });
  cache.put(cooldownKey, "1", CONTACT_COOLDOWN_SECONDS);

  var sheet = getMessagesSheet();
  sheet.appendRow([new Date(), clean(name), email, clean(topic), cleanLong(message), "pending"]);
  var row = sheet.getLastRow();

  var to = cleanProp(PropertiesService.getScriptProperties().getProperty("CONTACT_TO")) || DEFAULT_CONTACT_TO;
  var status = "yes";
  try {
    sendEmail({
      to: to,
      replyTo: email,
      subject: "[Website] " + topic + ": " + name,
      html:
        "<p><b>From:</b> " + escapeHtml(name) + " &lt;" + escapeHtml(email) + "&gt;<br>" +
        "<b>Topic:</b> " + escapeHtml(topic) + "</p>" +
        "<p>" + escapeHtml(message).replace(/\n/g, "<br>") + "</p>" +
        "<p style=\"color:#888;font-size:12px\">Sent from the contact form on gdgselu.com. Reply to this email to answer " + escapeHtml(name) + ".</p>",
      text: "From: " + name + " <" + email + ">\nTopic: " + topic + "\n\n" + message
    });
  } catch (mailErr) {
    status = "failed";
    console.error("Contact email failed: " + mailErr);
  }
  sheet.getRange(row, MESSAGE_COLUMNS.indexOf("Emailed") + 1).setValue(status);
  // The message is saved either way, so the visitor sees success.
  return json({ ok: true });
}

function getMessagesSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(MESSAGES_SHEET) || ss.insertSheet(MESSAGES_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(MESSAGE_COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, MESSAGE_COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

/** Trims a script property and strips quotes or backticks pasted around it. */
function cleanProp(v) {
  return String(v || "")
    .replace(/[“”‘’]/g, '"')
    .trim()
    .replace(/^["'`]+|["'`]+$/g, "")
    .trim();
}

/** "email@example.com" or "Name <email@example.com>". */
function isSender(v) {
  var email = "[^\\s@<>]+@[^\\s@<>]+\\.[^\\s@<>]+";
  return new RegExp("^(" + email + "|[^<>]+<" + email + ">)$").test(v);
}

/**
 * Run this from the Apps Script editor to check the email setup.
 * Set TEST_EMAIL in Script Properties to the address that should receive the test.
 */
function testEmail() {
  var to = PropertiesService.getScriptProperties().getProperty("TEST_EMAIL");
  if (!to) throw new Error("Add a TEST_EMAIL script property first");
  sendConfirmation(to, "Test Person");
  console.log("Test email sent to " + to);
}

/** Run this once from the Apps Script editor to fix the column order right away. */
function reorderColumns() {
  getSheet();
}

/** Returns the sheet, creating it or rearranging its columns to match COLUMNS. */
function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    return sheet;
  }

  var headers = getHeaders(sheet);
  var extras = headers.filter(function (h) {
    return h !== "" && COLUMNS.indexOf(h) === -1 && REMOVED_COLUMNS.indexOf(h) === -1;
  });
  var wanted = COLUMNS.concat(extras);
  if (wanted.join("\u0001") === headers.join("\u0001")) return sheet;

  // Rebuild every row in the wanted order. Values (including dates) are kept.
  var data = sheet.getRange(1, 1, sheet.getLastRow(), headers.length).getValues();
  var rebuilt = data.map(function (row, r) {
    if (r === 0) return wanted.slice();
    return wanted.map(function (h) {
      var i = headers.indexOf(h);
      return i === -1 ? "" : row[i];
    });
  });
  sheet.clear();
  sheet.getRange(1, 1, rebuilt.length, wanted.length).setValues(rebuilt);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, wanted.length).setFontWeight("bold");
  return sheet;
}

function getHeaders(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
}

function isDuplicate(sheet, headers, email) {
  var col = headers.indexOf("Email") + 1;
  var last = sheet.getLastRow();
  if (col === 0 || last < 2) return false;
  var emails = sheet.getRange(2, col, last - 1, 1).getValues();
  for (var i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).toLowerCase() === email) return true;
  }
  return false;
}

// Stops spreadsheet formula injection and trims long input.
function clean(v) {
  var s = String(v || "").trim().slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Like clean(), with room for longer messages.
function cleanLong(v) {
  var s = String(v || "").trim().slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
