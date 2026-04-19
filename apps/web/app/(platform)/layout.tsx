import { getSession } from "../../lib/session";

import { PlatformNavSidebar } from "./platform-nav-sidebar-client";

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">
        <PlatformNavSidebar userName={session.userName} userAvatarSrc={session.userAvatarSrc} />
      </aside>
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
