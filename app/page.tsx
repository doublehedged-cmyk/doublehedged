import type { ReactNode } from "react";
import TradingCockpit from "./TradingCockpit";

const painPoints = [
  "Entering without a plan",
  "Averaging losses",
  "Buying options without understanding theta",
  "Following Telegram tips",
  "Ignoring stop-loss",
  "Revenge trading after one bad trade",
  "Confusing indicators with strategy",
];

const learningPaths = [
  {
    title: "Beginner Trader",
    tag: "A",
    copy: "Market basics, candlesticks, support and resistance, trendlines, volume, and order types.",
  },
  {
    title: "Chart Reader",
    tag: "B",
    copy: "Price action, multi-timeframe analysis, breakout versus fakeout, trend strength, and liquidity zones.",
  },
  {
    title: "Options Learner",
    tag: "C",
    copy: "Calls, puts, Greeks, theta decay, IV, option chain, spreads, and hedging logic.",
  },
  {
    title: "Risk-First Trader",
    tag: "D",
    copy: "Position sizing, stop-loss discipline, 1:2 risk-reward, max daily loss, and trade journaling.",
  },
  {
    title: "Advanced Execution",
    tag: "E",
    copy: "15-minute and 75-minute planning, confirmation logic, entry checklist, exit rules, and no-overtrading systems.",
  },
];

const indicators = [
  "EMA",
  "VWAP",
  "RSI",
  "MACD",
  "Supertrend",
  "Volume",
  "Open Interest",
  "CPR",
  "Bollinger Bands",
  "Market profile basics",
];

const framework = [
  {
    title: "PLAN",
    copy: "Read market structure, trend, levels, timeframe, and news risk before thinking about entry.",
  },
  {
    title: "PROTECT",
    copy: "Define stop-loss, position size, capital risk, and invalidation level before the trade begins.",
  },
  {
    title: "PERFORM",
    copy: "Execute only when the checklist matches. Exit without emotion when the trade is wrong.",
  },
];

const marketModules = [
  "NIFTY",
  "BANKNIFTY",
  "FINNIFTY",
  "Stocks",
  "MCX Gold",
  "MCX Crude",
  "Intraday trading",
  "Swing trading",
  "Options buying",
  "Options hedging",
  "Futures risk",
];

const simulatorItems = [
  "Entry planning",
  "Stop-loss placement",
  "Target mapping",
  "Risk-reward",
  "Trade journal",
  "Mistake review",
  "Screenshot-based learning",
];

const psychology = [
  "Fear of missing out",
  "Revenge trading",
  "Overconfidence",
  "Loss recovery trap",
  "Hope-based holding",
  "Profit booking too early",
  "Stop-loss moving mistake",
];

const community = [
  "No random calls",
  "No fake screenshots",
  "No profit flexing",
  "No pressure",
  "Chart discussions",
  "Learning rooms",
  "Weekly reviews",
  "Trade breakdowns",
];

const trustBlocks = [
  "Structured curriculum",
  "Practice-first learning",
  "Risk-first framework",
  "Indian market examples",
  "Beginner to advanced path",
  "No advisory positioning",
];

const faqs = [
  {
    question: "Is Double Hedged a tips platform?",
    answer:
      "No. Double Hedged is an education platform built around structure, risk, practice, and chart-based learning.",
  },
  {
    question: "Do you provide buy/sell calls?",
    answer:
      "No. We do not provide trading calls, buy/sell recommendations, advisory messages, or portfolio instructions.",
  },
  {
    question: "Is this for beginners?",
    answer:
      "Yes. The learning path starts with market basics and gradually moves into chart reading, options logic, risk, and execution.",
  },
  {
    question: "Do you teach options trading?",
    answer:
      "Yes. Options are taught through logic, Greeks, theta decay, IV, option chain reading, spreads, and hedging concepts.",
  },
  {
    question: "Is this specific to Indian markets?",
    answer:
      "Yes. The examples and modules focus on Indian traders, Indian timings, and instruments like NIFTY, BANKNIFTY, FINNIFTY, stocks, MCX Gold, and MCX Crude.",
  },
  {
    question: "Do you guarantee profits?",
    answer:
      "No. Trading involves market risk. Education can improve process and understanding, but it cannot guarantee returns.",
  },
  {
    question: "Can I learn with small capital?",
    answer:
      "Yes, but the emphasis is on learning, simulation, journaling, and risk control before increasing exposure.",
  },
  {
    question: "Is this educational only?",
    answer:
      "Yes. Double Hedged is educational only and does not act as an investment advisor or trading signal provider.",
  },
];

