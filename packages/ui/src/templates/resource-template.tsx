import type { ReactNode } from "react";

type ResourceTemplateProps = {
  grid: ReactNode;
  savedPanel?: ReactNode;
};

export function ResourceTemplate({ grid, savedPanel }: ResourceTemplateProps) {
  return (
    <>
      <main className="flex-1 overflow-y-auto px-8 py-8">{grid}</main>
      {savedPanel && (
        <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{savedPanel}</aside>
      )}
    </>
  );
}
