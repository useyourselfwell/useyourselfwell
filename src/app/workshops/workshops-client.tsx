"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { WorkshopRegistrationDialog } from "@/components/workshop-registration-dialog";
import { ChevronDown } from "lucide-react";

const workshops = [
  {
    id: "stop-bracing",
    title: "Stop Bracing for Impact",
    subtitle: 'Unlearning the "Push Through It" Approach to Daily Life',
    body: [
      "Do you find yourself clenching your jaw while answering emails? Tightening your shoulders in traffic? Holding your breath just to get through a busy afternoon?",
      'Many of us walk through the world as if we are physically preparing for a blow. We call it "grit" or "just pushing through," but our bodies experience it as a constant state of armor-plating. Over time, this unconscious bracing leaves us feeling exhausted, rigid, and sore before the day has even really begun.',
      "This workshop is a gentle invitation to put down the shield. Using the principles of the Alexander Technique, we will explore the deep connection between mental stress and physical tension, and learn how to stop fighting our own bodies.",
    ],
    learnPoints: [
      {
        label: "The Body's Stress Reflex",
        detail:
          'How to recognize your unique "bracing patterns" before they turn into pain.',
      },
      {
        label: 'The Art of "Non-Doing"',
        detail:
          'Learning how to pause and release unnecessary effort rather than adding more "good posture" tension.',
      },
      {
        label: "Restoring Natural Support",
        detail:
          "How to let your skeleton bear your weight so your muscles can finally stop overworking.",
      },
    ],
    forWho:
      "Anyone who feels physically hyper-vigilant, chronically tight, or exhausted by the physical toll of a stressful daily routine.",
    date: "The next workshop is starting soon. Register to be notified.",
    videoId: "",
  },
  {
    id: "lightening-load",
    title: "Lightening the Load",
    subtitle: "How to make housework and chores much easier on you",
    body: [
      'Does the thought of vacuuming the living room, unloading the dishwasher, or carrying a heavy bag of groceries come with a warning label? When mundane household chores leave you with a physical "hangover" the next day, life can feel incredibly frustrating.',
      "But what if the chore itself isn't the enemy? What if the issue is simply an invisible habit of strain that you bring to the task?",
      'This workshop is a judgment-free, curious experiment in everyday movement. Instead of trying to "brace your core" or force a stiff, military posture while cleaning, we will investigate how to make the mundane parts of life feel genuinely lighter and more efficient.',
    ],
    learnPoints: [
      {
        label: "The Mindful Pause",
        detail:
          "How to use Alexander Technique inhibition to break the habit of rushing and collapsing into a chore.",
      },
      {
        label: "Bending and Reaching with Ease",
        detail:
          "Learning the mechanics of your joints so bending down doesn't mean sacrificing your lower back.",
      },
      {
        label: "Distributing the Effort",
        detail:
          "How to use your whole body cohesively so your neck, shoulders, and back aren't doing all the heavy lifting.",
      },
    ],
    forWho:
      "Anyone who is tired of chores feeling like a physical battle and wants to reclaim comfort in their own home.",
    date: "The next workshop is starting soon. Register to be notified.",
    videoId: "",
  },
  {
    id: "staying-in-game",
    title: "Staying in the Game",
    subtitle: "How to Garden, Knit, Paint, and Play for Longer",
    body: [
      "It is deeply heartbreaking when the things that bring us the most joy start to cause physical discomfort. Whether you love tending to your garden, knitting on the couch, playing an instrument, painting, or rolling around on the floor with your grandchildren, your passions shouldn't require a physical tax.",
      'Often, when we care deeply about what we are doing, we "over-intend." We lean in too far, freeze our necks, and narrow our physical awareness because we are so focused on the activity.',
      "In this workshop, we will take a warm, inquisitive look at the anatomy of play. You will learn how to bring a sense of internal space, breath, and freedom back into your favorite pastimes so you can stay in the game longer — minus the punishment.",
    ],
    learnPoints: [
      {
        label: "Expanding Your Awareness",
        detail:
          "How to stay connected to your body and your environment while deeply focused on a hobby.",
      },
      {
        label: "The Dynamic Head-Neck Relationship",
        detail:
          "Why freeing your neck is the secret key to keeping your hands, arms, and back fluid and pain-free.",
      },
      {
        label: "Uncoupling Love from Tension",
        detail:
          'Shifting away from the habit of "tightening up" when you\'re excited or focused.',
      },
    ],
    forWho:
      "Hobbyists, creators, musicians, gardeners, and grandparents who want to protect their favorite activities from physical limitations.",
    date: "The next workshop is starting soon. Register to be notified.",
    videoId: "",
  },
];

