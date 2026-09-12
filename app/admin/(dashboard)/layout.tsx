import { AdminSidebar } from "@/components/admin/sidebar";

// La protección real vive en proxy.ts (server-side): redirige a
// /admin/login si no hay sesión o si el email no es ADMIN_EMAIL. No hace
// falta un guard client-side.
export default function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen bg-paper-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
