# Brief de diseño — wireframes, componentes y sistema visual
### App móvil — El Encanto Campestre
**Versión:** 0.2 · **Actualizado:** 20 de agosto de 2026
**Documento de entrada para:** Claude Design · **Fuente:** `Sprint0_Analisis_y_Diseno.md` v0.2

---

## 0. Cómo usar este documento

### 0.1 Orden de trabajo

| Etapa | Qué se produce | Sección | Carpeta destino |
|---|---|---|---|
| 1 | Fichas de diseño: color, tipografía, espaciado | §4 | `design/01_tokens/` |
| 2 | Biblioteca de componentes con sus estados | §5 | `design/02_componentes/` |
| 3 | Wireframes de baja fidelidad, pantalla por pantalla | §6 | `design/03_wireframes/` |
| 4 | Alta fidelidad de las cinco pantallas principales | §6 y §9.2 | `design/03_wireframes/` |
| 5 | Prototipo navegable | §7 | `design/04_prototipo/` |
| 6 | Auditoría de accesibilidad y exportes | §8 | `design/05_exportes/` |

Cada etapa depende de la anterior. Saltarse una obliga a rehacer trabajo.

### 0.2 Mecánica

1. Pegar **§1** una sola vez al inicio de la sesión.
2. Avanzar con los prompts de **§7**, uno por mensaje. No pedir varias pantallas en el mismo mensaje.
3. Contrastar cada resultado contra **§8** antes de continuar.
4. Guardar con la convención de **§0.3**. Las versiones descartadas van a `_revisiones/` con una línea de motivo.

### 0.3 Nombres de archivo

| Tipo | Patrón | Ejemplo |
|---|---|---|
| Componente | `comp_<nombre>_v<n>.<ext>` | `comp_tarjeta-plato_v2.html` |
| Wireframe | `<ID>_<nombre>_v<n>_<tema>.<ext>` | `P-02_detalle-plato_v1_claro.png` |
| Alta fidelidad | `<ID>_<nombre>_hf_v<n>_<tema>.<ext>` | `P-01_carta_hf_v1_oscuro.png` |

`<tema>` es `claro` u `oscuro`. Se numera desde `v1` y no se sobrescribe.

---

## 1. Contexto base — pegar al inicio de la sesión

```
CONTEXTO DEL PROYECTO

Diseño una aplicación móvil para El Encanto Campestre, un restaurante campestre en zona
rural de Timbío, Cauca, Colombia. Es un proyecto académico con un cliente real.

EL RESTAURANTE
- Abre fines de semana y festivos. Entre semana solo abre si hay reserva de 15+ personas.
- Recibe grupos grandes: une mesas hasta armar mesas de 40 personas.
- Tiene pista de motos y zona de pesca, que hoy solo se anuncian.
- Tiene una zona VIP llamada "Mirador" (10 personas + 2 niños) que se coordina aparte.
- Habilita platos especiales según el día, así que la carta cambia según la fecha.

QUÉ HACE LA APP
1) Carta digital: muestra los platos disponibles para la fecha que se consulte.
2) Reservas: el comensal elige fecha, franja y número de personas, y OPCIONALMENTE
   adjunta su pedido eligiendo platos. La app calcula el total y genera un ticket.
3) El pago ocurre FUERA de la app (efectivo, PSE o Nequi) y el comprobante se envía por
   WhatsApp. El dueño verifica y aprueba la reserva desde su panel. Toda reserva nace
   como SOLICITADA y solo un humano la confirma.
4) Noticias: un muro donde el dueño publica imagen, texto y enlaces, para anunciar días
   de atención, carreras de motos, jornadas de pesca y novedades.
5) Próximamente: tarjetas informativas de reserva de pista de motos y zona de pesca.

USUARIOS
- Comensal: 20 a 55 años, usa el teléfono con una mano, a veces con señal débil porque
  el restaurante está en zona rural. Quiere saber si abren, qué hay de comer y separar mesa.
- Dueño: puede haber varias cuentas con ese rol. Revisa solicitudes desde el teléfono,
  verifica pagos y copia el ticket para pegarlo en el grupo de WhatsApp de la cocina.
- Personal: consulta la agenda del día durante el servicio, de pie y con prisa.

PLATAFORMA
React Native para Android. Diseñar para 360×800 dp, orientación vertical fija.
Sin biblioteca de componentes de terceros: el sistema debe ser reducido y consistente.

NAVEGACIÓN
Cinco destinos inferiores, con Noticias como botón central destacado:
[ Carta ]  [ Reservas ]  ( Noticias )  [ Próximamente ]  [ Ajustes ]
El acceso a Administración vive dentro de Ajustes y solo aparece según el rol.

TONO VISUAL
Campestre y cálido, sin caer en lo rústico decorativo. La marca del restaurante es verde
militar y su mascota es la aguililla caminera, un gavilán colombiano. La fotografía del
plato es la protagonista; la interfaz la enmarca sin competir.

RESTRICCIONES NO NEGOCIABLES
- Tema claro y tema oscuro desde el inicio.
- Contraste WCAG AA: 4.5:1 en texto normal, 3:1 en texto grande.
- Área táctil mínima de 48×48 dp.
- Todo estado tiene diseño: vacío, cargando, error y sin conexión.
- Precios en pesos colombianos, con separador de miles, sin decimales y sin impuestos.
- Fechas en formato dd/mm/aaaa.
- Todo texto es contenido, no decoración: va a salir de archivos de recursos, así que
  ningún diseño puede depender de que una etiqueta tenga exactamente cierto largo.

Voy a pedirte el diseño por etapas: primero las fichas de diseño, luego los componentes
y después las pantallas una por una. Espera mis instrucciones de cada etapa.
```

