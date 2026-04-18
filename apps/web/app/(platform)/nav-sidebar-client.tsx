"use client";

import { NavSidebar } from "@ui";

import { useSignOut } from "../../lib/auth-client";
import { NAV_LINKS } from "../../lib/nav-links";

type NavSidebarClientProps = {
  userName: string;
  userAvatarSrc: string | null;
};

export function NavSidebarClient({ userName, userAvatarSrc }: NavSidebarClientProps) {
  const signOut = useSignOut();

  return (
    <NavSidebar
      links={NAV_LINKS}
      userName={userName}
      userAvatarSrc={userAvatarSrc}
      logoSrc="/logo.png"
      onSignOut={signOut}
    />
  );
}