export function WorkshopsClientPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [openWorkshops, setOpenWorkshops] = useState<Record<string, boolean>>({});

  function openRegistration(e: React.MouseEvent, title: string) {
    e.stopPropagation(); // Prevent toggling the accordion
    setSelectedWorkshop(title);
    setDialogOpen(true);
  }

  function toggleWorkshop(id: string) {
    setOpenWorkshops((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        {/* Decorative orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-light/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-3">
            <hr className="w-10 border-t-2 border-accent" />
            <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Group Sessions
            </span>
          </div>

          <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-background sm:text-5xl lg:text-6xl">
            Workshops
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/65">
            Group workshops and live sessions to deepen your practice of the
            Alexander Technique alongside others. All sessions are free of charge, and you are welcome to bring a friend.
          </p>
        </div>
      </section>

      {/* ── Workshop Cards ── */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="space-y-6">
          {workshops.map((workshop, index) => {
            const isOpen = openWorkshops[workshop.id] || false;
            return (
              <article
                key={workshop.id}
                id={workshop.id}
                className="scroll-mt-24 overflow-hidden rounded-site border border-border bg-card shadow-sm"
              >
                {/* Clickable Card Header */}
                <div
                  onClick={() => toggleWorkshop(workshop.id)}
                  className={cn(
                    "flex flex-col gap-5 px-7 py-6 sm:flex-row sm:items-center sm:justify-between cursor-pointer select-none transition-colors hover:bg-muted/20",
                    isOpen && "border-b border-border bg-background/60"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="font-playfair text-2xl font-medium text-foreground md:text-3xl">
                      {index + 1}. {workshop.title}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-muted italic">
                      {workshop.subtitle}
                    </p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-accent">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                        {workshop.date}
                      </span>
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                      <span>{isOpen ? "Learn less" : "Learn more"}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isOpen && "transform rotate-180"
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 self-start sm:self-center shrink-0">
                    <button
                      onClick={(e) => openRegistration(e, workshop.title)}
                      className={cn(
                        "rounded-site bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-sm whitespace-nowrap",
                        "transition-all duration-200 hover:bg-accent/90 hover:shadow-md active:scale-[0.98]",
                      )}
                    >
                      Register Now - FREE
                    </button>
                  </div>
                </div>

                {/* Collapsible Card Body */}
                {isOpen && (
                  <div className="px-7 py-7 space-y-7 animate-fade-in">
                    {/* Description */}
                    <div className="space-y-4">
                      {workshop.body.map((paragraph, i) => (
                        <p key={i} className="text-base leading-relaxed text-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* What We'll Explore */}
                    <div>
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">
                        What we will explore together
                      </h3>
                      <ul className="space-y-3">
                        {workshop.learnPoints.map((point, i) => (
                          <li key={i} className="flex gap-4">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                              <svg
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 12 12"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2 6l3 3 5-5"
                                />
                              </svg>
                            </span>
                            <span className="text-base leading-relaxed text-muted">
                              <strong className="font-semibold text-foreground">
                                {point.label}:
                              </strong>{" "}
                              {point.detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Who This Is For */}
                    <div className="rounded-site border-l-2 border-accent/40 bg-accent-light/15 py-4 pl-5 pr-5">
                      <p className="text-sm leading-relaxed text-foreground">
                        <span className="font-semibold">Who this is for: </span>
                        {workshop.forWho}
                      </p>
                    </div>

                    {/* Optional Video */}
                    {workshop.videoId && (
                      <div className="aspect-video w-full max-w-2xl overflow-hidden rounded-site shadow-md">
                        <iframe
                          src={`https://www.youtube.com/embed/${workshop.videoId}`}
                          title={workshop.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full border-0"
                        />
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* ── Stay Updated ── */}
        <section className="relative mt-12 overflow-hidden rounded-site bg-foreground px-8 py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-playfair text-2xl font-medium text-background">
                Stay Updated
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-background/65">
                Want to hear about new workshops as they&rsquo;re announced?
                Get in touch and I&rsquo;ll add you to the mailing list. All workshops are completely free.
              </p>
            </div>
            <a
              href="/contact"
              className={cn(
                "shrink-0 self-start rounded-site bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-sm sm:self-center",
                "transition-all duration-200 hover:bg-accent/90 hover:shadow-md",
              )}
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>

      <WorkshopRegistrationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        workshopTitle={selectedWorkshop}
      />
    </>
  );
}