---

## 2. Principios de diseño

1. **La fotografía manda.** En la carta, la imagen ocupa la mayor superficie posible; la interfaz se retira de su camino.
2. **El precio nunca se busca.** Posición fija y peso tipográfico alto.
3. **La disponibilidad es un estado, no una nota al pie.** Un plato no disponible para la fecha consultada se comunica con la forma y el color del componente.
4. **Una acción principal por pantalla.**
5. **El contexto de administración se distingue de un vistazo.** El dueño revisa solicitudes en medio del servicio; confundir vistas tiene costo operativo.
6. **Nada se diseña solo en su estado feliz.** Vacío, cargando y error se entregan siempre.
7. **La reserva no es una compra.** No usar lenguaje ni patrones de comercio electrónico: no hay carrito ni pago en la app. Es una solicitud que alguien va a revisar.

---

## 3. Restricciones técnicas

| # | Restricción | Consecuencia para el diseño |
|---|---|---|
| T-1 | Lienzo 360×800 dp | Verificar cada pantalla a ese ancho |
| T-2 | Zona segura | 24 dp arriba, 16 dp abajo |
| T-3 | Barra de cinco destinos, 64 dp, con botón central elevado | Etiquetas cortas; el central se resuelve como botón circular sobre la barra |
| T-4 | Sin biblioteca de componentes | Mantener el inventario acotado; cada componente extra es código que el equipo debe escribir y explicar |
| T-5 | Listas virtualizadas | Altura de tarjeta estable, que no dependa del largo del texto |
| T-6 | Fotos de plato 4:3, hasta 10 por plato | La galería necesita indicador de posición; la variante para compartir es aparte, 1200×630 px |
| T-7 | Teclado ocupa ~40 % de la pantalla | En formularios, la acción principal no puede quedar fija al fondo |
| T-8 | Botón físico de retroceso en Android | El flujo de reserva de cuatro pasos retrocede paso a paso |
| T-9 | Orientación vertical fija | Sin disposiciones horizontales |
| T-10 | Tema claro y oscuro | Cada color es ficha semántica, nunca valor literal |
| T-11 | Textos externalizados | Ninguna disposición puede depender del largo exacto de una etiqueta; probar con textos un 30 % más largos |
| T-12 | Señal débil en zona rural | Los estados de carga y de reintento son frecuentes, no excepcionales: diseñarlos con cuidado |

---

## 4. Fichas de diseño

Valores de partida derivados de la marca del cliente (verde militar, mascota aguililla caminera). Se sustituyen conservando los nombres cuando exista el logotipo digitalizado.

### 4.1 Color

| Ficha | Tema claro | Tema oscuro | Uso |
|---|---|---|---|
| `marca/primario` | `#4A5D3A` | `#9CB584` | Acción principal, elementos de marca |
| `marca/primario-suave` | `#EEF2E8` | `#232C1C` | Fondo de chips y estados seleccionados |
| `marca/acento` | `#A2632E` | `#D69A5E` | Acento tierra, tomado del plumaje de la aguililla |
| `superficie/fondo` | `#FFFFFF` | `#12140F` | Fondo de pantalla |
| `superficie/elevada` | `#F6F5F1` | `#1C1F19` | Tarjetas, hojas modales |
| `superficie/borde` | `#E2E2DA` | `#2C302A` | Separadores |
| `texto/primario` | `#16180F` | `#F0F1EA` | Títulos y contenido |
| `texto/secundario` | `#5F6355` | `#A5A99B` | Descripciones y metadatos |
| `texto/inverso` | `#FFFFFF` | `#12140F` | Texto sobre `marca/primario` |
| `estado/exito` | `#2F6B45` | `#6FB98C` | Reserva confirmada |
| `estado/atencion` | `#A87516` | `#DFA945` | Solicitud pendiente, reserva próxima |
| `estado/error` | `#A82A22` | `#EF8880` | Rechazo, error, cancelación |
| `estado/inactivo` | `#B4B4AA` | `#55584F` | Plato no disponible, franja sin aforo |
| `admin/encabezado` | `#2E3A2A` | `#1A2118` | Distintivo del contexto de administración |

**Verificación obligatoria.** Antes de aprobar la paleta, comprobar el contraste de `texto/primario` y `texto/secundario` sobre `superficie/fondo` y `superficie/elevada`, y de `texto/inverso` sobre `marca/primario`, en ambos temas. Mínimo 4.5:1 en texto normal y 3:1 en texto de 18 pt o superior. Ajustar los valores que no lleguen y reportar el cambio.

