import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Deep Stop | Use Yourself Well",
  robots: { index: false, follow: false },
};

export default function DeepStopGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <hr className="w-10 border-t-2 border-accent" />
        <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Free Practice
        </span>
      </div>

      <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-foreground sm:text-5xl">
        The Deep Stop
      </h1>
      <p className="mt-2 font-playfair text-xl italic text-muted sm:text-2xl">
        Fifteen Minutes of Nothing Being Asked of You
      </p>

      {/* ── Audio embed placeholder ── */}
      <div className="mt-10 w-full overflow-hidden rounded-site bg-foreground/5 p-8 shadow-sm ring-1 ring-border">
        <div className="mx-auto max-w-md text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <svg
              className="h-8 w-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </div>
          <h2 className="font-playfair text-xl font-medium text-foreground">
            Listen to The Deep Stop
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Press play, lie down, and let the floor do some of the work
            you&rsquo;ve been doing all day.
          </p>
          <div className="rounded-site bg-background p-4 ring-1 ring-border">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Audio Player
            </p>
            <p className="mt-1 text-xs text-muted">
              [Recording coming soon]
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mt-12 space-y-8 text-base leading-relaxed text-muted">
        <p>
          Most people think they&rsquo;re tired because they&rsquo;ve been doing
          too much.
        </p>

        <p>
          Often, they&rsquo;re tired because they never stop doing.
        </p>

        <p>
          Even when you&rsquo;re sitting still, part of you is still working.
          Holding yourself upright. Preparing for the next task. Replaying the
          last conversation. Bracing for whatever comes next.
        </p>

        <p>
          The Deep Stop is a simple guided practice that gives your system
          something it rarely gets: permission to stop carrying what it
          doesn&rsquo;t need to carry.
        </p>

        <p>
          No special skills. No meditation experience. No need to clear your
          mind.
        </p>

        <p>
          Just a floor, fifteen minutes, and a chance to remember what it feels
          like when the work of holding yourself together isn&rsquo;t entirely
          your job.
        </p>

        {/* ── Why It Works ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Why It Works
          </h2>

          <p>
            Most of the tension people live with isn&rsquo;t deliberate.
          </p>

          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>
              Your jaw tightens{" "}
              <em className="text-foreground">before you notice</em>.
            </li>
            <li>
              Your shoulders rise{" "}
              <em className="text-foreground">before you realize it</em>.
            </li>
            <li>
              Your breath shortens{" "}
              <em className="text-foreground">
                before you&rsquo;ve decided anything is stressful
              </em>
              .
            </li>
          </ul>

          <p>
            These reactions happen automatically, and after enough repetition
            they start to feel normal.
          </p>

          <p>
            The Deep Stop creates a different experience.
          </p>

          <p>
            By lying on the floor in a supported position, you temporarily
            remove one of the biggest jobs your body is constantly doing:
            holding you upright.
          </p>

          <p className="font-playfair text-lg font-medium text-foreground">
            The floor takes over.
          </p>

          <p>
            That simple change creates an opportunity to notice the effort
            you&rsquo;re carrying and let some of it go.
          </p>

          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>Not by forcing relaxation.</li>
            <li>Not by stretching.</li>
            <li>Not by fixing anything.</li>
          </ul>

          <p>
            Just by giving yourself enough stillness to recognize what
            you&rsquo;ve been doing all day without realizing it.
          </p>
        </section>

        {/* ── What You'll Do ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            What You&rsquo;ll Do
          </h2>

          <p>
            You&rsquo;ll lie comfortably on your back with your knees bent and
            your head lightly supported.
          </p>

          <p>
            Then you&rsquo;ll be guided through three simple stages:
          </p>

          <div className="space-y-6">
            <div className="rounded-site border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground text-lg">
                Notice
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                You&rsquo;ll begin by bringing awareness to the places where
                unnecessary effort often hides — your jaw, shoulders, breath,
                neck, back, and hands.
              </p>
              <p className="mt-2 text-sm italic text-muted">
                Not to change them. Just to notice.
              </p>
            </div>

            <div className="rounded-site border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground text-lg">
                Lighten
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                When you discover effort that isn&rsquo;t helping, you&rsquo;ll
                practice letting it soften.
              </p>
              <p className="mt-2 text-sm italic text-muted">
                Not collapsing. Not slumping. Just releasing what isn&rsquo;t
                needed.
              </p>
            </div>

            <div className="rounded-site border border-accent/20 bg-accent-light/10 p-6">
              <h3 className="font-semibold text-foreground text-lg">
                Rest
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The final stage is the most important.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Nothing to achieve. Nothing to improve. Just allowing the floor
                to support you while you repeatedly return to the simple
                practice of noticing and lightening.
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                That&rsquo;s where much of the change happens.
              </p>
            </div>
          </div>
        </section>

        {/* ── Who It's For ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Who It&rsquo;s For
          </h2>

          <p>
            This practice is especially useful if:
          </p>

          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>
              You feel tired even when you&rsquo;ve been sitting all day.
            </li>
            <li>
              Your neck, shoulders, or back seem to tighten without your
              permission.
            </li>
            <li>
              You overthink, overdo, or push through things that don&rsquo;t
              need pushing.
            </li>
            <li>
              You have trouble switching off after work.
            </li>
            <li>
              You want a practical way to recover without adding another task
              to your schedule.
            </li>
          </ul>

          <p>
            You don&rsquo;t need to be flexible, spiritual, calm, or good at
            meditation.
          </p>

          <p className="font-playfair text-lg font-medium text-foreground">
            You just need fifteen minutes.
          </p>
        </section>

        {/* ── Before You Begin ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Before You Begin
          </h2>

          <p>You&rsquo;ll need:</p>

          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>A patch of floor.</li>
            <li>
              A small book or folded towel for under your head.
            </li>
            <li>
              About fifteen minutes where nobody needs anything from you.
            </li>
          </ul>

          <p className="font-medium text-foreground">
            That&rsquo;s it.
          </p>

          <ul className="list-disc space-y-2 pl-6 marker:text-accent text-muted">
            <li>No equipment.</li>
            <li>No perfect conditions.</li>
            <li>No performance.</li>
          </ul>
        </section>

        {/* ── Start the Practice ── */}
        <hr className="border-border" />

        <section className="space-y-5 text-center">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Start the Practice
          </h2>

          <p className="max-w-xl mx-auto">
            Press play, lie down, and let the floor do some of the work
            you&rsquo;ve been doing all day.
          </p>

          <div className="mx-auto max-w-md rounded-site bg-foreground/5 p-6 ring-1 ring-border">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Audio Player
            </p>
            <p className="mt-1 text-xs text-muted">
              [Recording coming soon]
            </p>
          </div>
        </section>

        {/* ── Closing ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <p>
            The Deep Stop isn&rsquo;t an escape from life.
          </p>

          <p>
            It&rsquo;s a chance to stop adding unnecessary effort to it.
          </p>

          <p className="font-playfair text-lg font-medium text-foreground">
            And sometimes that&rsquo;s enough to change the rest of your day.
          </p>
        </section>
      </div>
    </article>
  );
}
