# GUÍA MAESTRA — Skills, Agentes y MCP de Claude Code

Última actualización: 2026-08-13. Este archivo reemplaza a las copias sueltas
"GUIAS PARA SKILLS Y AGENTES- AYUDA MEMORIA.md" que había duplicadas en
`NEURAL\SKILLS\`, `NEURAL\AYUDA MEMORIAS\` y `LOSCO\SKILLS\` (estaban
desactualizadas: asumían 48 skills y agentes ya instalados globalmente, pero
esas carpetas no existían hasta hoy). Esas tres copias stale ya se borraron.

Una copia de este archivo vive ahora en `[cada-proyecto]\skills-y-agentes\`
(carpeta creada el 13/08 en los 8 proyectos de `PROGRAMACION\`) junto con,
en el caso de `NEURAL`, la guía práctica paso a paso
`GUIA PARA UTILIZAR ESPACIO DE TRABAJO Y SKILLS.md` (distinta de esta: esa
es un tutorial corto de "cómo arrancar un proyecto nuevo", esta es el
catálogo completo). Si actualizás este archivo, actualizá también las copias
en cada `skills-y-agentes\` (no hay symlink, son copias planas).

`LOSCO\SKILLS\` se eliminó por ser un duplicado byte-a-byte de `NEURAL\SKILLS\`
(11MB: mismo clon de `skills-repo`, misma copia del workspace template).
`NEURAL\SKILLS\` queda como única copia de ese backup/clon.

Usá este archivo como punto de partida cada vez que arranques un proyecto
nuevo en `PROGRAMACION\`.

---

## 1. Estado real del sistema (verificado hoy)

| Ubicación | Contenido |
|---|---|
| `C:\Users\Administrador\.claude\skills\` | **48 skills** instaladas globalmente (recién instaladas hoy — antes la carpeta no existía) |
| `C:\Users\Administrador\.claude\agents\` | **256 agentes** especializados instalados globalmente (recién instalados hoy, repo `agency-agents`) |
| `C:\Users\Administrador\.claude\settings.json` | Plugin `ui-ux-pro-max` activo (marketplace `nextlevelbuilder/ui-ux-pro-max-skill`) |
| `NEURAL\espacio-de-trabajo-claude\` | Workspace template activo (comandos `/iniciar`, `/crear-plan`, `/implementar`) |
| `NEURAL\WEB\` | Copia del workspace template, ya usada como proyecto real |
| `LOSCO\SKILLS\` y `NEURAL\SKILLS\` | Repositorio fuente de las skills (`skills-repo`, clon git) + copia de referencia del workspace template + plantilla `claude_modal` (endpoints Python/Modal para n8n) |

Las skills y agentes ahora están instalados **globalmente**, así que cualquier
proyecto nuevo los tiene disponibles automáticamente sin copiar nada — Claude
Code las activa solo por contexto (skills) o cuando las invocás por nombre
(agentes).

---

## 2. Mapa de proyectos en PROGRAMACION

Actualizado el 13/08 — se agregaron `CLAUDE.md` y `.mcp.json` (donde faltaban
y se conocía el project_ref de Supabase) sin tocar código ni variables de
entorno existentes.

| Carpeta | Qué es | Config Claude Code |
|---|---|---|
| `BARBERIA SAAS` | Carpeta vacía — solo tiene `.claude/settings.local.json`, sin código de app. Parece un placeholder abandonado; el proyecto real de "gestor de barberías" vive en `GESTOR-BARBERIAS`/`GESTOR-BARES`. | `.claude/settings.local.json` (permisos) — no se le agregó nada más al no haber app que documentar |
| `GESTOR-BARBERIAS` | App Next.js 15 + Supabase, gestión de barberías (demo single-tenant). Mismo proyecto de Supabase que `GESTOR-BARES` (`gkgnhjntkewqzhzkmxzz`) — parecen ser dos copias del mismo demo. | **Agregado hoy:** `CLAUDE.md` + `.mcp.json` (Supabase MCP) |
| `GESTOR-BARES` | App Next.js 15 + Supabase, gestión de bares/barberías. | `.mcp.json` → MCP server de **Supabase** (proyecto `gkgnhjntkewqzhzkmxzz`). **Agregado hoy:** `CLAUDE.md` |
| `CIENFUEGOS COTILLON WEB\CIENFUEGOS` | Web de cotillón (Next.js + Supabase), repo git con worktrees | `.claude/skills/ui-ux-pro-max` local + `CLAUDE.md` con reglas de estilo de respuesta. Sin `.mcp.json` (project_ref solo en Vercel) — queda así a propósito, no es prioridad |
| `LOSCO` | App Next.js (con IMÁGENES, SKILLS de referencia) | `CLAUDE.md` → `AGENTS.md` (reglas de Next.js, generadas por `next dev`) |
| `MAXIPIZZA` | Solo assets (fotos de WhatsApp), sin código | — |
| `NEURAL` | Hub central: workspace template, skills-repo, notas de marca | `.claude/skills` activo en subcarpetas `WEB` y `espacio-de-trabajo-claude` |
| `SANTA DIABLA\WEB` | App Next.js + Supabase + MercadoPago, tienda online. Ya tenía `CONTEXT.md` propio. | `.claude/settings.local.json`. **Agregado hoy:** `CLAUDE.md` (importa `@CONTEXT.md`) + `.mcp.json` (Supabase MCP, proyecto `lzvhgukdjuyitxuclmzw`) |

---

## 3. Catálogo de las 48 skills instaladas (`~\.claude\skills\`)

Se activan solas según el contexto de lo que pidas — no hace falta invocarlas
por nombre (salvo que uses `/nombre-skill` si el skill define un comando).

### Desarrollo web / código
| Skill | Para qué |
|---|---|
| `frontend-design` | Interfaces web con calidad de diseño alta, sin estética genérica de IA |
| `web-security` | Seguridad production-grade en cualquier endpoint/API/formulario (rate limiting, validación, headers, auth) |
| `web-artifacts-builder` | Artifacts HTML complejos multi-componente (React, Tailwind, shadcn/ui) |
| `mcp-builder` | Crear servidores MCP propios (Python FastMCP o Node/TS) |
| `webapp-testing`* | Testing de apps web locales con Playwright |
| `code-reviewer`* | Revisión de código TS/JS/Python/Swift/Kotlin/Go |
| `skill-creator` | Crear, editar y medir el rendimiento de skills nuevas |

### Marketing, ventas y crecimiento
| Skill | Para qué |
|---|---|
| `claude-web-builder` | Landing pages completas (Next.js 15 + Tailwind + shadcn/ui) sin escribir código |
| `claude-seo` | 13 comandos SEO, auditoría técnica y `/seo-fix` automático |
| `claude-ads` | Gestión de campañas Google/Meta/YouTube/TikTok/LinkedIn/Microsoft con scoring |
| `marketing-skills` | 33 sub-skills de marketing (copywriting, email, CRO, pricing, social, etc.) |
| `auto-crm` | CRM local gratis con scoring de leads, pipeline kanban, WhatsApp |
| `scrapling` | Scraping de leads/prospectos desde Google Maps, directorios, redes |
| `whatsapp-agentkit` | Agente de WhatsApp con IA para un negocio en <30 min |
| `n8n-automation` | Diseño y debug de workflows de automatización n8n |
| `modal-n8n` | Endpoints Python en Modal para nodos HTTP de n8n |
| `all-deploy` | Deploy a producción con auditoría de seguridad integrada |
| `competitive-ads-extractor`* | Analiza anuncios de la competencia en Meta/LinkedIn Ad Library |
| `higgsfield-seedance` | Genera videos con IA en Higgsfield vía Playwright MCP |
| `video2website` | Convierte un video de producto en landing con scroll animation |
| `editor-pro-max` | Estudio de edición de video con IA (subtítulos, cortes de silencio) |
| `theme-factory` | 10 temas visuales pre-armados para artifacts/slides/docs |

### Diseño visual
| Skill | Para qué |
|---|---|
| `canvas-design` | Arte/posters originales en PNG/PDF |
| `algorithmic-art` | Arte generativo con p5.js |
| `brand-guidelines` | Aplica identidad de marca a cualquier artifact |
| `slack-gif-creator` | GIFs animados optimizados para Slack |

### Documentos y archivos
| Skill | Para qué |
|---|---|
| `pdf`, `pdf-reading`, `docx`, `pptx`, `xlsx` | Crear/leer/editar cada tipo de archivo de oficina |
| `file-reading` | Router: qué herramienta usar para leer un archivo subido |
| `doc-coauthoring` | Co-escritura de documentación, specs y propuestas |
| `internal-comms` | Comunicaciones internas de empresa (status reports, FAQs, incidentes) |

### Productividad personal / tareas administrativas
| Skill | Para qué |
|---|---|
| `event-planning`, `grocery-shopping`, `meal-delivery`, `hire-help`, `file-form`, `file-expenses`, `financial-calculator`, `call-to-book`, `cancel-unsubscribe`, `prescription-refill`, `return-refund`, `benepass-reimbursement` | Tareas de asistente personal (requieren capacidades de browser/computer-use) |

### Meta / utilidades
| Skill | Para qué |
|---|---|
| `find-skills` | Analiza el pedido y decide qué combinación de skills usar — activar siempre primero |
| `the-architect` | Arquitecto senior: entrevista al usuario y genera blueprint completo de un proyecto nuevo |
| `product-self-knowledge` | Consultar antes de afirmar datos sobre Claude Code/API/Claude.ai (evita alucinar specs) |
| `workspace-template` | Plantilla de workspace Claude Code (`CLAUDE.md`, `/iniciar`, `/crear-plan`, `/implementar`) |
| `agency-agents` | Puntero al repo de los 256 agentes (ver sección 4) |

\* Estas venían también en la copia local de `LOSCO/SKILLS/espacio-de-trabajo-claude - copia`
junto con otras que **no** se instalaron globalmente porque son roles que se
solapan con los agentes de la sección 4 (`senior-backend`, `senior-frontend`,
`senior-security`, `senior-prompt-engineer`, `seo-optimizer`,
`ui-design-system`, `api-security-best-practices`,
`supabase-postgres-best-practices`, `brainstorming`, `using-superpowers`,
`video-downloader`, `pdf-processing-pro`). Si las querés como skills globales
en vez de (o además de) los agentes equivalentes, decímelo y las copio.

Además está activo el **plugin `ui-ux-pro-max`** (no es una carpeta en
`skills/`, se gestiona como plugin): 84 estilos UI, 192 paletas, 74 pares de
fuentes, 98 guías UX, generación de logos/banners/CIP/slides.

---

## 4. Catálogo de agentes instalados (`~\.claude\agents\`)

256 agentes del repo [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents).
A diferencia de las skills, **no se activan solos** — hay que pedirlos por nombre:

```
Activate [Nombre del Agente] and [tarea]
```

### Por categoría (aprox.)
| Categoría | Cantidad | Ejemplos |
|---|---|---|
| `engineering-*` | 58 | frontend-developer, backend-architect, devops-automator, database-optimizer, sre, code-reviewer, ai-engineer |
| `marketing-*` | 36 | growth-hacker, content-strategist, email-marketer, reddit-community-ninja |
| `specialized-*` | 15 | roles de nicho (ver carpeta) |
| `gis-*` | 13 | sistemas de información geográfica |
| `security-*` | 12 | pentesting, threat-modeling, compliance |
| `sales-*` | 11 | prospección, cierre, account management |
| `design-*` | 10 | ui-designer, ux-architect, ux-researcher, whimsy-injector, brand-guardian |
| `testing-*` | 9 | QA, automatización de tests |
| `paid-media-*` | 7 | campañas pagas |
| `project-management-*` | 6 | gestión de proyectos |
| `healthcare-*` | 6 | dominio salud |
| `academic-*` | 6 | investigación, estadística |
| `support-*` | 6 | atención al cliente |
| `product-*` | 5 | product management |
| `finance-*` | 5 | finanzas |
| resto | ~30 | legal, xr, data, customer, terminal, retail, medical, orgánicos, etc. |

Lista completa: `ls "C:\Users\Administrador\.claude\agents"` o pedime que te
la filtre por tema.

### Agentes más usados (equipo base para un proyecto web/agencia)
| Agente | Para qué pedírselo |
|---|---|
| `engineering-frontend-developer` | Componentes React, UI, CSS |
| `engineering-backend-architect` | APIs, base de datos, lógica de servidor |
| `engineering-code-reviewer` | Revisión exhaustiva antes de deployar |
| `engineering-devops-automator` | CI/CD, Docker, deployment |
| `engineering-sre` | Confiabilidad, monitoreo, incidentes |
| `security-*` (elegir según el caso) | Auditar auth, vulnerabilidades, pentesting |
| `design-ui-designer` / `design-ux-architect` | Wireframes, flujos, UI |
| `design-whimsy-injector` | Elementos de deleite en el diseño |
| `marketing-growth-hacker` | Experimentos de crecimiento, funnels |
| `engineering-technical-writer` | Documentación, README, guías |

### Orquestación multi-agente
```
Activate the full engineering team to review this feature:
engineering-frontend-developer, engineering-backend-architect,
security-* y engineering-code-reviewer.
```

**Nota:** los nombres de archivo llevan prefijo de categoría
(`engineering-frontend-developer.md`) pero el campo `name:` interno suele ser
más corto ("Frontend Developer") — probá invocando por el nombre corto
primero.

---

## 5. Comandos del workspace template

Definidos en `NEURAL\espacio-de-trabajo-claude\.claude\commands\` (y su copia
en `NEURAL\WEB`):

| Comando | Para qué |
|---|---|
| `/iniciar` | Arrancar cualquier sesión — SIEMPRE primero, carga el contexto del `CLAUDE.md` |
| `/crear-plan [pedido]` | Planificar cambios antes de ejecutar |
| `/implementar [ruta-al-plan]` | Ejecutar un plan creado |
| `/find-skills [descripción]` (skill, no comando de archivo) | Elige qué skills usar para la tarea |

---

## 6. Conectores MCP disponibles

### En claude.ai / Claude Code (globales, requieren autenticación por servicio)
Canva, Figma, Gmail, Google Calendar, Google Drive, HIGSFIELD (imagen/video/audio/web IA),
Microsoft 365, Splice, Spotify, **Supabase**, Zapier.

### Por proyecto
| Proyecto | MCP server |
|---|---|
| `GESTOR-BARES` | Supabase HTTP MCP → `https://mcp.supabase.com/mcp?project_ref=gkgnhjntkewqzhzkmxzz` |