### 4.2 Tipografía

Una sola familia (Inter o la del sistema). La jerarquía se construye con tamaño y peso.

| Ficha | Tamaño / interlineado | Peso | Uso |
|---|---|---|---|
| `tipo/display` | 28 / 34 | 700 | Título de bienvenida |
| `tipo/titulo-l` | 22 / 28 | 700 | Encabezado de pantalla |
| `tipo/titulo-m` | 18 / 24 | 600 | Nombre de plato en detalle, títulos de sección |
| `tipo/cuerpo-l` | 16 / 24 | 400 | Contenido principal |
| `tipo/cuerpo-m` | 14 / 20 | 400 | Descripciones breves |
| `tipo/etiqueta` | 13 / 16 | 600 | Chips, etiquetas de pestaña |
| `tipo/pie` | 12 / 16 | 400 | Metadatos |
| `tipo/precio` | 18 / 22 | 700 | Precio en tarjeta y detalle |
| `tipo/codigo` | 20 / 26 | 700, monoespaciada | Código de reserva |

### 4.3 Espaciado, radios y elevación

| Ficha | Valor |
|---|---|
| Escala | 4 · 8 · 12 · 16 · 24 · 32 · 48 dp |
| Margen lateral | 16 dp |
| Separación entre tarjetas | 12 dp |
| `radio/s` | 8 dp — chips, campos |
| `radio/m` | 12 dp — tarjetas, botones |
| `radio/l` | 20 dp — hojas modales |
| `radio/completo` | 999 dp — botón central, avatar |
| `elevacion/0 · 1 · 2` | sin sombra · sutil en tarjetas · media en modales y barra fija |

### 4.4 Iconografía y movimiento

Conjunto único de iconos de trazo (Lucide), grosor 1.5–2 px, tamaño base 24 dp. Transiciones de 200–250 ms con curva de salida suave, sin rebotes. La retroalimentación táctil se comunica con opacidad o superficie, no con desplazamiento.

---

## 5. Inventario de componentes

Cada componente se entrega con todas sus variantes y estados, en tema claro y oscuro.

| # | Componente | Variantes | Estados |
|---|---|---|---|
| C-01 | Botón | primario, secundario, texto, destructivo; tamaños m y l | normal, presionado, deshabilitado, cargando |
| C-02 | Campo de texto | texto, correo, contraseña, teléfono, área de texto | vacío, con contenido, enfocado, error, deshabilitado |
| C-03 | Selector numérico | comensales, cantidad de plato | mínimo, máximo |
| C-04 | Chip | filtro, etiqueta dietaria, categoría | no seleccionado, seleccionado, deshabilitado |
| C-05 | Tarjeta de plato | vertical (carta), horizontal (favoritos, pedido) | disponible, no disponible en la fecha, esqueleto |
| C-06 | Tarjeta de reserva | próxima, pasada | solicitada, confirmada, rechazada, en curso, cancelada, no asistió, expirada |
| C-07 | Insignia de estado | siete estados de reserva más "no disponible" | — |
| C-08 | Ficha de franja horaria | — | disponible, seleccionada, sin aforo, fuera de horario |
| C-09 | Selector de fecha | tira horizontal de días de atención | abierto, seleccionado, cerrado, solo por reserva, pasado |
| C-10 | Barra de cinco destinos | — | pestaña activa, inactiva, botón central, con indicador de novedad |
| C-11 | Encabezado de pantalla | estándar, con retroceso, de administración | con y sin acción a la derecha |
| C-12 | Hoja modal inferior | confirmación, filtros, selección | — |
| C-13 | Estado vacío | nueve variantes (§6.5) | — |
| C-14 | Estado de error | sin red, error del servidor, sin permisos | con y sin reintento |
| C-15 | Esqueleto de carga | tarjeta de plato, tarjeta de reserva, franjas, noticia | — |
| C-16 | Aviso en línea | informativo, atención, error, éxito | descartable y persistente |
| C-17 | Campo de búsqueda | — | vacío, con texto, con resultados, sin resultados |
| C-18 | Indicador de pasos | cuatro pasos | actual, completado, pendiente |
| C-19 | Elemento de agenda | vista del personal | por llegar, llegó, en riesgo de inasistencia |
| C-20 | Barra de acción fija | una acción; acción con resumen de total | habilitada, deshabilitada |
| C-21 | Galería de fotos | hasta 10 imágenes 4:3 con indicador de posición | cargando, cargada, error |
| C-22 | Diálogo de confirmación | estándar, destructivo | — |
| C-23 | Línea de pedido | en selección, en resumen, en ticket | con y sin nota |
| C-24 | Resumen de ticket | del comensal, del dueño (copiable) | con pedido, sin pedido |
| C-25 | Tarjeta de noticia | estándar, fijada | publicada, borrador |
| C-26 | Tarjeta "Próximamente" | motos, pesca | — |
| C-27 | Calendario mensual | consulta, edición (admin) | día abierto, cerrado, solo por reserva, con reservas |
| C-28 | Elemento de solicitud | bandeja del dueño | pendiente, con pedido, con alerta de cancelaciones previas |
| C-29 | Bloque de instrucciones de pago | — | — |

