export const PAYMENT_PLANS = {
  starter: {
    name: "Starter",
    amount: 99900,
    description: "Double Hedged Starter — one-time access",
  },
  pro: {
    name: "Pro Trader",
    amount: 299900,
    description: "Double Hedged Pro Trader — one-time access",
  },
  execution: {
    name: "Execution Lab",
    amount: 799900,
    description: "Double Hedged Execution Lab — cohort access",
  },
} as const;

export type PaymentPlanId = keyof typeof PAYMENT_PLANS;

export function isPaymentPlanId(value: unknown): value is PaymentPlanId {
  return typeof value === "string" && value in PAYMENT_PLANS;
}
