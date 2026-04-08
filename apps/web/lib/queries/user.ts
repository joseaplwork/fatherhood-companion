import { currentUser } from "@clerk/nextjs/server";

import type { ChildProfile } from "@domain";

export type UserContext = {
  userName: string;
  userAvatarSrc: string | null;
  children: ChildProfile[];
};

/**
 * Resolves the current Clerk user into the shape all pages and views need.
 * Single place to change display-name priority or avatar source.
 */
export async function getUserContext(): Promise<UserContext> {
  const user = await currentUser();
  return {
    userName: user?.fullName ?? user?.firstName ?? "",
    userAvatarSrc: user?.imageUrl ?? null,
    children: (user?.privateMetadata?.children ?? []) as ChildProfile[],
  };
}