---

## 6. Especificación de pantallas

Estructura de cada ficha: **objetivo · usuario · datos · estructura · acciones · estados · notas**. Los identificadores coinciden con `Sprint0_Analisis_y_Diseno.md` §13.2.

### 6.1 Carta

---

#### P-01 · Carta (inicio)

**Objetivo.** Que el comensal sepa en tres segundos si el restaurante abre pronto y qué habrá de comer.
**Usuario.** Visitante o comensal.

**Datos.** Próximo día de atención con su horario · platos habilitados para esa fecha · categorías activas · reserva próxima del usuario si existe.

**Estructura**

1. Encabezado con logotipo y acceso a búsqueda.
2. Franja de contexto: "Abrimos el domingo 6 de septiembre, 11:00 a. m. – 6:00 p. m.", con selector para consultar otra fecha.
3. Si hay reserva próxima: tarjeta compacta con estado, fecha y código.
4. Tira horizontal de chips de categoría, adherida al desplazamiento.
5. Lista de tarjetas de plato agrupadas por categoría, con encabezado de sección adherido.

**Tarjeta de plato (vertical).** Imagen 4:3 al ancho de la tarjeta; debajo, nombre en `tipo/titulo-m`, descripción breve truncada a dos líneas, y fila inferior con precio a la izquierda y chips de etiqueta a la derecha. Favorito superpuesto en la esquina superior derecha de la imagen.

**Acciones.** Abrir detalle · cambiar fecha consultada · marcar favorito · filtrar por categoría · buscar.

**Estados.** Carga con esqueletos · fecha cerrada: se explica que ese día no hay servicio y se ofrece la siguiente fecha abierta · sin platos habilitados para la fecha · sin conexión con aviso "Mostrando la carta guardada del <fecha>" · plato no disponible: imagen al 40 % de opacidad, insignia sobre la imagen y precio en `estado/inactivo`.

**Notas.** El selector de fecha en la cabecera es lo que distingue esta carta de un menú estático: conviene que se note sin ocupar demasiado.

---

#### P-02 · Detalle de plato

**Objetivo.** Presentar el plato con fuerza visual y habilitar compartir.

**Estructura**

1. Galería 4:3 a sangre, hasta 10 fotos, con indicador de posición y botones flotantes de retroceso, favorito y compartir.
2. Nombre en `tipo/titulo-l` y precio en `tipo/precio`, en la misma fila.
3. Chips de categoría y etiquetas dietarias.
4. Descripción extendida.
5. Bloque "Contiene" con alérgenos, como aviso informativo.
6. Aviso de disponibilidad: "Disponible el domingo 6 de septiembre" o el estado contrario.
7. Barra de acción fija: "Compartir" (secundario) y "Reservar" (primario).

**Estados.** No disponible en la fecha consultada: la barra sustituye "Reservar" por un aviso y ofrece consultar otra fecha · una sola foto: sin indicador de galería · error de carga de imagen · carga.

**Notas.** Es el destino de los enlaces compartidos por WhatsApp. Debe verse bien abierta en frío, y el retroceso debe llevar a la carta, no cerrar la aplicación.

---

#### P-03 · Búsqueda y filtros

Campo de búsqueda enfocado al entrar · chips de filtro (categoría, etiqueta, rango de precio) · resumen "N resultados" con acción de limpiar · lista de resultados con tarjetas horizontales. Estados: búsqueda vacía con sugerencias · sin resultados mostrando el texto buscado · carga.

---

### 6.2 Reservas

---

#### P-04 · Mis reservas

**Estructura.** Encabezado · dos pestañas secundarias "Próximas" e "Historial" · lista de tarjetas de reserva con fecha destacada a la izquierda, franja, comensales, insignia de estado y código. Las solicitudes pendientes van arriba, con `estado/atencion`.

**Estados.** Sin reservas próximas, con acción de reservar · sin historial · sin sesión, invitando a iniciar sesión · carga.

**Notas.** Esta pestaña es también la bandeja de espera del comensal: mientras el dueño no apruebe, aquí es donde vuelve a mirar. El estado `SOLICITADA` debe leerse con claridad y explicar qué falta.

---

#### P-05 · Reservar · paso 1: fecha y comensales

**Estructura**

1. Encabezado con retroceso e indicador de pasos (1 de 4).
2. Título "¿Cuándo nos visitas?".
3. Tira horizontal con los próximos días de atención: día de la semana, número y estado. Los cerrados aparecen tachados. Acción "Ver calendario" abre un mes completo en hoja modal.
4. Selector numérico de comensales.
5. Barra de acción fija: "Continuar", deshabilitada hasta tener fecha y número.

**Estados.** Día cerrado seleccionado: aviso explicando que entre semana se abre desde 15 personas, con acción para subir el número o cambiar de fecha · carga de fechas · error de red con reintento.

**Notas.** La regla de las 15 personas entre semana es específica de este cliente y no es obvia. Debe explicarse en el momento en que aparece, no en un texto legal.

