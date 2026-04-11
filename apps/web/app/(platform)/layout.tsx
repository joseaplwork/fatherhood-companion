import { getUserContext } from "../../lib/queries/user";

import { NavSidebarClient } from "./nav-sidebar-client";

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const { userName, userAvatarSrc } = await getUserContext();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">
        <NavSidebarClient userName={userName} userAvatarSrc={userAvatarSrc ?? null} />
      </aside>
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
