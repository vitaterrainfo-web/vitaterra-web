# Vitaterra — Prompts para fotos del Fideicomiso Agro Ganadero (Higgsfield)

## Criterio de estilo

A diferencia de los prompts de logo (vectorial/plano), acá el objetivo es **fotografía editorial de altísima gama**, tipo campaña de agronegocio internacional — no ilustración, no render 3D estilizado, no look genérico de IA. Cada prompt está escrito desde un rol de **director de fotografía profesional**: especifica cuerpo/óptica de cámara real, hora del día y calidad de luz, composición y tratamiento de color, como si el resultado hubiera sido capturado con el mejor equipo fotográfico disponible hoy. Reemplaza las 4 fotos de stock genéricas del carrusel por imágenes con identidad propia del proyecto.

Modelo usado: **Seedream 5.0 (Pro)** en Higgsfield, 16:9, máxima calidad disponible.

Tip general: cerrar siempre con `no text, no watermark, no illustration, no 3D render, no CGI, no oversaturation, no AI artifacts` para blindar contra los defectos típicos de generación.

---

### Prompt 1 — Respaldo Patrimonial Tangible (tierra propia)
```
Ultra-high-resolution aerial photograph of productive Argentine pampas farmland at golden hour, shot from a professional cinema drone (DJI Inspire 3 with Zenmuse X9-8K Gimbal Camera, 8K sensor) at 120 meters altitude, straight-line composition following a dirt road that bisects vivid green and amber cultivated fields toward a distant estancia silhouette, low warm sidelight raking across the crop rows creating long soft shadows and micro-texture detail in the vegetation, subtle atmospheric haze on the horizon, natural but rich color grade reminiscent of a National Geographic agribusiness feature, tack-sharp foreground with gentle falloff toward the horizon, professional aerial cinematography, no text, no watermark, no illustration, no 3D render, no CGI, no oversaturation, no AI artifacts
```

### Prompt 2 — Escalamiento Porcino Progresivo
```
Professional editorial photograph inside a state-of-the-art technified pig nursery facility, shot on a Hasselblad X2D 100C with a 45mm f/3.5 lens at f/5.6 for crisp edge-to-edge sharpness, soft diffused daylight pouring through translucent polycarbonate roof skylights creating even, shadowless illumination typical of high-end agribusiness reportage, rows of healthy pink piglets in immaculate galvanized-steel pens with modern automatic feeders, clean concrete flooring, shallow atmospheric depth with a soft bokeh gradient toward the far end of the barn, true-to-life skin tones and material textures (steel, straw, concrete), composed with a low three-quarter angle for a sense of scale, corporate agribusiness campaign quality, no text, no watermark, no illustration, no 3D render, no CGI, no oversaturation, no AI artifacts
```

### Prompt 3 — Feedlot Bovino Integrado
```
Wide-angle documentary photograph of a modern cattle feedlot in the Argentine countryside, shot on a Sony A1 II with a 24-70mm GM lens at 35mm, warm late-afternoon backlight cutting through rising dust particles to create visible volumetric light rays (god rays) over the cattle line, healthy well-fed cattle along a clean concrete feed bunk, galvanized metal corral fencing leading the eye into the distance, rich earthy color palette of ochre dust, dark cattle hides and golden sky, fine detail retention in hide texture and dust atmosphere, shot slightly low to the ground to emphasize scale and depth, editorial agribusiness photography with a cinematic golden-hour grade, no text, no watermark, no illustration, no 3D render, no CGI, no oversaturation, no AI artifacts
```

### Prompt 4 — Soberanía e Infraestructura de Acopio (silos)
```
Wide establishing photograph of a modern grain silo storage complex in the Argentine countryside, shot on a Phase One XF IQ4 150MP medium-format camera with a 40mm lens for maximum resolution and dynamic range, tall brushed-metal silos catching warm late-afternoon sun against a vast open sky with soft cirrus clouds, loaded grain trucks parked in the foreground on a dirt yard with fine dust texture, crisp architectural lines and realistic specular highlights on the corrugated metal silo walls, deep shadow detail and balanced highlight rolloff typical of high-dynamic-range commercial photography, symmetric wide-angle composition, industrial agribusiness campaign aesthetic, no text, no watermark, no illustration, no 3D render, no CGI, no oversaturation, no AI artifacts
```

### Prompt 5 — Integración Vertical y Distribución (opcional, quinta imagen)
```
Clean editorial photograph of a refrigerated meat distribution truck loading at a modern processing facility in rural Argentina at early morning blue hour transitioning to sunrise, shot on a Leica SL3 with a 35mm Summilux lens wide open at f/1.8 for a subtle falloff on the background while keeping the truck and loading dock tack-sharp, cool ambient light mixing with warm practical facility lighting for a natural color contrast, visible breath-mist and light steam in the cool morning air, polished stainless-steel and concrete surfaces with realistic reflections, professional logistics and cold-chain agribusiness photography, no text, no watermark, no illustration, no 3D render, no CGI, no oversaturation, no AI artifacts
```

## Notas de uso
- Generá 3-4 semillas por prompt y quedate con la que tenga mejor composición y menos artefactos (dedos/patas raras, texto inventado, etc. son comunes en fotos con animales).
- Exportá en la orientación 16:9 o lo más panorámica posible — el carrusel las muestra en 16:9 con recorte `object-cover`.
- Reemplazar en `public/images/agroganadero/foto-1.jpeg` a `foto-4.jpeg` (o agregar `foto-5` si sumamos la quinta).
