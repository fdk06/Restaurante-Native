# Carpeta de Diseño

Espacio de trabajo para los entregables visuales y la interfaz del proyecto. La especificación completa y los requisitos de cada pantalla están en `00_brief/Brief_Diseno_Wireframes.md`; aquí resumimos la organización de los archivos.

---

## Estructura de carpetas

| Carpeta | Qué guardamos aquí |
|---|---|
| `00_brief/` | El brief de diseño con las pautas visuales y requisitos de interfaz |
| `01_tokens/` | Paleta de color verificada, escala de tipografía y archivos `tokens.css` y `tokens.json` |
| `02_componentes/` | Archivo HTML por componente, mostrando sus estados (activo, presionado, deshabilitado) |
| `03_wireframes/` | Pantallas de la app: baja fidelidad inicial y alta fidelidad definitiva con sus capturas PNG |
| `04_prototipo/` | Prototipo navegable en HTML para validar el flujo completo de la app |
| `05_exportes/` | Imágenes finales listas para el informe escrito y la presentación de sustentación |
| `_revisiones/` | Bocetos o pantallas anteriores que descartamos durante las revisiones |

---

## Convención para nombrar archivos

| Tipo | Patrón | Ejemplo |
|---|---|---|
| Componente | `comp_<nombre>_v<n>.<ext>` | `comp_tarjeta-plato_v2.html` |
| Wireframe | `<ID>_<nombre>_v<n>_<tema>.<ext>` | `P-03_detalle-plato_v1_claro.png` |
| Alta fidelidad | `<ID>_<nombre>_hf_v<n>_<tema>.<ext>` | `P-02_carta_hf_v1_oscuro.png` |

`<tema>` toma los valores `claro` u `oscuro`. Empezamos siempre desde `v1` y no sobreescribimos archivos: si hacemos cambios mayores aumentamos la versión y la anterior la pasamos a `_revisiones/`.

---

## Orden de trabajo que seguimos

1. Fichas y tokens de diseño (`01_tokens/`)
2. Biblioteca de componentes base (`02_componentes/`)
3. Wireframes en baja fidelidad (`03_wireframes/`)
4. Pantallas en alta fidelidad (`03_wireframes/`)
5. Prototipo navegable en HTML (`04_prototipo/`)
6. Revisión de accesibilidad y exporte de imágenes (`05_exportes/`)

Cada etapa se apoya en la anterior. Los requerimientos específicos de cada pantalla están detallados en la sección 7 del brief.

---

## Lista de chequeo antes de cerrar una pantalla

Antes de dar por terminada una pantalla, verificamos:

* Que los estados vacío, de carga (esqueleto) y de error estén contemplados, no solo el estado con datos listos.
* Que ninguna información dependa únicamente del color para entenderse.
* Que cualquier botón o control deshabilitado explique claramente al usuario por qué no se puede presionar.
