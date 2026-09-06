// Autenticación de demo para el panel de fiduciantes — sin backend real todavía.
// Simula el flujo que pidió el cliente tras probar el panel de Bricksave:
// login -> código de verificación por mail -> validación de identidad (KYC).
// Persistencia en localStorage, misma convención que lib/auth.ts en Cienfuegos/Santa Diabla.

const SESSION_KEY = "vitaterra_panel_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 horas

export const DEMO_EMAIL = "demo@vitaterradesarrollos.com.ar";
export const DEMO_PASSWORD = "vitaterra2026";

type SessionStage = "password" | "otp" | "kyc" | "done";

type Session = {
  email: string;
  stage: SessionStage;
  expiresAt: number;
};

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Session;
    if (parsed.expiresAt < Date.now()) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: Session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function checkPassword(email: string, password: string) {
  if (email.trim().toLowerCase() !== DEMO_EMAIL) return false;
  if (password !== DEMO_PASSWORD) return false;
  writeSession({
    email,
    stage: "otp",
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  return true;
}

// Cualquier código de 6 dígitos es válido: es una demo, no envía mail real todavía.
export function checkOtp(code: string) {
  const session = readSession();
  if (!session) return false;
  if (!/^\d{6}$/.test(code)) return false;
  writeSession({ ...session, stage: "kyc", expiresAt: Date.now() + SESSION_TTL_MS });
  return true;
}

export function completeKyc() {
  const session = readSession();
  if (!session) return false;
  writeSession({ ...session, stage: "done", expiresAt: Date.now() + SESSION_TTL_MS });
  return true;
}

export function getStage(): SessionStage | null {
  return readSession()?.stage ?? null;
}

export function isFullyVerified() {
  return getStage() === "done";
}

export function logout() {
  window.localStorage.removeItem(SESSION_KEY);
}
