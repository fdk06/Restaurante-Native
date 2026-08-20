# Decisiones del proyecto
### App móvil — El Encanto Campestre
**Versión:** 0.3 · **Actualizado:** 20 de agosto de 2026

Registro de lo acordado. Las filas con `⬜` siguen abiertas; el resto está cerrado y no hace falta volver sobre ellas.

---

## Ficha

| | |
|---|---|
| **Cliente** | El Encanto Campestre — Vereda Las Huacas, Timbío, Cauca. Sede única |
| **Rasgos** | Restaurante campestre. Atiende fines de semana y festivos. Tiene pista de motos y zona de pesca (fuera del alcance actual) |
| **Marca** | Verde militar. Mascota: aguililla caminera (gavilán colombiano) |
| **Equipo** | Alex Santacruz (10 h/sem) · Fabián Hoyos (8 h/sem) · Yeison Muñoz (8 h/sem) → ~26 h/semana |
| **Herramientas** | GitHub para código · Jira para sprints y evidencias |
| **Destino** | Se presenta en la asignatura y luego se inicia el trámite de venta al cliente |
| **Plataforma** | Solo Android. El código se escribe portable, pero iOS no entra en el alcance |

---

## A · Producto

| # | Tema | Decisión |
|---|---|---|
| A-1 | Cliente | El Encanto Campestre, contacto directo. **Regla derivada:** cero valores fijos en el código — todo texto de interfaz vive en archivos de recursos, incluidos títulos |
| A-2 | Marca y sedes | Marca del restaurante, sede única. El modelo queda preparado para más sedes sin exponerlo en la interfaz |
| A-3 | Identidad visual | Verde militar y la aguililla caminera como elemento de marca |
| A-4 | Validación con el cliente | Al cierre de cada sprint |
| A-5 | Carta | CRUD completo de platos a cargo del administrador: descripción, fotos, detalles. Sin número fijo de platos, porque habilitan especiales según el día |
| A-6 | Al terminar el semestre | Se presenta y se inicia el trámite de venta |
| A-7 | Noticias | Sección tipo muro: el dueño publica imagen, descripción y enlaces. Sirve para anunciar días de atención, eventos de pesca, carreras de motos y novedades |
| A-8 | Próximamente | Pantalla con tarjetas informativas de reserva de pista de motos y zona de pesca. Solo informativas en este alcance |

---

## B · Reglas de negocio

| # | Tema | Decisión |
|---|---|---|
| B-1 | Duración de la reserva | 90 min hasta 4 personas · 120 min para grupos mayores |
| B-2 | Horarios y franjas | Los define el administrador desde su panel; no son valores fijos del código |
| B-3 | Tolerancia de llegada | 30 min. Con pago hecho, el sistema envía recordatorios y ofrece cancelar sin reembolso, derivando al chat |
| B-4 | Ventana de cancelación | Hasta 1 hora antes |
| B-5 | Anticipación máxima | 3 meses. Reciben grupos empresariales que reservan con antelación |
| B-6 | Anticipación mínima | 1 hora, y solo antes de las 13:00. Por debajo de eso se sugiere ir directo al restaurante |
| B-7 | Pedido anticipado | Desde 8 personas se seleccionan los platos en la app, se arma la lista y se separa mesa. Se puede adicionar después de confirmado pagando el excedente. Sin reembolsos; sí cambios por productos de igual o mayor precio |
| B-8 | Combinación de mesas | Sin tope de dos: se unen las que hagan falta, hasta mesas de 40 personas |
| B-9 | Confirmación | Manual. Cada reserva la acepta un dueño después de verificar el pago. Puede haber varias cuentas con ese rol |
| B-10 | Pagos | Fuera de la app: efectivo, PSE o Nequi al número del dueño. Sin límite de reservas activas: lo que regula es la aprobación del dueño |
| B-11 | Inasistencias | No se restringe al usuario. El panel muestra al dueño una alerta con el número de cancelaciones previas |
| B-12 | Días de atención | Calendario anual que el dueño marca. Base: fines de semana y festivos de Colombia. Entre semana solo se abre por reserva de 15+ personas |
| B-13 | Zona VIP "Mirador" | Hasta 10 personas + 2 niños, con costo adicional de servicio. Se coordina por WhatsApp, no se reserva desde la app |
| B-14 | Impuestos | Sin impuestos. Solo el valor del plato |

### Flujo de reserva acordado

```
Cliente elige fecha, personas y platos (obligatorio desde 8 personas)
        ↓
La app genera un ticket con el detalle y el total
        ↓
Cliente paga por fuera (efectivo / PSE / Nequi) y envía comprobante por WhatsApp
        ↓
El dueño verifica y ACEPTA la reserva desde el panel
        ↓
Reserva confirmada · el dueño copia el ticket y lo pega en el grupo de cocina
```

