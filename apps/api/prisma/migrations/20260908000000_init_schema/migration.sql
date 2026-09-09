-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMENSAL', 'STAFF', 'ADMIN');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('SOLICITADA', 'CONFIRMADA', 'RECHAZADA', 'EXPIRADA', 'CANCELADA', 'EN_CURSO', 'COMPLETADA', 'NO_ASISTIO');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SOLICITUD_NUEVA', 'APROBACION', 'RECHAZO', 'RECORDATORIO', 'CANCELACION', 'NOTICIA');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDIENTE', 'ENVIADA', 'FALLIDA');

-- CreateEnum
CREATE TYPE "DevicePlatform" AS ENUM ('ANDROID', 'IOS');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'COMENSAL',
    "refresh_token_hash" TEXT,
    "correo_verificado" BOOLEAN NOT NULL DEFAULT false,
    "totp_secret_cifrado" TEXT,
    "totp_habilitado" BOOLEAN NOT NULL DEFAULT false,
    "cancelaciones" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurantes" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "latitud" DECIMAL(10,7) NOT NULL,
    "longitud" DECIMAL(10,7) NOT NULL,
    "telefono" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "aforo_total" INTEGER NOT NULL,
    "duracion_reserva_min" INTEGER NOT NULL DEFAULT 90,
    "granularidad_min" INTEGER NOT NULL DEFAULT 30,
    "tolerancia_min" INTEGER NOT NULL DEFAULT 30,
    "ventana_cancelacion_min" INTEGER NOT NULL DEFAULT 60,
    "anticipacion_max_dias" INTEGER NOT NULL DEFAULT 60,
    "anticipacion_min_min" INTEGER NOT NULL DEFAULT 120,
    "min_personas_entre_semana" INTEGER NOT NULL DEFAULT 15,
    "horas_expiracion_solicitud" INTEGER NOT NULL DEFAULT 24,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zonas" (
    "id" TEXT NOT NULL,
    "restaurante_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "reservable_en_app" BOOLEAN NOT NULL DEFAULT true,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zonas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesas" (
    "id" TEXT NOT NULL,
    "zona_id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "combinable" BOOLEAN NOT NULL DEFAULT true,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "restaurante_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platos" (
    "id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion_breve" TEXT,
    "descripcion" TEXT NOT NULL,
    "precio" DECIMAL(12,2) NOT NULL,
    "alergenos" TEXT,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos_platos" (
    "id" TEXT NOT NULL,
    "plato_id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "path_og" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "creada_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fotos_platos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etiquetas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "icono" TEXT,

    CONSTRAINT "etiquetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platos_etiquetas" (
    "id" TEXT NOT NULL,
    "plato_id" TEXT NOT NULL,
    "etiqueta_id" TEXT NOT NULL,

    CONSTRAINT "platos_etiquetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disponibilidad_platos" (
    "id" TEXT NOT NULL,
    "plato_id" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "cupo" INTEGER,

    CONSTRAINT "disponibilidad_platos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dias_atencion" (
    "id" TEXT NOT NULL,
    "restaurante_id" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "abierto" BOOLEAN NOT NULL,
    "hora_apertura" TEXT,
    "hora_cierre" TEXT,
    "solo_por_reserva" BOOLEAN NOT NULL DEFAULT false,
    "motivo" TEXT,

    CONSTRAINT "dias_atencion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reglas_atencion" (
    "id" TEXT NOT NULL,
    "restaurante_id" TEXT NOT NULL,
    "dia_semana" INTEGER NOT NULL,
    "hora_apertura" TEXT NOT NULL,
    "hora_cierre" TEXT NOT NULL,
    "abierto" BOOLEAN NOT NULL DEFAULT true,
    "aforo_maximo" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "reglas_atencion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "hora_inicio" TEXT NOT NULL,
    "hora_fin" TEXT NOT NULL,
    "num_comensales" INTEGER NOT NULL,
    "estado" "ReservationStatus" NOT NULL DEFAULT 'SOLICITADA',
    "total" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "nota" TEXT,
    "motivo_rechazo" TEXT,
    "aprobada_por_id" TEXT,
    "aprobada_en" TIMESTAMP(3),
    "creada_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizada_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lineas_pedido" (
    "id" TEXT NOT NULL,
    "reserva_id" TEXT NOT NULL,
    "plato_id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(12,2) NOT NULL,
    "nota" TEXT,

    CONSTRAINT "lineas_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "reserva_id" TEXT,
    "tipo" "NotificationType" NOT NULL,
    "titulo" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "programada_para" TIMESTAMP(3),
    "enviada_en" TIMESTAMP(3),
    "estado" "NotificationStatus" NOT NULL DEFAULT 'PENDIENTE',
    "creada_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preferencias_notificacion" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "token_push" TEXT,
    "plataforma" "DevicePlatform",
    "notificaciones_push" BOOLEAN NOT NULL DEFAULT true,
    "notificaciones_email" BOOLEAN NOT NULL DEFAULT true,
    "notificaciones_whatsapp" BOOLEAN NOT NULL DEFAULT true,
    "ultimo_uso" TIMESTAMP(3),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preferencias_notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bitacoras" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "accion" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidad_id" TEXT,
    "datos_previos" JSONB,
    "datos_nuevos" JSONB,
    "ip" TEXT,
    "user_agent" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bitacoras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticias" (
    "id" TEXT NOT NULL,
    "restaurante_id" TEXT NOT NULL,
    "autor_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "imagen_path" TEXT,
    "enlaces" JSONB,
    "fijada" BOOLEAN NOT NULL DEFAULT false,
    "publicada" BOOLEAN NOT NULL DEFAULT true,
    "publicada_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creada_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizada_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "noticias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "platos_slug_key" ON "platos"("slug");

-- CreateIndex
CREATE INDEX "platos_categoria_id_orden_idx" ON "platos"("categoria_id", "orden");

-- CreateIndex
CREATE UNIQUE INDEX "etiquetas_nombre_key" ON "etiquetas"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "platos_etiquetas_plato_id_etiqueta_id_key" ON "platos_etiquetas"("plato_id", "etiqueta_id");

-- CreateIndex
CREATE INDEX "disponibilidad_platos_fecha_idx" ON "disponibilidad_platos"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "disponibilidad_platos_plato_id_fecha_key" ON "disponibilidad_platos"("plato_id", "fecha");

-- CreateIndex
CREATE INDEX "dias_atencion_fecha_idx" ON "dias_atencion"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "dias_atencion_restaurante_id_fecha_key" ON "dias_atencion"("restaurante_id", "fecha");

-- CreateIndex
CREATE UNIQUE INDEX "reservas_codigo_key" ON "reservas"("codigo");

-- CreateIndex
CREATE INDEX "reservas_fecha_estado_idx" ON "reservas"("fecha", "estado");

-- CreateIndex
CREATE INDEX "reservas_usuario_id_creada_en_idx" ON "reservas"("usuario_id", "creada_en" DESC);

-- CreateIndex
CREATE INDEX "noticias_fijada_publicada_en_idx" ON "noticias"("fijada" DESC, "publicada_en" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavorites_AB_unique" ON "_UserFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavorites_B_index" ON "_UserFavorites"("B");

-- AddForeignKey
ALTER TABLE "zonas" ADD CONSTRAINT "zonas_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesas" ADD CONSTRAINT "mesas_zona_id_fkey" FOREIGN KEY ("zona_id") REFERENCES "zonas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platos" ADD CONSTRAINT "platos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos_platos" ADD CONSTRAINT "fotos_platos_plato_id_fkey" FOREIGN KEY ("plato_id") REFERENCES "platos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platos_etiquetas" ADD CONSTRAINT "platos_etiquetas_plato_id_fkey" FOREIGN KEY ("plato_id") REFERENCES "platos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platos_etiquetas" ADD CONSTRAINT "platos_etiquetas_etiqueta_id_fkey" FOREIGN KEY ("etiqueta_id") REFERENCES "etiquetas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidad_platos" ADD CONSTRAINT "disponibilidad_platos_plato_id_fkey" FOREIGN KEY ("plato_id") REFERENCES "platos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dias_atencion" ADD CONSTRAINT "dias_atencion_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reglas_atencion" ADD CONSTRAINT "reglas_atencion_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_aprobada_por_id_fkey" FOREIGN KEY ("aprobada_por_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lineas_pedido" ADD CONSTRAINT "lineas_pedido_reserva_id_fkey" FOREIGN KEY ("reserva_id") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lineas_pedido" ADD CONSTRAINT "lineas_pedido_plato_id_fkey" FOREIGN KEY ("plato_id") REFERENCES "platos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_reserva_id_fkey" FOREIGN KEY ("reserva_id") REFERENCES "reservas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencias_notificacion" ADD CONSTRAINT "preferencias_notificacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bitacoras" ADD CONSTRAINT "bitacoras_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noticias" ADD CONSTRAINT "noticias_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noticias" ADD CONSTRAINT "noticias_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavorites" ADD CONSTRAINT "_UserFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "platos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavorites" ADD CONSTRAINT "_UserFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- ==============================================================================
-- ACTIVACION DE ROW LEVEL SECURITY (RLS) CON NEGACION POR DEFECTO
-- Autor: Fabian Hoyos
-- Como criterio de aceptacion, habilito RLS en cada tabla para garantizar que
-- desde el API publica de Supabase ninguna consulta anonima pueda leer o escribir
-- datos sin una politica explicita o sin el rol privilegiado de servicio.
-- ==============================================================================

ALTER TABLE "usuarios" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "restaurantes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "zonas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "mesas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categorias" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "platos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "fotos_platos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "etiquetas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "platos_etiquetas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "disponibilidad_platos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "dias_atencion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "reglas_atencion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "reservas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "lineas_pedido" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notificaciones" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "preferencias_notificacion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "bitacoras" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "noticias" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_UserFavorites" ENABLE ROW LEVEL SECURITY;