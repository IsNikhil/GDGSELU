/**
 * LionDevs registration: Google Apps Script web app.
 * Saves each sign up from the website to this Google Sheet and
 * (optionally) sends the person a short confirmation email.
 * Setup steps are in docs/registration-setup.md.
 */

var SHEET_NAME = "Registrations";
var SEND_CONFIRMATION_EMAIL = true;
var FROM_NAME = "GDG Southeastern";

var COLUMNS = [
  "Timestamp", "Name", "Email", "Major", "Year", "Active student", "Team status", "Team name",
  "Interests", "Heard from", "Questions", "Marketing consent", "Duplicate", "Page"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = e.parameter || {};
    var email = String(p.email || "").trim().toLowerCase();
    var name = String(p.name || "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: "invalid" });
    }

    var sheet = getSheet();
    var duplicate = isDuplicate(sheet, email);

    sheet.appendRow([
      new Date(), clean(name), email, clean(p.major), clean(p.year), p.student === "yes" ? "yes" : "no", clean(p.team),
      clean(p.teamName), clean(p.interests), clean(p.heardFrom), clean(p.questions),
      p.consent === "yes" ? "yes" : "no", duplicate ? "yes" : "", clean(p.page)
    ]);

    if (SEND_CONFIRMATION_EMAIL && !duplicate) {
      MailApp.sendEmail({
        to: email,
        name: FROM_NAME,
        subject: "You are on the LionDevs list",
        htmlBody:
          "<p>Hi " + escapeHtml(name.split(" ")[0]) + ",</p>" +
          "<p>Thanks for signing up for <b>LionDevs</b>, the Innovation &amp; Solutions Competition at Southeastern Louisiana University.</p>" +
          "<p>We will email you when the date, team details, and challenge are announced.</p>" +
          "<p>Build. Solve. Pitch.<br>GDG Southeastern</p>"
      });
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function isDuplicate(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var emails = sheet.getRange(2, 3, last - 1, 1).getValues();
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

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
