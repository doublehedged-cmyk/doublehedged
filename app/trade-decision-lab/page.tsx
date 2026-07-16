import type { Metadata } from "next";
import TradeDecisionLab from "./TradeDecisionLab";

export const metadata: Metadata = {
  title: "Behavioral Risk Manager for Traders | Double Hedged",
  description:
    "Catch FOMO, revenge trading, weak setups, and excessive risk before placing a live trade with the Double Hedged Trade Decision Lab.",
};

export default function TradeDecisionLabPage() {
  return <TradeDecisionLab />;
}
