import type { CoParentContactPreference } from "../enums/index";

/**
 * Private metadata about the other co-parent.
 * Stored per-user and never shared between accounts unless explicitly linked.
 */
export type CoParent = {
  id: string;
  /** Clerk user ID of the owner (the logged-in co-parent) */
  providerUserId: string;
  name: string;
  contactPreference: CoParentContactPreference;
  /** Private notes on communication dynamic — visible only to the owner */
  communicationNotes: string | null;
  /** Free-text summary of the custody arrangement */
  custodyArrangement: string | null;
  createdAt: Date;
  updatedAt: Date;
};
