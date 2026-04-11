-- Rename physical DB columns from clerkUserId -> providerUserId.
-- Constraint/index names are left as-is; Postgres keeps them valid after column rename.

ALTER TABLE "UserProfile" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "MoodEntry" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "AIConversation" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "CommunityPost" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "PostReply" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "PostReaction" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "CommunityEvent" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "EventRsvp" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "CalendarEntry" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "ResourceInteraction" RENAME COLUMN "clerkUserId" TO "providerUserId";
ALTER TABLE "Notification" RENAME COLUMN "clerkUserId" TO "providerUserId";
