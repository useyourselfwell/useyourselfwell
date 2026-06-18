export function About() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Placeholder column */}
          <div className="md:col-span-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-site bg-accent-light/40 ring-1 ring-border">
              <img
                src="/images/ProfilePic.jpg"
                alt="Christopher"
                className="absolute inset-0 h-full w-full object-cover animate-fade-in"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent-light/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Content column */}
          <div className="md:col-span-3">
            <h2 className="font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
              Hi, I&rsquo;m Christopher.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              I discovered the Alexander Technique in 2005 and immediately I
              could see how helpful it was. I struggled with back pain that
              would interfere with my life. It wasn't long until that was
              completely gone. That experience is what drives everything I
              teach.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-muted">
              Most people I work with are smart, capable, and trying hard.
              That's often the problem. This work isn't about trying harder,
              it's about discovering what happens when you stop.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-muted">
              This course distills what I share with my private students into
              something anyone can access, wherever you are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
