# Weekly digest email (optional, free, about 10 minutes)

Every Sunday about 1800, each person on the access list gets one email listing their open taskers, the paperwork waiting on
them and the next 7 days on their calendars, with links straight to each item. People with nothing open get no email.
It runs on Google Apps Script, so nothing to pay for and no server to keep up.

## Use the Group 2 Google account, not a personal one
Do this from the same shared Google account that owns the Firebase project (it must be a Firebase **Owner**: the script reads
the database with that account's access). Hand the account over at turnover with the Firebase project.

## Steps
1. Signed in as that account, go to https://script.google.com → **New project**. Name it `Group 2 weekly digest`.
2. Delete what's in `Code.gs` and paste in the whole `digest/Code.gs` file.
3. Change the first two settings at the top: `PROJECT_ID` (Firebase → Project settings → Project ID) and `SITE_URL`.
4. **Project Settings** (gear) → tick **Show "appsscript.json" manifest file**. Open `appsscript.json` in the editor and replace it with `digest/appsscript.json`.
5. Back in `Code.gs`, choose **setup** in the function menu and click **Run**. Approve the permissions Google asks for.
6. Test: choose **testDigest** and click **Run**. It emails you the digest *you* would get. To see someone else's, change the last line
   of `testDigest` or run it from the editor as `testDigest('c27first.last@afacademy.af.edu')`.

## Good to know
- A free Gmail account sends about 100 emails a day. The script sends up to 90 on Sunday and the rest on Monday.
- The first few may land in quarantine at @afacademy.af.edu. Tell people to release the first one and mark the sender as safe.
- To change the day or time, edit `SEND_DAY` / `SEND_HOUR` and run **setup** again. To stop it: **Triggers** (clock icon) → delete the trigger.
- If the site's visibility rules ever change, update the "who sees what" section in `Code.gs` too (it mirrors `index.html`).