function ButtonLink({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "border-cyan-200/70 bg-cyan-300 text-slate-950 shadow-[0_0_42px_rgba(103,232,249,0.28)] hover:bg-cyan-200"
      : "border-white/15 bg-white/[0.06] text-white hover:border-cyan-200/60 hover:bg-white/[0.1]";

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section id={id} className={`relative px-5 sm:px-8 lg:px-10 ${compact ? "py-14" : "py-20"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl ${className}`}
    >
      {children}
    </article>
  );
}

function LearningCard({
  title,
  tag,
  copy,
}: {
  title: string;
  tag: string;
  copy: string;
}) {
  return (
    <GlassCard className="group min-h-72 overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-300/10 text-sm font-bold text-cyan-200">
          {tag}
        </span>
        <span className="h-2 w-20 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 opacity-70" />
      </div>
      <h3 className="mt-8 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-4 leading-7 text-slate-300">{copy}</p>
      <div className="mt-8 h-24 rounded-lg border border-cyan-200/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(37,99,235,0.05)),repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_22px)] transition group-hover:border-cyan-200/35" />
    </GlassCard>
  );
}

function FrameworkShield() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-8 animate-[spin_18s_linear_infinite] rounded-[28%] border border-cyan-200/20 bg-[conic-gradient(from_90deg,rgba(34,211,238,0.32),rgba(59,130,246,0.08),rgba(34,197,94,0.28),rgba(239,68,68,0.16),rgba(34,211,238,0.32))] blur-sm" />
      <div className="absolute inset-16 rounded-[30%] border border-white/15 bg-slate-950/85 shadow-[0_0_80px_rgba(34,211,238,0.22)] backdrop-blur-xl [transform:rotateX(58deg)_rotateZ(45deg)]" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-52 w-52 place-items-center rounded-full border border-cyan-200/30 bg-black/50 text-center shadow-[0_0_70px_rgba(34,211,238,0.2)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Method
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              PLAN
              <br />
              PROTECT
              <br />
              PERFORM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-white">
        <span>{question}</span>
        <span className="text-2xl font-light text-cyan-300 transition group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-4 leading-7 text-slate-300">{answer}</p>
    </details>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03060b] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_75%_18%,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_52%_82%,rgba(34,197,94,0.08),transparent_30%),linear-gradient(180deg,#03060b,#050713_42%,#020306)]" />

      <header className="absolute left-0 right-0 top-0 z-30 px-5 py-6 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-cyan-200/40 bg-cyan-300/10 text-sm font-bold text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.18)]">
              DH
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Double Hedged
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            <a className="transition hover:text-cyan-200" href="#problem">Problem</a>
            <a className="transition hover:text-cyan-200" href="#learning">Paths</a>
            <a className="transition hover:text-cyan-200" href="#method">Method</a>
            <a className="transition hover:text-cyan-200" href="#simulator">Simulator</a>
            <a className="transition hover:text-cyan-200" href="#faq">FAQ</a>
          </div>
        </nav>
      </header>

      <section className="relative grid min-h-screen items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,11,0.96)_0%,rgba(3,6,11,0.78)_42%,rgba(3,6,11,0.35)_100%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
              Indian stock market education ecosystem
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Master the Market Before the Market Tests You.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Double Hedged is an Indian trading education platform built for
              disciplined traders who want to understand charts, risk, options,
              futures, psychology, and execution without depending on tips.
            </p>
            <p className="mt-5 text-xl font-semibold text-cyan-200">
              Learn to trade with protection before prediction.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#learning">Start Learning</ButtonLink>
              <ButtonLink href="#method" variant="secondary">
                See Learning Path
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Education only. No tips. No guaranteed returns. No advisory.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <div className="absolute left-5 top-5 z-10 rounded-full border border-cyan-200/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                NIFTY · BANKNIFTY · MCX
              </div>
              <TradingCockpit />
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                {["Option chain heatmap", "Risk-reward calculator", "Stop-loss shield"].map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-black/45 p-3 text-xs font-semibold text-slate-200 backdrop-blur-md">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="problem"
        eyebrow="Problem"
        title="Indian retail traders do not need more noise. They need a process that protects capital."
        description="Most damage happens before a trader understands why the trade was taken, how much was at risk, or where the idea becomes invalid."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point) => (
            <div key={point} className="rounded-lg border border-red-300/15 bg-red-500/[0.06] p-5 text-sm font-semibold text-red-50">
              {point}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="why"
        eyebrow="Why Double Hedged exists"
        title="Before you learn how to enter, learn how not to destroy your capital."
        description="Double Hedged exists for traders who want to replace random entries, emotional averaging, and tip dependency with market structure, risk control, and repeatable chart-based decisions."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {trustBlocks.map((item) => (
            <GlassCard key={item}>
              <div className="h-2 w-20 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
              <h3 className="mt-6 text-xl font-semibold text-white">{item}</h3>
              <p className="mt-4 leading-7 text-slate-300">
                Built to increase clarity, reduce impulse, and keep learning separate from advisory or signal-driven behavior.
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section
        id="learning"
        eyebrow="Learning paths"
        title="Five routes from market basics to disciplined execution"
        description="Each path is designed as a serious training module, not a promise of income. You learn the chart, the instrument, the risk, and your own decision habits."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {learningPaths.map((path) => (
            <LearningCard key={path.title} {...path} />
          ))}
        </div>
      </Section>

      <Section
        id="indicator-lab"
        eyebrow="Indicator Lab"
        title="Indicators do not predict the market. They help you read behavior."
        description="The lab teaches indicators as context tools. You learn what they show, when they fail, and how to combine them with structure, volume, and risk."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {indicators.map((indicator) => (
            <div key={indicator} className="rounded-lg border border-cyan-200/15 bg-cyan-300/[0.055] p-5 text-center font-semibold text-cyan-50">
              {indicator}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="method"
        eyebrow="Double Hedged Method"
        title="PLAN, PROTECT, PERFORM"
        description="The signature framework keeps prediction in its place. The first job is to understand conditions. The second is to protect capital. The third is to execute only when the rules align."
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FrameworkShield />
          <div className="grid gap-5">
            {framework.map((step) => (
              <GlassCard key={step.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{step.title}</p>
                <p className="mt-4 text-lg leading-8 text-slate-200">{step.copy}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="markets"
        eyebrow="Indian market focus"
        title="Built for Indian traders, Indian timings, Indian instruments, Indian emotions."
        description="The examples and modules are shaped around Indian index derivatives, equities, commodities, intraday behavior, expiry pressure, and the psychology of local retail participation."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {marketModules.map((module) => (
            <div key={module} className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.14),rgba(255,255,255,0.035))] p-5 font-semibold text-white">
              {module}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="simulator"
        eyebrow="Trading simulator preview"
        title="Practice the decision before the market charges tuition."
        description="A simulator-style workflow helps learners rehearse entry, invalidation, target planning, journal review, and screenshot-based mistake correction."
      >
        <div className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="relative min-h-80 overflow-hidden rounded-lg border border-cyan-200/15 bg-slate-950">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
            <div className="absolute left-8 right-8 top-14 h-24 rounded-lg border border-emerald-300/25 bg-emerald-300/10" />
            <div className="absolute left-8 right-8 top-44 h-1 bg-red-400 shadow-[0_0_24px_rgba(248,113,113,0.55)]" />
            <div className="absolute bottom-8 left-8 right-8 grid gap-3 sm:grid-cols-3">
              {["Entry", "Stop", "Target"].map((label) => (
                <div key={label} className="rounded-lg border border-white/10 bg-black/50 p-4 text-sm font-semibold text-slate-200">
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {simulatorItems.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm font-semibold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="psychology"
        eyebrow="Psychology"
        title="The real chart is inside your head."
        description="A trader can know every pattern and still lose control when fear, hope, ego, or urgency takes over. Double Hedged treats psychology as a core module, not a bonus lesson."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {psychology.map((item) => (
            <GlassCard key={item}>
              <h3 className="text-lg font-semibold text-white">{item}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Learn to identify the behavior, pause the impulse, and return to the written process.
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section
        id="community"
        eyebrow="Community without noise"
        title="A serious room for charts, reviews, and learning discipline."
        description="The community is positioned as a clean learning environment with chart discussions, structured reviews, and trade breakdowns. No pressure, no flexing, no calls culture."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {community.map((item) => (
            <div key={item} className="rounded-lg border border-emerald-300/15 bg-emerald-300/[0.055] p-5 text-sm font-semibold text-emerald-50">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Clear answers before you start">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </Section>

      <footer className="border-t border-white/10 px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 text-sm text-slate-400 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-semibold uppercase tracking-[0.24em] text-white">
              Double Hedged
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
              Premium Indian stock market education for traders who want protection before prediction.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 leading-7">
            <p className="font-semibold text-white">Compliance disclaimer</p>
            <p className="mt-3">
              Double Hedged is an educational platform. We do not provide investment advice, trading calls, buy/sell recommendations, portfolio management, or guaranteed returns. Trading and investing involve market risk. Please consult a SEBI-registered advisor before making financial decisions.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
