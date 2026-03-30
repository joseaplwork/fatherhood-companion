import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const resources = [
  // ── Co-Parenting ─────────────────────────────────────────────────────────
  {
    slug: "navigating-non-custodial-fatherhood",
    title: "Navigating Non-Custodial Fatherhood",
    description:
      "A practical guide to staying actively involved in your children's lives when you don't have primary custody — covering communication strategies, visit planning, and maintaining connection.",
    type: "GUIDE",
    category: "CO_PARENTING",
    isPublished: true,
  },
  {
    slug: "co-parenting-communication-toolkit",
    title: "The Co-Parenting Communication Toolkit",
    description:
      "Scripts, templates, and techniques for keeping co-parenting conversations productive and child-focused, even when the relationship with your ex is strained.",
    type: "ARTICLE",
    category: "CO_PARENTING",
    isPublished: true,
  },
  {
    slug: "long-distance-parenting-staying-close",
    title: "Long-Distance Parenting: Staying Close Across Miles",
    description:
      "Practical strategies for maintaining a meaningful bond with your children when geography separates you — video calls, care packages, and shared rituals that actually work.",
    type: "ARTICLE",
    category: "CO_PARENTING",
    isPublished: true,
  },
  // ── Mental Health ─────────────────────────────────────────────────────────
  {
    slug: "understanding-dad-grief-custody",
    title: "Understanding Grief After Custody Changes",
    description:
      "Losing daily access to your children triggers a real and often unacknowledged grief process. This guide helps you name what you're feeling and move through it with purpose.",
    type: "ARTICLE",
    category: "MENTAL_HEALTH",
    isPublished: true,
  },
  {
    slug: "5-minute-grounding-exercises",
    title: "5-Minute Grounding Exercises for Hard Days",
    description:
      "Quick, evidence-based breathing and grounding techniques you can use anywhere — before a custody handoff, after a difficult call, or when anxiety spikes unexpectedly.",
    type: "EXERCISE",
    category: "MENTAL_HEALTH",
    isAiEnhanced: true,
    isPublished: true,
  },
  {
    slug: "when-to-seek-therapy-as-a-dad",
    title: "When (and How) to Seek Therapy as a Dad",
    description:
      "A straightforward look at what therapy actually involves, how to find an affordable provider, and why asking for professional support is one of the strongest things a father can do.",
    type: "ARTICLE",
    category: "MENTAL_HEALTH",
    isPublished: true,
  },
  // ── Legal ────────────────────────────────────────────────────────────────
  {
    slug: "custody-agreement-basics",
    title: "Custody Agreement Basics: What Every Dad Should Know",
    description:
      "A plain-English breakdown of custody terminology, how parenting plans work, and questions to ask your attorney. Not legal advice — a starting point to understand the landscape.",
    type: "GUIDE",
    category: "LEGAL",
    isPublished: true,
  },
  {
    slug: "documenting-your-parenting-time",
    title: "Documenting Your Parenting Time",
    description:
      "Why keeping accurate records of your visits, communications, and expenses matters — and a simple system for doing it without it becoming a burden.",
    type: "ARTICLE",
    category: "LEGAL",
    isPublished: true,
  },
  // ── Child Development ─────────────────────────────────────────────────────
  {
    slug: "developmental-stages-what-your-child-needs",
    title: "Developmental Stages: What Your Child Actually Needs From You",
    description:
      "Age-by-age breakdown of what children need emotionally and developmentally — so you can make the most of every hour you have together.",
    type: "GUIDE",
    category: "CHILD_DEVELOPMENT",
    isPublished: true,
  },
  {
    slug: "talking-to-kids-about-separation",
    title: "Talking to Kids About Separation",
    description:
      "Age-appropriate language and honest answers for the questions children ask when their parents live apart. Includes what to say, what to avoid, and how to stay consistent.",
    type: "ARTICLE",
    category: "CHILD_DEVELOPMENT",
    isPublished: true,
  },
  // ── Self-Care ─────────────────────────────────────────────────────────────
  {
    slug: "building-your-support-network",
    title: "Building Your Support Network as a Single Dad",
    description:
      "Practical steps to identify and strengthen the relationships that sustain you — friends, family, fellow dads, and community — so you're not carrying this alone.",
    type: "ARTICLE",
    category: "SELF_CARE",
    isPublished: true,
  },
  {
    slug: "sleep-and-resilience-for-dads",
    title: "Sleep, Stress, and Resilience: A Dad's Survival Guide",
    description:
      "The science of why sleep is non-negotiable and a realistic plan for improving yours, even when parenting anxiety makes switching off feel impossible.",
    type: "MINI_COURSE",
    category: "SELF_CARE",
    isPublished: true,
  },
  // ── Finance ────────────────────────────────────────────────────────────────
  {
    slug: "child-support-and-financial-planning",
    title: "Child Support and Financial Planning: Getting Stable",
    description:
      "A practical framework for budgeting around child support obligations, planning for unexpected expenses, and building financial stability as a single parent.",
    type: "GUIDE",
    category: "FINANCE",
    isPublished: true,
  },
];

async function main() {
  console.log("Seeding resources…");

  for (const resource of resources) {
    await db.resource.upsert({
      where: { slug: resource.slug },
      update: {},
      create: {
        slug: resource.slug,
        title: resource.title,
        description: resource.description,
        type: resource.type as "ARTICLE" | "VIDEO" | "EXERCISE" | "MINI_COURSE" | "GUIDE",
        category: resource.category as
          | "MENTAL_HEALTH"
          | "CO_PARENTING"
          | "LEGAL"
          | "FINANCE"
          | "CHILD_DEVELOPMENT"
          | "SELF_CARE"
          | "COMMUNITY",
        isAiEnhanced: resource.isAiEnhanced ?? false,
        isPublished: resource.isPublished,
      },
    });
  }

  console.log(`Seeded ${resources.length} resources.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
