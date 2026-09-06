import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-paper-100/70">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo-vitaterra.jpeg"
                alt="Vitaterra"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="font-display text-lg font-semibold text-paper-50">
                Vitaterra
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-paper-100/60">
              En Vitaterra transformamos la forma de participar en los
              sectores más sólidos de la economía real. Somos una plataforma
              digital impulsada por la sinergia de nuestras empresas
              matrices, Vitaterra SRL y Grupo Agro SRL, nacida para
              simplificar el acceso a proyectos productivos tradicionales y
              tangibles.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-50/15 text-paper-100/70 transition-colors hover:border-brass-400 hover:text-brass-400"
              >
                <InstagramIcon />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-50/15 text-paper-100/70 transition-colors hover:border-brass-400 hover:text-brass-400"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-paper-50">
              Enlaces
            </h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper-100/60 transition-colors hover:text-brass-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="text-sm text-paper-100/60 transition-colors hover:text-brass-400"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-sm text-paper-100/60 transition-colors hover:text-brass-400"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-paper-50">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-paper-100/60">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {siteConfig.address}
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-paper-100/60 transition-colors hover:text-brass-400"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-paper-50/10 bg-ink-900/50 p-5">
          <p className="text-xs leading-relaxed text-paper-100/60">
            <strong className="text-paper-100/70">Aviso importante:</strong> la
            información expuesta en este sitio web es netamente descriptiva
            e informativa y no implica, bajo ninguna circunstancia, oferta
            pública de valores, invitación a la captación de ahorro público
            ni intermediación financiera en los términos de la Ley
            N.° 26.831 y Ley N.° 21.526. Las incorporaciones de participantes
            corresponden a Fideicomisos Privados Ordinarios regidos bajo el
            Código Civil y Comercial de la Nación Argentina, administrados
            por Grupo Agro SRL. Las proyecciones operativas corresponden a
            modelos estimativos de economía real sujetos a variaciones del
            sector productivo.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-paper-50/10 pt-6 text-xs text-paper-muted md:flex-row">
          <p>
            © {year} Vitaterra. La gestión de los fideicomisos privados y la
            ejecución de activos es operada en forma conjunta por Vitaterra
            SRL y Grupo Agro SRL. Todos los derechos reservados.
          </p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://www.neuraldigitalbrand.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-paper-100/60 hover:text-brass-400"
            >
              Neural Digital Brand
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