---

#### P-06 · Reservar · paso 2: franja

**Estructura.** Encabezado con pasos (2 de 4) · resumen editable del paso anterior con acción "Cambiar" · agrupación por momento del servicio · cuadrícula de fichas de franja, tres por fila. Disponible, seleccionada y sin aforo se distinguen por superficie y borde, no solo por color.

**Estados.** Sin franjas para ese día, con sugerencia de las dos fechas más próximas · carga · la franja deja de tener aforo mientras se elige: pasa a estado ocupado con aviso breve.

---

#### P-07 · Reservar · paso 3: pedido (opcional)

**Objetivo.** Permitir adelantar el pedido sin que parezca obligatorio ni una compra.

**Estructura**

1. Encabezado con pasos (3 de 4).
2. Bloque introductorio: "¿Quieres dejar listo tu pedido? Es opcional, pero ayuda a la cocina a prepararse."
3. Acción secundaria visible desde el inicio: "Continuar sin pedido".
4. Lista de platos **disponibles para la fecha elegida**, agrupados por categoría, cada uno con selector de cantidad y acción de nota.
5. Barra de acción fija con el total acumulado a la izquierda y "Continuar" a la derecha.

**Estados.** Sin platos seleccionados: el total muestra `$0` y la acción principal dice "Continuar sin pedido" · sin platos habilitados para la fecha: estado vacío que explica que el menú de ese día aún no se publica y permite continuar igual · carga · plato que deja de estar disponible.

**Notas.** El riesgo de esta pantalla es que se lea como un carrito de compras. Sin iconos de carrito, sin insignia de conteo en la barra de navegación, sin lenguaje de checkout. Y "Continuar sin pedido" debe estar visible desde el primer momento, no escondida al final.

---

#### P-08 · Reservar · paso 4: resumen

**Estructura.** Encabezado con pasos (4 de 4) · tarjeta de resumen con fecha, franja, comensales y duración estimada · detalle del pedido si existe, con líneas y total · campo de nota opcional · aviso con la política de cancelación (hasta 1 hora antes) · aviso de que la reserva queda sujeta a aprobación del restaurante · barra de acción fija "Enviar solicitud".

**Estados.** Enviando · el aforo se agotó mientras se completaba: hoja modal con alternativas y vuelta al paso 2 · error de red con reintento que no duplica la solicitud.

**Notas.** El texto del botón importa. "Enviar solicitud" prepara la expectativa correcta; "Confirmar reserva" la rompe, porque quien confirma es el dueño.

---

#### P-09 · Solicitud enviada

**Objetivo.** Dejar claro qué acaba de pasar y qué falta por hacer. Es la pantalla con más carga de comunicación de toda la aplicación.

**Estructura**

1. Ícono de envío (no de éxito) y título "Solicitud enviada".
2. Código de reserva en `tipo/codigo` dentro de una tarjeta, seleccionable y copiable.
3. Resumen: fecha, franja, comensales y total si hay pedido.
4. Bloque numerado de instrucciones de pago: monto, medios disponibles (efectivo, PSE o Nequi) y número del dueño.
5. Acción principal: "Enviar comprobante por WhatsApp", que abre el chat con un mensaje prellenado que incluye el código.
6. Aviso: "Tu reserva queda confirmada cuando el restaurante verifique el pago. Te avisamos por notificación."
7. Acción secundaria: "Ver mis reservas".

**Notas.** Aquí es donde el comensal entiende —o no— que todavía falta un paso humano. Si esta pantalla se lee como una confirmación, la aplicación genera expectativas que no cumple. El ícono, el título y el aviso deben empujar en la misma dirección.

---

#### P-10 · Detalle de reserva

**Estructura.** Insignia de estado grande · código en tarjeta destacada · datos de fecha, franja, comensales y nota · detalle del pedido si existe · motivo del rechazo si aplica · bloque del restaurante con miniatura de mapa y "Cómo llegar" · acciones al pie según el estado.

**Estados.** `SOLICITADA`: acciones de cancelar y reenviar comprobante · `CONFIRMADA` dentro de la ventana: cancelar y adicionar platos · `CONFIRMADA` fuera de la ventana: acciones deshabilitadas con explicación del motivo · `RECHAZADA`: motivo visible y acción de volver a solicitar · pasada o cancelada: sin acciones.

**Notas.** Un control deshabilitado sin explicación es fuente de confusión. Aquí hay varios, así que cada uno debe decir por qué lo está.

---

### 6.3 Noticias, próximamente e información

---

#### P-11 · Noticias

**Objetivo.** Que el comensal se entere de días de atención, eventos y novedades.

**Estructura.** Encabezado "Noticias" · publicación fijada arriba con distintivo, si existe · lista cronológica inversa de tarjetas: imagen 16:9, título, fecha relativa y extracto de dos líneas · indicador de enlaces cuando la publicación los tiene.

**Estados.** Sin publicaciones · carga con esqueletos · sin conexión mostrando lo guardado.

**Notas.** Es el botón central de la barra, así que es la pantalla más accesible de la aplicación. Para este cliente la comunicación pesa tanto como la reserva: el muro debe verse vivo aunque haya pocas publicaciones.

