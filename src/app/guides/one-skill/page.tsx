import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The One Skill | Use Yourself Well",
  robots: { index: false, follow: false },
};

export default function OneSkillGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <hr className="w-10 border-t-2 border-accent" />
        <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Free Guide
        </span>
      </div>

      <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-foreground sm:text-5xl">
        The One Skill
      </h1>
      <p className="mt-2 font-playfair text-xl italic text-muted sm:text-2xl">
        Notice. Lighten. Repeat.
      </p>

      {/* ── Video ── */}
      <div className="mt-10 aspect-video w-full overflow-hidden rounded-site bg-black shadow-lg">
        <iframe
          src="https://www.youtube.com/embed/zsSa_O0dfQA"
          title="The One Skill — Introduction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>

      {/* ── Body ── */}
      <div className="mt-12 space-y-8 text-base leading-relaxed text-muted">
        <p>
          You know the feeling. The phone buzzes before you&rsquo;ve even had
          coffee. Your shoulders climb up toward your ears before you&rsquo;ve
          finished reading the message. By 10 a.m. your jaw aches, your low back
          is tight, and you haven&rsquo;t done anything you&rsquo;d call
          &ldquo;stressful&rdquo; yet — you&rsquo;ve just been awake.
        </p>

        <p>
          Most advice for this tells you to add something to your life: a
          meditation app, a journaling habit, fifteen more minutes you
          don&rsquo;t have. The One Skill works the other way. It doesn&rsquo;t
          ask you to add anything to your day. It asks you to notice something
          that&rsquo;s already happening, and then do one small thing about it —
          right where you are, in about three seconds.
        </p>

        <p>
          It&rsquo;s actually two small moves. They happen so close together
          that, with practice, they start to feel like one.
        </p>

        {/* ── Move One ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Move One: Notice What&rsquo;s Happening
          </h2>

          <p>
            Most of what wears you down isn&rsquo;t the event itself. It&rsquo;s
            the full-body reaction you have to it, before you&rsquo;ve even
            decided how to respond. The email lands, and your shoulders are
            already up. The traffic light turns red, and your jaw is already
            clenched. Your body answers first; your mind catches up later,
            usually after the tension is already sitting in your neck.
          </p>

          <p>
            The first move is simply catching that moment. Not stopping it, not
            fixing it — just noticing it&rsquo;s happening, while it&rsquo;s
            happening.
          </p>

          <p className="font-medium text-foreground">
            A few places it tends to show up:
          </p>

          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>
              <strong className="text-foreground">Your jaw.</strong> Are your
              teeth touching when they don&rsquo;t need to be?
            </li>
            <li>
              <strong className="text-foreground">Your shoulders.</strong> Are
              they closer to your ears than they were a minute ago?
            </li>
            <li>
              <strong className="text-foreground">Your breath.</strong> Did it
              just get shorter, or stop for a second?
            </li>
            <li>
              <strong className="text-foreground">Your grip.</strong> On the
              phone, the wheel, the pen — tighter than the task requires?
            </li>
          </ul>

          <p>
            You don&rsquo;t need to scan your whole body all day; that&rsquo;s
            exhausting in its own way. Instead, pick one or two natural moments
            you already pass through dozens of times a day — the phone ringing,
            opening your laptop, your hand on the doorknob before you walk into
            a room — and use those as your cue to check in. The skill isn&rsquo;t
            constant vigilance. It&rsquo;s a habit of pausing at doorways you
            already walk through.
          </p>
        </section>

        {/* ── Move Two ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Move Two: Lighten Up Into Ease
          </h2>

          <p>
            Noticing on its own is powerful, but it&rsquo;s only half the skill.
            If you stop there, you&rsquo;ll just keep bracing — only now
            you&rsquo;re aware you&rsquo;re doing it, which can feel worse, not
            better. The second move is choosing something different in that same
            moment.
          </p>

          <p>
            This isn&rsquo;t about relaxing in the way most people picture it —
            going limp, slumping, letting your energy drop out of you.
            That&rsquo;s collapse, not ease, and collapse usually creates its own
            new tension a few minutes later when you catch yourself and snap back
            upright. Real ease has a kind of lift to it. You&rsquo;re releasing
            effort you don&rsquo;t need, while staying fully present and upright.
          </p>

          <p>
            A simple way to find that feeling: imagine there&rsquo;s a thread at
            the very crown of your head, and it&rsquo;s not pulling you up —
            it&rsquo;s just loosening, the way a marionette&rsquo;s string goes
            slack when no one&rsquo;s tugging it. As that thread softens, let
            everything underneath it follow: jaw unclenches, shoulders drop a
            half inch, breath gets a little longer and lower. Nothing forced,
            nothing collapsed. Just lighter.
          </p>

          <p>
            That&rsquo;s it. That&rsquo;s the whole second move — about three
            seconds of softening into a posture that&rsquo;s still doing its job,
            just without the extra effort stacked on top of it.
          </p>
        </section>

        {/* ── Try It Right Now ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Try It Right Now
          </h2>

          <p>Wherever you&rsquo;re reading this:</p>

          <ol className="list-decimal space-y-3 pl-6 marker:text-accent marker:font-medium">
            <li>
              <strong className="text-foreground">Notice</strong> — Jaw,
              shoulders, breath, grip. Anything tighter than it needs to be?
            </li>
            <li>
              <strong className="text-foreground">Lighten</strong> — Let the
              thread at the crown of your head go slack. Let everything below it
              follow.
            </li>
            <li>
              <strong className="text-foreground">Repeat</strong> — Not as a
              one-time fix, but as something you come back to, again and again,
              at the same few doorways in your day.
            </li>
          </ol>

          <p className="font-playfair text-lg font-medium text-foreground">
            That&rsquo;s the one skill. Two moves, three seconds, no equipment,
            no extra time carved out of a day that doesn&rsquo;t have any to
            spare.
          </p>
        </section>

        {/* ── Closing ── */}
        <hr className="border-border" />

        <section className="space-y-5">
          <p>
            It doesn&rsquo;t erase what&rsquo;s stressful about your day. It
            changes how much of that stress your body agrees to carry on top of
            it. The more often you catch the bracing and choose lightness
            instead, the less there is, by the end of the day, left to unwind.
          </p>

          <p>
            This is the starting point. There&rsquo;s more to learn about how to
            carry this into the moments that matter most — how you walk into a
            room, how you sit through a hard conversation, how you recover when
            the day knocks you down anyway. That&rsquo;s what&rsquo;s coming
            next.
          </p>
        </section>
      </div>
    </article>
  );
}
