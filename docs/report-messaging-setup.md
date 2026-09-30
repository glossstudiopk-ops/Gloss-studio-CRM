# Gloss Studio CRM — Report Email & WhatsApp setup

The CRM **Business Reports** tab has **Download Report** and **Send Report** actions. Both use the private Supabase Edge Function `business-report`. The admin **Messaging Setup** tab checks provider readiness using `report-messaging-status`, and reads the latest provider acceptance/failure log.

All secrets belong in **Supabase → Gloss-studio-CRM → Edge Functions → Secrets**. Do **not** put keys or tokens in the GitHub repository, `src/lib/supabase.js`, any website file, a public environment variable, a chat, or an admin-facing form. Supabase's preprovided `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` remain server-side.

## 1. Email (Resend)

1. Create a Resend account controlled by Gloss Studio and add your real sending domain. Verify domain ownership through the DNS records Resend provides (SPF/DKIM and any domain-specific instructions). Allow time for DNS verification.
2. Create a scoped Resend API key for sending mail. Never share it publicly.
3. In the Supabase CRM project's **Edge Functions → Secrets**, configure:
   - `RESEND_API_KEY` = private Resend sending key
   - `REPORT_FROM_EMAIL` = approved sender on the verified domain, e.g., `Gloss Studio <reports@YOUR-VERIFIED-DOMAIN>`.
4. On CRM **Messaging Setup**, click **Check connections**. It reports whether the key exists and checks domain verification when the API permissions allow that check.
5. In **Business Reports**, click **Send Report → Email** and send a test PDF to an address you control. Check inbox, attachment readability, spam delivery, and the sending log. Passing the config check alone does not prove mail delivery.

DNS records, API key values, and ownership require action by the domain owner; the assistant cannot supply them automatically.

## 2. Official WhatsApp Business Cloud API

1. Use an official Meta Business portfolio. Create/connect a WhatsApp Business Account (WABA), configure a sending phone number, and set up production messaging permissions and any required billing.
2. Create a system-user access token with appropriate `whatsapp_business_messaging` (and template-management permissions as needed), respecting Meta's policies and expiry/rotation requirements.
3. Submit a **Utility template** intended for sending a business report, with an approved **DOCUMENT header**. The current function sends the PDF as a Meta-hosted media upload and then calls that document-header template. Ensure the approved template needs no additional body variables beyond the document header.
4. In the same Supabase project's **Edge Functions → Secrets**, configure:
   - `WA_ACCESS_TOKEN` = secret token
   - `WA_PHONE_NUMBER_ID` = Meta Phone Number ID (not the phone number itself)
   - `WA_BUSINESS_ACCOUNT_ID` = WABA ID (used for readiness checks)
   - `WA_REPORT_TEMPLATE_NAME` = exact approved document-header template name
   - `WA_TEMPLATE_LANGUAGE` = exact approved template locale, e.g., `en_US`
   - `WA_GRAPH_VERSION` = version currently supported for your Meta app (optional; function currently defaults to `v23.0`)
5. In **Messaging Setup**, click **Check connections**; this reads the phone and approved template status when credentials permit.
6. In **Business Reports**, click **Send Report → WhatsApp**, enter the recipient's international-format number, confirm opt-in, and test using a number you control.

Meta acceptance is not the same as delivery or reading. The CRM records provider acceptance. Implement and verify message-status webhooks before claiming delivery/read receipts. Observe WhatsApp messaging templates, opt-in, rate limits, and recipient privacy.

## 3. Report security and recordkeeping

- Only active **admin** accounts are authorized by each function; non-admin users cannot download/send reports or query provider readiness.
- Financial PDFs are generated on demand on Supabase; no provider tokens or service-role keys go to the browser.
- Email sends PDFs as attachments. WhatsApp uploads the PDF to Meta, then sends an approved document template, not an exposed public report URL.
- Every **accepted** report request is recorded in `public.report_delivery_log`; errors are recorded where possible. The current log is not a delivery receipt.
- Reports distinguish **invoiced revenue**, **paid operating expenses**, **payments against supplier/fixed-cost bills**, and **unpaid bills**. They are operational summaries, not audited net-profit statements.
- Request explicit recipient approval before sending internal business figures outside the management team.

## 4. Deployment / smoke tests

After GitHub production deployment:
1. Sign in as an **admin**. Verify the new **Business Reports** buttons and **Messaging Setup** tab; non-admin accounts must not show either.
2. Download a Daily PDF and a Monthly PDF. Verify totals, headings, categories, page breaks, bill balances and the transaction ledger.
3. Without provider secrets, sending should show an actionable configuration error, not claim success.
4. With verified providers, send to controlled test recipients and verify they receive a readable PDF. Check provider acceptance and failure entries.
5. Compare the report with actual invoices, daily-expense entries, bill-payment rows and unpaid payable balances. Do not invent missing transactions.

**Important:** We cannot finish provider activation or a real email/WhatsApp delivery test until the business owner configures the verified domain and Meta/Resend accounts and the server-side secrets.
