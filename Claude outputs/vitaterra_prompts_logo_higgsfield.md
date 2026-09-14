# Vitaterra — Prompts para modernizar el logo (Higgsfield)

## 1. Diagnóstico del logo actual

El logo actual (monograma "V" + "T" en trazo fino, gradiente verde-dorado, hojita) tiene un problema de fondo: **el estilo de gradiente verde-a-dorado con trazo delgado es el look genérico de los generadores automáticos de logos** (Looka, Brandmark, etc.) para cualquier marca "natural" — spa, cosmética orgánica, wellness. No comunica nada de lo que realmente es Vitaterra según su propio material de marca (revisé los documentos y el logo alternativo guardados en la carpeta del proyecto):

- Es una **plataforma de fideicomisos privados** (agroganadero, inmobiliario en pozo, flota comercial de vehículos) que maneja capital de terceros. Necesita transmitir **solidez institucional y confianza fiduciaria**, no estética de wellness.
- Su discurso de marca insiste todo el tiempo en "economía real", "patrimonio separado y blindado", "activos tangibles" (tierra, hacienda, vehículos) — todo lo opuesto a lo abstracto/decorativo.
- Evitan deliberadamente la estética fintech/bursátil (nada de gráficos de acciones, billeteras, íconos bancarios) pero también necesitan diferenciarse de un logo "de rubro alimenticio" puro.
- Encontré también un boceto descartable en la carpeta (medallón bronce con vaca y chancho) — confirma que ya probaron el camino "ilustración literal de campo" y no es la dirección correcta: es demasiado kitsch/vintage para una fiduciaria que además vende flotas de vehículos e inmuebles.

**Conclusión:** hay que sacar el gradiente brillante, bajar un cambio la decoración (hojita, cursiva), y construir un símbolo geométrico y sobrio que combine: tierra/campo + crecimiento patrimonial + solidez institucional — sin volverse literal ni fintech.

## 2. Dirección de marca sugerida

**Paleta:** colores planos (sin gradiente), tono mate/institucional.
- Verde bosque oscuro `#1F3D2C` o verde oliva profundo `#2E3B24` (tierra, agro, estabilidad)
- Bronce/dorado mate `#A9803E` o `#B08D57` (patrimonio, valor — nunca dorado brillante tipo "premio")
- Neutro para textos: grafito casi negro `#1A1A1A` o crema hueso `#F5F1E8` de fondo

**Estilo:** vectorial plano (flat), geométrico, una sola línea de peso constante o formas sólidas — nada de gradientes, brillos metálicos ni ilustración fotorrealista.

**Símbolo:** conservar la "V" como núcleo (identidad ya instalada), pero integrarla con una línea de horizonte (tierra/campo) y, opcionalmente, un quiebre que sugiera crecimiento (como una curva ascendente sutil) en lugar de la hoja decorativa suelta.

## 3. Prompts listos para Higgsfield

Tip general: agregá siempre `flat vector logo, isolated on white background, no gradient, no photorealism, high resolution` al final de cualquier prompt en Higgsfield — así evitás que el modelo tire hacia foto/3D. Generá varias semillas de cada prompt y quedate con la que tenga mejor equilibrio de espacio negativo.

---

### Prompt 1 — Monograma geométrico (evolución directa del actual)
```
Minimalist modern monogram logo combining the letters "V" and "T" into a single elegant symbol, flat vector design, single continuous line of constant width, clean geometric silhouette, no gradients, solid deep forest green (#1F3D2C) with one matte bronze accent line (#A9803E), a subtle horizon line beneath the monogram suggesting land and stability, no decorative leaf, circular thin outline optional, centered composition, plain white background, corporate trust and finance aesthetic, flat vector logo, no 3D, no gradient, no shadow, no text
```

### Prompt 2 — Emblema institucional (sello de fideicomiso)
```
Modern institutional emblem logo for a private trust holding company, circular badge, minimal geometric line art forming an abstract wheat stalk merging with a subtle upward growth line and a stylized letter V at the center, flat two-color design: matte bronze gold line (#A9803E) on deep forest green background (#1F3D2C), financial and agricultural symbolism combined in an abstract way, serious and trustworthy, private bank/trust aesthetic, flat vector illustration, no gradient, no embossed metal, no realistic texture, plain background, no text
```

### Prompt 3 — Ícono abstracto (agro + inversión + flota)
```
Abstract minimalist logo icon representing land, growth and motion: one continuous elegant line forming a stylized letter V that flows into a horizon curve and a subtle forward chevron suggesting vehicles in motion, flat vector, two-tone palette of deep olive green (#2E3B24) and matte bronze gold (#A9803E), no gradient, precise geometric shapes, clean negative space, financial and agribusiness holding company identity, centered on white background, no text, no shadow, no 3D
```

### Prompt 4 — Wordmark moderno con ícono integrado
```
Modern wordmark logo for "VITATERRA", geometric sans-serif typography, all caps, wide letter spacing, solid deep forest green color (#1F3D2C), small integrated icon to the left of the text combining a minimal V-shaped horizon/leaf symbol in matte bronze gold (#A9803E), flat vector design, no gradient, no shadow, no glossy metallic effect, financial trust and agribusiness brand identity, clean corporate look, plain white background
```

### Prompt 5 — Versión ícono de app / favicon (simplificada)
```
Ultra-minimal single-color logo icon, simplified geometric V monogram with a small horizon line beneath it, flat vector, monochrome deep forest green or bronze gold, must stay legible at very small sizes, enclosed in a soft rounded square or circle badge, no gradient, no fine detail, high contrast silhouette, white or transparent background, app icon style
```

### Prompt 6 — Variante "sello dorado sobrio" (para papelería / documentos formales)
```
Elegant minimal seal-style logo mark for a private financial trust, thin bronze gold line (#A9803E) forming a circular frame around a geometric V and horizon symbol, flat design with matte gold tone only (no gradient, no shine), engraved-line aesthetic rather than 3D embossed metal, dark green or cream background, formal and understated, suitable for legal documents and certificates, flat vector, no text, no photorealism
```

---

## 4. Qué pedirle a Higgsfield si el resultado sale muy "decorativo"

Si el modelo insiste en meter gradientes u hojas sueltas, agregá al final:
```
--no gradient, no watercolor, no realistic leaves, no glossy shine, no 3D render, no drop shadow, no clipart style
```

Y si sale muy plano/sin personalidad, podés pedir una sola variación con textura sutil:
```
add a very subtle brushed-metal matte texture only on the bronze accent, keep everything else flat
```