---

## 7. Cómo arrancar un proyecto nuevo (receta actualizada)

Ya no hace falta copiar skills a mano — están globales. Solo:

```powershell
# 1. Crear la carpeta y copiar el workspace template (comandos + estructura)
mkdir "C:\Users\Administrador\Desktop\PROGRAMACION\mi-proyecto"
Copy-Item -Recurse "C:\Users\Administrador\Desktop\PROGRAMACION\NEURAL\espacio-de-trabajo-claude\*" "C:\Users\Administrador\Desktop\PROGRAMACION\mi-proyecto\" -Force

# 2. Abrir y arrancar Claude Code
code "C:\Users\Administrador\Desktop\PROGRAMACION\mi-proyecto"
claude
```

En el chat:
```
/iniciar
quiero crear [lo que sea] para [negocio/cliente]
```

Claude activa las skills relevantes solo, y si necesitás un rol experto con
personalidad propia, lo pedís por nombre (sección 4).

---

## 8. Avisos de seguridad (importante, revisar)

1. **Token de servicio de Supabase expuesto en texto plano** en
   `C:\Users\Administrador\.claude\settings.json` (dentro de un permiso
   `Bash(curl ... Authorization: Bearer ...)` con la `service_role key` del
   proyecto `gkgnhjntkewqzhzkmxzz`). Esa key tiene acceso admin total a la
   base. Recomendado: rotarla desde el dashboard de Supabase y limpiar ese
   permiso del `settings.json`.
2. **Personal Access Token de GitHub expuesto** en el remoto git de
   `skills-repo` (`LOSCO\SKILLS\skills-repo\.git` y su copia en `NEURAL\SKILLS`),
   visible con `git remote -v` (usuario `djlucasruiz`). Recomendado: revocarlo
   en GitHub → Settings → Developer settings → Personal access tokens, y
   volver a clonar con SSH o un token nuevo que no quede en la URL del remoto.
3. **Links de phishing recibidos hoy** (13/08) desde un canal/broadcast
   llamado "Neural Digital Brand": `recursos-instagram.vercel.app/blindar`,
   `/cloudflare` y `/maps`, todos con un parámetro `mcp_token=...` — intentan
   que un cliente MCP se conecte y filtre acceso a tus cuentas. No se
   abrieron. Recomendado: salir de ese canal y no reenviar esos links.
