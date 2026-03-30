import type { ReactNode } from "react";

type AuthTemplateProps = {
  children: ReactNode;
};

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-12">
      {/* Organic background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-fixed opacity-20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary-fixed opacity-20 blur-3xl"
      />

      {/* Card */}
      <div className="glass-panel ambient-shadow relative z-10 w-full max-w-md rounded-3xl px-8 py-10">
        {children}
      </div>
    </main>
  );
}
