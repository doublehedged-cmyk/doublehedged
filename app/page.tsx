import type { ReactNode } from "react";

const bonsaiTrees = [
  {
    title: "Banyan Bonsai",
    japanese: "Vat Vriksha",
    description:
      "A deeply Indian bonsai subject with aerial roots, strong trunk character, and a sacred old-tree presence in miniature form.",
  },
  {
    title: "Peepal Bonsai",
    japanese: "Ficus religiosa",
    description:
      "Known for heart-shaped leaves and graceful movement, peepal bonsai brings a calm temple-courtyard feeling to a display.",
  },
  {
    title: "Bougainvillea Bonsai",
    japanese: "Kagaz Phool",
    description:
      "A colorful tropical bonsai choice loved across India for paper-like bracts, rugged wood, and bright seasonal shows.",
  },
  {
    title: "Ficus Bonsai",
    japanese: "Indian Laurel",
    description:
      "A reliable bonsai for Indian climates, valued for compact leaves, forgiving growth, and refined ramification over time.",
  },
];

const indianArtists = [
  {
    name: "Jyoti Parekh",
    location: "Mumbai, Maharashtra",
    description:
      "A respected Indian bonsai educator and author, widely associated with teaching, exhibitions, and the Bonsai Study Group movement in Mumbai.",
  },
  {
    name: "Nikunj Parekh",
    location: "Mumbai, Maharashtra",
    description:
      "Remembered as a key promoter of bonsai learning in India, helping build study circles, demonstrations, and appreciation for the art.",
  },
  {
    name: "Leila Dhanda",
    location: "Delhi",
    description:
      "A pioneering Indian bonsai practitioner and teacher whose writing and workshops helped introduce structured bonsai practice to many hobbyists.",
  },
];

const careSteps = [
  "Place bonsai in bright light, but protect delicate trees from harsh afternoon sun during peak Indian summer.",
  "Water according to soil moisture, pot size, and season; monsoon humidity and dry summer winds change the rhythm.",
  "Prune after active growth to maintain proportion, movement, and healthy branching without weakening the tree.",
  "Use free-draining bonsai soil and repot when roots become crowded, usually during the right growing window for the species.",
];

const galleryNotes = [
  "Indian species shaped with classical bonsai discipline",
  "Terracotta, stone, moss, and warm courtyard inspiration",
  "Artist-led learning through exhibitions, clubs, and workshops",
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

function ArtistCard({
  name,
  location,
  description,
  index,
}: {
  name: string;
  location: string;
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
            Indian artist
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{name}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold text-emerald-200">{location}</p>
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
              वट
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Bonsai India
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-zinc-300 md:flex">
            <a className="transition hover:text-emerald-200" href="#artists">
              Artists
            </a>
            <a className="transition hover:text-emerald-200" href="#trees">
              Trees
            </a>
            <a className="transition hover:text-emerald-200" href="#care">
              Care
            </a>
            <a className="transition hover:text-emerald-200" href="#contact">
              Notes
            </a>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[92vh] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_78%_42%,rgba(245,158,11,0.14),transparent_30%),linear-gradient(135deg,#070707_0%,#10170f_48%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,#070707_78%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-emerald-300">
              Indian bonsai artists · native trees · living sculpture
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Indian Bonsai Artists Shaping Miniature Living Landscapes
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
              A calm bonsai page celebrating Indian artists, tropical species,
              patient pruning, and the quiet beauty of banyan, peepal, ficus,
              and flowering bonsai grown for Indian conditions.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#artists">Meet Indian Artists</ButtonLink>
              <ButtonLink href="#trees" variant="secondary">
                Explore Bonsai Trees
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
                Indian Bonsai Atelier
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="artists"
        eyebrow="Artist spotlight"
        title="Indian bonsai artists and educators to know"
        description="India has a strong bonsai community shaped by teachers, collectors, clubs, and exhibition-led learning. These profiles highlight respected names connected with the growth of bonsai practice in India."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {indianArtists.map((artist, index) => (
            <ArtistCard key={artist.name} index={index} {...artist} />
          ))}
        </div>
      </Section>

      <Section
        id="trees"
        eyebrow="Indian bonsai trees"
        title="Bonsai subjects that suit Indian light, heat, and monsoon rhythm"
        description="Bonsai is the art of shaping a living tree into a small, balanced landscape. In India, tropical and subtropical species often respond well when placed correctly and cared for with seasonal awareness."
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
        title="Care notes for Indian bonsai growing conditions"
        description="Use these notes as a clear starting point for bonsai care layout while keeping the content practical for Indian weather, balconies, terraces, and garden displays."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {careSteps.map((step, index) => (
            <CareStep key={step} step={step} index={index} />
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Artist notes"
        title="Create a bonsai visit note or workshop reminder"
        description="Use this form area as a visual space for saving an artist name, tree species, exhibition note, or workshop reminder."
      >
        <div className="grid gap-8 rounded-2xl border border-white/10 bg-zinc-950/70 p-6 md:grid-cols-[1fr_0.9fr] md:p-8">
          <form className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-zinc-200">
              Artist or bonsai club name
              <input
                type="text"
                name="artist-name"
                placeholder="Example: Jyoti Parekh"
                className="min-h-12 rounded-full border border-white/10 bg-black/35 px-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-200/70"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-zinc-200">
              Bonsai note
              <textarea
                name="bonsai-note"
                placeholder="Write a short note about an Indian bonsai artist, tree, or workshop..."
                rows={5}
                className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-200/70"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-300 px-6 text-sm font-semibold text-stone-950 transition hover:bg-emerald-200"
            >
              Save Bonsai Note
            </button>
          </form>

          <div className="rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.06] p-6">
            <h3 className="text-2xl font-semibold text-white">
              Indian bonsai page notes
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
              Bonsai India Artists Page
            </p>
            <p className="mt-3 max-w-3xl leading-7">
              Clean starter page celebrating Indian bonsai artists, native and
              tropical trees, care details, and a simple note area.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 md:justify-end">
            <a className="transition hover:text-emerald-200" href="#artists">
              Artists
            </a>
            <a className="transition hover:text-emerald-200" href="#trees">
              Trees
            </a>
            <a className="transition hover:text-emerald-200" href="#care">
              Care
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
