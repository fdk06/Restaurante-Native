// ==============================================================================
// PRUEBAS UNITARIAS DE ROLESGUARD - EL ENCANTO CAMPESTRE
// Autor: Fabián Hoyos (Infraestructura, Datos y Seguridad)
//
// En este archivo de pruebas verifico rigurosamente el comportamiento de mi
// guardia de roles (RolesGuard). Compruebo que permita rutas públicas, que conceda
// acceso a usuarios con el rol adecuado y que lance ForbiddenException (HTTP 403)
// ante peticiones de usuarios con roles insuficientes o ausentes.
// ==============================================================================

import 'reflect-metadata';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { RolesGuard } from './roles.guard';

describe('RolesGuard (Fabián Hoyos - Control de Acceso y Seguridad)', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  // antes de cada prueba instancio un nuevo reflector y mi guardia de roles
  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  // función auxiliar para simular el ExecutionContext de NestJS con el usuario especificado
  const crearContextoSimulado = (usuario: any): ExecutionContext => {
    return {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({
          user: usuario,
        }),
      }),
    } as unknown as ExecutionContext;
  };

  it('debe permitir el acceso si la ruta no define ningún decorador @Roles (ruta libre de rol)', () => {
    // simulo que el reflector no encuentra metadatos de roles en la ruta
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);

    const context = crearContextoSimulado({ id: 'user-1', rol: Role.COMENSAL });
    const resultado = guard.canActivate(context);

    // debe permitir la ejecución libremente
    expect(resultado).toBe(true);
  });

  it('debe permitir el acceso a un ADMIN en una ruta protegida exclusivamente para ADMIN', () => {
    // configuro que la ruta requiere rol ADMIN
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);

    const context = crearContextoSimulado({ id: 'admin-1', rol: Role.ADMIN });
    const resultado = guard.canActivate(context);

    expect(resultado).toBe(true);
  });

  it('debe permitir el acceso a un STAFF en una ruta compartida para STAFF y ADMIN', () => {
    // configuro que la ruta permite personal de atención o administradores
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.STAFF, Role.ADMIN]);

    const context = crearContextoSimulado({ id: 'staff-1', rol: Role.STAFF });
    const resultado = guard.canActivate(context);

    expect(resultado).toBe(true);
  });

  it('debe arrojar ForbiddenException (HTTP 403) si un COMENSAL intenta acceder a ruta de STAFF o ADMIN', () => {
    // la ruta exige rol STAFF o ADMIN
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.STAFF, Role.ADMIN]);

    const context = crearContextoSimulado({ id: 'comensal-1', rol: Role.COMENSAL });

    // debe lanzar excepción de prohibición con código 403
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow(/no cuenta con los permisos requeridos/);
  });

  it('debe arrojar ForbiddenException (HTTP 403) si no existe un usuario autenticado en la petición', () => {
    // la ruta exige rol ADMIN pero la petición no trae sesión
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);

    const context = crearContextoSimulado(undefined);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow(/Se requiere una sesión de usuario válida/);
  });

  it('debe arrojar ForbiddenException (HTTP 403) si el objeto usuario no incluye la propiedad rol', () => {
    // la petición tiene un usuario sin rol asignado
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);

    const context = crearContextoSimulado({ id: 'user-sin-rol' });

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
