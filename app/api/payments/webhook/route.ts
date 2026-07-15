import { hmac, signaturesMatch } from "@/lib/razorpay";

export async function POST(request: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = request.headers.get("x-razorpay-signature");
  const rawBody = await request.text();

  if (!webhookSecret || !signature) {
    return Response.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  const expectedSignature = hmac(rawBody, webhookSecret);
  if (!signaturesMatch(expectedSignature, signature)) {
    return Response.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as {
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } };
  };

  // Vercel retains this structured event in runtime logs. When user accounts are
  // added, this is the trusted place to grant access idempotently in a database.
  console.info("Verified Razorpay webhook", {
    event: event.event,
    paymentId: event.payload?.payment?.entity?.id,
    orderId: event.payload?.payment?.entity?.order_id,
  });

  return Response.json({ received: true });
}
