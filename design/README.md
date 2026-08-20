# Carpeta de diseño

Espacio de trabajo para los entregables visuales del proyecto. La especificación completa está en `00_brief/Brief_Diseno_Wireframes.md`; este archivo solo explica dónde va cada cosa.

## Estructura

| Carpeta | Qué se guarda aquí |
|---|---|
| `00_brief/` | El brief de diseño. Documento de entrada para la sesión de Claude Design |
| `01_tokens/` | Paleta verificada, escala tipográfica, `tokens.css` y `tokens.json` |
| `02_componentes/` | Una lámina por componente, con todas sus variantes y estados |
| `03_wireframes/` | Una lámina por pantalla: baja fidelidad primero, alta fidelidad después |
| `04_prototipo/` | Prototipo navegable en HTML autocontenido |
| `05_exportes/` | Versiones listas para el informe y la sustentación (PNG a 2× o SVG) |
| `_revisiones/` | Iteraciones descartadas, con una línea de motivo en el nombre o en una nota adjunta |

## Convención de nombres

| Tipo | Patrón | Ejemplo |
|---|---|---|
| Componente | `comp_<nombre>_v<n>.<ext>` | `comp_tarjeta-plato_v2.html` |
| Wireframe | `<ID>_<nombre>_v<n>_<tema>.<ext>` | `P-03_detalle-plato_v1_claro.png` |
| Alta fidelidad | `<ID>_<nombre>_hf_v<n>_<tema>.<ext>` | `P-02_carta_hf_v1_oscuro.png` |

`<tema>` toma los valores `claro` u `oscuro`. Se numera desde `v1` y no se sobrescribe: cada iteración incrementa el número y la anterior se mueve a `_revisiones/`.

## Orden de trabajo

1. Fichas de diseño → `01_tokens/`
2. Componentes → `02_componentes/`
3. Wireframes de baja fidelidad → `03_wireframes/`
4. Alta fidelidad de las cinco pantallas principales → `03_wireframes/`
5. Prototipo navegable → `04_prototipo/`
6. Auditoría de accesibilidad y exportes → `05_exportes/`

Cada etapa depende de la anterior. Los prompts para cada una están en la §7 del brief.

## Antes de dar por cerrada una pantalla

Contrastarla contra los criterios de aceptación de la §8 del brief. Los tres que con más frecuencia se pasan por alto:

- Los estados vacío, de carga y de error están diseñados, no solo el estado principal.
- Ninguna información se transmite únicamente por color.
- Todo control deshabilitado explica por qué lo está.
