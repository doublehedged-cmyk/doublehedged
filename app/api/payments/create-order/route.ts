import { randomUUID } from "node:crypto";
import { isPaymentPlanId, PAYMENT_PLANS } from "@/lib/payment-plans";
import { getRazorpayCredentials, hmac, razorpayRequest } from "@/lib/razorpay";

type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { planId?: unknown };

    if (!isPaymentPlanId(body.planId)) {
      return Response.json({ error: "Please select a valid plan." }, { status: 400 });
    }

    const plan = PAYMENT_PLANS[body.planId];
    const order = await razorpayRequest<RazorpayOrder>("/orders", {
      method: "POST",
      body: JSON.stringify({
        amount: plan.amount,
        currency: "INR",
        receipt: `dh_${Date.now()}_${randomUUID().slice(0, 8)}`,
        notes: { planId: body.planId, planName: plan.name },
      }),
    });

    const { keyId, keySecret } = getRazorpayCredentials();
    const checkoutToken = hmac(
      `${order.id}|${body.planId}|${plan.amount}`,
      keySecret,
    );

    return Response.json({
      keyId,
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
    return Response.json(
      {
        error: notConfigured
          ? "Payments are being configured. Please try again shortly."
          : "We could not start checkout. Please try again.",
      },
      { status: notConfigured ? 503 : 502 },
    );
  }
}
