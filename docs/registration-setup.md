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
4. Click **Deploy**, then approve the permissions (Sheets, Gmail if confirmation emails are on, and external requests for Resend).
5. Copy the **Web app URL**. It ends in `/exec`.

## 4. Connect the website

1. Open `src/data/liondevs.ts`.
2. Set `registration.endpoint` to the URL you copied.
3. Rebuild and redeploy the site.

Every "Registration opens soon" button now turns into "Register now", and the form starts saving to the sheet.

## 5. Send email with Resend (optional)

Without this step, confirmation emails come from the Google account that owns the script.
With it, they come from your own domain through Resend.

The Resend API key is a password for sending email as GDG Southeastern. It goes in the
script's private settings only. Never put it in the website code, this repo, or the `.gs` file:
the website is public, and anyone who finds the key can send email as your domain.

1. **Verify your domain in Resend.** In the Resend dashboard, open **Domains > Add domain**,
   enter your domain (for example `gdgselu.com`), and pick the **region** closest to your
   members (for example North Virginia, `us-east-1`). The region is chosen here and cannot be
   changed later without adding the domain again. Add the DNS records Resend shows you at your
   domain registrar and wait until the domain shows **Verified**.
2. **Create an API key.** Open **API Keys > Create API key**. Permission: **Sending access**.
   Domain: only your domain. Copy the key (it starts with `re_`). Resend shows it once.
3. **Add the script properties.** In the Apps Script editor, open **Project Settings**
   (gear icon) > **Script Properties** > **Add script property**, and add:

   | Property          | Value                                                    |
   | ----------------- | -------------------------------------------------------- |
   | `RESEND_API_KEY`  | the key from step 2                                      |
   | `RESEND_FROM`     | `GDG Southeastern <hello@gdgselu.com>` (verified domain) |
   | `RESEND_REPLY_TO` | optional, the inbox that should get replies              |
   | `TEST_EMAIL`      | your own email, for the test below                       |

4. **Test it.** Pick `testEmail` in the function menu at the top of the editor and click **Run**.
   Approve the new permission ("Connect to an external service") the first time. Check your inbox.
5. **Redeploy.** **Deploy > Manage deployments**, pencil icon, **Version: New version**, **Deploy**.

To switch back to Google email, delete the `RESEND_API_KEY` property.
If an email fails, the sign up is still saved. The error shows under **Executions** in the editor.

**Receiving email:** replies go to `RESEND_REPLY_TO` (or a normal inbox on your domain).
Resend's inbound email feature needs a server to receive its webhooks, which this static site
does not have, so set up incoming mail with your email provider instead.

**Rotating the key:** if a key is ever exposed, delete it in Resend under **API Keys**, create a
new one, and update `RESEND_API_KEY`. Nothing on the website needs to change.

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
- Free Google accounts can send about 100 script emails per day. A Google Workspace account can send more. With Resend, your Resend plan's limits apply instead.
