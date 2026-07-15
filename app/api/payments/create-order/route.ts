import { randomUUID } from "node:crypto";
import { isPaymentPlanId, PAYMENT_PLANS } from "@/lib/payment-plans";
import {
  getRazorpayClient,
  getRazorpayCredentials,
  getRazorpayErrorStatus,
  hmac,
} from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { planId?: unknown };

    if (!isPaymentPlanId(body.planId)) {
      return Response.json({ error: "Please select a valid plan." }, { status: 400 });
    }

    const plan = PAYMENT_PLANS[body.planId];
    if (plan.amount < 100) {
      return Response.json({ error: "Amount must be at least ₹1." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: "INR",
      receipt: `dh_${Date.now()}_${randomUUID().slice(0, 8)}`,
      notes: { planId: body.planId, planName: plan.name },
    });

    const { keyId, keySecret } = getRazorpayCredentials();
    const checkoutToken = hmac(
      `${order.id}|${body.planId}|${plan.amount}`,
      keySecret,
    );

    return Response.json({
      keyId,
      order_id: order.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planId: body.planId,
      planName: plan.name,
      description: plan.description,
      checkoutToken,
    });
  } catch (error) {
    console.error("Unable to create Razorpay order", error);
    const notConfigured =
      error instanceof Error && error.message === "Razorpay is not configured";
    const unauthorized = getRazorpayErrorStatus(error) === 401;
    return Response.json(
      {
        error: notConfigured
          ? "Payments are being configured. Please try again shortly."
          : unauthorized
            ? "Payment service authentication failed. Please contact support."
          : "We could not start checkout. Please try again.",
      },
      { status: notConfigured ? 503 : unauthorized ? 401 : 500 },
    );
  }
}