---

#### P-12 · Detalle de noticia

Imagen a sangre · título · fecha y autor · cuerpo completo · lista de enlaces como elementos pulsables con su dominio visible · acción de compartir. Estados: sin imagen · error de carga.

---

#### P-13 · Próximamente

**Objetivo.** Anticipar la pista de motos y la zona de pesca sin prometer una fecha.

**Estructura.** Encabezado · dos tarjetas grandes, una por atractivo, con fotografía, título, descripción breve y una insignia "Próximamente" · nota al pie invitando a escribir por WhatsApp para consultas.

**Notas.** Debe leerse como un adelanto, no como una función rota. Sin botones que parezcan pulsables si no llevan a ningún lado.

---

#### P-17 · Información y mapa

Mapa en la mitad superior con marcador · dirección · calendario de atención con el próximo día resaltado · teléfono · acciones "Cómo llegar" y "Escribir por WhatsApp". Incluye una nota sobre la zona Mirador y su costo adicional, indicando que se coordina por WhatsApp.

---

### 6.4 Administración

Encabezado en `admin/encabezado` con la etiqueta "Administración" siempre visible.

---

#### P-22 · Solicitudes

**Objetivo.** Que el dueño resuelva la bandeja desde el teléfono, entre servicio y servicio. Es la pantalla más importante para el cliente.

**Estructura**

1. Encabezado de administración con contador de pendientes.
2. Filtro por estado en chips: pendientes, aprobadas, rechazadas.
3. Lista de solicitudes ordenadas por fecha de reserva. Cada elemento: fecha y franja destacadas, nombre del comensal, número de comensales, indicador de si trae pedido, total y tiempo transcurrido desde el envío.
4. Alerta discreta cuando el usuario tiene cancelaciones previas, con el número.
5. Al abrir una solicitud: detalle completo del pedido, nota del comensal, y tres acciones — "Aprobar", "Rechazar" (abre campo de motivo) y "Copiar ticket".

**Estados.** Bandeja vacía · solicitud próxima a expirar, resaltada con `estado/atencion` · aprobando o rechazando, con la acción en estado de carga · error de red.

**Notas.** "Copiar ticket" debe confirmar de forma visible que el texto quedó en el portapapeles, porque el siguiente paso del dueño ocurre fuera de la aplicación, en el grupo de WhatsApp de la cocina.

---

#### P-26 · Disponibilidad por fecha

**Objetivo.** Que el dueño arme el menú de un día concreto en pocos toques.

**Estructura.** Selector de fecha en la cabecera con flechas de día anterior y siguiente · resumen "N platos habilitados" · lista de platos con miniatura, nombre, precio e interruptor de habilitado para esa fecha · acciones de lote: "Habilitar todos" y "Copiar de otra fecha".

**Notas.** "Copiar de otra fecha" es la acción que evita repetir el trabajo cada fin de semana. Conviene que sea visible, no un elemento de menú escondido.

---

#### P-27 · Calendario de atención

Calendario mensual con navegación entre meses · leyenda de estados: abierto por regla, abierto por excepción, cerrado, solo por reserva · al pulsar un día se abre una hoja modal para cambiar su estado y horario · aviso cuando se cierra un día con reservas confirmadas, indicando cuántas se verían afectadas.

---

#### P-25 · Editor de plato

Encabezado con "Cancelar" y "Guardar" · zona de galería con hasta 10 fotos, reordenables por arrastre, con marca de foto principal · campos: nombre, descripción breve, descripción extendida, precio, categoría, etiquetas y alérgenos · interruptores de disponible y destacado · barra fija con "Guardar".

Estados: subiendo con progreso · imagen demasiado pesada · límite de 10 fotos alcanzado · validación de campo obligatorio · guardado · error.

**Nota.** Conviene indicar cuál foto se usará en la vista previa al compartir, para que el encuadre se elija a conciencia.

---

| ID | Pantalla | Especificación resumida |
|---|---|---|
| P-14 | Ajustes | Lista de opciones: Perfil, Favoritos, Información del restaurante, Notificaciones, Política de datos, Cerrar sesión. Con rol, entrada destacada "Administración" en `admin/encabezado` |
| P-15 | Perfil y notificaciones | Datos de la cuenta y conmutadores por tipo de notificación |
| P-16 | Favoritos | Tarjetas horizontales con acción de quitar por deslizamiento. Estado vacío con acción de explorar |
| P-18 | Registro | Cuatro campos con validación en línea, indicador de fortaleza de contraseña y casilla de política de datos |
| P-19 | Inicio de sesión | Dos campos, acción principal, enlaces a recuperación y registro. Error sin revelar qué campo falló |
| P-20 | Recuperar contraseña | Campo de correo, confirmación de envío e ingreso de código con reenvío temporizado |
| P-21 | Admin · inicio | Cuadrícula de accesos con resumen del día arriba y contador de solicitudes pendientes |
| P-23 | Admin · agenda del día | Lista cronológica con hora destacada, comensales, estado y acción "Llegó". Legible a 50 cm y con poca luz |
| P-24 | Admin · carta | Lista por categoría con miniatura, precio e interruptor de disponibilidad general. Reordenamiento por arrastre |
| P-28 | Admin · noticias | Lista con estado publicado o borrador, acción de fijar y editor con imagen, texto y enlaces |
| P-29 | Admin · mesas y zonas | Zonas plegables con sus mesas (código, capacidad, combinable). Muestra el aforo total calculado |
| P-30 | Admin · configuración | Parámetros de reserva: duración, granularidad, tolerancia, ventana de cancelación, anticipación y mínimo entre semana. Exige TOTP |
| P-31 | Admin · indicadores | Tarjetas de cifra y dos gráficos simples: reservas por día y distribución por franja |
| P-32 | Verificación TOTP | Hoja modal con seis casillas, teclado numérico, temporizador y espera creciente ante error |

