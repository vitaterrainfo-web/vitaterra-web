import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminGuard } from "@/components/admin/guard";

export default function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-paper-100">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </AdminGuard>
  );
}
