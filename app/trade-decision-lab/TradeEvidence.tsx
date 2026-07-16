"use client";

import { ChangeEvent, useMemo, useState } from "react";
import styles from "./lab.module.css";

export type TradeReview = {
  exit: number;
  quantity: number;
  costs: number;
  netPnl: number;
  rMultiple: number;
  followedPlan: boolean;
  movedStop: boolean;
  reasoningValid: boolean;
  emotionalAfter: string;
  wouldRepeat: boolean;
  notes: string;
  screenshotAdded: boolean;
  reviewedAt: string;
};

export type StoredDecision = {
  id?: string;
  instrument: string;
  timeframe: string;
  direction?: "Buy" | "Sell";
  entry?: number;
  plannedRisk?: number;
  sleep?: number;
  fomo?: number;
  revenge?: number;
  quality: number;
  outcome: string;
  createdAt: string;
  review?: TradeReview;
};

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

export default function TradeEvidence({ history, onHistoryChange }: { history: StoredDecision[]; onHistoryChange: (next: StoredDecision[]) => void }) {
  const unreviewed = history.filter((item) => !item.review);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({ exit: "", quantity: "", costs: "0", followedPlan: "Yes", movedStop: "No", reasoningValid: "Yes", emotionalAfter: "Calm", wouldRepeat: "Yes", notes: "" });
  const [screenshotAdded, setScreenshotAdded] = useState(false);
  const selected = unreviewed.find((item) => (item.id || item.createdAt) === selectedId);
  const exit = Number(form.exit) || 0;
  const quantity = Number(form.quantity) || 0;
  const costs = Number(form.costs) || 0;
  const entry = selected?.entry || 0;
  const multiplier = selected?.direction === "Sell" ? -1 : 1;
  const grossPnl = (exit - entry) * quantity * multiplier;
  const netPnl = grossPnl - costs;
  const rMultiple = selected?.plannedRisk ? netPnl / selected.plannedRisk : 0;

  const reviewed = useMemo(() => history.filter((item): item is StoredDecision & { review: TradeReview } => Boolean(item.review)), [history]);
  const metrics = useMemo(() => {
    const wins = reviewed.filter((item) => item.review.netPnl > 0);
    const losses = reviewed.filter((item) => item.review.netPnl < 0);
    const net = reviewed.reduce((sum, item) => sum + item.review.netPnl, 0);
    const grossWins = wins.reduce((sum, item) => sum + item.review.netPnl, 0);
    const grossLosses = Math.abs(losses.reduce((sum, item) => sum + item.review.netPnl, 0));
    const winRate = reviewed.length ? (wins.length / reviewed.length) * 100 : 0;
    const avgWin = wins.length ? grossWins / wins.length : 0;
    const avgLoss = losses.length ? grossLosses / losses.length : 0;
    const expectancy = reviewed.length ? net / reviewed.length : 0;
    const profitFactor = grossLosses ? grossWins / grossLosses : grossWins ? Infinity : 0;
    const adherence = reviewed.length ? reviewed.filter((item) => item.review.followedPlan).length / reviewed.length * 100 : 0;
    const avgR = reviewed.length ? reviewed.reduce((sum, item) => sum + item.review.rMultiple, 0) / reviewed.length : 0;
    let equity = 0, peak = 0, maxDrawdown = 0;
    [...reviewed].sort((a, b) => Date.parse(a.review.reviewedAt) - Date.parse(b.review.reviewedAt)).forEach((item) => { equity += item.review.netPnl; peak = Math.max(peak, equity); maxDrawdown = Math.max(maxDrawdown, peak - equity); });
    return { wins, losses, net, winRate, avgWin, avgLoss, expectancy, profitFactor, adherence, avgR, maxDrawdown };
  }, [reviewed]);

  const classification = reviewed.length < 30
    ? { tone: "learning", title: "Insufficient evidence", copy: `${30 - reviewed.length} more reviewed trades needed before evaluating an edge.` }
    : metrics.adherence < 70
      ? { tone: "risk", title: "Risk discipline failing", copy: "Results are being distorted by frequent plan violations." }
      : metrics.expectancy > 0 && metrics.profitFactor > 1
        ? { tone: "trader", title: "Positive recorded expectancy", copy: "Your reviewed sample currently shows an edge. Future results remain uncertain." }
        : { tone: "risk", title: "Negative recorded expectancy", copy: "The current sample does not show a profitable edge after costs." };

  const matrix = {
    goodWin: reviewed.filter((item) => item.review.followedPlan && item.review.netPnl > 0).length,
    goodLoss: reviewed.filter((item) => item.review.followedPlan && item.review.netPnl <= 0).length,
    badWin: reviewed.filter((item) => !item.review.followedPlan && item.review.netPnl > 0).length,
    badLoss: reviewed.filter((item) => !item.review.followedPlan && item.review.netPnl <= 0).length,
  };

  const patterns = useMemo(() => {
    const output: string[] = [];
    const highFomo = reviewed.filter((item) => (item.fomo || 0) >= 7);
    const lowFomo = reviewed.filter((item) => (item.fomo || 0) < 7);
    if (highFomo.length >= 5 && lowFomo.length >= 5) {
      const high = highFomo.reduce((sum, item) => sum + item.review.netPnl, 0) / highFomo.length;
      const low = lowFomo.reduce((sum, item) => sum + item.review.netPnl, 0) / lowFomo.length;
      output.push(`High-FOMO trades average ${money(high)} versus ${money(low)} for lower-FOMO trades.`);
    }
    const rested = reviewed.filter((item) => (item.sleep || 0) >= 7);
    const tired = reviewed.filter((item) => (item.sleep || 0) > 0 && (item.sleep || 0) < 7);
    if (rested.length >= 5 && tired.length >= 5) {
      const restedAvg = rested.reduce((sum, item) => sum + item.review.netPnl, 0) / rested.length;
      const tiredAvg = tired.reduce((sum, item) => sum + item.review.netPnl, 0) / tired.length;
      output.push(`Trades after 7+ hours sleep average ${money(restedAvg)} versus ${money(tiredAvg)} when tired.`);
    }
    const moved = reviewed.filter((item) => item.review.movedStop);
    if (moved.length >= 3) output.push(`${moved.length} reviewed trades involved moving the stop; together they produced ${money(moved.reduce((sum, item) => sum + item.review.netPnl, 0))}.`);
    return output;
  }, [reviewed]);

  function update(key: string, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  function screenshot(event: ChangeEvent<HTMLInputElement>) { setScreenshotAdded(Boolean(event.target.files?.[0])); }
  function saveReview() {
    if (!selected || !exit || !quantity || !entry) return;
    const review: TradeReview = { exit, quantity, costs, netPnl, rMultiple, followedPlan: form.followedPlan === "Yes", movedStop: form.movedStop === "Yes", reasoningValid: form.reasoningValid === "Yes", emotionalAfter: form.emotionalAfter, wouldRepeat: form.wouldRepeat === "Yes", notes: form.notes, screenshotAdded, reviewedAt: new Date().toISOString() };
    const next = history.map((item) => (item.id || item.createdAt) === selectedId ? { ...item, review } : item);
    localStorage.setItem("dh-trade-decisions", JSON.stringify(next));
    onHistoryChange(next);
    setSelectedId(""); setForm({ exit: "", quantity: "", costs: "0", followedPlan: "Yes", movedStop: "No", reasoningValid: "Yes", emotionalAfter: "Calm", wouldRepeat: "Yes", notes: "" }); setScreenshotAdded(false);
  }

  return <>
    <section id="outcome-review" className={`${styles.card} ${styles.evidenceCard}`}>
      <div className={styles.sectionHead}><span className={styles.number}>15</span><div><h2>Trade Outcome Review</h2><p>Close the loop. A result without process context teaches the wrong lesson.</p></div></div>
      {!unreviewed.length ? <div className={styles.empty}>No unreviewed decisions. Record a final trade decision first, then return after exit.</div> : <>
        <label className={styles.field}><span>Decision to review</span><select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}><option value="">Select a recorded decision</option>{unreviewed.map((item) => <option key={item.id || item.createdAt} value={item.id || item.createdAt}>{new Date(item.createdAt).toLocaleDateString("en-IN")} · {item.instrument} · {item.timeframe}</option>)}</select></label>
        {selected ? <div className={styles.reviewBody}>
          <div className={styles.reviewPlan}><span>Original plan</span><strong>{selected.direction || "Buy"} {selected.instrument}</strong><small>Entry {selected.entry || "—"} · Planned risk {money(selected.plannedRisk || 0)} · Quality {selected.quality}/100</small></div>
          <div className={styles.grid3}><label className={styles.field}><span>Actual exit</span><input type="number" value={form.exit} onChange={(e) => update("exit", e.target.value)} /></label><label className={styles.field}><span>Quantity</span><input type="number" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} /></label><label className={styles.field}><span>Brokerage, taxes & slippage (₹)</span><input type="number" value={form.costs} onChange={(e) => update("costs", e.target.value)} /></label></div>
          <div className={styles.outcomeNumbers}><div><span>Gross P&L</span><strong>{money(grossPnl)}</strong></div><div><span>Net P&L</span><strong className={netPnl >= 0 ? styles.positiveText : styles.negativeText}>{money(netPnl)}</strong></div><div><span>Result in R</span><strong>{selected.plannedRisk ? `${rMultiple.toFixed(2)}R` : "—"}</strong></div></div>
          <div className={styles.grid3}>{[["followedPlan", "Followed the written plan?", ["Yes", "No"]], ["movedStop", "Moved the stop loss?", ["No", "Yes"]], ["reasoningValid", "Original reasoning remained valid?", ["Yes", "No"]], ["emotionalAfter", "Emotion after exit", ["Calm", "Relieved", "Frustrated", "Excited", "Revenge urge"]], ["wouldRepeat", "Would take this setup again?", ["Yes", "No"]]].map(([key, label, options]) => <label className={styles.field} key={key as string}><span>{label as string}</span><select value={form[key as keyof typeof form]} onChange={(e) => update(key as string, e.target.value)}>{(options as string[]).map((option) => <option key={option}>{option}</option>)}</select></label>)}</div>
          <label className={styles.field}><span>Post-trade notes</span><textarea className={styles.largeText} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="What happened between the plan and the exit?" /></label>
          <label className={styles.fileLabel}>Post-exit screenshot <input type="file" accept="image/*" onChange={screenshot} /><span>{screenshotAdded ? "Screenshot attached ✓" : "Choose image"}</span></label>
          <button type="button" className={styles.proceed} disabled={!exit || !quantity || !entry} onClick={saveReview}>Save outcome review</button>
        </div> : null}
      </>}
    </section>

    <section id="evidence-score" className={`${styles.card} ${styles.evidenceCard}`}>
      <div className={styles.sectionHead}><span className={styles.number}>16</span><div><h2>Trader Evidence Score</h2><p>Measured from completed outcomes—not confidence, promises, or isolated wins.</p></div></div>
      <div className={`${styles.evidenceVerdict} ${styles[classification.tone]}`}><span>{reviewed.length} reviewed trade{reviewed.length === 1 ? "" : "s"}</span><strong>{classification.title}</strong><p>{classification.copy}</p></div>
      <div className={styles.evidenceMetrics}><div><span>Net P&L</span><strong>{money(metrics.net)}</strong></div><div><span>Win rate</span><strong>{metrics.winRate.toFixed(1)}%</strong></div><div><span>Expectancy</span><strong>{money(metrics.expectancy)}</strong></div><div><span>Profit factor</span><strong>{Number.isFinite(metrics.profitFactor) ? metrics.profitFactor.toFixed(2) : "∞"}</strong></div><div><span>Average R</span><strong>{metrics.avgR.toFixed(2)}R</strong></div><div><span>Max drawdown</span><strong>{money(metrics.maxDrawdown)}</strong></div><div><span>Plan adherence</span><strong>{metrics.adherence.toFixed(0)}%</strong></div><div><span>Average win / loss</span><strong>{money(metrics.avgWin)} / {money(metrics.avgLoss)}</strong></div></div>
      <h3 className={styles.evidenceTitle}>Process vs outcome</h3>
      <div className={styles.processMatrix}><div className={styles.matrixHead} /><div className={styles.matrixHead}>Profitable</div><div className={styles.matrixHead}>Losing</div><div className={styles.matrixHead}>Followed plan</div><div className={styles.goodCell}><strong>{matrix.goodWin}</strong><span>Good process, positive result</span></div><div className={styles.goodCell}><strong>{matrix.goodLoss}</strong><span>Good process, normal loss</span></div><div className={styles.matrixHead}>Broke plan</div><div className={styles.warnCell}><strong>{matrix.badWin}</strong><span>Dangerous lucky win</span></div><div className={styles.badCell}><strong>{matrix.badLoss}</strong><span>Preventable loss</span></div></div>
      <h3 className={styles.evidenceTitle}>Behavioral patterns</h3>
      {patterns.length ? <div className={styles.patternList}>{patterns.map((pattern) => <p key={pattern}>{pattern}</p>)}</div> : <div className={styles.empty}>Patterns appear only after enough comparable observations. No statistics are fabricated.</div>}
      <p className={styles.evidenceDisclaimer}>Historical expectancy does not guarantee future profitability. Trading and derivatives involve substantial risk.</p>
    </section>
  </>;
}
