# Double Hedged payment setup

The website uses Razorpay Standard Checkout. Prices are defined on the server in
`lib/payment-plans.ts`; the browser cannot choose or modify the amount.

## 1. Create and test the Razorpay account

1. Create or sign in to the Razorpay Dashboard.
2. Switch the Dashboard to **Test Mode**.
3. Open **Account & Settings → API Keys → Generate Key**.
4. Keep the Key ID and Key Secret private. Never paste them into source code,
   GitHub, Telegram, or a public message.

## 2. Add the keys to Vercel

In the Vercel project, open **Settings → Environment Variables** and add:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Select Production, Preview, and Development as appropriate, then redeploy. Use a
new long random value for `RAZORPAY_WEBHOOK_SECRET`; it is not the API Key Secret.

For local testing, copy `.env.example` to `.env.local` and replace the example
values. `.env.local` is intentionally ignored by Git.

## 3. Configure the webhook

In **Razorpay Dashboard → Developers → Webhooks**, add:

`https://YOUR_DOMAIN/api/payments/webhook`

Use exactly the same webhook secret stored in Vercel. Subscribe to:

- `order.paid`
- `payment.captured`
- `payment.failed`

## 4. Test before accepting money

1. Redeploy with Test Mode keys.
2. Buy each plan once using Razorpay's test payment flow.
3. Confirm the payment appears in **Transactions → Payments**.
4. Confirm the payment is `captured`, not only `authorized`.
5. Confirm successful webhook deliveries in **Developers → Webhooks**.

## 5. Go live

Complete Razorpay account activation and website verification. Enable automatic
payment capture in Razorpay. Generate **Live Mode** keys, replace the three Vercel
environment variables with live values, redeploy, and make one small real payment
end to end before advertising the site.

## Current fulfilment behavior

Checkout and server verification work without a user database. Payments and buyer
details are visible in the Razorpay Dashboard. Automatic account creation/course
access requires a user login system and persistent database and should be added
before promising instant dashboard access.
