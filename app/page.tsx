import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { KpisStrip } from "@/components/kpis-strip";
import { TrustStrip } from "@/components/trust-strip";
import { ComoFunciona } from "@/components/como-funciona";
import { Ventajas } from "@/components/ventajas";
import { ParaQuien } from "@/components/para-quien";
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
        <KpisStrip />
        <TrustStrip />
        <ComoFunciona />
        <Ventajas />
        <ParaQuien />
        <SeguridadInstitucional />
        <Oportunidades />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