**Nota sobre disponibilidad.** El restaurante rara vez se llena, así que la reserva no compite por mesas concretas: garantiza que habrá mesa. Esto permite trabajar con aforo por franja en lugar de asignación mesa a mesa, lo que simplifica bastante el módulo de reservas.

---

## C · Técnicas

| # | Tema | Decisión |
|---|---|---|
| C-1 | Despliegue del backend | VPS. Se contenedoriza desde el inicio para que local y producción se comporten igual |
| C-2 | Mapas | MapLibre |
| C-3 | Correo | Resend, nivel gratuito |
| C-4 | Postgres desde Prisma | Cadena agrupada para la app, directa para migraciones. Ambas en `.env.example` |
| C-5 | Repositorio | Monorepo por módulos: `apps/mobile`, `apps/api`, `apps/web`, `packages/shared` |
| C-6 | Tipos compartidos | Paquete común con esquemas de Zod, usados como validación en ambos extremos |
| C-7 | Imágenes | Hasta 10 fotos por plato. Compresión sin pérdida perceptible para ahorrar espacio |
| C-8 | Procesamiento | `sharp` en el backend, al momento de la carga |
| C-9 | Zona horaria | UTC en base de datos, presentación en `America/Bogota` |
| C-10 | Identificadores | UUID v7 si la versión de PostgreSQL de Supabase lo admite |
| C-11 | API | Prefijo `/api/v1` desde el inicio |
| C-12 | Ramas | `main` protegida · `develop` de integración · `feature/*` |
| C-13 | Firma de la app | Almacén de claves propio, generado en Sprint 1 y resguardado |
| C-14 | Distribución | Firebase App Distribution. Alternativa: APK alojada en la web del restaurante, que de todos modos hay que construir para las vistas previas de WhatsApp |
| C-15 | Plataformas | Solo Android |
| C-16 | Persistencia local | MMKV |
| C-17 | Sin conexión | Solo lectura en caché |
| C-18 | Errores en el cliente | Límite de error global más estados de error por consulta |
| C-19 | Reporte de fallos | Sentry gratuito desde Sprint 2 |
| C-20 ⬜ | Pruebas | La respuesta quedó ambigua: pide unitarias de disponibilidad y estados más integración, pero añade "sin necesidad de automatizadas". Conviene aclarar si se escriben y se corren a mano, o si no se escriben |
| C-21 | Secretos | En `.env`, fuera del control de versiones |

---

## D · Equipo

| # | Tema | Decisión |
|---|---|---|
| D-1 | Integrantes | Tres personas, ~26 h/semana en conjunto |
| D-2 | Responsabilidades | Rotación, sin especialización fija por capa |
| D-3 | Herramientas | GitHub y Jira |
| D-4 | Commits | Conventional Commits · `feature/<id>-descripcion` |
| D-5 | Revisión de código | No se aplica en este proyecto |
| D-6 | Evidencias | Todo queda en Jira; sin carpeta aparte |
| D-7 | Semanas de menor capacidad | No aplica |

---

## E · Legales

Se aceptan las recomendaciones y se resuelven al final del proyecto, sin interferir con la programación: política de tratamiento de datos conforme a la Ley 1581 de 2012, titularidad acordada con el cliente, eliminación de cuenta, recolección mínima (nombre, correo, teléfono) y retención con opción de anonimización.

---

## F · Diseño ⬜

Bloque completo sin responder. Son decisiones de media hora que condicionan el trabajo de wireframes.

| # | Tema | Opciones | Recomendación | ✍ |
|---|---|---|---|---|
| F-1 | Herramienta de wireframes | Figma · Claude Design · papel | Claude Design, ya hay brief preparado | _____ |
| F-2 | Fidelidad | Solo baja · baja para todas y alta para las principales | Baja para todas, alta para cinco | _____ |
| F-3 | Fichas de diseño | — | Definir color, espaciado, radio y tipografía como valores nombrados antes de los componentes | _____ |
| F-4 | Tema oscuro | Sí · no | Sí, desde el inicio | _____ |
| F-5 | Estilo de la carta | Lista con foto a la izquierda · tarjetas con foto amplia | Tarjetas con foto amplia | _____ |
| F-6 | Iconografía | — | Un solo conjunto, por ejemplo Lucide | _____ |
| F-7 | Navegación | — | Cinco destinos inferiores según G-8: Carta · Reservas · **Noticias** (botón central) · Próximamente · Ajustes | _____ |

---

## G · Definiciones de interfaz

