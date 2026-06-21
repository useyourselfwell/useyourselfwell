"use client";

const mechanisms = [
  {
    title: "Awareness",
    description:
      "Learn to notice the subtle tension habits you've been carrying for years. Not by changing anything, just by paying attention.",
  },
  {
    title: "Release",
    description:
      "Discover what it feels like to let go of unnecessary effort. Not forcing relaxation, but allowing a natural ease to return.",
  },
  {
    title: "Choice",
    description:
      "Build the skill of choosing a different response in everyday moments: sitting, standing, walking, breathing, and thinking.",
  },
];

export function Mechanism() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
          <p className="mb-6">It&rsquo;s not about fixing.</p>
          <p>It&rsquo;s about noticing, releasing, and choosing differently.</p>
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          The Alexander Technique is a skill of conscious awareness. It teaches
          you to recognize your patterns of tension so you can make a different
          choice.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            {mechanisms.map((item) => (
              <article key={item.title}>
                <h3 className="font-playfair text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div>
            <img
              src="/images/ChrisWorking.jpg"
              alt="Christopher working with a student"
              className="w-full rounded-site shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
