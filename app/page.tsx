import type { ReactNode } from "react";

const learningTracks = [
  {
    title: "Market Foundations",
    label: "Beginner",
    description:
      "Learn how markets move, how price is formed, and how to read charts with structure instead of noise.",
  },
  {
    title: "Technical Analysis",
    label: "Core skill",
    description:
      "Study trend, support and resistance, liquidity areas, candlestick context, and disciplined trade planning.",
  },
  {
    title: "Risk Management",
    label: "Essential",
    description:
      "Build position sizing habits, define invalidation, protect capital, and understand why consistency starts with risk control.",
  },
  {
    title: "Trading Psychology",
    label: "Mindset",
    description:
      "Develop routines for patience, journaling, emotional control, and reviewing decisions without chasing outcomes.",
  },
];

const mentors = [
  {
    name: "Structured Learning",
    role: "Step-by-step curriculum",
    description:
      "Move from basic market concepts to trade planning with clear modules, practical examples, and review checklists.",
  },
  {
    name: "Live Market Context",
    role: "Chart reading practice",
    description:
      "Use real chart scenarios to understand setup quality, market conditions, and when it is better to wait.",
  },
  {
    name: "Process Reviews",
    role: "Journal and feedback",
    description:
      "Build a repeatable learning loop through journaling, mistake tracking, and weekly process improvement.",
  },
];

const processSteps = [
  "Start with market basics, terminology, chart types, and how different sessions can affect volatility.",
  "Learn to identify trend, range, support, resistance, liquidity zones, and common price action behavior.",
  "Create a written trading plan that defines setup rules, risk limits, entry logic, invalidation, and review criteria.",
  "Practice with backtesting, paper trading, and journaling before considering real capital exposure.",
];