| # | Tema | Decisión |
|---|---|---|
| G-1 | Estados vacíos | Se llenan con noticias, menú, información del restaurante y ubicación |
| G-2 | Estados de carga | Esqueleto de contenido |
| G-3 | Sin conexión | Se reintenta; el pedido en curso se guarda hasta recuperar red, o se descarta |
| G-4 | Sesión expirada | Aviso de confirmación antes de que caduque, si la persona está dentro de la app |
| G-5 | Permisos denegados | Se vuelve a solicitar cuando se usa la función que lo requiere |
| G-6 | Textos | Centralizados en archivos de recursos. Cero valores fijos en código ni en interfaz |
| G-7 | Formatos | Moneda COP · fechas `dd/mm/aaaa` en español |
| G-8 | Pantalla de inicio y navegación | Inicio con la comida: platos disponibles según lo que marque el administrador. Luego Reservas, botón central de Noticias, Próximamente y Ajustes con sus subpantallas |
| G-9 ⬜ | Ícono y presentación | Por decidir. Existen marcas del restaurante pero sin digitalizar en buena calidad |
| G-10 ⬜ | Identificador del paquete | Sin definir. Sugerencia: `co.encantocampestre.app`. Cambiarlo después obliga a rehacer Firebase y los App Links |
| G-11 | Fotografías pesadas | Se comprimen en el backend, en su servicio |
| G-12 | Retroceso | Botón en la esquina superior izquierda, visible en toda subpantalla |
| G-13 | Rotación | Siempre vertical |
| G-14 ⬜ | Teclado sobre los campos | Sin definir. Sugerencia: manejo único desde el sistema de componentes, con la acción principal desplazándose con el contenido |
| G-15 | Datos de ejemplo | Los redacta el administrador |
| G-16 | Copia de seguridad | Mensual, en Supabase o en Google Drive |
| G-17 | Cuentas de prueba | `yeison@encanto.com` · `fabian@encanto.com` · `alex@encanto.com` |

---

## H · Pendientes que faltan por cerrar

Nada de esto bloquea empezar a programar, pero sí conviene resolverlo antes del Sprint 3.

| # | Pregunta | Por qué importa |
|---|---|---|
| H-1 ⬜ | ¿El pedido de platos es obligatorio solo desde 8 personas, u opcional para grupos menores? | Cambia si el flujo de reserva tiene tres pasos o cuatro |
| H-2 ⬜ | ¿El comprobante de pago se sube en la app o solo se envía por WhatsApp? | Si se sube, hace falta almacenamiento y una vista en el panel del dueño |
| H-3 ⬜ | ¿Qué pasa si el dueño rechaza una reserva? ¿Se notifica, se puede corregir y reenviar? | Es una transición de estado que hoy no existe en el modelo |
| H-4 ⬜ | ¿Cuánto tiempo espera una reserva sin comprobante antes de expirar? | Sin esto, las solicitudes sin pago se acumulan en el panel |
| H-5 ⬜ | ¿La adición de platos tras la confirmación se hace en la app o por WhatsApp? | Define si el pedido es editable después de aprobado |
| H-6 ⬜ | ¿Las noticias generan notificación push? | Afecta el módulo de notificaciones del Sprint 5 |
| H-7 ⬜ | ¿El calendario anual se marca día por día o por reglas (todos los domingos, festivos)? | Marcar 365 días a mano es inviable; por reglas es más trabajo de interfaz |
| H-8 ⬜ | Bloque F completo | Condiciona el arranque de los wireframes |
| H-9 ⬜ | C-20, G-9, G-10, G-14 | Ver notas en sus filas |

---

## I · Lo que estos acuerdos cambian respecto al diseño original

Seis puntos del documento de Sprint 0 quedaron desactualizados con esta ronda. Se listan para no perderlos de vista.

1. **La reserva ahora incluye pedido de platos.** Deja de ser "mesa para N personas" y pasa a ser reserva con ticket y total. Aparecen entidades nuevas: pedido, línea de pedido y ticket.
2. **La confirmación es manual y depende de un pago externo.** El estado `PENDIENTE` deja de ser excepcional y se vuelve el estado inicial de toda reserva. Hay que sumar el rechazo por parte del dueño.
3. **WhatsApp vuelve al flujo operativo**, como canal de comprobante y coordinación de la zona VIP. No gestiona la reserva, pero sí la habilita.
4. **La disponibilidad se simplifica.** Con aforo por franja en lugar de asignación mesa a mesa, la restricción de exclusión en la base de datos pierde protagonismo y el Sprint 3 se descarga bastante.
5. **Entra un módulo de noticias** que no estaba previsto, más una pantalla de "Próximamente".
6. **La navegación pasa de cuatro a cinco destinos**, con Noticias en el botón central.
