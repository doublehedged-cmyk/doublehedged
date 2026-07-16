"use client";

import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./lab.module.css";
import MindsetCompass from "./MindsetCompass";
import TradeEvidence, { StoredDecision } from "./TradeEvidence";
import PersonalRealityCheck from "./PersonalRealityCheck";

const setupItems = [
  "Trend confirmed",
  "Support/Resistance identified",
  "Volume confirmation",
  "Risk/Reward ≥ 1:2",
  "Stop Loss defined",
  "Target defined",
  "Entry follows my strategy",
];

const emotionItems = ["Confidence", "Fear", "Greed", "FOMO", "Anger", "Revenge", "Excitement"];
const truthItems = [
  "If this loses, will I regret following my plan?",
  "Am I trying to recover a previous loss?",
  "Would I recommend this trade to a beginner?",
  "Would I still take this trade if it were my last trade this month?",
  "Can I explain this trade in one sentence?",
];

type MarkerName = "Entry" | "Stop Loss" | "Target";
const initialEmotions = Object.fromEntries(emotionItems.map((item) => [item, 5])) as Record<string, number>;
const initialTruth = Object.fromEntries(truthItems.map((item) => [item, ""])) as Record<string, string>;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className={styles.field}><span>{label}</span>{children}</label>;
}

function Section({ number, title, note, children }: { number: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className={styles.card}>
      <div className={styles.sectionHead}>
        <span className={styles.number}>{number}</span>
        <div><h2>{title}</h2>{note ? <p>{note}</p> : null}</div>
      </div>
      {children}
    </section>
  );
}