---

### 6.5 Catálogo de estados vacíos

Variantes del componente C-13: ícono o ilustración, título, una línea de explicación y acción cuando corresponda.

| Contexto | Título sugerido | Acción |
|---|---|---|
| Sin reservas próximas | "Aún no tienes reservas" | Reservar |
| Sin historial | "Tu historial aparecerá aquí" | — |
| Sin favoritos | "Guarda tus platos preferidos" | Ver la carta |
| Búsqueda sin resultados | "No encontramos «<texto>»" | Limpiar filtros |
| Sin platos para la fecha | "El menú de ese día aún no se publica" | Ver otra fecha |
| Fecha cerrada | "Ese día no hay servicio" | Ver el próximo día abierto |
| Sin franjas con aforo | "No quedan cupos para ese día" | Probar otra fecha |
| Sin noticias | "Aún no hay publicaciones" | — |
| Bandeja de solicitudes vacía | "No hay solicitudes pendientes" | — |

---

## 7. Prompts listos para pegar

Enviar uno por mensaje, en orden, después del contexto base de §1.

### Prompt 1 — Fichas de diseño

```
ETAPA 1 · FICHAS DE DISEÑO

Construye el sistema de fichas de diseño (design tokens) en tema claro y oscuro, a partir
de estos valores de partida:

[Pegar §4.1, §4.2 y §4.3]

Entrega:
1. Lámina con la paleta completa: nombre de cada ficha, valor en ambos temas y relación de
   contraste contra la superficie sobre la que se usa.
2. La escala tipográfica aplicada sobre texto real en español, con nombres de platos
   colombianos verosímiles. Nada de "Lorem ipsum".
3. Escala de espaciado y radios, representados de forma visual.
4. Archivos tokens.css (variables personalizadas) y tokens.json.

Verifica y reporta el contraste de texto/primario y texto/secundario sobre
superficie/fondo y superficie/elevada, y de texto/inverso sobre marca/primario, en ambos
temas. Si algún par no llega a 4.5:1, ajústalo y dime qué cambiaste.

Entrega como HTML autocontenido.
```

### Prompt 2 — Componentes

```
ETAPA 2 · COMPONENTES

Usando las fichas de la etapa anterior, construye la biblioteca de componentes:

[Pegar §5]

Trabajemos por lotes de cuatro. Empieza por C-01, C-02, C-05 y C-10 (la barra de cinco
destinos con botón central es el componente de mayor riesgo, prefiero verlo temprano).

Para cada componente entrega una lámina con todas sus variantes y estados, en tema claro
y oscuro, sobre lienzo de 360 dp de ancho. Junto a cada variante, su nombre de ficha y
las medidas relevantes: altura, relleno interno, radio.

Verifica que todo control interactivo alcance 48×48 dp de área táctil, aunque su elemento
visible sea más pequeño.

Entrega cada lote como HTML autocontenido.
```

### Prompt 3 — Wireframes de baja fidelidad

```
ETAPA 3 · WIREFRAME

Diseña el wireframe de baja fidelidad de esta pantalla. Escala de grises, marcadores de
posición en lugar de fotografías, contenido textual real en español.

[Pegar la ficha completa de la pantalla, de §6]

Entrega:
1. El estado principal.
2. Cada estado listado en la ficha, como lámina separada y rotulada.
3. Anotaciones numeradas con las decisiones de disposición y su motivo.

Lienzo 360×800 dp. Respeta las restricciones T-1 a T-12 del brief.
Entrega como HTML autocontenido con las láminas una debajo de otra.
```

> Orden sugerido: **P-01, P-02, P-07, P-09, P-22** primero (son las que más pueden salir mal), luego P-05, P-06, P-08, P-04, P-10, P-11, P-26, P-27, y después el resto.

### Prompt 4 — Alta fidelidad

```
ETAPA 4 · ALTA FIDELIDAD

Convierte el wireframe aprobado de <ID · nombre> en alta fidelidad, aplicando las fichas
y los componentes de las etapas 1 y 2.

Contenido verosímil de un restaurante campestre del Cauca: nombres de platos reales,
precios en pesos colombianos con separador de miles, sin decimales y sin impuestos,
descripciones de una o dos líneas en español natural.

Entrega tema claro y oscuro, más los estados vacío, de carga y de error.
Lienzo 360×800 dp. HTML autocontenido.
```

