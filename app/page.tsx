import Image from "next/image";

const failures = [
  "Chasing entries without a written plan",
  "Oversizing positions after a winning or losing streak",
  "Confusing prediction with probability",
  "Ignoring psychology until pressure is already high",
];

const learningTracks = [
  {
    title: "Technical Analysis",
    description:
      "Read market structure, price action, support and resistance, trends, and confirmation signals with a rule-based process.",
  },
  {
    title: "Risk Management",
    description:
      "Build position sizing, stop placement, trade journaling, and drawdown controls into every setup before capital is at risk.",
  },
  {
    title: "Trading Psychology",
    description:
      "Develop routines that reduce impulse trades, revenge entries, hesitation, and the emotional noise around live decisions.",
  },
  {
    title: "Options Trading",
    description:
      "Learn practical options foundations, strategy selection, Greeks, expiry behavior, and defined-risk trade planning.",
  },
];

const courses = [
  {
    title: "Market Structure Blueprint",
    level: "Foundation",
    detail:
      "A disciplined framework for trend, range, breakout, and reversal conditions.",
  },
  {
    title: "Risk-First Trading Systems",
    level: "Core",
    detail:
      "Position sizing, execution checklists, trade review, and capital protection habits.",
  },
  {
    title: "Options Strategy Lab",
    level: "Advanced",
    detail:
      "Practical options setups for directional, range-bound, and volatility-aware markets.",
  },
];

const paymentOptions = [
  {
    title: "Foundation Access",
    subtitle: "Start with the market structure basics",
    detail:
      "Includes beginner-friendly lessons, chart reading workflows, and rule-based practice assignments.",
  },
  {
    title: "Core Academy Access",
    subtitle: "Build a risk-first trading routine",
    detail:
      "Includes structured course modules, risk checklists, journaling guidance, and review-based improvement tools.",
  },
  {
    title: "Advanced Options Access",
    subtitle: "Move into defined-risk options planning",
    detail:
      "Includes options foundations, strategy selection, Greeks, expiry behavior, and practical setup planning.",
  },
];

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
  },
];

const testimonials = [
  {
    quote:
      "The biggest change was learning when not to trade. My journal finally has rules instead of excuses.",
    name: "Aarav M.",
    role: "Equity trader",
  },
  {
    quote:
      "Options used to feel random. The academy made risk, expiry, and strategy selection much clearer.",
    name: "Nisha R.",
    role: "Options learner",
  },
  {
    quote:
      "I stopped looking for one magic indicator and started building a repeatable process.",
    name: "Dev P.",
    role: "Swing trader",
  },
];

const faqs = [
  {
    question: "Is Double Hedge a hedge fund?",
    answer:
      "No. Double Hedge Trading Academy is a trading education platform focused on skill-building, market literacy, risk management, and disciplined execution.",
  },
  {
    question: "Do I need prior trading experience?",
    answer:
      "No. Beginners can start with foundations, while active traders can move into advanced risk, psychology, and options modules.",
  },
  {
    question: "Is online payment available?",
    answer:
      "Yes. Payment is now available for course enrollment. Review the course access option, complete payment through the academy checkout flow, and follow the access instructions shared after enrollment.",
  },
  {
    question: "Will you provide guaranteed profits or tips?",
    answer:
      "No. The academy teaches frameworks and risk-aware decision making. Markets involve risk, and education cannot guarantee results.",
  },
  {
    question: "What happens in the free masterclass?",
    answer:
      "You will see the academy's approach to market structure, risk planning, psychology, and options through a practical trading workflow.",
  },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "Facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
      </svg>
    );
  }

  if (name === "Twitter") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M21.58 7.2a2.74 2.74 0 0 0-1.93-1.94C17.94 4.8 12 4.8 12 4.8s-5.94 0-7.65.46A2.74 2.74 0 0 0 2.42 7.2 28.54 28.54 0 0 0 1.96 12a28.54 28.54 0 0 0 .46 4.8 2.74 2.74 0 0 0 1.93 1.94c1.71.46 7.65.46 7.65.46s5.94 0 7.65-.46a2.74 2.74 0 0 0 1.93-1.94 28.54 28.54 0 0 0 .46-4.8 28.54 28.54 0 0 0-.46-4.8ZM9.99 15.28V8.72L15.44 12l-5.45 3.28Z" />
    </svg>
  );
}

