import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Política de Privacidad | Vitaterra",
  description:
    "Política de privacidad de Vitaterra Desarrollos: recolección, tratamiento y protección de datos personales.",
};

export default function PoliticaDePrivacidadPage() {
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
            Política de Privacidad de Vitaterra Desarrollos
          </h1>

          <article className="mt-12 space-y-12">
            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                1. Compromiso de privacidad y marco legal
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  La presente Política de Privacidad (en adelante, la
                  &ldquo;Política&rdquo;) regula la recolección,
                  almacenamiento, tratamiento, uso y protección de los datos
                  personales suministrados por los usuarios (en adelante, el
                  &ldquo;Usuario&rdquo; o los &ldquo;Usuarios&rdquo;) dentro
                  del sitio web oficial {siteConfig.domain} y todas sus
                  aplicaciones digitales derivadas (en adelante, la
                  &ldquo;Plataforma&rdquo;).
                </p>
                <p>
                  La Plataforma es de propiedad exclusiva y administrada por{" "}
                  {siteConfig.legalName}, CUIT 33-71863439-9 (en adelante, el
                  &ldquo;Administrador&rdquo;). El Administrador se
                  compromete firmemente a proteger la privacidad de sus
                  Usuarios y a tratar sus datos personales en estricto
                  cumplimiento con la Ley N.° 25.326 de Protección de Datos
                  Personales, sus decretos reglamentarios, y las
                  disposiciones emanadas de la Agencia de Acceso a la
                  Información Pública (AAIP) de la República Argentina.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                2. Datos recolectados
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  Para permitir el acceso a los proyectos, la suscripción de
                  Módulos de Adhesión y la correspondiente validación de
                  identidad contractual, el Administrador recolectará las
                  siguientes categorías de datos personales:
                </p>
                <ul className="list-disc space-y-3 pl-5">
                  <li>
                    <strong className="text-ink-900">
                      Datos de identificación y contacto:
                    </strong>{" "}
                    nombre completo, fecha de nacimiento, sexo, tipo y número
                    de documento (DNI/LE/LC), Clave Única de Identificación
                    Laboral o Tributaria (CUIL/CUIT), dirección de correo
                    electrónico, domicilio real, domicilio fiscal y número de
                    teléfono celular.
                  </li>
                  <li>
                    <strong className="text-ink-900">
                      Datos financieros y patrimoniales:
                    </strong>{" "}
                    información sobre cuentas bancarias (CBU/CVU, entidad
                    financiera, tipo de cuenta), historial de aportes y
                    distribuciones, y documentación respaldatoria de
                    ingresos.
                  </li>
                  <li>
                    <strong className="text-ink-900">
                      Cumplimiento normativo (prevención de lavado de
                      activos):
                    </strong>{" "}
                    declaraciones juradas sobre el origen lícito de los
                    fondos, condición de Persona Expuesta Políticamente (PEP)
                    y aquella documentación necesaria para cumplir con las
                    regulaciones de la Unidad de Información Financiera
                    (UIF).
                  </li>
                  <li>
                    <strong className="text-ink-900">
                      Datos de terceros (programa de referidos):
                    </strong>{" "}
                    en caso de que un Usuario utilice el Programa de
                    Referidos, la Plataforma podrá procesar los datos de
                    contacto mínimos del tercero invitado (como correo
                    electrónico o teléfono), bajo la exclusiva
                    responsabilidad del Usuario invitante de contar con el
                    consentimiento previo de dicho tercero.
                  </li>
                  <li>
                    <strong className="text-ink-900">
                      Datos de navegación y técnicos:
                    </strong>{" "}
                    dirección IP, datos de cookies, identificadores de
                    dispositivos, registros de fecha/hora de acceso y
                    comportamiento de navegación dentro del entorno digital
                    de {siteConfig.domain}.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                3. Finalidad del tratamiento de los datos
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  Los datos personales recabados serán utilizados única y
                  exclusivamente para las siguientes finalidades legítimas:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Gestionar el registro de la cuenta de usuario, validar la
                    identidad del fiduciante y asegurar el entorno digital de
                    la Plataforma.
                  </li>
                  <li>
                    Instrumentar formalmente las Actas de Adhesión y
                    Convenios de Cesión de Derechos vinculados a los
                    fideicomisos promovidos en {siteConfig.domain}.
                  </li>
                  <li>
                    Procesar las transferencias de capital, la recaudación de
                    aportes y las correspondientes liquidaciones o
                    distribuciones periódicas de resultados.
                  </li>
                  <li>
                    Gestionar el Programa de Referidos: utilizar los enlaces
                    o datos de invitación exclusivamente para permitir la
                    asignación de las bonificaciones comerciales cuando se
                    cumplan las condiciones del programa.
                  </li>
                  <li>
                    Dar cumplimiento estricto a las obligaciones legales,
                    fiscales y de prevención de lavado de activos ante la
                    AFIP, la UIF y los organismos judiciales que así lo
                    requieran.
                  </li>
                  <li>
                    Enviar notificaciones operativas, estados de cuenta,
                    reportes de avance de obra o administración de flota y
                    comunicaciones institucionales.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                4. Almacenamiento y seguridad de los datos
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  El Administrador adopta las medidas técnicas, organizativas
                  y de seguridad necesarias para garantizar la
                  confidencialidad, integridad y disponibilidad de los datos
                  personales, evitando su alteración, pérdida, tratamiento o
                  acceso no autorizado.
                </p>
                <p>
                  Los datos se almacenan en servidores seguros, propios o de
                  terceros proveedores de servicios en la nube, que cuentan
                  con estándares internacionales de ciberseguridad y cifrado
                  de datos. El acceso a la información está estrictamente
                  restringido al personal autorizado de {siteConfig.fiduciary}{" "}
                  que requiera conocer dichos datos para el ejercicio de sus
                  funciones operativas.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                5. Uso de cookies y tecnologías de seguimiento
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  La Plataforma utiliza cookies y tecnologías similares para
                  personalizar la experiencia del Usuario, recordar sus
                  preferencias, analizar el tráfico web y mejorar los
                  mecanismos de seguridad del sitio {siteConfig.domain}. El
                  Usuario tiene la facultad de configurar su navegador de
                  internet para desactivar o bloquear las cookies; sin
                  embargo, se deja constancia de que dicha acción podría
                  limitar el correcto funcionamiento de ciertas herramientas
                  o secciones logueadas de la Plataforma.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                6. Transferencia y comparación de datos
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  El Administrador no venderá, alquilará ni comercializará
                  los datos personales de sus Usuarios bajo ninguna
                  circunstancia. Los datos personales solo podrán ser
                  compartidos en los siguientes supuestos específicos:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    A asesores legales, contadores o auditores externos de{" "}
                    {siteConfig.legalName} al solo efecto de procesar la
                    contabilidad centralizada, auditar balances de los
                    fideicomisos o confeccionar las rendiciones de cuenta.
                  </li>
                  <li>
                    A organismos gubernamentales, tributarios o de control
                    (AFIP, UIF) o autoridades judiciales, mediando
                    requerimiento legal expreso, orden de juez competente u
                    obligación regulatoria de reporte.
                  </li>
                  <li>
                    A terceras empresas proveedoras de servicios
                    tecnológicos o de validación de identidad digital (KYC)
                    que actúen en calidad de encargados de tratamiento de
                    datos en nombre del Administrador, bajo estrictos
                    convenios de confidencialidad.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                7. Derechos del titular de los datos (ARCO)
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  En cumplimiento de la Ley N.° 25.326, el Usuario, en su
                  carácter de titular de los datos personales, posee el
                  derecho de Acceso, Rectificación, Actualización y
                  Supresión de su información personal de forma totalmente
                  gratuita.
                </p>
                <p>
                  El derecho de acceso podrá ser ejercido en intervalos no
                  inferiores a seis meses, salvo que se acredite un interés
                  legítimo al efecto.
                </p>
                <p>
                  Para ejercer cualquiera de estos derechos, el Usuario
                  deberá enviar una comunicación formal por escrito al correo
                  electrónico especial dispuesto en la Cláusula 9,
                  adjuntando copia de su documento de identidad y detallando
                  el objeto de su solicitud.
                </p>
                <blockquote className="border-l-2 border-brass-500 pl-5 italic text-paper-ink/80">
                  &ldquo;La Agencia de Acceso a la Información Pública
                  (AAIP), en su carácter de Órgano de Control de la Ley N.°
                  25.326, tiene la atribución de atender las denuncias y
                  reclamos que interpongan quienes vean afectados sus
                  derechos por incumplimiento de las normas vigentes en
                  materia de protección de datos personales.&rdquo;
                </blockquote>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                8. Modificaciones a la Política de Privacidad
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  El Administrador se reserva el derecho de modificar,
                  actualizar o corregir la presente Política de Privacidad en
                  cualquier momento para adaptarla a nuevas exigencias
                  legislativas, jurisprudenciales, regulatorias o por
                  decisiones de optimización comercial de la Plataforma.
                  Cualquier cambio sustancial será notificado a los Usuarios
                  mediante avisos destacados en la interfaz de{" "}
                  {siteConfig.domain} o a través del correo electrónico
                  registrado por el Usuario en su perfil. El uso continuo de
                  la Plataforma con posterioridad a dicha notificación
                  implicará la aceptación plena de las modificaciones
                  introducidas.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink-900">
                9. Contacto y domicilio especial
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-paper-muted">
                <p>
                  Para la atención de consultas, solicitudes de actualización
                  o ejercicio de los derechos de protección de datos
                  personales, {siteConfig.legalName} constituye su domicilio
                  legal administrativo en {siteConfig.address} y el correo
                  electrónico institucional de soporte técnico en{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-ink-900 underline decoration-paper-line underline-offset-2 hover:text-brass-600"
                  >
                    {siteConfig.email}
                  </a>
                  .
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
