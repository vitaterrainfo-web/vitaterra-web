export type EstadoFideicomiso = "En desarrollo" | "Flota en adquisición" | "Finalizado";

export type ActualizacionMensual = {
  mes: string;
  avance: number;
  nota: string;
};

export type Fideicomiso = {
  id: string;
  nombre: string;
  categoria: "Desarrollo Agroganadero" | "Flota Automotor";
  estado: EstadoFideicomiso;
  imagen: string;
  presupuestoMeta: number;
  moneda: "USD" | "ARS";
  ciclo: string;
  avanceFisico: number;
  modulosTotales: number;
  modulosAdjudicados: number;
  valorModulo: number;
  resultadosDistribuidosUsd: number;
  fiduciantesActivos: number;
  actualizaciones: ActualizacionMensual[];
};

// Datos de prueba — el Agroganadero usa las cifras reales de la ficha técnica
// entregada por el cliente; el de Flota es 100% mock para probar el panel.
export const FIDEICOMISOS: Fideicomiso[] = [
  {
    id: "agroganadero-vitaterra-i",
    nombre: "Fideicomiso Agro Ganadero Vita Terra",
    categoria: "Desarrollo Agroganadero",
    estado: "En desarrollo",
    imagen: "/images/agroganadero/foto-1.jpeg",
    presupuestoMeta: 1_000_000,
    moneda: "USD",
    ciclo: "30 años",
    avanceFisico: 34,
    modulosTotales: 200,
    modulosAdjudicados: 118,
    valorModulo: 5_000,
    resultadosDistribuidosUsd: 42_500,
    fiduciantesActivos: 37,
    actualizaciones: [
      { mes: "Julio 2026", avance: 22, nota: "Adquisición del campo productivo e instalación del primer núcleo de recría." },
      { mes: "Agosto 2026", avance: 28, nota: "Apertura del primer punto de venta de la red de distribución propia." },
      { mes: "Septiembre 2026", avance: 34, nota: "Inicio de obra de la planta de acopio y silos." },
    ],
  },
  {
    id: "flota-comercial-vitaterra",
    nombre: "Fideicomiso Flota Comercial Vita Terra",
    categoria: "Flota Automotor",
    estado: "Flota en adquisición",
    imagen: "/images/flota/foto-1.jpeg",
    presupuestoMeta: 500_000,
    moneda: "USD",
    ciclo: "10 años",
    avanceFisico: 20,
    modulosTotales: 100,
    modulosAdjudicados: 24,
    valorModulo: 5_000,
    resultadosDistribuidosUsd: 0,
    fiduciantesActivos: 9,
    actualizaciones: [
      { mes: "Agosto 2026", avance: 12, nota: "Compra de las primeras 3 unidades utilitarias." },
      { mes: "Septiembre 2026", avance: 20, nota: "Firma de los primeros contratos de logística corporativa." },
    ],
  },
];

export function formatUsd(n: number) {
  return `USD ${n.toLocaleString("es-AR")}`;
}

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// Convierte "Septiembre 2026" en un número ordenable cronológicamente.
// Necesario porque el orden de fila en la base (created_at) no es confiable
// cuando varias actualizaciones se insertan en el mismo INSERT -- filas con
// timestamps idénticos no tienen un orden garantizado.
export function mesOrden(mes: string): number {
  const [nombre, anio] = mes.trim().toLowerCase().split(" ");
  const idx = MESES_ES.indexOf(nombre);
  return Number(anio || 0) * 12 + (idx === -1 ? 0 : idx);
}

// Ruta pública de la ficha técnica de cada fideicomiso, para enlazar desde el panel.
export const FIDEICOMISO_SLUGS: Record<string, string> = {
  "agroganadero-vitaterra-i": "agroganadero",
  "flota-comercial-vitaterra": "flota",
};
