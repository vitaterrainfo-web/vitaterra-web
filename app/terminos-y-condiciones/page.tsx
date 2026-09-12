import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Términos y Condiciones | Vita Terra",
  description:
    "Términos y condiciones generales de uso de la plataforma vitaterradesarrollos.com.ar.",
};

export default function TerminosYCondicionesPage() {
  return (
    <>
      <Header />
      <main className="bg-paper-50">
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
          <Link
            href="/"
            className="text-xs font-medium text-paper-muted hover:text-ink-900"
          >
            ← Volver al inicio
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">
            Marco legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
            Términos y Condiciones de Uso de la Plataforma
          </h1>

          <div className="mt-10 space-y-4 text-base leading-8 text-paper-muted">
            <p>
              Los presentes Términos y Condiciones regulan el acceso y uso
              del sitio web {siteConfig.domain} (en adelante, la
              &ldquo;Plataforma&rdquo;), de la cual {siteConfig.legalName}{" "}
              CUIT 33-71863439-9 es titular de los derechos de explotación y
              propiedad intelectual, siendo la administración y ejecución de
              los proyectos y fideicomisos privados operada de forma
              exclusiva por {siteConfig.fiduciary} (en adelante, el
              &ldquo;Fiduciario&rdquo;).
            </p>
            <p>
              Cualquier persona que acceda, se registre o utilice la
              Plataforma (en adelante, el &ldquo;Usuario&rdquo; o
              &ldquo;Fiduciante Adherente&rdquo;) acepta sin reservas los
              presentes Términos y Condiciones en su totalidad.
            </p>
          </div>

          <article className="mt-12 space-y-12">
            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                1. Naturaleza jurídica de la Plataforma
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  La Plataforma es un entorno digital exclusivamente
                  informativo y de gestión interna que facilita la
                  vinculación de particulares con proyectos de la economía
                  real, productiva y de desarrollo comercial (tales como
                  desarrollos inmobiliarios en pozo, explotación comercial de
                  flotas automotrices, y el acopio, procesamiento o
                  comercialización de productos agroindustriales y de
                  consumo premium). La Plataforma no constituye:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Una entidad financiera ni de intermediación cambiaria
                    (excluido de la órbita del BCRA).
                  </li>
                  <li>
                    Una plataforma de financiamiento colectivo (crowdfunding)
                    financiero, ni un mercado de capitales para la oferta
                    pública de títulos valores o acciones (excluido de la
                    órbita de la CNV).
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                2. Los Módulos de Adhesión y contratación
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  El ingreso de los Usuarios a los distintos proyectos se
                  instrumenta única y exclusivamente mediante la adquisición
                  de Módulos de Adhesión correspondientes a fideicomisos
                  ordinarios privados regidos por el Código Civil y Comercial
                  de la Nación.
                </p>
                <ul className="list-disc space-y-3 pl-5">
                  <li>
                    <strong className="text-ink-900">
                      Definición de Módulo:
                    </strong>{" "}
                    el Módulo de Adhesión representa una fracción contractual
                    de los derechos y obligaciones de un fiduciante dentro de
                    un fideicomiso específico, otorgándole el derecho
                    proporcional sobre los resultados netos de la liquidación
                    o explotación de los activos tangibles de dicho proyecto
                    (bienes raíces, unidades vehiculares, o existencias de
                    stock de mercadería física en procesos comerciales o de
                    exportación).
                  </li>
                  <li>
                    <strong className="text-ink-900">
                      Inexistencia de Valores Negociables:
                    </strong>{" "}
                    los Módulos de Adhesión no son acciones, bonos,
                    cuotapartes de fondos comunes de inversión ni
                    instrumentos financieros aptos para negociación
                    secundaria en mercados regulados por la CNV. Su
                    transferencia a terceros se rige exclusivamente por las
                    normas civiles de cesión de derechos y las condiciones
                    particulares de cada contrato.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                3. Proyecciones comerciales y ausencia de rendimiento
                garantizado
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <ul className="list-disc space-y-3 pl-5">
                  <li>
                    Toda información, porcentaje, margen estimado o número
                    publicado en la Plataforma respecto de los proyectos
                    constituye una proyección estimativa de margen comercial
                    o plusvalía basada en costos de mercado de la economía
                    real (costos de construcción, valores locativos
                    logísticos, valores de acopio agroindustrial y
                    comercialización de bienes).
                  </li>
                  <li>
                    El Fiduciario no garantiza la obtención de un rendimiento
                    fijo ni una tasa de interés, actividades que se
                    encuentran prohibidas para esta estructura jurídica.
                  </li>
                  <li>
                    El Usuario asume que las variaciones de la economía real
                    impactan directamente en el resultado final del
                    fideicomiso, el cual se deriva estrictamente del éxito
                    comercial del negocio subyacente.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                4. Registro, validación de identidad y origen de fondos
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  Para operar en la Plataforma, el Usuario debe registrarse y
                  aprobar el proceso de validación de identidad (KYC),
                  aportando documentación real y vigente. En cumplimiento de
                  las normativas de la Unidad de Información Financiera
                  (UIF) sobre prevención de lavado de activos (Ley N.°
                  25.246), el Usuario se obliga a suscribir bajo juramento la
                  Declaración Jurada de Origen Lícito de Fondos provista por
                  el sistema, quedando el Fiduciario facultado a requerir
                  documentación respaldatoria adicional antes de acreditar la
                  suscripción de cualquier Módulo de Adhesión.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                5. Validez de la firma electrónica
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  De conformidad con la Ley de Firma Digital N.° 25.506, las
                  partes reconocen que la aceptación de los contratos de
                  adhesión a los fideicomisos, las declaraciones juradas y
                  las solicitudes de adquisición de Módulos de Adhesión
                  efectuadas dentro de la Plataforma mediante la marcación de
                  casillas de verificación (checkboxes) o interacción en el
                  perfil privado del Usuario, constituyen manifestaciones
                  válidas de voluntad mediante Firma Electrónica, poseyendo
                  pleno valor vinculante y probatorio equivalente a la firma
                  ológrafa en soporte papel.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                6. Flujo de fondos y cuentas bancarias
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  La Plataforma no es una billetera virtual, no procesa pagos
                  de forma directa ni retiene saldos líquidos de los
                  usuarios. Todo aporte de capital para la suscripción de
                  Módulos de Adhesión deberá ser enviado por el Usuario
                  mediante transferencia bancaria directo a la cuenta
                  corriente bancaria de titularidad del fideicomiso
                  específico seleccionado. Asimismo, toda distribución de
                  resultados o liquidación se efectuará exclusivamente hacia
                  la cuenta bancaria informada por el Usuario, requiriendo un
                  plazo de procesamiento administrativo de 24 a 48 horas
                  hábiles.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                7. Modificaciones y jurisdicción
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  El titular de la Plataforma se reserva el derecho de
                  modificar los presentes Términos y Condiciones para
                  adecuarlos a nuevas exigencias operativas o normativas
                  legales. Cualquier controversia derivada de la
                  interpretación o ejecución de los presentes términos o de
                  las actas de adhesión digitales se resolverá bajo la
                  jurisdicción de los Tribunales Ordinarios en lo Comercial
                  de la Ciudad Autónoma de Buenos Aires, renunciando a
                  cualquier otro fuero o jurisdicción.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