function ButtonLink({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-amber-300 text-stone-950 shadow-[0_0_40px_rgba(252,211,77,0.24)] hover:bg-amber-200"
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
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibnew text-white sm:text-4xl">
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

function FeatureCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/30 bg-amber-300/10 text-sm font-bnew text-amber-200">
        0{index + 1}
      </div>
      <h3 className="mt-6 text-xl font-semibnew text-white">{title}</h3>
      <p className="mt-4 leading-7 text-zinc-300">{description}</p>
    </article>
  );
}

function CourseCard({
  title,
  level,
  detail,
}: {
  title: string;
  level: string;
  detail: string;
}) {
  return (
    <article className="grid gap-5 rounded-lg border border-white/10 bg-zinc-950/70 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
          {level}
        </span>
        <h3 className="mt-3 text-2xl font-semibnew text-white">{title}</h3>
        <p className="mt-3 leading-7 text-zinc-300">{detail}</p>
      </div>
      <a
        href="#payment"
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibnew text-white transition hover:border-amber-200/60 hover:text-amber-100"
      >
        Enroll now
      </a>
    </article>
  );
}

function PaymentCard({
  title,
  subtitle,
  detail,
}: {
  title: string;
  subtitle: string;
  detail: string;
}) {
  return (
    <article className="rounded-lg border border-amber-200/20 bg-[linear-gradient(180deg,rgba(251,191,36,0.09),rgba(255,255,255,0.035))] p-6 shadow-2xl shadow-black/20">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
        Payment available
      </p>
      <h3 className="mt-4 text-2xl font-semibnew text-white">{title}</h3>
      <p className="mt-2 text-sm font-semibold text-amber-100">{subtitle}</p>
      <p className="mt-4 leading-7 text-zinc-300">{detail}</p>
      <div className="mt-6 rounded-lg border border-white/10 bg-black/30 p-4 text-sm leading-6 text-zinc-300">
        Select this course in the checkout flow and complete payment to receive
        access instructions.
      </div>
    </article>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <figure className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
      <blockquote className="text-lg leading-8 text-zinc-100">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-white/10 pt-5">
        <p className="font-semibnew text-white">{name}</p>
        <p className="mt-1 text-sm text-zinc-400">{role}</p>
      </figcaption>
    </figure>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-lg border border-white/10 bg-zinc-950/60 p-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibnew text-white">
        <span>{question}</span>
        <span className="text-2xl font-light text-amber-300 transition group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-4 leading-7 text-zinc-300">{answer}</p>
    </details>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-zinc-100">
      <header className="absolute left-0 right-0 top-0 z-20 px-5 py-6 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a href="#" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/40 bg-black/55 text-sm font-bnew text-amber-200">
              DH
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Double Hedge
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-zinc-300 md:flex">
            <a className="transition hover:text-amber-200" href="#learn">
              Learn
            </a>
            <a className="transition hover:text-amber-200" href="#courses">
              Courses
            </a>
            <a className="transition hover:text-amber-200" href="#payment">
              Payment
            </a>
            <a className="transition hover:text-amber-200" href="#mentor">
              Mentor
            </a>
            <a className="transition hover:text-amber-200" href="#faq">
              FAQ
            </a>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[92vh] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <Image
          src="/double-hedge-hero.png"
          alt="Dark trading education workspace with market charts and gold accents"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.88)_33%,rgba(7,7,7,0.48)_68%,rgba(7,7,7,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(245,158,11,0.18),transparent_32%),linear-gradient(180deg,rgba(7,7,7,0.1),#070707_96%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-300">
              Double Hedge Trading Academy
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Master the Markets with Discipline, Not Luck
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
              Learn technical analysis, risk management, trading psychology,
              and options trading through a structured academy built for
              disciplined decision-making.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#payment">Enroll & Pay Now</ButtonLink>
              <ButtonLink href="#courses" variant="secondary">
                Explore Courses
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="fail"
        eyebrow="Why traders fail"
        title="Most traders do not lose because they lack indicators. They lose because they lack a process."
        description="The market punishes hesitation, overconfidence, and unmanaged risk. Double Hedge teaches you to turn scattered decisions into repeatable preparation."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {failures.map((failure) => (
            <div
              key={failure}
              className="rounded-lg border border-amber-200/15 bg-amber-300/[0.06] p-5 text-zinc-100"
            >
              {failure}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="learn"
        eyebrow="What you'll learn"
        title="Four pillars for disciplined market participation"
        description="Each module connects market reading with risk control, emotional discipline, and practical options knowledge."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {learningTracks.map((track, index) => (
            <FeatureCard key={track.title} index={index} {...track} />
          ))}
        </div>
      </Section>

      <Section
        id="courses"
        eyebrow="Featured courses"
        title="Structured learning paths for serious traders"
      >
        <div className="grid gap-5">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </Section>

      <Section
        id="payment"
        eyebrow="Payment"
        title="Payment is now available for course enrollment"
        description="Choose the learning path that matches your current stage, complete payment through the academy checkout flow, and follow the access instructions after enrollment."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {paymentOptions.map((option) => (
            <PaymentCard key={option.title} {...option} />
          ))}
        </div>
        <div className="mt-8 grid gap-6 rounded-lg border border-white/10 bg-zinc-950/70 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h3 className="text-2xl font-semibnew text-white">
              Ready to begin with a structured trading education plan?
            </h3>
            <p className="mt-4 max-w-3xl leading-8 text-zinc-300">
              Payment confirms course enrollment only. Trading and investing
              still involve risk, and the academy focuses on education,
              preparation, and disciplined risk-aware decision making.
            </p>
          </div>
          <ButtonLink href="#courses">Review courses</ButtonLink>
        </div>
      </Section>

      <Section
        id="masterclass"
        eyebrow="Student testimonials"
        title="Learners come here to replace guesswork with a repeatable routine"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </Section>

      <Section
        id="mentor"
        eyebrow="Mentor"
        title="Guidance from a risk-first trading educator"
        description="Your mentor focuses on clarity before complexity: clean chart reading, defined risk, journal-backed improvement, and the patience to wait for qualified trades."
      >
        <div className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[0.9fr_1.3fr] md:p-8">
          <div className="flex min-h-64 items-center justify-center rounded-lg border border-amber-200/20 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.22),rgba(24,24,27,0.95)_54%,rgba(7,7,7,1)_100%)]">
            <div className="text-center">
              <p className="text-5xl font-semibnew text-amber-200">DH</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                Trading Mentor
              </p>
            </div>
          </div>
          <div className="self-center">
            <h3 className="text-2xl font-semibnew text-white">
              Learn the discipline behind the setup.
            </h3>
            <p className="mt-4 leading-8 text-zinc-300">
              Double Hedge combines practical market education with coaching on
              behavior, risk, and review. The goal is not to predict every move.
              The goal is to know your plan, control your exposure, and execute
              only when the odds and rules align.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {["Live breakdowns", "Trade journals", "Risk checklists"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm font-semibnew text-amber-100"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Questions before you begin">
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </Section>

      <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-zinc-400 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.24em] text-white">
              Double Hedge Trading Academy
            </p>
            <p className="mt-3 max-w-3xl leading-7">
              Educational content only. Trading and investing involve risk, and
              no course or mentor can guarantee profits or specific outcomes.
            </p>
          </div>
          <div className="grid gap-4 md:justify-items-end">
            <div className="flex flex-wrap gap-5">
              <a className="transition hover:text-amber-200" href="#learn">
                Learn
              </a>
              <a className="transition hover:text-amber-200" href="#courses">
                Courses
              </a>
              <a className="transition hover:text-amber-200" href="#payment">
                Payment
              </a>
              <a className="transition hover:text-amber-200" href="#faq">
                FAQ
              </a>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Double Hedge on ${social.name}`}
                  title={social.name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-amber-200/50 hover:bg-amber-300/10 hover:text-amber-200"
                >
                  <SocialIcon name={social.name} />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