const platformNotes = [
  "Education-first trading curriculum with no profit guarantees",
  "Risk management, journaling, and discipline built into every module",
  "Designed for learners who want structure before execution",
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
      ? "bg-amber-300 text-zinc-950 shadow-[0_0_40px_rgba(252,211,77,0.22)] hover:bg-amber-200"
      : "border border-amber-200/35 bg-white/5 text-amber-50 hover:border-amber-200/70 hover:bg-white/10";

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${styles}`}
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
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function TrackCard({
  title,
  label,
  description,
  index,
}: {
  title: string;
  label: string;
  description: string;
  index: number;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/30 bg-amber-300/10 text-sm font-bold text-amber-200">
        0{index + 1}
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 leading-7 text-zinc-300">{description}</p>
    </article>
  );
}

function MentorCard({
  name,
  role,
  description,
  index,
}: {
  name: string;
  role: string;
  description: string;
  index: number;
}) {
  return (
    <article className="rounded-2xl border border-amber-200/15 bg-[linear-gradient(180deg,rgba(251,191,36,0.08),rgba(255,255,255,0.035))] p-6 shadow-2xl shadow-black/20">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-200/30 bg-amber-300/10 text-lg font-bold text-amber-200">
          {index + 1}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
            Academy pillar
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{name}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold text-emerald-200">{role}</p>
      <p className="mt-4 leading-7 text-zinc-300">{description}</p>
    </article>
  );
}

function ProcessStep({ step, index }: { step: string; index: number }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-amber-200/15 bg-amber-300/[0.06] p-5 sm:grid-cols-[auto_1fr] sm:items-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-sm font-bold text-zinc-950">
        {index + 1}
      </span>
      <p className="leading-7 text-zinc-100">{step}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-zinc-100">
      <header className="absolute left-0 right-0 top-0 z-20 px-5 py-6 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a href="#" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/40 bg-black/55 text-lg text-amber-200">
              TL
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Trading Learn
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-zinc-300 md:flex">
            <a className="transition hover:text-amber-200" href="#mentors">
              Academy
            </a>
            <a className="transition hover:text-amber-200" href="#tracks">
              Tracks
            </a>
            <a className="transition hover:text-amber-200" href="#process">
              Process
            </a>
            <a className="transition hover:text-amber-200" href="#contact">
              Join
            </a>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[92vh] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(245,158,11,0.22),transparent_34%),radial-gradient(circle_at_78%_42%,rgba(16,185,129,0.14),transparent_30%),linear-gradient(135deg,#070707_0%,#15110a_48%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,#070707_78%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-300">
              Trading education · risk discipline · market structure
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Learn Trading With Structure, Patience, and Risk Control
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
              A premium trading learning academy for building market knowledge,
              chart reading skill, risk awareness, and a repeatable decision
              process before taking live trades.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#tracks">Explore Learning Tracks</ButtonLink>
              <ButtonLink href="#process" variant="secondary">
                See The Process
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
            <div className="absolute inset-6 rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_22%,rgba(252,211,77,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-amber-200/15 bg-black/30 p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                  Learning dashboard
                </p>
                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-end gap-2">
                      <span className="h-16 w-6 rounded-t-lg bg-emerald-300/70" />
                      <span className="h-24 w-6 rounded-t-lg bg-amber-300" />
                      <span className="h-12 w-6 rounded-t-lg bg-emerald-300/50" />
                      <span className="h-28 w-6 rounded-t-lg bg-amber-200" />
                      <span className="h-20 w-6 rounded-t-lg bg-emerald-300/60" />
                    </div>
                    <p className="mt-4 text-sm text-zinc-300">
                      Market structure practice
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <p className="text-xs text-zinc-400">Focus</p>
                      <p className="mt-2 font-semibold text-white">Risk first</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <p className="text-xs text-zinc-400">Mode</p>
                      <p className="mt-2 font-semibold text-white">Practice</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-6 text-zinc-300">
                Educational content only. Trading involves risk, and learners
                should build skill gradually with a written plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="mentors"
        eyebrow="Academy approach"
        title="A trading education platform built around process"
        description="The focus is not hype or predictions. The academy experience is designed around understanding market behavior, creating rules, managing risk, and reviewing decisions with discipline."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {mentors.map((mentor, index) => (
            <MentorCard key={mentor.name} index={index} {...mentor} />
          ))}
        </div>
      </Section>

      <Section
        id="tracks"
        eyebrow="Learning tracks"
        title="Build the foundations before chasing advanced strategies"
        description="Each track is designed to help learners understand what they are seeing, why a setup may or may not be valid, and how to approach markets with preparation instead of impulse."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {learningTracks.map((track, index) => (
            <TrackCard key={track.title} index={index} {...track} />
          ))}
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="Learning process"
        title="From concepts to practice, one disciplined step at a time"
        description="Trading skill takes time. A structured path helps learners separate education, simulation, review, and real-world decision making."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {processSteps.map((step, index) => (
            <ProcessStep key={step} step={step} index={index} />
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Start learning"
        title="Create your trading learning plan"
        description="Use this form area as a visual space for a learning goal, preferred market, or study note. It keeps the page focused on education and preparation."
      >
        <div className="grid gap-8 rounded-2xl border border-white/10 bg-zinc-950/70 p-6 md:grid-cols-[1fr_0.9fr] md:p-8">
          <form className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-zinc-200">
              Learning goal
              <input
                type="text"
                name="learning-goal"
                placeholder="Example: Understand price action basics"
                className="min-h-12 rounded-full border border-white/10 bg-black/35 px-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-200/70"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-zinc-200">
              Study note
              <textarea
                name="study-note"
                placeholder="Write a short note about what you want to learn, practice, or review..."
                rows={5}
                className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-200/70"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-300 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
            >
              Save Learning Plan
            </button>
          </form>

          <div className="rounded-2xl border border-amber-200/15 bg-amber-300/[0.06] p-6">
            <h3 className="text-2xl font-semibold text-white">
              Trading learning notes
            </h3>
            <div className="mt-6 grid gap-4">
              {platformNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-zinc-200"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 text-sm text-zinc-400 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.24em] text-white">
              Trading Learning Academy
            </p>
            <p className="mt-3 max-w-3xl leading-7">
              Educational trading page focused on market foundations, technical
              analysis, risk management, psychology, and responsible practice.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 md:justify-end">
            <a className="transition hover:text-amber-200" href="#mentors">
              Academy
            </a>
            <a className="transition hover:text-amber-200" href="#tracks">
              Tracks
            </a>
            <a className="transition hover:text-amber-200" href="#process">
              Process
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
