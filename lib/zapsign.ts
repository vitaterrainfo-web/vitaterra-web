// Integración con la API de ZapSign para la firma electrónica del Convenio
// de Adhesión. Requiere ZAPSIGN_API_TOKEN y ZAPSIGN_TEMPLATE_ID en el
// entorno del servidor — nunca se exponen al cliente. Ver .env.local.example.

const ZAPSIGN_BASE_URL = "https://api.zapsign.com.br/api/v1";

// Datos fijos del Fideicomiso Agroganadero Vita Terra (no cambian por
// fiduciante). Completar con los datos reales de la cuenta bancaria
// fiduciaria antes de firmar convenios en producción.
const DATOS_FIDEICOMISO_AGROGANADERO = {
  CUIT_FIDEICOMISO: "TODO-CUIT-DEL-FIDEICOMISO",
  BANCO: "TODO-BANCO",
  TIPO_CUENTA: "TODO-TIPO Y NÚMERO DE CUENTA",
  CBU: "TODO-CBU-22-DIGITOS",
  ALIAS_CBU: "TODO-ALIAS",
};

export type DatosAdhesion = {
  nombreCompleto: string;
  documento: string;
  domicilio: string;
  email: string;
  telefono: string;
  tramo: string;
  montoUsd: string;
  montoUsdLetras: string;
  montoArs: string;
  esPep: "Sí" | "No";
};

type ZapSignSignerResponse = {
  token: string;
  sign_url: string;
};

type ZapSignCreateDocResponse = {
  token: string;
  status: string;
  signers: ZapSignSignerResponse[];
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Revisá .env.local.example.`
    );
  }
  return value;
}

function hoyEnPalabras() {
  const hoy = new Date();
  return {
    dia: String(hoy.getDate()),
    mes: hoy.toLocaleDateString("es-AR", { month: "long" }),
    anio: String(hoy.getFullYear()),
  };
}

// Crea el Convenio de Adhesión a partir de la plantilla de ZapSign y
// devuelve el link de firma para redirigir al fiduciante.
export async function crearConvenioDeAdhesion(datos: DatosAdhesion) {
  const apiToken = getEnv("ZAPSIGN_API_TOKEN");
  const templateId = getEnv("ZAPSIGN_TEMPLATE_ID_AGROGANADERO");
  const { dia, mes, anio } = hoyEnPalabras();

  const variables: Record<string, string> = {
    DIA: dia,
    MES: mes,
    ANIO: anio,
    NOMBRE_COMPLETO: datos.nombreCompleto,
    DOCUMENTO: datos.documento,
    DOMICILIO: datos.domicilio,
    EMAIL: datos.email,
    TELEFONO: datos.telefono,
    TRAMO: datos.tramo,
    MONTO_USD: datos.montoUsd,
    MONTO_USD_LETRAS: datos.montoUsdLetras,
    MONTO_ARS: datos.montoArs,
    ES_PEP: datos.esPep,
    ...DATOS_FIDEICOMISO_AGROGANADERO,
  };

  const res = await fetch(`${ZAPSIGN_BASE_URL}/models/create-doc/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template_id: templateId,
      signer_name: datos.nombreCompleto,
      signer_email: datos.email,
      lang: "es",
      send_automatic_email: true,
      external_id: `adhesion-agroganadero-${datos.documento}-${Date.now()}`,
      data: Object.entries(variables).map(([de, para]) => ({
        de: `{{${de}}}`,
        para,
      })),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ZapSign respondió ${res.status}: ${body}`);
  }

  const json = (await res.json()) as ZapSignCreateDocResponse;
  const signer = json.signers[0];

  return {
    documentoToken: json.token,
    signerToken: signer?.token,
    signUrl: signer?.sign_url,
  };
}
