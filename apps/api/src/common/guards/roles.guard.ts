// ==============================================================================
// GUARDIA DE ROLES (RolesGuard) - EL ENCANTO CAMPESTRE
// Autor: Fabián Hoyos (Infraestructura, Datos y Seguridad)
//
// En este guard implemento la lógica de autorización por roles para proteger
// los endpoints de la API en NestJS. Comparo el rol del usuario autenticado
// contra los roles requeridos definidos mediante el decorador @Roles. Si el
// usuario no posee los permisos adecuados, arrojo de inmediato un ForbiddenException (403).
// ==============================================================================

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  // inyecto el Reflector de NestJS para inspeccionar los metadatos de la ruta
  constructor(private readonly reflector: Reflector) {}

  // evalúo si la petición entrante tiene autorización para ejecutarse
  canActivate(context: ExecutionContext): boolean {
    // obtengo los roles permitidos configurados en el método o en el controlador padre
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // si la ruta no tiene la anotación @Roles, asumo que es accesible sin restricción de rol
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // extraigo la petición HTTP y el usuario adjuntado por el guard de autenticación
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // si la ruta exige roles pero no hay usuario autenticado en la petición, niego el acceso
    if (!user || !user.rol) {
      throw new ForbiddenException(
        'Acceso denegado: Se requiere una sesión de usuario válida para acceder a este recurso protegido.',
      );
    }

    // compruebo si el rol del usuario está incluido dentro de la lista de roles permitidos
    const tieneRolPermitido = requiredRoles.includes(user.rol as Role);

    if (!tieneRolPermitido) {
      throw new ForbiddenException(
        `Acceso denegado: El rol [${user.rol}] no cuenta con los permisos requeridos para ejecutar esta acción.`,
      );
    }

    // el usuario cuenta con el rol autorizado, permito continuar la ejecución
    return true;
  }
}
