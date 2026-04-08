import { NavSidebar } from "@ui";

import { NAV_LINKS } from "../../lib/nav-links";
import { getUserContext } from "../../lib/queries/user";

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const { userName, userAvatarSrc } = await getUserContext();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">
        <NavSidebar links={NAV_LINKS} userName={userName} userAvatarSrc={userAvatarSrc} />
      </aside>
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
