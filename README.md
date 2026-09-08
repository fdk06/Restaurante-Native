# El Encanto Campestre - Aplicación Móvil

Proyecto académico desarrollado para la asignatura Electiva V (Desarrollo Móvil, semestre agosto - noviembre 2026). Estamos construyendo una aplicación móvil para el restaurante campestre El Encanto Campestre, ubicado en la vereda Las Huacas (Timbío, Cauca).

La app incluye carta digital dinámica según el día de atención, sistema de reservas donde el cliente envía su solicitud y el dueño la aprueba manualmente tras verificar el pago, muro de noticias y avisos informativos sobre futuras atracciones del restaurante (pista de motos y zona de pesca).

Para conocer las normas de trabajo, commits y estabilidad de ramas del equipo, revisar [Reglas.md](Reglas.md).

---

## Integrantes del equipo

* Alex Santacruz
* Fabián Hoyos
* Yeison Muñoz

---

## Estructura del proyecto

| Carpeta | Descripción |
|---|---|
| [`docs/`](docs) | Documentos de análisis, especificación de requisitos (ERS), cronograma y backlog del proyecto |
| [`design/`](design) | Sistema de diseño de la app: tokens de color y tipografía, biblioteca de componentes en HTML y wireframes |

---

## Documentación del proyecto (`docs/`)

En esta carpeta dejamos todo el análisis y diseño técnico antes de pasar al código:

| Archivo | Contenido |
|---|---|
| [`Requisitos_del_Sistema.md`](docs/Requisitos_del_Sistema.md) / [`.docx`](docs/Requisitos_del_Sistema.docx) | Especificación de Requisitos del Sistema (ERS): requisitos funcionales, no funcionales, reglas de negocio y matriz de trazabilidad con los sprints |
| [`Sprint0_Analisis_y_Diseno.md`](docs/Sprint0_Analisis_y_Diseno.md) | Documento principal de análisis: problema de negocio, casos de uso, modelo de base de datos relacional y pantallas iniciales |
| [`Plan_de_Sprints.md`](docs/Plan_de_Sprints.md) | Cronograma general de trabajo del 28 de agosto al 13 de noviembre de 2026, organizado semana a semana |
| [`Backlog_Jira.md`](docs/Backlog_Jira.md) / [`.csv`](docs/Backlog_Jira.csv) | Historias de usuario con sus criterios de aceptación técnicos y archivo CSV listo para importar en Jira |
| [`Decisiones_Pendientes_y_Riesgos.md`](docs/Decisiones_Pendientes_y_Riesgos.md) | Registro de decisiones técnicas y acuerdos con el cliente (tanto lo acordado como lo que sigue en discusión) |
| [`diagramas/`](docs/diagramas) | Diagramas vectoriales SVG: modelo entidad-relación, estados de una reserva, arquitectura de componentes, compartir por WhatsApp, mapa de navegación y cronograma |

---

## Sistema de diseño (`design/`)

Todo el diseño visual lo construimos en HTML y CSS puro para poder previsualizarlo en el navegador sin dependencias externas. Las pantallas clave también cuentan con su captura en PNG para revisarlas rápidamente.

Las convenciones de nombres y la guía de diseño están en [`design/README.md`](design/README.md).

| Carpeta | Contenido | Estado |
|---|---|---|
| [`00_brief/`](design/00_brief) | Documento de requerimientos visuales y pautas de interfaz | Completado |
| [`01_tokens/`](design/01_tokens) | Paleta de colores, tipografía y espaciado con contraste accesible. Archivos `tokens.css` y `tokens.json` | Completado |
| [`02_componentes/`](design/02_componentes) | Biblioteca de componentes (botones, campos de texto, tarjetas, barra de navegación), dividida en 7 lotes (29 componentes) | Completado |
| [`03_wireframes/`](design/03_wireframes) | Pantallas del sistema. Las 5 principales están en alta fidelidad: Carta (P-01), Detalle de plato (P-02), Pedido opcional (P-07), Solicitud enviada (P-09) y Solicitudes del dueño (P-22) | 5 pantallas clave listas |
| [`04_prototipo/`](design/04_prototipo) | Prototipo navegable en HTML para validar el flujo completo | Pendiente |
| [`05_exportes/`](design/05_exportes) | Exportes en imagen para el informe técnico y diapositivas de sustentación | Pendiente |
| [`_revisiones/`](design/_revisiones) | Versiones anteriores y descartadas durante las revisiones | Histórico |

El diseño soporta modo claro y oscuro desde el inicio, cumple con contraste visual AA (WCAG) y está dimensionado para pantallas estándar de 360x800 dp, tal como lo definimos en el brief de diseño.
