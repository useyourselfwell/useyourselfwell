export function Guarantee() {
  return (
    <section className="bg-accent-light/40 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Shield icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/20">
            <svg
              className="h-7 w-7 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>

          <h2 className="font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
            Try It Risk-Free
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted">
            If you don&rsquo;t find yourself noticing something new within the
            first module, reach out within 14 days and we&rsquo;ll refund your
            purchase in full. No questions asked.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-muted">
            You have nothing to lose &mdash; and a lifetime of easier movement
            to gain.
          </p>
        </div>
      </div>
    </section>
  );
}

