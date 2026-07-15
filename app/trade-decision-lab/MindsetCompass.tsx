"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";
import styles from "./lab.module.css";

const questions = [
  "I can patiently wait without forcing a trade.",
  "I follow my written plan even when emotions say otherwise.",
  "I change my opinion after watching videos or social media.",
  "I enter trades because I don’t want to miss out.",
  "I feel the urge to recover losses immediately.",
  "I can accept being wrong without changing my stop loss.",
  "I get distracted while trading (phone, reels, chats, notifications).",
  "I enjoy following a process more than chasing quick profits.",
  "I am comfortable holding investments for months or years.",
  "I become excited after a few winning trades.",
];

const zoneMeta = {
  trader: { label: "Trader Ready", color: "#1e8e5e", angle: 45, short: "Trader" },
  investor: { label: "Investor Ready", color: "#3277b8", angle: 135, short: "Investor" },
  learning: { label: "Learning Zone", color: "#d19a21", angle: 225, short: "Learning" },
  risk: { label: "High-Risk Today", color: "#c44943", angle: 315, short: "High risk" },
} as const;

type Zone = keyof typeof zoneMeta;
type Result = { zone: Zone; confidence: number; strengths: string[]; watch: string; recommendation: string; completedAt: string };
type StoredCompass = { result: Result; answers: number[] };

function classify(values: Array<number | null>): Omit<Result, "completedAt"> {
  const q = values.map((value) => value ?? 3);
  const reverse = (value: number) => 6 - value;
  const trader = ((q[0] + q[1] + q[5] + q[7] + reverse(q[3]) + reverse(q[4])) / 30) * 100;
  const investor = ((q[8] * 2 + q[0] + reverse(q[2]) + reverse(q[9])) / 25) * 100;
  const risk = ((q[2] + q[3] + q[4] + q[6] + q[9] + reverse(q[1]) + reverse(q[5])) / 35) * 100;

  let zone: Zone = "learning";
  if (risk >= 62) zone = "risk";
  else if (investor >= 68 && investor > trader + 5) zone = "investor";
  else if (trader >= 68) zone = "trader";

  const ranked = [trader, investor, risk, zone === "learning" ? 64 : 0].sort((a, b) => b - a);
  const confidence = Math.max(58, Math.min(92, Math.round(62 + (ranked[0] - ranked[1]) * .7)));

  if (zone === "trader") return {
    zone, confidence,
    strengths: [q[0] >= 4 ? "Patient" : "Process-aware", q[1] >= 4 ? "Rule-oriented" : "Building consistency", q[5] >= 4 ? "Accepts invalidation" : "Risk-conscious"],
    watch: q[9] >= 4 ? "Winning streaks may increase excitement and reduce caution." : q[3] >= 3 ? "Keep checking for subtle FOMO before entry." : "Protect your patience when market activity accelerates.",
    recommendation: "Continue using the Trade Decision Lab before every live trade.",
  };
  if (zone === "investor") return {
    zone, confidence,
    strengths: ["Long-term orientation", "Comfortable without constant action", q[2] <= 2 ? "Resistant to market noise" : "Conviction-aware"],
    watch: q[2] >= 3 ? "Social content can still influence conviction—return to the original thesis." : "Do not let daily price movement turn an investment into an impulsive trade.",
    recommendation: "Use a written investment thesis and review it on a planned schedule, not with every market move.",
  };
  if (zone === "risk") return {
    zone, confidence,
    strengths: ["Honest self-observation", "Willingness to pause", "Awareness can interrupt impulse"],
    watch: q[4] >= 4 ? "The urge to recover losses is elevated today." : q[3] >= 4 ? "FOMO is competing with your written process today." : "Distraction or excitement is stronger than usual today.",
    recommendation: "Avoid live trading today. Use mock trading, journaling, and return when urgency has settled.",
  };
  return {
    zone, confidence,
    strengths: ["Good intent", "Growing self-awareness", "Open to a repeatable process"],
    watch: "Discipline is not yet consistent across patience, attention, and emotional control.",
    recommendation: "Use mock trading and journaling until the same rules feel repeatable under pressure.",
  };
}

