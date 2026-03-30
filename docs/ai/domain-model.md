# Domain Model

High-level overview of the core domain concepts, their ownership, and relationships.
Field-level schemas will be defined in feature ADRs once the data layer is fully decided.

---

## Identity and User Data (Clerk)

Authentication and user identity are owned by **Clerk**. Our database never stores a duplicate
users table.

Clerk owns the following per user:

- Identity: user ID, email, full name, avatar, session tokens
- **Private metadata — Children**: a list of child profiles attached to the user. Each child has
  a system-generated numeric ID, a name, and date of birth at minimum. The numeric ID is the
  stable key used to reference a child from other parts of the system (e.g., CalendarEntry).

> Note: which additional profile fields (onboarding state, subscription tier, bio) live in Clerk
> metadata vs the database is TBD and will be captured in a data layer ADR.

---

## Application Data (Database)

Everything outside identity and child profiles is owned by the application database.

### AIConversation + ConversationMessage

A private conversation thread between a father and the AI companion.

Conversations are never shared. Each conversation tracks a mood context to help the AI calibrate
its tone. As conversations grow long, a rolling AI-generated summary is maintained to preserve
continuity without exceeding context limits.

---

### MoodEntry

A daily emotional check-in (1–5 scale, optional note). One entry per user per day.

Feeds the Dashboard insights and provides ongoing emotional context to the AI companion.

---

### CommunityPost + PostReply + PostReaction

The discussion layer of the Community pillar.

Posts support threaded replies and three reaction types (heart, support, helpful). Reply and
reaction counts are denormalized for display performance and maintained server-side.

Pinning and locking are admin-only actions.

---

### CommunityEvent + EventRsvp

Organized gatherings: meetups, workshops, support groups, webinars.

Events can be online (with a meeting URL) or in-person (with a location). Capacity limits are
optional. RSVP status is: going, maybe, or not going.

---

### CalendarEntry

A unified calendar entry owned by a father.

Entry types: personal, child care, custody, medical, school, community event, reminder.

A calendar entry can reference a child (by numeric ID from Clerk metadata) or a CommunityEvent
the father has RSVP'd to. Supports recurring events and per-entry color coding.

---

### Resource + ResourceInteraction

Content in the Resources pillar: articles, guides, and AI-enhanced materials.

Categories: mental health, co-parenting, legal, finance, child development, self-care, community.

ResourceInteraction tracks per-user state (saved, completed, rating) and drives AI
personalization.

---

### Notification

In-app notifications for: event reminders, community replies, AI check-ins, mood reminders,
and new resource suggestions.

---

## Relationships at a Glance

```
Clerk User
  ├── Children (private metadata, numeric ID per child)
  └── [app DB records keyed by Clerk user ID]
       ├── AIConversations → ConversationMessages
       ├── MoodEntries (one per day)
       ├── CommunityPosts → PostReplies, PostReactions
       ├── EventRsvps → CommunityEvents
       ├── CalendarEntries → (optional child ref, optional event ref)
       ├── ResourceInteractions → Resources
       └── Notifications
```

---

## Planned Future Entities

- `AIInsight` — AI-generated observations surfaced on the Dashboard
- `ResourceEmbedding` — vector embedding per Resource for semantic search
- `AdminRole` — role-based permissions for Community moderation
