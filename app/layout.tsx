import type { Metadata } from "next";
import { Manrope, Bodoni_Moda, Libre_Caslon_Text } from "next/font/google";
import { WhatsappButton } from "@/components/whatsapp-button";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-libre-caslon-text",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Vita Terra | Fideicomisos privados de economía real",
  description:
    "Vita Terra conecta fiduciantes con fideicomisos privados de desarrollo agroganadero, inmobiliario en pozo y flotas comerciales en Argentina. Economía real, activos tangibles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${bodoniModa.variable} ${libreCaslonText.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
        <WhatsappButton />
      </body>
    </html>
  );
}
