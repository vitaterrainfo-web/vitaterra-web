import { PanelSidebar } from "@/components/panel/sidebar";
import { PanelGuard } from "@/components/panel/guard";

export default function DashboardLayout({ children }: LayoutProps<"/panel">) {
  return (
    <PanelGuard>
      <div className="flex min-h-screen bg-paper-100">
        <PanelSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </PanelGuard>
  );
}
