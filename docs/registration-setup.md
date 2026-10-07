# LionDevs registration setup (about 10 minutes)

The form at `/liondevs/register` sends each sign up to a Google Sheet that the chapter owns.
No server, no paid service.

## 1. Create the sheet

1. Sign in to the chapter Google account (not a personal one, so the data stays with the club).
2. Create a new Google Sheet named "LionDevs Registrations".

## 2. Add the script

1. In the sheet, open **Extensions > Apps Script**.
2. Delete the sample code and paste everything from `docs/registration-apps-script.gs`.
3. Optional: set `SEND_CONFIRMATION_EMAIL` to `false` if you do not want an automatic confirmation email.
4. Click **Save**.

## 3. Deploy it

1. Click **Deploy > New deployment**.
2. Type: **Web app**.
3. Execute as: **Me**. Who has access: **Anyone**.
4. Click **Deploy**, then approve the permissions (Sheets, and Gmail if confirmation emails are on).
5. Copy the **Web app URL**. It ends in `/exec`.

## 4. Connect the website

1. Open `src/data/liondevs.ts`.
2. Set `registration.endpoint` to the URL you copied.
3. Rebuild and redeploy the site.

Every "Registration opens soon" button now turns into "Register now", and the form starts saving to the sheet.

## Updating the script

When `docs/registration-apps-script.gs` changes (for example, new form fields):

1. Open the sheet, then **Extensions > Apps Script**.
2. Replace all the code with the new version and click **Save**.
3. Click **Deploy > Manage deployments**, click the pencil icon, set **Version** to **New version**, and click **Deploy**.

The URL stays the same, so the website does not need to change.

The script keeps the columns in the order listed in `COLUMNS` and deletes any listed in `REMOVED_COLUMNS`.
It fixes the sheet on the next sign up. To fix it right away, pick `reorderColumns` in the function
menu at the top of the Apps Script editor and click **Run**. Existing data is kept.

## Notes

- If you change the script later, use **Deploy > Manage deployments > Edit > New version** so the URL stays the same.
- The "Marketing consent" column tells you who agreed to receive updates. Only send marketing emails to rows marked `yes`.
- The "Duplicate" column flags people who signed up more than once with the same email.
- Free Google accounts can send about 100 script emails per day. A Google Workspace account can send more.
