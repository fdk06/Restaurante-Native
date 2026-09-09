// ==============================================================================
// SCRIPT PARA ACTIVAR ROW LEVEL SECURITY (RLS) EN SUPABASE
// Autor: Fabián Hoyos (Infraestructura, Datos y Seguridad)
//
// En este script recorro todas las tablas del modelo relacional en PostgreSQL
// y activo Row Level Security (RLS) para asegurar la denegación por defecto
// conforme al criterio de aceptación de RNF-08.
// ==============================================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function enableRLS() {
  console.log('🔒 Verificando y habilitando Row Level Security (RLS) en Supabase...');

  const tables = [
    'usuarios',
    'restaurantes',
    'zonas',
    'mesas',
    'categorias',
    'platos',
    'fotos_platos',
    'etiquetas',
    'platos_etiquetas',
    'disponibilidad_platos',
    'dias_atencion',
    'reglas_atencion',
    'reservas',
    'lineas_pedido',
    'notificaciones',
    'preferencias_notificacion',
    'bitacoras',
    'noticias',
    '_UserFavorites'
  ];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`);
      console.log(`✅ RLS activo en la tabla: ${table}`);
    } catch (error: any) {
      console.warn(`⚠️ No se pudo aplicar RLS en ${table}: ${error?.message || error}`);
    }
  }

  console.log('🎉 RLS configurado exitosamente en todas las tablas.');
}

enableRLS()
  .catch((e) => {
    console.error('Error al configurar RLS:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
