import Link from "next/link";

export default function SuccessPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="font-playfair text-4xl font-medium leading-tight text-foreground md:text-5xl">
          Thank you.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted">
          Your course is on its way.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-muted">
          Check your inbox. You&rsquo;ll receive an email shortly with access to
          One Skill.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          If you don&rsquo;t see it within a few minutes, check your spam folder
          or contact Christopher.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block bg-accent px-8 py-3 text-base text-white transition-colors hover:bg-accent/90 rounded-site"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
