import { PanelTopNav } from "@/components/panel/topnav";
import { PanelGuard } from "@/components/panel/guard";

export default function DashboardLayout({ children }: LayoutProps<"/panel">) {
  return (
    <PanelGuard>
      <div className="min-h-screen bg-paper-100">
        <PanelTopNav />
        <main className="mx-auto max-w-6xl px-6 py-8 md:px-8">{children}</main>
      </div>
    </PanelGuard>
  );
}
