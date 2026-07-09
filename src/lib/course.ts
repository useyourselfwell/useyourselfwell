export const course = {
  name: "One Skill",
  price: 0,
  priceId: process.env.STRIPE_PRICE_ID || "",
  description:
    "The complete introduction to the work, so you understand the core idea and have the tools to start noticing differently right away.",
  cta: "Get Free Access",
  ctaShort: "Get Free Access →",
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
        "Notice how you hold yourself up, and what you can let go of.",
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

export const freeIntro = {
  name: "One Skill - Digital Course",
  price: 0,
  description:
    "The complete introduction to the work, so you arrive at your first lesson already understanding the core idea.",
  bonuses: [
    {
      title: "The Daily Five",
      description:
        "A short daily checklist to help the habit of noticing stick, long after your lessons are over.",
    },
    {
      title: "The Deep Stop",
      description:
        "A guide to constructive rest, one of the simplest, most powerful tools for releasing unnecessary tension.",
    },
    {
      title: "Your Best Face Forward",
      description:
        "How to apply the skill in conversations, meetings, and other social situations, which is where most people lose their awareness fastest.",
    },
  ],
  cta: "Get Free Access",
} as const;

export const program = {
  name: "One Skill Program",
  price: 197,
  regularPrice: 247,
  savings: 50,
  description:
    "Two private lessons with Christopher, the complete digital course, and a 3-week email series to make the awareness stick.",
  includes: [
    {
      title: "Everything in the free intro",
      description:
        "The One Skill Digital Course, The Daily Five, The Deep Stop, and Your Best Face Forward, all included.",
    },
    {
      title: "Two Private Lessons with Christopher",
      description:
        "Hands-on, one-on-one sessions where you experience direct guidance in real time; this is the part of this work that can't be taught through video alone.",
    },
    {
      title: "The 3-Week One Skill Email Course",
      description:
        "A short daily series that reinforces what you experience in your lessons, so the awareness doesn't fade once you leave the room.",
    },
  ],
  cta: "Reserve Your Spot — $197",
  ctaNote: "Intro special · Regular price $247 · Save $50",
} as const;

export const siteConfig = {
  name: "Use Yourself Well",
  description:
    "Alexander Technique lessons in Bountiful, Utah. Learn to release chronic tension, reduce back pain, and move with greater ease — without surgery, medication, or repeated massage.",
  url: "https://useyourselfwell.com",
  streetAddress: "294 E 650 N",
  addressLocality: "Bountiful",
  addressRegion: "UT",
  postalCode: "84010",
  phone: "+18013329504",
  instructor: "Christopher Neville",
  geo: { latitude: 40.8968, longitude: -111.8805 },
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
  {
    question: "What happens during an Alexander Technique session?",
    answer: "In a session, you'll be guided through everyday movements—like sitting, standing, and walking—with hands-on guidance and verbal instruction to help you identify and release unconscious habits of tension.",
  },
  {
    question: "Is Alexander Technique like physical therapy or chiropractic care?",
    answer: "Unlike physical therapy which typically prescribes exercises, or chiropractic care which involves manipulation, the Alexander Technique is an educational process. You learn how to use your body with less effort so you stop creating the tension that leads to pain.",
  },
  {
    question: "Can Alexander Technique help with back pain?",
    answer: "Yes. Many people with chronic back pain find relief through the Alexander Technique because it helps them identify and stop the unconscious habits of compression and tension that cause or aggravate their pain.",
  },
  {
    question: "How is Alexander Technique different from yoga or Pilates?",
    answer: "Yoga and Pilates are forms of exercise designed to build strength and flexibility. The Alexander Technique is not an exercise program; it is a method for changing how you coordinate yourself in all activities, including yoga, Pilates, and simply sitting at a desk.",
  },
  {
    question: "How many sessions do I need?",
    answer: "While many students feel a difference in their first session, lasting change comes from building a new habit. A typical foundational course is 10 to 30 lessons, but the ultimate goal is to give you the skills to continue the work on your own.",
  },
] as const;

export const localKeywords = [
  "Alexander Technique Bountiful",
  "Somatic movement classes Davis County",
  "Posture specialist Bountiful Utah",
  "Back pain relief without surgery Utah",
  "Alexander Technique Salt Lake City",
  "Tension relief Utah"
] as const;

export const pricingTiers = [
  {
    name: "One Skill Program",
    price: "$197",
    regularPrice: "$247",
    savings: "$50",
    description:
      "Two private lessons with Christopher, plus the complete digital course and 3-week email series. An introductory offer to experience the work in person.",
    details: "",
    cta: "Reserve Your Spot — $197 →",
    href: "#",
    highlighted: true,
  },
] as const;

export const navigationLinks = [
  { label: "Get Free Access", href: "#hero" },
] as const;

