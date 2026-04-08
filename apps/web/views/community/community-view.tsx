import { Button, CommunityTemplate, PostCard } from "@ui";

export function CommunityView() {
  return (
    <CommunityTemplate
      feed={
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-2xl font-semibold text-on-surface">Community</h1>
            <Button variant="primary">New post</Button>
          </div>

          <div className="flex flex-col gap-3">
            <PostCard
              title="Welcome to the Community Hub — read first!"
              content="House rules, how to find a buddy, and what to expect here."
              authorName="Dad Companion Team"
              createdAt="1 week ago"
              isPinned
              replyCount={3}
              reactions={[{ type: "HEART", count: 24 }]}
            />
            <PostCard
              title="How do you handle bedtime routines solo?"
              content="Struggling to get both kids down before 9pm. My 4-year-old refuses to sleep without a story and my 7-year-old wants to stay up. Any tips?"
              authorName="Marcus Davies"
              createdAt="2 hr ago"
              replyCount={12}
              reactions={[
                { type: "HEART", count: 8 },
                { type: "HELPFUL", count: 5 },
              ]}
            />
            <PostCard
              title="Custody hearing tomorrow — feeling anxious"
              content="Big day tomorrow. Just trying to stay grounded. Has anyone been through this? Any advice would mean a lot."
              authorName="NewDad_2025"
              createdAt="4 hr ago"
              replyCount={7}
              reactions={[
                { type: "SUPPORT", count: 14 },
                { type: "HEART", count: 6 },
              ]}
            />
            <PostCard
              title="First post — feeling nervous!"
              content="Hi everyone, just joined. Single dad of one here, 18 months in. Not sure where to start."
              authorName="RaisingTwo_UK"
              createdAt="5 min ago"
              replyCount={0}
              reactions={[]}
            />
          </div>
        </div>
      }
    />
  );
}
