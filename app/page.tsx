import type { ReactNode } from "react";

const bonsaiTrees = [
  {
    title: "Japanese Black Pine",
    japanese: "Kuromatsu",
    description:
      "A classic Japanese bonsai tree known for rugged bark, strong needles, and dramatic old-tree character.",
  },
  {
    title: "Japanese Maple",
    japanese: "Momiji",
    description:
      "Loved for delicate leaves, seasonal color, and graceful branch structure in refined bonsai displays.",
  },
  {
    title: "Juniper Bonsai",
    japanese: "Shimpaku",
    description:
      "A sculptural evergreen bonsai with twisting trunks, compact foliage, and elegant movement.",
  },
  {
    title: "Flowering Cherry",
    japanese: "Sakura",
    description:
      "A poetic bonsai choice inspired by Japan, valued for spring blossoms and quiet seasonal beauty.",
  },
];

const careSteps = [
  "Place bonsai where it receives bright light and fresh air.",
  "Water when the top soil begins to dry, not by a fixed clock.",
  "Prune gently to keep shape, balance, and healthy growth.",
  "Repot when roots become crowded and refresh the bonsai soil mix.",
];

const galleryNotes = [
  "Miniature tree, full landscape feeling",
  "Clean pot, balanced moss, natural stone",
  "Quiet Japanese garden mood for testing",
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
      ? "bg-emerald-300 text-stone-950 shadow-[0_0_40px_rgba(110,231,183,0.22)] hover:bg-emerald-200"
      : "border border-emerald-200/35 bg-white/5 text-emerald-50 hover:border-emerald-200/70 hover:bg-white/10";

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
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300">
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

function BonsaiCard({
  title,
  japanese,
  description,
  index,
}: {
  title: string;
  japanese: string;
  description: string;
  index: number;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200/30 bg-emerald-300/10 text-sm font-bold text-emerald-200">
        0{index + 1}
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
        {japanese}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 leading-7 text-zinc-300">{description}</p>
    </article>
  );
}

function CareStep({ step, index }: { step: string; index: number }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.06] p-5 sm:grid-cols-[auto_1fr] sm:items-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300 text-sm font-bold text-stone-950">
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
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200/40 bg-black/55 text-lg text-emerald-200">
              盆
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Bonsai Japan
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-zinc-300 md:flex">
            <a className="transition hover:text-emerald-200" href="#trees">
              Trees
            </a>
            <a className="transition hover:text-emerald-200" href="#care">
              Care
            </a>
            <a className="transition hover:text-emerald-200" href="#testing">
              Testing Input
            </a>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[92vh] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_78%_42%,rgba(245,158,11,0.12),transparent_30%),linear-gradient(135deg,#070707_0%,#0f1711_48%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,#070707_78%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-emerald-300">
              Testing start page · Japanese bonsai plants
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Clean Bonsai Page for a Calm Testing Start
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
              A neat landing page inspired by Japan bonsai plants, miniature
              trees, quiet garden details, and simple care guidance for testing
              the first page experience.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#trees">Explore Bonsai Trees</ButtonLink>
              <ButtonLink href="#testing" variant="secondary">
                Try Test Input
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
            <div className="absolute inset-6 rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_22%,rgba(110,231,183,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
            <div className="relative flex h-full flex-col items-center justify-end overflow-hidden rounded-[1.5rem] border border-emerald-200/15 bg-black/30 px-8 pb-10 text-center">
              <div className="absolute top-12 h-44 w-44 rounded-full bg-emerald-300/15 blur-2xl" />
              <div className="relative mb-8 text-8xl leading-none">🌳</div>
              <div className="relative h-8 w-48 rounded-t-full border border-emerald-200/30 bg-stone-900" />
              <div className="relative h-12 w-56 rounded-b-[2rem] border border-emerald-200/20 bg-[linear-gradient(180deg,#2b2118,#120f0c)]" />
              <p className="relative mt-6 text-sm uppercase tracking-[0.28em] text-emerald-200">
                Japan Bonsai Test
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="trees"
        eyebrow="Bonsai trees"
        title="Popular Japanese bonsai plants for a clean test page"
        description="Bonsai is the art of shaping a living tree into a small, balanced landscape. These trees bring Japanese garden style, patience, and natural form into a compact display."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bonsaiTrees.map((tree, index) => (
            <BonsaiCard key={tree.title} index={index} {...tree} />
          ))}
        </div>
      </Section>

      <Section
        id="care"
        eyebrow="Simple care"
        title="Keep the bonsai page neat with clear tree care details"
        description="This section is written for testing content layout while still giving useful bonsai plant information."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {careSteps.map((step, index) => (
            <CareStep key={step} step={step} index={index} />
          ))}
        </div>
      </Section>

      <Section
        id="testing"
        eyebrow="Special page input"
        title="Test a clean bonsai input area"
        description="Use this form area as a visual test for collecting a bonsai name, plant note, or visitor message."
      >
        <div className="grid gap-8 rounded-2xl border border-white/10 bg-zinc-950/70 p-6 md:grid-cols-[1fr_0.9fr] md:p-8">
          <form className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-zinc-200">
              Bonsai tree name
              <input
                type="text"
                name="bonsai-name"
                placeholder="Example: Japanese Maple"
                className="min-h-12 rounded-full border border-white/10 bg-black/35 px-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-200/70"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-zinc-200">
              Testing note
              <textarea
                name="bonsai-note"
                placeholder="Write a short note about your bonsai plant test..."
                rows={5}
                className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-200/70"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-300 px-6 text-sm font-semibold text-stone-950 transition hover:bg-emerald-200"
            >
              Save Test Input
            </button>
          </form>

          <div className="rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.06] p-6">
            <h3 className="text-2xl font-semibold text-white">
              Bonsai page notes
            </h3>
            <div className="mt-6 grid gap-4">
              {galleryNotes.map((note) => (
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
              Bonsai Japan Testing Page
            </p>
            <p className="mt-3 max-w-3xl leading-7">
              Clean starter page for testing Japanese bonsai plant content,
              tree cards, care details, and a simple input area.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 md:justify-end">
            <a className="transition hover:text-emerald-200" href="#trees">
              Trees
            </a>
            <a className="transition hover:text-emerald-200" href="#care">
              Care
            </a>
            <a className="transition hover:text-emerald-200" href="#testing">
              Input
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
