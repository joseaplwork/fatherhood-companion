"use client";

import { useClerk } from "@clerk/nextjs";

import { NavSidebar } from "@ui";

import { NAV_LINKS } from "../../lib/nav-links";

type NavSidebarClientProps = {
  userName: string;
  userAvatarSrc: string | null;
};

export function NavSidebarClient({ userName, userAvatarSrc }: NavSidebarClientProps) {
  const { signOut } = useClerk();

  return (
    <NavSidebar
      links={NAV_LINKS}
      userName={userName}
      userAvatarSrc={userAvatarSrc}
      logoSrc="/logo.png"
      onSignOut={() => signOut({ redirectUrl: "/sign-in" })}
    />
  );
}
