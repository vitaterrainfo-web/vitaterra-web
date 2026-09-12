import { PanelTopNav } from "@/components/panel/topnav";

// La protección real vive en proxy.ts (server-side, corre antes de que esta
// página exista): redirige a /panel/login sin sesión, o a /panel/kyc si el
// fiduciante todavía no está verificado. No hace falta un guard client-side.
export default function DashboardLayout({ children }: LayoutProps<"/panel">) {
  return (
    <div className="min-h-screen bg-paper-100">
      <PanelTopNav />
      <main className="mx-auto max-w-6xl px-6 py-8 md:px-8">{children}</main>
    </div>
  );
}
