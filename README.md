# El Encanto Campestre - Aplicación Móvil

Proyecto académico desarrollado para la asignatura Electiva V (Desarrollo Móvil, semestre agosto - noviembre 2026). Estamos construyendo la solución digital integral para el restaurante campestre El Encanto Campestre, ubicado en la vereda Las Huacas (Timbío, Cauca).

La solución incluye una aplicación móvil para comensales y el dueño del restaurante con carta digital dinámica según el día de atención, sistema de reservas con comprobante de pago y aprobación manual, muro de novedades campestres y avisos de futuras atracciones (pista de exhibición de motos y lago de pesca deportiva), respaldada por una API modular en NestJS y base de datos relacional en PostgreSQL (Supabase).

Para conocer nuestras normas de desarrollo, formato de commits y convenciones de trabajo en equipo, consulta [Reglas.md](Reglas.md).

---

## Integrantes del equipo (Autores y Contribuidores Únicos)

- **Yeison Muñoz** (Líder frontend móvil y arquitectura monorepo)
- **Alex Santacruz** (Líder backend API y autenticación)
- **Fabián Hoyos** (Líder de infraestructura, datos y seguridad)

> *Nota de autoría:* Los únicos colaboradores y autores acreditados de este proyecto son los tres integrantes mencionados. No se admiten inteligencias artificiales, bots ni agentes automatizados como colaboradores o co-autores en los registros de Git ni en GitHub.

---

## Estado del Proyecto (Sprint 1 Completado al 100%)

Cerramos el primer ciclo de desarrollo con todos los objetivos alcanzados y probados:

- **Infraestructura Monorepo:** Configuración de npm workspaces, linters, formateadores y paquete `@encanto/shared`.
- **Móvil (React Native 0.87):** Proyecto bare con Nueva Arquitectura y Hermes, navegación con 5 pestañas (Carta, Reservas, Noticias, Próximamente y Ajustes), tokens de diseño para modo claro y oscuro sin colores fijos, e internacionalización (i18n) en español.
- **Seguridad y Sesión en Móvil:** Almacenamiento seguro del refresh token en hardware mediante `react-native-keychain` (Android Keystore), access token en memoria RAM para mínima superficie de ataque, e interceptor de Axios con renovación silenciosa ante respuestas HTTP 401.
- **Backend API (NestJS):** Inicialización modular con TypeScript, Swagger interactivo en `/api/docs`, contenedor Docker de desarrollo local y hot-reload.
- **Base de Datos y Modelado:** Esquema relacional en Prisma con 18 tablas en Supabase PostgreSQL, políticas de seguridad RLS y script de siembra (seed) con información real del restaurante en Timbío.
- **Autenticación y Autorización:** Hasheo de contraseñas con Argon2id, emisión de JWT de acceso y refresco rotativo, y control de acceso basado en roles con `RolesGuard`.

---

## Estructura del Monorepo

Organizamos el código bajo un esquema de workspaces para compartir lógica de negocio y tipos entre móvil, backend y web:

```
Restaurante-Native/
├── apps/
│   ├── mobile/             # Aplicación móvil en React Native 0.87.1 (Android)
│   │   ├── src/
│   │   │   ├── config/     # Configuración de URLs y endpoints de la API
│   │   │   ├── context/    # Contexto global de autenticación (AuthContext)
│   │   │   ├── i18n/       # Configuración y diccionarios de idiomas (es.json)
│   │   │   ├── navigation/ # Navegador de pestañas inferiores (BottomTabNavigator)
│   │   │   ├── screens/    # Pantallas: Carta, Reservas, Novedades, Próximamente y Ajustes
│   │   │   ├── services/   # Cliente Axios con interceptor 401 y token-storage con Keychain
│   │   │   └── theme/      # Tokens de diseño (colores, tipografía, espaciado) y ThemeContext
│   │   └── android/        # Proyecto nativo Gradle de Android
│   ├── api/                # Backend API REST en NestJS 12
│   │   ├── prisma/         # Esquema Prisma (18 entidades), migraciones SQL y script de seed
│   │   ├── src/
│   │   │   ├── auth/       # Módulo de autenticación (Argon2id, JWT, login, refresh, logout)
│   │   │   ├── common/     # Guards de roles (RolesGuard), filtros de error y pipes Zod
│   │   │   └── prisma/     # Servicio de conexión a Supabase PostgreSQL
│   │   ├── Dockerfile      # Imagen de desarrollo optimizada sobre Node 22 Alpine
│   │   └── docker-compose.yml # Orquestador local del servicio api
│   └── web/                # Aplicación web de aterrizaje y soporte de enlaces profundos
├── packages/
│   └── shared/             # Código compartido entre apps (esquemas Zod, DTOs y formateadores)
├── design/                 # Sistema de diseño, tokens JSON/CSS y maquetas HTML
├── docs/                   # Especificación de requisitos (ERS), cronograma y backlog
└── .env.example            # Plantilla de variables de entorno del monorepo
```

---

## Cómo levantar el proyecto localmente

### 1. Requisitos previos

- **Node.js:** Versión 20 LTS o 22 LTS y npm 10+.
- **Java JDK:** OpenJDK 17 (necesario para compilar la aplicación Android).
- **Android SDK:** Con API 34 o 35 y herramientas de plataforma (`adb`).
- **Docker Desktop:** Para correr el contenedor de la API en local.

### 2. Instalación de dependencias

Desde la raíz del repositorio ejecuta:

```bash
npm install
```

### 3. Configuración de variables de entorno

Copia el archivo de plantilla a `.env` en la raíz y en `apps/api`:

```bash
cp .env.example .env
cp .env.example apps/api/.env
```

Configura en tu `.env` las credenciales de base de datos de Supabase y los secretos criptográficos de JWT.

---

## Ejecución de los servicios

### Opción A: Levantar el Backend con Docker

El backend se ejecuta en un contenedor local con recarga automática y acceso a la base de datos de Supabase:

```bash
# Iniciar el contenedor de la API en segundo plano
docker compose -f apps/api/docker-compose.yml up -d

# Ver los logs del backend en tiempo real
docker logs -f encanto_api_dev
```

* **API REST:** `http://localhost:3000/api/v1`
* **Documentación interactiva (Swagger UI):** `http://localhost:3000/api/docs`

Para detener el contenedor:

```bash
docker compose -f apps/api/docker-compose.yml down
```

---

### Opción B: Ejecutar la App Móvil en Android

#### 1. En un dispositivo Android físico por cable USB (sin abrir Android Studio):

1. Activa las **Opciones de desarrollador** y la **Depuración por USB** en tu teléfono.
2. Conecta el celular a la computadora por USB y autoriza la conexión.
3. Verifica que tu PC reconozca el dispositivo:
   ```bash
   adb devices
   ```
4. Redirige los puertos para que el celular se comunique con el empaquetador Metro y con el Docker local:
   ```bash
   adb reverse tcp:8081 tcp:8081
   adb reverse tcp:3000 tcp:3000
   ```
5. Compila e instala la app directamente:
   ```bash
   npm run android --workspace=@encanto/mobile
   ```

#### 2. En emulador de Android:

Si usas el emulador oficial de Android Studio, simplemente inicia el emulador y ejecuta:

```bash
npm run android --workspace=@encanto/mobile
```

*Nota para emulador:* El emulador accede al backend de tu máquina a través de la IP especial `http://10.0.2.2:3000/api/v1`, la cual ya está configurada por defecto en la app móvil.

---

## Pruebas automatizadas

Para ejecutar las suites de pruebas de todo el proyecto:

```bash
# Pruebas del Backend (RolesGuard, AppController en Vitest)
npm test --workspace=api

# Pruebas de la App Móvil (almacenamiento Keychain, interceptor y renderizado en Jest)
npm test --workspace=@encanto/mobile
```
