// ==============================================================================
// GUARDIA DE ROLES (RolesGuard) - EL ENCANTO CAMPESTRE
// Autor: Fabián Hoyos (Infraestructura, Datos y Seguridad)
//
// En este guard implemento la lógica de autorización por roles para proteger
// los endpoints de la API en NestJS. Comparo el rol del usuario autenticado
// contra los roles requeridos definidos mediante el decorador @Roles. Si el
// usuario no posee los permisos adecuados, arrojo de inmediato un ForbiddenException (403).
// ==============================================================================
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
let RolesGuard = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RolesGuard = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RolesGuard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        reflector;
        // inyecto el Reflector de NestJS para inspeccionar los metadatos de la ruta
        constructor(reflector) {
            this.reflector = reflector;
        }
        // evalúo si la petición entrante tiene autorización para ejecutarse
        canActivate(context) {
            // obtengo los roles permitidos configurados en el método o en el controlador padre
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
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
                throw new ForbiddenException('Acceso denegado: Se requiere una sesión de usuario válida para acceder a este recurso protegido.');
            }
            // compruebo si el rol del usuario está incluido dentro de la lista de roles permitidos
            const tieneRolPermitido = requiredRoles.includes(user.rol);
            if (!tieneRolPermitido) {
                throw new ForbiddenException(`Acceso denegado: El rol [${user.rol}] no cuenta con los permisos requeridos para ejecutar esta acción.`);
            }
            // el usuario cuenta con el rol autorizado, permito continuar la ejecución
            return true;
        }
    };
    return RolesGuard = _classThis;
})();
export { RolesGuard };
