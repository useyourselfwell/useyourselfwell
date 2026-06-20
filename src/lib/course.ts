export const course = {
  name: "One Skill",
  price: 27,
  priceId: process.env.STRIPE_PRICE_ID || "",
  description:
    "Discover the unconscious tension pattern that may be driving your discomfort, fatigue, and stress.",
  cta: "One Skill -> $27",
  ctaShort: "Get One Skill →",
  modules: [
    {
      number: 1,
      title: "Why your body feels like it's working too hard",
      description:
        "An introduction to the hidden patterns of effort that most people never notice.",
    },
    {
      number: 2,
      title: "Discovering tension in sitting",
      description:
        "Learn to recognize the unnecessary effort you bring to one of the most common daily activities.",
    },
    {
      number: 3,
      title: "Discovering tension in standing",
      description:
        "Notice how you hold yourself up — and what you can let go of.",
    },
    {
      number: 4,
      title: "Discovering tension in breathing",
      description:
        "See how unconscious habits affect your breath and how to find greater ease.",
    },
    {
      number: 5,
      title: "Discovering tension in thinking and stress",
      description:
        "Explore the connection between mental effort and physical tension.",
    },
    {
      number: 6,
      title: "Creating moments of ease",
      description:
        "Practical ways to bring awareness and choice into your daily life.",
    },
  ],
} as const;

export const siteConfig = {
  name: "Use Yourself Well",
  description:
    "Discover the unconscious habits of tension that may be contributing to chronic discomfort. Learn a different approach through the Alexander Technique.",
  url: "https://useyourselfwell.com",
} as const;

export const testimonials = [
  {
    quote:
      "I thought my back pain was just something I had to manage. Now I can sit through dinner, clean my house, and play with my kids without bracing for it.",
    author: "Past Client",
  },
  {
    quote:
      "I'd seen chiropractors for years. One series of sessions with Christopher changed more than all of them combined.",
    author: "Past Client",
  },
] as const;

export const doctorQuotes = [
  {
    quote:
      "The Alexander Technique should be part of all preventative health and education programs. It is as basic as good nutrition.",
    author: "Jill Sanders, DO",
  },
  {
    quote:
      "The Alexander Technique remains the best of the self-care strategies to prevent the sequel of poor posture and poor breathing.",
    author: "Harold Wise, MD, PC",
  },
] as const;

export const faqItems = [
  {
    question: "Is this another exercise program?",
    answer:
      "No. The course focuses on awareness and discovering habits of tension rather than prescribing exercises.",
  },
  {
    question: "Will this cure my pain?",
    answer:
      "No medical claims are made. The course helps people discover patterns that may contribute to discomfort and unnecessary effort.",
  },
  {
    question: "How quickly will I notice something?",
    answer:
      "Many people report noticing new awareness during the first module.",
  },
  {
    question: "Do I need previous experience?",
    answer: "No. The course is designed for complete beginners.",
  },
  {
    question: "Can I watch on my phone?",
    answer: "Yes. The course can be viewed on any modern device.",
  },
  {
    question: "What if the course isn't right for me?",
    answer: "See the satisfaction guarantee below.",
  },
] as const;

export const pricingTiers = [
  {
    name: "Two Private Lessons",
    price: "$147",
    description:
      "A special introductory offer — two one-on-one sessions to experience the Alexander Technique and discover what's possible for you.",
    details: "",
    cta: "Reserve Your Two Lessons →",
    href: "#",
    highlighted: true,
  },
] as const;

export const navigationLinks = [
  { label: "Get One Skill", href: "#course" },
] as const;
