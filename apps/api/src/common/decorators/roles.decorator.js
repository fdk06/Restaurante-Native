// ==============================================================================
// DECORADOR DE ROLES (@Roles) - EL ENCANTO CAMPESTRE
// Autor: Fabián Hoyos (Infraestructura, Datos y Seguridad)
//
// Con este decorador personalizo mis controladores o métodos de endpoint en NestJS
// para especificar qué roles (COMENSAL, STAFF, ADMIN) tienen permiso de ejecución.
// Guardo los roles en los metadatos de la ruta usando la clave ROLES_KEY.
// ==============================================================================
import { SetMetadata } from '@nestjs/common';
// defino la clave única para almacenar y recuperar los roles de los metadatos
export const ROLES_KEY = 'roles';
// aquí creo el decorador @Roles(...) que recibe uno o más roles requeridos
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);
