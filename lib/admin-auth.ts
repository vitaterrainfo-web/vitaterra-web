// Autenticación de demo para el panel de administración de Grupo Agro SRL — sin backend real todavía.
// A diferencia del panel de fiduciantes, el personal interno no pasa por OTP ni KYC:
// solo email + contraseña -> sesión. Persistencia en localStorage, clave separada
// de la del panel de fiduciantes (lib/panel-auth.ts).

const SESSION_KEY = "vitaterra_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 horas

export const ADMIN_EMAIL = "vitaterra.info@gmail.com";
export const ADMIN_PASSWORD = "Vitaterra.Grupoagro";

type Session = {
  email: string;
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

export function checkAdminLogin(email: string, password: string) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) return false;
  if (password !== ADMIN_PASSWORD) return false;
  writeSession({ email, expiresAt: Date.now() + SESSION_TTL_MS });
  return true;
}

export function isAdminAuthenticated() {
  return readSession() !== null;
}

export function adminLogout() {
  window.localStorage.removeItem(SESSION_KEY);
}
