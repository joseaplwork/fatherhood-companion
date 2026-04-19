import { ResourceCard, ResourceTemplate } from "@/grove-companion/ui";

export function ResourcesView() {
  return (
    <ResourceTemplate
      grid={
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-semibold text-on-surface">Resources</h1>
            <p className="font-body text-sm text-on-surface-variant mt-1">
              Guides, articles and tools curated for single dads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResourceCard
              title="Understanding Your Rights: A Guide to Sole Custody"
              description="A plain-English overview of sole custody arrangements, what they mean day-to-day, and how to navigate disputes."
              type="ARTICLE"
              category="LEGAL"
            />
            <ResourceCard
              title="5-Minute Mindfulness for Dads"
              description="A short guided session designed for busy dads who have just 5 minutes."
              type="VIDEO"
              category="MENTAL_HEALTH"
              thumbnailUrl="https://picsum.photos/seed/mindfulness/400/200"
              isAiEnhanced
            />
            <ResourceCard
              title="Finance Basics for Single Parents"
              description="Budgeting, tax credits, and child maintenance — everything in one place."
              type="MINI_COURSE"
              category="FINANCE"
              isCompleted
            />
            <ResourceCard
              title="Personalised Co-Parenting Communication Plan"
              description="AI-generated based on your recent diary entries and tone preferences."
              type="GUIDE"
              category="CO_PARENTING"
              isAiEnhanced
            />
            <ResourceCard
              title="Child Development Milestones: Ages 2–10"
              description="What to expect at each stage and how to support your child when you're not always there."
              type="ARTICLE"
              category="CHILD_DEVELOPMENT"
            />
            <ResourceCard
              title="Building a Self-Care Routine"
              description="Small daily practices to protect your mental health as a solo parent."
              type="EXERCISE"
              category="SELF_CARE"
            />
          </div>
        </div>
      }
    />
  );
}
