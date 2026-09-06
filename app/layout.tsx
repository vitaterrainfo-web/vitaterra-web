import type { Metadata } from "next";
import { Public_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Vitaterra | Fideicomisos privados de economía real",
  description:
    "Vitaterra conecta fiduciantes con fideicomisos privados de desarrollo agroganadero, inmobiliario en pozo y flotas comerciales en Argentina. Economía real, activos tangibles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${publicSans.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