export default function MindsetCompass() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Array<number | null>>(Array(10).fill(null));
  const [stored, setStored] = useState<StoredCompass | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setNow(Date.now());
      try {
        const saved = JSON.parse(localStorage.getItem("dh-mindset-compass") || "null") as StoredCompass | null;
        if (saved) { setStored(saved); setResult(saved.result); setAnswers(saved.answers); }
      } catch { /* Ignore malformed local-only history. */ }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const answered = answers.filter((value) => value !== null).length;
  const live = useMemo(() => classify(answers), [answers]);
  const active = result ?? live;
  const meta = zoneMeta[active.zone];
  const nextRetake = stored ? new Date(new Date(stored.result.completedAt).getTime() + 30 * 86400000) : null;
  const canRetake = !nextRetake || (now > 0 && nextRetake.getTime() <= now);
  const compassStyle = {
    "--compass-color": meta.color,
    "--compass-angle": `${meta.angle}deg`,
    "--compass-progress": `${result ? 100 : answered * 10}%`,
  } as CSSProperties;

  function finish() {
    if (answered !== 10) return;
    const next: Result = { ...classify(answers), completedAt: new Date().toISOString() };
    const value = { result: next, answers: answers as number[] };
    localStorage.setItem("dh-mindset-compass", JSON.stringify(value));
    setStored(value);
    setResult(next);
  }

  function retake() {
    if (!canRetake) return;
    setAnswers(Array(10).fill(null));
    setResult(null);
  }

  return (
    <aside className={`${styles.compassWidget} ${open ? styles.compassOpen : ""}`} style={compassStyle}>
      <button type="button" className={styles.compassSummary} onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <div className={styles.compassDonut}>
          <span>{result ? result.confidence : answered * 10}%</span>
          <i />
        </div>
        <div>
          <small>Mindset Compass</small>
          <strong>{result ? meta.label : "Are you ready today?"}</strong>
          <span>{result ? "View today’s check" : `${answered}/10 · under 45 sec`}</span>
        </div>
        <b>{open ? "−" : "+"}</b>
      </button>

      {open ? <div className={styles.compassPanel}>
        <div className={styles.compassIntro}>
          <p>Are you mentally ready to trade today?</p>
          <span>A self-awareness check—not a psychological assessment. Mindsets change with practice.</span>
        </div>

        {!result ? <>
          <div className={styles.zoneLegend}>
            {(Object.keys(zoneMeta) as Zone[]).map((zone) => <span key={zone}><i style={{ background: zoneMeta[zone].color }} />{zoneMeta[zone].short}</span>)}
          </div>
          <div className={styles.compassQuestions}>
            {questions.map((question, index) => <label key={question}>
              <span><b>{index + 1}</b>{question}</span>
              <div><small>Never</small><input type="range" min="1" max="5" value={answers[index] ?? 3} onChange={(event) => setAnswers((current) => current.map((value, item) => item === index ? Number(event.target.value) : value))} /><small>Always</small></div>
            </label>)}
          </div>
          <button type="button" className={styles.compassFinish} disabled={answered !== 10} onClick={finish}>{answered === 10 ? "See today’s readiness" : `Answer ${10 - answered} more`}</button>
        </> : <div className={styles.compassResult}>
          <div className={styles.resultTop}><span>Mindset</span><strong>{meta.label}</strong><div><i style={{ width: `${result.confidence}%`, background: meta.color }} /></div><small>{result.confidence}% confidence</small></div>
          <div className={styles.resultColumns}><div><span>Strengths</span><ul>{result.strengths.map((strength) => <li key={strength}>{strength}</li>)}</ul></div><div><span>Watch out</span><p>{result.watch}</p></div></div>
          <div className={styles.compassRecommendation}><span>Recommendation</span><p>{result.recommendation}</p></div>
          <p className={styles.compassGentle}>This is today’s state, not a permanent label. Readiness can improve with rest, practice and a written process.</p>
          <button type="button" className={styles.compassFinish} disabled={!canRetake} onClick={retake}>{canRetake ? "Retake today’s check" : `Next retake ${nextRetake?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}</button>
        </div>}
      </div> : null}
    </aside>
  );
}
