# El Encanto Campestre — App móvil

Proyecto académico (Electiva V · Desarrollo Móvil, agosto–noviembre 2026): una app para un
restaurante campestre en Timbío, Cauca. Carta digital que cambia según la fecha, reservas que
nacen como solicitud y las confirma el dueño, noticias del restaurante, y próximamente pista de
motos y zona de pesca. Ver [`docs/Sprint0_Analisis_y_Diseno.md`](docs/Sprint0_Analisis_y_Diseno.md)
para el contexto completo del producto.

## Estructura del repositorio

| Carpeta | Qué contiene |
|---|---|
| [`docs/`](docs) | Análisis, planeación y backlog del proyecto |
| [`design/`](design) | Sistema de diseño y mockups de la app — fichas, componentes, wireframes |

## `docs/` — Análisis y planeación

| Archivo | Contenido |
|---|---|
| [`Sprint0_Analisis_y_Diseno.md`](docs/Sprint0_Analisis_y_Diseno.md) | Documento base: análisis del negocio, requisitos, modelo de datos, pantallas. Todo lo demás parte de aquí |
| [`Plan_de_Sprints.md`](docs/Plan_de_Sprints.md) | Cronograma del 28 de agosto al 13 de noviembre de 2026, sprint por sprint |
| [`Backlog_Jira.md`](docs/Backlog_Jira.md) / [`.csv`](docs/Backlog_Jira.csv) | Épicas, historias de usuario y criterios de aceptación. El `.csv` se importa directo a Jira |
| [`Decisiones_Pendientes_y_Riesgos.md`](docs/Decisiones_Pendientes_y_Riesgos.md) | Registro de decisiones del proyecto — qué quedó acordado (✅) y qué sigue abierto (⬜) |
| [`diagramas/`](docs/diagramas) | Seis diagramas SVG: modelo entidad-relación, estados de una reserva, arquitectura de componentes, flujo de compartir por WhatsApp, mapa de navegación y cronograma de sprints |

## `design/` — Sistema de diseño y mockups

Cada archivo es HTML autocontenido (se abre solo, sin depender de otros); las cinco pantallas
de alta fidelidad además tienen su PNG al lado para verlas sin abrir código. El orden de
trabajo y la convención de nombres completa están en [`design/README.md`](design/README.md);
resumen:

| Carpeta | Qué contiene | Estado |
|---|---|---|
| [`00_brief/`](design/00_brief) | El brief de diseño que guía todo lo demás | ✅ |
| [`01_tokens/`](design/01_tokens) | Paleta, tipografía y espaciado, con verificación de contraste WCAG. `tokens.css` y `tokens.json` para traducir directo al código | ✅ |
| [`02_componentes/`](design/02_componentes) | Biblioteca de componentes (botones, campos, tarjetas, barra de navegación, etc.), por lotes | ✅ 7 de 7 lotes — 29 de 29 |
| [`03_wireframes/`](design/03_wireframes) | Pantallas completas. Las cinco principales ya están en alta fidelidad: **Carta** (P-01), **Detalle de plato** (P-02), **Pedido opcional** (P-07), **Solicitud enviada** (P-09) y **Solicitudes del dueño** (P-22) | 5 pantallas clave |
| [`04_prototipo/`](design/04_prototipo) | Prototipo navegable de una sola página | pendiente |
| [`05_exportes/`](design/05_exportes) | Exportes finales para el informe y la sustentación | pendiente |
| [`_revisiones/`](design/_revisiones) | Iteraciones descartadas, con el motivo del descarte | — |

Tema claro y oscuro desde el inicio, contraste AA verificado, y todo pensado para 360×800 dp
(T-1 del brief) — el detalle completo de restricciones y criterios de aceptación está en
[`design/00_brief/Brief_Diseno_Wireframes.md`](design/00_brief/Brief_Diseno_Wireframes.md).
