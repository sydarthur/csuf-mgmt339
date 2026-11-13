# Newsvendor game — Google Sheets logging setup

Sprint 1 storage: a Google Sheet, written to via a Google Apps Script "web app"
endpoint. No new account, project, or billing needed — just your existing
Google account. Takes about 5 minutes.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like "MGMT 339 Newsvendor Sprint 1 Data".
3. Leave it empty — the script below creates the `rounds` and `students` tabs
   automatically on first write.

## 2. Add the script

1. In the Sheet, go to **Extensions > Apps Script**.
2. Delete whatever's in the default `Code.gs` editor.
3. Paste in the entire contents of [`apps-script.gs`](apps-script.gs) (in this
   same folder).
4. Click the save icon (or Ctrl/Cmd+S).

## 3. Deploy as a web app

1. Click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Description: "Newsvendor logger v1" (or anything).
4. **Execute as:** Me (your account).
5. **Who has access:** Anyone.
6. Click **Deploy**.
7. It will ask you to authorize the script — click through **Authorize access
   > (pick your account) > Advanced > Go to [project name] (unsafe)**. This
   warning is expected: it's your own script, Google just flags anything
   unverified. "Unsafe" here only means Google hasn't manually reviewed it,
   not that it does anything risky — you wrote (well, pasted) every line.
8. Copy the **Web app URL** it gives you (ends in `/exec`).

## 4. Send me the URL

Paste that URL back in chat and I'll drop it into `game-config.js`. Don't
need to edit any files yourself.

## If you ever change the script

Apps Script web app URLs are tied to a specific deployment, not the script
itself. If you edit `apps-script.gs` later, use **Deploy > Manage deployments
> edit (pencil) > New version** on the *same* deployment to keep the same
URL — if you create a brand new deployment instead, the URL changes and
you'll need to send me the new one.

## Reading the data later

Just open the Sheet. `rounds` has one row per round decision, `students` has
one row per attempt (summary). File > Download > Comma Separated Values
(.csv) on either tab for the CSV export the Sprint 1 spec asks for.
