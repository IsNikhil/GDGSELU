/**
 * LionDevs registration: Google Apps Script web app.
 * Saves each sign up from the website to this Google Sheet and
 * (optionally) sends the person a short confirmation email.
 * Setup steps are in docs/registration-setup.md.
 *
 * Columns are kept in the order of COLUMNS below. If the sheet is out of order
 * (or has a column listed in REMOVED_COLUMNS), it is rearranged on the next sign up
 * without losing data. To rearrange right away, select reorderColumns and click Run.
 * Extra columns you add yourself (for example "Notes") are kept at the right edge.
 */

var SHEET_NAME = "Registrations";
var SEND_CONFIRMATION_EMAIL = true;
var FROM_NAME = "GDG Southeastern";

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
      MailApp.sendEmail({
        to: email,
        name: FROM_NAME,
        subject: "You are on the LionDevs list",
        htmlBody:
          "<p>Hi " + escapeHtml(name.split(" ")[0]) + ",</p>" +
          "<p>Thanks for signing up for <b>LionDevs</b>, the Innovation &amp; Solutions Competition hosted by GDG Southeastern at Southeastern Louisiana University.</p>" +
          "<p>We will email you when the date and challenge are announced.</p>" +
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

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