export default function TradeDecisionLab() {
  const [snapshot, setSnapshot] = useState({ broker: "", instrument: "", direction: "Buy", trend: "", timeframe: "", price: "", volatility: "", news: "No" });
  const [reason, setReason] = useState("");
  const [checks, setChecks] = useState<string[]>([]);
  const [emotions, setEmotions] = useState(initialEmotions);
  const [physical, setPhysical] = useState({ sleep: "7", energy: "5", stress: "5", alcohol: "No", sick: "No", exercise: "No" });
  const [risk, setRisk] = useState({ account: "", willing: "", entry: "", stop: "", daily: "" });
  const [chart, setChart] = useState<string | null>(null);
  const [activeMarker, setActiveMarker] = useState<MarkerName>("Entry");
  const [markers, setMarkers] = useState<Partial<Record<MarkerName, number>>>({});
  const [acknowledged, setAcknowledged] = useState(false);
  const [paperChoice, setPaperChoice] = useState("");
  const [paperReview, setPaperReview] = useState({ worked: "", emotions: "", live: "" });
  const [truth, setTruth] = useState(initialTruth);
  const [oneSentence, setOneSentence] = useState("");
  const [seconds, setSeconds] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<StoredDecision[]>([]);
  const [realityComplete, setRealityComplete] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try { setHistory(JSON.parse(localStorage.getItem("dh-trade-decisions") || "[]")); } catch { setHistory([]); }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (seconds === null || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value === null ? null : Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  const checklistProgress = Math.round((checks.length / setupItems.length) * 100);
  const account = Number(risk.account) || 0;
  const willing = Number(risk.willing) || 0;
  const entry = Number(risk.entry) || 0;
  const stop = Number(risk.stop) || 0;
  const daily = Number(risk.daily) || 0;
  const perUnitRisk = Math.abs(entry - stop);
  const positionSize = perUnitRisk > 0 ? Math.floor(willing / perUnitRisk) : 0;
  const riskPercent = account > 0 ? (willing / account) * 100 : 0;
  const riskBlocked = riskPercent > 2 || (daily > 0 && willing > daily);
  const emotionalWarning = emotions.Fear > 7 || emotions.Greed > 7;
  const truthWarnings = Object.values(truth).filter((answer) => answer === "No").length;

  const scores = useMemo(() => {
    const emotionalPressure = (emotions.Fear + emotions.Greed + emotions.FOMO + emotions.Anger + emotions.Revenge + emotions.Excitement) / 6;
    const emotional = Math.max(0, Math.round(100 - emotionalPressure * 9 + emotions.Confidence * 3));
    const riskScore = account && willing && perUnitRisk ? (riskBlocked ? 20 : 100) : 25;
    const physicalScore = Math.max(0, Math.min(100, Math.round((Number(physical.sleep) >= 7 ? 30 : 10) + Number(physical.energy) * 5 + (10 - Number(physical.stress)) * 3 - (physical.alcohol === "Yes" ? 20 : 0) - (physical.sick === "Yes" ? 20 : 0) + (physical.exercise === "Yes" ? 10 : 0))));
    const discipline = Math.round((reason.length >= 100 ? 25 : reason.length / 4) + checklistProgress * .35 + (acknowledged ? 15 : 0) + (Object.keys(markers).length === 3 ? 15 : 0) + (Object.values(truth).every(Boolean) ? 10 : 0));
    const strategy = Math.round(checklistProgress * .7 + (reason.length >= 100 ? 20 : 0) + (Object.keys(markers).length === 3 ? 10 : 0));
    const overall = Math.round((strategy + emotional + riskScore + Math.min(100, discipline) + physicalScore) / 5);
    return { strategy, emotional, risk: riskScore, discipline: Math.min(100, discipline), overall };
  }, [acknowledged, checklistProgress, emotions, markers, perUnitRisk, physical, reason.length, riskBlocked, account, willing, truth]);

  const outcome = riskBlocked || scores.overall < 55 || emotionalWarning
    ? { label: "Do not trade today", tone: "red" }
    : scores.overall < 75 || truthWarnings > 0
      ? { label: "Valid but emotional. Review again", tone: "yellow" }
      : { label: "High-quality trade. Proceed", tone: "green" };

  const requiredReady = Boolean(snapshot.broker && snapshot.instrument && snapshot.direction && snapshot.trend && snapshot.timeframe && snapshot.price && snapshot.volatility && reason.length >= 100 && checks.length === setupItems.length && account && willing && entry && stop && daily && Object.keys(markers).length === 3 && acknowledged && paperChoice && Object.values(truth).every(Boolean) && oneSentence.trim() && realityComplete);
  const comparable = history.filter((item) => item.instrument.toLowerCase() === snapshot.instrument.toLowerCase() && item.timeframe === snapshot.timeframe);

  function updateObject<T extends Record<string, string>>(setter: React.Dispatch<React.SetStateAction<T>>, key: string, value: string) {
    setter((current) => ({ ...current, [key]: value }));
  }

  function uploadChart(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (chart) URL.revokeObjectURL(chart);
    setChart(URL.createObjectURL(file));
    setMarkers({});
  }

  function placeMarker(event: MouseEvent<HTMLDivElement>) {
    if (!chart) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setMarkers((current) => ({ ...current, [activeMarker]: ((event.clientY - rect.top) / rect.height) * 100 }));
  }

  function saveDecision() {
    if (seconds !== 0 || !requiredReady) return;
    const createdAt = new Date().toISOString();
    const decision: StoredDecision = { id: crypto.randomUUID(), instrument: snapshot.instrument, timeframe: snapshot.timeframe, direction: snapshot.direction as "Buy" | "Sell", entry, plannedRisk: willing, sleep: Number(physical.sleep), fomo: emotions.FOMO, revenge: emotions.Revenge, quality: scores.overall, outcome: outcome.tone, createdAt };
    const next = [decision, ...history].slice(0, 100);
    localStorage.setItem("dh-trade-decisions", JSON.stringify(next));
    setHistory(next);
    setSaved(true);
  }

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo}>Double <em>Hedged</em></Link>
        <Link href="/" className={styles.back}>← Back to learning</Link>
      </header>

      <div className={styles.heroShell}>
        <div className={styles.hero}>
          <p className={styles.kicker}>Pre-trade discipline system</p>
          <h1>Trade Decision <em>Lab</em></h1>
          <blockquote>“If you can&apos;t justify the trade, you shouldn&apos;t take it.”</blockquote>
          <p>Complete every gate before making a live decision. This tool records judgment; it does not place a broker order.</p>
        </div>
        <MindsetCompass />
      </div>

      <nav className={styles.labNav} aria-label="Trade Decision Lab sections">
        <a href="#pre-trade">Pre-trade decision</a>
        <a href="#outcome-review">Outcome review</a>
        <a href="#evidence-score">Evidence score</a>
      </nav>

      <div className={styles.layout} id="pre-trade">
        <div className={styles.formColumn}>
          <Section number="01" title="Market Snapshot">
            <div className={styles.grid3}>
              <Field label="Date & time"><input value={new Date().toLocaleString("en-IN")} disabled /></Field>
              <Field label="Broker"><input value={snapshot.broker} onChange={(e) => updateObject(setSnapshot, "broker", e.target.value)} placeholder="Zerodha, Groww…" /></Field>
              <Field label="Instrument"><input value={snapshot.instrument} onChange={(e) => updateObject(setSnapshot, "instrument", e.target.value)} placeholder="NIFTY 50" /></Field>
              <Field label="Direction"><select value={snapshot.direction} onChange={(e) => updateObject(setSnapshot, "direction", e.target.value)}><option>Buy</option><option>Sell</option></select></Field>
              <Field label="Index trend"><select value={snapshot.trend} onChange={(e) => updateObject(setSnapshot, "trend", e.target.value)}><option value="">Select</option><option>Bullish</option><option>Bearish</option><option>Sideways</option></select></Field>
              <Field label="Timeframe"><select value={snapshot.timeframe} onChange={(e) => updateObject(setSnapshot, "timeframe", e.target.value)}><option value="">Select</option><option>5 min</option><option>15 min</option><option>75 min</option><option>Daily</option></select></Field>
              <Field label="Current price"><input type="number" value={snapshot.price} onChange={(e) => updateObject(setSnapshot, "price", e.target.value)} /></Field>
              <Field label="Volatility"><select value={snapshot.volatility} onChange={(e) => updateObject(setSnapshot, "volatility", e.target.value)}><option value="">Select</option><option>Low</option><option>Normal</option><option>High</option></select></Field>
              <Field label="News today?"><select value={snapshot.news} onChange={(e) => updateObject(setSnapshot, "news", e.target.value)}><option>No</option><option>Yes</option></select></Field>
            </div>
          </Section>

          <Section number="02" title="Why This Trade?" note="Convince your future self that this trade deserves your money.">
            <textarea className={styles.largeText} minLength={100} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain the structure, trigger, invalidation and why this setup belongs in your playbook…" />
            <div className={reason.length >= 100 ? styles.goodCount : styles.count}>{reason.length}/100 minimum</div>
          </Section>

          <Section number="03" title="Setup Checklist">
            <div className={styles.progress}><span style={{ width: `${checklistProgress}%` }} /></div>
            <p className={styles.progressLabel}>{checklistProgress}% complete</p>
            <div className={styles.checkGrid}>{setupItems.map((item) => <label className={styles.check} key={item}><input type="checkbox" checked={checks.includes(item)} onChange={() => setChecks((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])} /><span>{item}</span></label>)}</div>
          </Section>

          <Section number="04" title="Emotional Check">
            {emotionalWarning ? <div className={styles.warning}>Your emotions are stronger than your analysis.</div> : null}
            <div className={styles.sliderGrid}>{emotionItems.map((item) => <label className={styles.slider} key={item}><span>{item}<b>{emotions[item]}</b></span><input type="range" min="1" max="10" value={emotions[item]} onChange={(e) => setEmotions((current) => ({ ...current, [item]: Number(e.target.value) }))} /></label>)}</div>
          </Section>

          <Section number="05" title="Physical State" note="A tired brain often makes poor trading decisions.">
            <div className={styles.grid3}>
              <Field label="Hours slept"><input type="number" min="0" max="14" value={physical.sleep} onChange={(e) => updateObject(setPhysical, "sleep", e.target.value)} /></Field>
              <Field label="Energy level (1–10)"><input type="number" min="1" max="10" value={physical.energy} onChange={(e) => updateObject(setPhysical, "energy", e.target.value)} /></Field>
              <Field label="Stress level (1–10)"><input type="number" min="1" max="10" value={physical.stress} onChange={(e) => updateObject(setPhysical, "stress", e.target.value)} /></Field>
              {[["alcohol", "Had alcohol yesterday?"], ["sick", "Feeling sick?"], ["exercise", "Exercised today?"]].map(([key, label]) => <Field label={label} key={key}><select value={physical[key as keyof typeof physical]} onChange={(e) => updateObject(setPhysical, key, e.target.value)}><option>No</option><option>Yes</option></select></Field>)}
            </div>
          </Section>

          <Section number="06" title="Risk Manager" note="Default discipline rule: maximum 2% account risk per trade.">
            {riskBlocked ? <div className={styles.blocked}>🚫 Trade blocked — risk exceeds your rule.</div> : null}
            <div className={styles.grid3}>
              <Field label="Account size (₹)"><input type="number" value={risk.account} onChange={(e) => updateObject(setRisk, "account", e.target.value)} /></Field>
              <Field label="Amount willing to lose (₹)"><input type="number" value={risk.willing} onChange={(e) => updateObject(setRisk, "willing", e.target.value)} /></Field>
              <Field label="Maximum daily loss (₹)"><input type="number" value={risk.daily} onChange={(e) => updateObject(setRisk, "daily", e.target.value)} /></Field>
              <Field label="Entry price"><input type="number" value={risk.entry} onChange={(e) => updateObject(setRisk, "entry", e.target.value)} /></Field>
              <Field label="Stop-loss price"><input type="number" value={risk.stop} onChange={(e) => updateObject(setRisk, "stop", e.target.value)} /></Field>
              <div className={styles.metric}><span>Position size</span><strong>{positionSize || "—"}</strong><small>units, auto-calculated</small></div>
              <div className={styles.metric}><span>Risk</span><strong>{riskPercent ? `${riskPercent.toFixed(2)}%` : "—"}</strong><small>of account</small></div>
            </div>
          </Section>

          <Section number="07" title="Screenshot & Levels" note="Upload the chart, select a level, then click the chart to place it.">
            <input className={styles.file} type="file" accept="image/*" onChange={uploadChart} />
            <div className={styles.markerButtons}>{(["Entry", "Stop Loss", "Target"] as MarkerName[]).map((name) => <button type="button" className={activeMarker === name ? styles.activeMarker : ""} onClick={() => setActiveMarker(name)} key={name}>{name}</button>)}</div>
            <div className={styles.chart} onClick={placeMarker}>
              {/* User-selected object URLs cannot be optimized by next/image. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {chart ? <img src={chart} alt="Uploaded trading chart" /> : <p>Upload a chart to mark Entry, Stop Loss and Target.</p>}
              {Object.entries(markers).map(([name, top]) => <div className={`${styles.chartLine} ${styles[name.replace(" ", "").toLowerCase()]}`} style={{ top: `${top}%` }} key={name}><span>{name}</span></div>)}
            </div>
          </Section>

          <Section number="08" title="AI Devil’s Advocate" note="A structured counter-case generated from your inputs—not financial advice.">
            <div className={styles.devilsGrid}>
              <article><span>Why could this fail?</span><p>{snapshot.news === "Yes" ? "Scheduled news can invalidate clean technical structure and create slippage." : "The apparent trend may be late-stage, while the entry arrives after the best risk/reward has passed."}</p></article>
              <article><span>What is the opposite case?</span><p>If your {snapshot.trend || "chosen"} thesis is wrong, price may be reacting to liquidity rather than confirming continuation. What evidence supports the other side?</p></article>
              <article><span>What invalidates it?</span><p>{risk.stop ? `A decisive move through ${risk.stop} invalidates the planned risk boundary.` : "You have not supplied a numeric stop-loss yet, so invalidation is not objectively defined."}</p></article>
            </div>
            <label className={styles.ack}><input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} /> I read and considered the counter-case.</label>
          </Section>

          <Section number="09" title="Historical Reminder">
            {comparable.length ? <div className={styles.history}><strong>You have recorded {comparable.length} decision{comparable.length === 1 ? "" : "s"} like this.</strong><p>Average pre-trade quality: {Math.round(comparable.reduce((sum, item) => sum + item.quality, 0) / comparable.length)}%. Add post-trade outcomes later to unlock win rate and mistake analysis.</p></div> : <div className={styles.empty}>No comparable saved trades yet. Your first honest entry begins the evidence.</div>}
          </Section>

          <Section number="10" title="Mock Trade First" note="Would you like to paper trade this first?">
            <div className={styles.segmented}><button type="button" className={paperChoice === "paper" ? styles.selected : ""} onClick={() => setPaperChoice("paper")}>Yes, paper trade</button><button type="button" className={paperChoice === "live" ? styles.selected : ""} onClick={() => setPaperChoice("live")}>Live trade anyway</button></div>
            {paperChoice === "paper" ? <div className={styles.grid3}><Field label="Did your analysis work?"><select value={paperReview.worked} onChange={(e) => updateObject(setPaperReview, "worked", e.target.value)}><option value="">Select</option><option>Yes</option><option>No</option><option>Still running</option></select></Field><Field label="Did emotions change?"><select value={paperReview.emotions} onChange={(e) => updateObject(setPaperReview, "emotions", e.target.value)}><option value="">Select</option><option>Calmer</option><option>Same</option><option>More emotional</option></select></Field><Field label="Would you still take it live?"><select value={paperReview.live} onChange={(e) => updateObject(setPaperReview, "live", e.target.value)}><option value="">Select</option><option>Yes</option><option>No</option></select></Field></div> : null}
          </Section>

          <Section number="11" title="Final Truth Test">
            {truthWarnings ? <div className={styles.warning}>{truthWarnings} answer{truthWarnings > 1 ? "s" : ""} triggered a warning. Read the wording carefully before continuing.</div> : null}
            <div className={styles.truthList}>{truthItems.map((item) => <div className={styles.truth} key={item}><span>{item}</span><div><button type="button" className={truth[item] === "Yes" ? styles.yes : ""} onClick={() => setTruth((current) => ({ ...current, [item]: "Yes" }))}>Yes</button><button type="button" className={truth[item] === "No" ? styles.no : ""} onClick={() => setTruth((current) => ({ ...current, [item]: "No" }))}>No</button></div></div>)}</div>
            <Field label="Explain this trade in one sentence"><input value={oneSentence} onChange={(e) => setOneSentence(e.target.value)} placeholder="I am taking this trade because…" /></Field>
          </Section>

          <Section number="12" title="Personal Reality Check" note="A calm reminder from the person who knows your trading history best: you.">
            <PersonalRealityCheck onComplete={setRealityComplete} />
          </Section>

          <Section number="13" title="60-Second Lock" note="Professional traders wait. Impulsive traders click.">
            {seconds === null ? <button type="button" className={styles.lockButton} disabled={!requiredReady} onClick={() => setSeconds(60)}>{requiredReady ? "Begin 60-second lock" : "Complete every gate to begin"}</button> : <div className={styles.timer}><strong>{seconds}</strong><span>{seconds === 0 ? "Pause complete. The decision is yours." : "seconds — breathe, reread, reconsider"}</span></div>}
          </Section>

          <Section number="14" title="Final Decision">
            <div className={styles.scoreGrid}>{Object.entries(scores).filter(([key]) => key !== "overall").map(([key, value]) => <div key={key}><span>{key} score</span><strong>{value}</strong></div>)}</div>
            <div className={`${styles.verdict} ${styles[outcome.tone]}`}><span>Overall trade quality · {scores.overall}/100</span><strong>{outcome.label}</strong></div>
            <button type="button" className={styles.proceed} disabled={seconds !== 0 || !requiredReady || riskBlocked} onClick={saveDecision}>{saved ? "Decision recorded ✓" : seconds === 0 ? "Record decision & proceed" : "Proceed locked"}</button>
            <p className={styles.disclaimer}>This journal does not connect to or execute orders with your broker.</p>
          </Section>

          <TradeEvidence history={history} onHistoryChange={setHistory} />
        </div>

        <aside className={styles.sidebar}>
          <p>Live decision quality</p>
          <strong>{scores.overall}</strong>
          <span>/100</span>
          <div className={`${styles.miniVerdict} ${styles[outcome.tone]}`}>{outcome.label}</div>
          <dl><div><dt>Checklist</dt><dd>{checklistProgress}%</dd></div><div><dt>Reason</dt><dd>{reason.length >= 100 ? "Ready" : `${100 - reason.length} chars left`}</dd></div><div><dt>Risk</dt><dd>{riskBlocked ? "Blocked" : riskPercent ? `${riskPercent.toFixed(2)}%` : "Missing"}</dd></div><div><dt>Chart levels</dt><dd>{Object.keys(markers).length}/3</dd></div><div><dt>Truth test</dt><dd>{Object.values(truth).filter(Boolean).length}/5</dd></div></dl>
        </aside>
      </div>

      <section className={styles.insights}>
        <p className={styles.kicker}>Long-term behavioral coaching</p>
        <h2>Your patterns become visible when every decision leaves evidence.</h2>
        <div><article>Losses after consecutive losing trades</article><article>Sleep versus win rate</article><article>Cost of high-FOMO entries</article><article>Best setup by day and session</article></div>
        <small>These insights unlock only after enough completed decisions and post-trade outcomes. No statistics are fabricated.</small>
      </section>
    </main>
  );
}
