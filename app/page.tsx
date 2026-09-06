import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { ComoFunciona } from "@/components/como-funciona";
import { SeguridadInstitucional } from "@/components/seguridad-institucional";
import { Oportunidades } from "@/components/oportunidades";
import { Faq } from "@/components/faq";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <ComoFunciona />
        <SeguridadInstitucional />
        <Oportunidades />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
