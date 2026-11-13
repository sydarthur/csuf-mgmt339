// Newsvendor Sprint 1 — Google Sheets logger.
// Paste this whole file into Extensions > Apps Script for the logging
// Sheet, then deploy as a web app (see SETUP.md in this folder).

var ROUNDS_SHEET = 'rounds';
var STUDENTS_SHEET = 'students';

var ROUND_COLUMNS = [
  'student_id', 'section', 'condition', 'attempt', 'round',
  'order_qty', 'demand', 'units_sold', 'leftover',
  'round_profit', 'cumulative_profit', 'decision_time_ms', 'timestamp'
];

var STUDENT_COLUMNS = [
  'student_id', 'section', 'condition', 'attempt',
  'started_at', 'finished_at', 'completed', 'total_profit', 'mean_order'
];

function getSheet_(name, columns) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(columns);
  }
  return sheet;
}

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);
  var action = payload.action;

  if (action === 'logRound') {
    var roundsSheet = getSheet_(ROUNDS_SHEET, ROUND_COLUMNS);
    roundsSheet.appendRow(ROUND_COLUMNS.map(function (c) { return payload[c]; }));
  } else if (action === 'upsertStudent') {
    var studentsSheet = getSheet_(STUDENTS_SHEET, STUDENT_COLUMNS);
    var data = studentsSheet.getDataRange().getValues();
    var rowIndex = -1;
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === payload.student_id && Number(data[i][3]) === Number(payload.attempt)) {
        rowIndex = i + 1;
        break;
      }
    }
    var row = STUDENT_COLUMNS.map(function (c) { return payload[c]; });
    if (rowIndex === -1) {
      studentsSheet.appendRow(row);
    } else {
      studentsSheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, message: 'Newsvendor logger is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