### Prompt 5 — Prototipo navegable

```
ETAPA 5 · PROTOTIPO

Une los mockups de alta fidelidad en un prototipo navegable de una sola página, con las
transiciones de este mapa:

[Pegar §13.3 del documento de Sprint 0]

Debe permitir recorrer completo: Carta → Detalle de plato → Reservar paso 1 → 2 → 3 → 4
→ Solicitud enviada → Mis reservas → Detalle de reserva. Y por separado: Noticias →
Detalle, y Ajustes → Administración → Solicitudes → aprobar.

Incluye conmutador de tema claro/oscuro y conmutador de rol comensal/dueño que revele el
acceso a Administración.

Entrega como un único HTML autocontenido que pueda abrir en el teléfono.
```

### Prompt 6 — Auditoría

```
ETAPA 6 · REVISIÓN

Revisa todas las pantallas producidas contra esta lista y repórtame cada incumplimiento
con la pantalla, el elemento y la corrección propuesta:

[Pegar §8]
```

---

## 8. Criterios de aceptación

| ☐ | Criterio |
|---|---|
| ☐ | Se ve correcto a 360 dp de ancho, sin desbordes horizontales |
| ☐ | Existe en tema claro y oscuro |
| ☐ | Todos los estados de la ficha están diseñados: principal, vacío, cargando y error |
| ☐ | Todo control interactivo alcanza 48×48 dp |
| ☐ | El contraste cumple 4.5:1, o 3:1 en texto de 18 pt o superior |
| ☐ | Ninguna información se transmite solo por color |
| ☐ | Hay una única acción principal identificable |
| ☐ | El contenido textual es real y en español |
| ☐ | Los precios llevan formato de pesos colombianos, sin decimales ni impuestos |
| ☐ | Las fechas usan dd/mm/aaaa |
| ☐ | Todo control deshabilitado explica por qué lo está |
| ☐ | Los colores están expresados como fichas semánticas |
| ☐ | La disposición resiste textos un 30 % más largos (T-11) |
| ☐ | No se introducen componentes fuera del inventario de §5, o se agregaron a conciencia |
| ☐ | El recorrido de retroceso está definido, incluido el botón físico de Android |
| ☐ | El comportamiento con el teclado abierto está resuelto en pantallas con formulario |
| ☐ | El flujo de reserva no usa lenguaje ni patrones de comercio electrónico (principio 7) |
| ☐ | Cada pantalla declara qué requisito funcional atiende |

---

## 9. Entrega

### 9.1 Qué se archiva y dónde

| Entregable | Carpeta | Formato |
|---|---|---|
| Paleta con verificación de contraste | `design/01_tokens/` | HTML y PNG |
| `tokens.css` y `tokens.json` | `design/01_tokens/` | CSS y JSON |
| Láminas de componentes | `design/02_componentes/` | HTML y PNG |
| Wireframes de baja fidelidad | `design/03_wireframes/` | HTML y PNG |
| Alta fidelidad de las cinco principales | `design/03_wireframes/` | HTML y PNG |
| Prototipo navegable | `design/04_prototipo/` | HTML |
| Exportes para el informe | `design/05_exportes/` | PNG a 2× o SVG |
| Iteraciones descartadas | `design/_revisiones/` | libre |

### 9.2 Cinco pantallas para alta fidelidad

1. **P-01 Carta** — define el carácter visual del producto.
2. **P-07 Pedido opcional** — es la pantalla con más riesgo de leerse mal.
3. **P-09 Solicitud enviada** — es donde se comunica que falta un paso humano.
4. **P-11 Noticias** — es el botón central y el canal que más le importa al cliente.
5. **P-22 Solicitudes** — es la pantalla que usa el dueño todos los fines de semana.

### 9.3 Registro de decisiones de diseño

| Decisión | Alternativa descartada | Motivo | Fecha |
|---|---|---|---|
| _____ | _____ | _____ | _____ |
| _____ | _____ | _____ | _____ |

### 9.4 Qué hacer con el resultado en el Sprint 1

`tokens.css` y `tokens.json` se traducen de forma directa al tema de la aplicación. Conservar los mismos nombres de ficha entre diseño y código evita la desincronización que suele aparecer a mitad de proyecto, y permite explicar en la sustentación por qué un cambio de paleta no obliga a tocar componentes.

---

## 10. Qué cambió respecto de la versión 0.1

Navegación de cuatro a cinco destinos con botón central · flujo de reserva de tres a cuatro pasos, con pedido opcional · pantalla de solicitud enviada con instrucciones de pago, que sustituye a la de reserva confirmada · bandeja de solicitudes del dueño · disponibilidad de platos por fecha, con su pantalla de administración y su calendario de atención · módulo de noticias y pantalla "Próximamente" · galería de hasta 10 fotos por plato · paleta derivada del verde militar del restaurante · siete componentes nuevos (C-23 a C-29) · principio 7 sobre no usar patrones de comercio electrónico · restricciones T-11 y T-12.
