import type { Metadata } from "next";
import TradeDecisionLab from "./TradeDecisionLab";

export const metadata: Metadata = {
  title: "Trade Decision Lab | Double Hedged",
  description:
    "A pre-trade discipline workflow for market context, emotion, risk, and decision quality.",
};

export default function TradeDecisionLabPage() {
  return <TradeDecisionLab />;
}
