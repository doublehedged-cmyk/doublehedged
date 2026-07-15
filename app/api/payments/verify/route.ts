import { isPaymentPlanId, PAYMENT_PLANS } from "@/lib/payment-plans";
import {
  getRazorpayCredentials,
  getRazorpayClient,
  hmac,
  signaturesMatch,
} from "@/lib/razorpay";

type VerificationBody = {
  razorpay_payment_id?: unknown;
  razorpay_order_id?: unknown;
  razorpay_signature?: unknown;
  checkoutToken?: unknown;
  planId?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerificationBody;
    const paymentId = body.razorpay_payment_id;
    const orderId = body.razorpay_order_id;
    const signature = body.razorpay_signature;
    const checkoutToken = body.checkoutToken;

    if (
      typeof paymentId !== "string" ||
      typeof orderId !== "string" ||
      typeof signature !== "string" ||
      typeof checkoutToken !== "string" ||
      !isPaymentPlanId(body.planId)
    ) {
      return Response.json({ error: "Invalid payment response." }, { status: 400 });
    }

    const plan = PAYMENT_PLANS[body.planId];
    const { keySecret } = getRazorpayCredentials();
    const expectedToken = hmac(
      `${orderId}|${body.planId}|${plan.amount}`,
      keySecret,
    );
    const expectedSignature = hmac(`${orderId}|${paymentId}`, keySecret);

    if (
      !signaturesMatch(expectedToken, checkoutToken) ||
      !signaturesMatch(expectedSignature, signature)
    ) {
      return Response.json({ error: "Payment verification failed." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const payment = await razorpay.payments.fetch(paymentId);
    const detailsMatch =
      payment.order_id === orderId &&
      payment.amount === plan.amount &&
      payment.currency === "INR";
    const paid = payment.status === "captured" || payment.status === "authorized";

    if (!detailsMatch || !paid) {
      return Response.json(
        { error: "Payment has not been completed." },
        { status: 409 },
      );
    }

    return Response.json({
      verified: true,
      paymentId: payment.id,
      planName: plan.name,
      status: payment.status,
    });
  } catch (error) {
    console.error("Unable to verify Razorpay payment", error);
    return Response.json(
      { error: "We could not verify this payment. Please contact support." },
      { status: 502 },
    );
  }
}
