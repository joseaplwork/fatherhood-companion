export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* NavSidebar will be added here once packages/ui atoms are built */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
