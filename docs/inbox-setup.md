# Board inbox setup

`gdgselu.com/inbox` is a private inbox for the board. It shows email sent to
`info@gdgselu.com` (and any other `@gdgselu.com` address) and lets you reply and write
new email from `info@gdgselu.com`. Mail is received and sent by Resend; nothing is
stored on the website.

## How sign in works

1. A board member enters their email. If it is on `INBOX_ALLOWED_EMAILS`, Resend emails
   them a one time code (8 characters, valid for 10 minutes).
2. They type the code and stay signed in for 7 days on that browser.

There are no passwords. The code and session are checked on the server and kept in
httpOnly cookies that page scripts cannot read. To remove someone, delete their email
from `INBOX_ALLOWED_EMAILS` and redeploy; their session stops working right away.
To sign everyone out, change `INBOX_SESSION_SECRET`.

## One time setup

### 1. Resend

1. **Domains:** `gdgselu.com` must show **Verified** for both sending and receiving.
   Receiving uses the MX record on `@` that points to Resend.
2. **API Keys > Create API key:** permission **Full access**. Reading received email
   needs full access; a "Sending access" key gets "restricted to only send emails".
   Keep the separate sending-only key for the Google Apps Script.

### 2. Vercel

Open the project in Vercel, then **Settings > Environment Variables**, and add these for
**Production** (and Preview if you use it):

| Name                   | Value                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `RESEND_API_KEY`       | the full access key from step 1                             |
| `INBOX_FROM`           | `GDG Southeastern <info@gdgselu.com>`                       |
| `INBOX_SESSION_SECRET` | output of `openssl rand -base64 36` (keep it private)       |
| `INBOX_ALLOWED_EMAILS` | board emails, comma separated, e.g. `a@selu.edu,b@selu.edu` |

Then redeploy (**Deployments > ... > Redeploy**) so the new values take effect.

The project must use the **Next.js** framework preset with the default output settings.
The site no longer builds to a static `out/` folder.

### 3. Try it

Open `gdgselu.com/inbox`, or use the small "Board login" link in the footer.

## Local development

Copy `.env.example` to `.env.local`, fill it in, and run `npm run dev`.
`.env.local` is ignored by git.

## Security notes

- The Resend key and session secret exist only in Vercel and `.env.local`. They never
  reach the browser or the repository.
- Received HTML is shown in a sandboxed frame: no scripts run, and links open in a new tab.
- Images inside received email load from the sender's server, which can tell them you
  opened it. Use "Plain text" if that matters for a message.
- Attachment names are listed, but downloading attachments is not built yet.
