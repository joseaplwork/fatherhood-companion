import type { ReactNode } from "react";

type SettingsTemplateProps = {
  sidebar: ReactNode;
  sectionNav: ReactNode;
  content: ReactNode;
};

export function SettingsTemplate({ sidebar, sectionNav, content }: SettingsTemplateProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">{sidebar}</aside>
      <aside className="w-56 shrink-0 overflow-y-auto border-r border-outline-variant/15 px-4 py-8">
        {sectionNav}
      </aside>
      <main className="flex-1 overflow-y-auto px-8 py-8">{content}</main>
    </div>
  );
}
