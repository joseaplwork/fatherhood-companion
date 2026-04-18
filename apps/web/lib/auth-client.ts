"use client";

/**
 * Client-side auth abstraction — the only file in apps/web that imports
 * client session primitives from the auth provider (@clerk/nextjs).
 *
 * Switching auth providers means changing this file only.
 * All client components import from here, not from the provider directly.
 */
import { useClerk } from "@clerk/nextjs";

/** Returns a `signOut` function that redirects to the sign-in page. */
export function useSignOut() {
  const { signOut } = useClerk();
  return () => signOut({ redirectUrl: "/sign-in" });
}

/**
 * Returns a function that forces the session JWT to refresh.
 * Use after server-side metadata changes (e.g. completing onboarding)
 * so the updated claims are available on the next request.
 */
export function useReloadUser() {
  const { user } = useClerk();
  return () => user?.reload();
}
