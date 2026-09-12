// Vita Terra tiene un solo usuario de administración (Grupo Agro SRL), sin
// roles ni multi-cuenta -- decisión explícita del cliente. El acceso admin
// se resuelve comparando el email de la sesión de Supabase contra esta
// constante, en vez de una tabla de roles.
export const ADMIN_EMAIL = "vitaterra.info@gmail.com";
