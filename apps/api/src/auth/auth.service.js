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
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
let AuthService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        jwtService;
        configService;
        prisma;
        constructor(jwtService, configService, prisma) {
            this.jwtService = jwtService;
            this.configService = configService;
            this.prisma = prisma;
        }
        async register(registerDto) {
            // Verificar si el correo ya existe
            const existing = await this.prisma.user.findUnique({
                where: { correo: registerDto.correo.toLowerCase() },
            });
            if (existing) {
                const { ConflictException } = await import('@nestjs/common');
                throw new ConflictException('El correo ya está registrado');
            }
            // Hashear contraseña con argon2id
            const passwordHash = await argon2.hash(registerDto.password, { type: argon2.argon2id });
            // Crear usuario en BD
            const newUser = await this.prisma.user.create({
                data: {
                    nombre: registerDto.nombre,
                    correo: registerDto.correo.toLowerCase(),
                    telefono: registerDto.telefono,
                    passwordHash,
                },
                select: {
                    id: true,
                    nombre: true,
                    correo: true,
                    telefono: true,
                    rol: true,
                    createdAt: true,
                },
            });
            return newUser;
        }
        async login(loginDto) {
            // Buscar usuario por correo en la tabla usuarios
            const user = await this.prisma.user.findUnique({
                where: { correo: loginDto.correo.toLowerCase() },
            });
            if (!user) {
                throw new UnauthorizedException('Credenciales inválidas');
            }
            if (!user.activo) {
                throw new UnauthorizedException('Cuenta inactiva');
            }
            // Verificar contraseña con argon2id
            const isPasswordValid = await argon2.verify(user.passwordHash, loginDto.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Credenciales inválidas');
            }
            const payload = { sub: user.id, correo: user.correo };
            const tokens = await this.generateTokens(payload);
            // Guardar hash del refresh token en tokens_refresco
            const tokenHash = await argon2.hash(tokens.refreshToken, { type: argon2.argon2id });
            await this.prisma.refreshToken.create({
                data: {
                    usuarioId: user.id,
                    tokenHash,
                    dispositivo: 'web',
                    expiraEn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
            return tokens;
        }
        async refresh(refreshToken) {
            try {
                const secret = this.configService.get('JWT_REFRESH_SECRET');
                const payload = this.jwtService.verify(refreshToken, { secret });
                // Buscar registros activos (no revocados, no expirados) para el usuario
                const storedTokens = await this.prisma.refreshToken.findMany({
                    where: {
                        usuarioId: payload.sub,
                        revocadoEn: null,
                        expiraEn: { gt: new Date() },
                    },
                });
                if (!storedTokens.length) {
                    throw new UnauthorizedException('Refresh token no encontrado');
                }
                // Verificar cuál hash coincide
                let stored = null;
                for (const t of storedTokens) {
                    const hashValid = await argon2.verify(t.tokenHash, refreshToken);
                    if (hashValid) {
                        stored = t;
                        break;
                    }
                }
                if (!stored) {
                    throw new UnauthorizedException('Refresh token inválido');
                }
                // Generar nuevos tokens y actualizar la fila (rotación)
                const newTokens = await this.generateTokens({ sub: payload.sub, correo: payload.correo });
                const newHash = await argon2.hash(newTokens.refreshToken, { type: argon2.argon2id });
                await this.prisma.refreshToken.update({
                    where: { id: stored.id },
                    data: {
                        tokenHash: newHash,
                        expiraEn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                });
                return newTokens;
            }
            catch (error) {
                console.error('Error en refresh:', error);
                throw new UnauthorizedException('Refresh token inválido o expirado');
            }
        }
        async logout(userId) {
            // Revoca todos los refresh tokens activos del usuario
            await this.prisma.refreshToken.updateMany({
                where: { usuarioId: userId, revocadoEn: null },
                data: { revocadoEn: new Date() },
            });
            return { message: 'Sesión cerrada correctamente' };
        }
        async generateTokens(payload) {
            // Emito un Access Token JWT
            const accessToken = this.jwtService.sign(payload);
            // Emito un Refresh Token rotatorio
            const refreshToken = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: (this.configService.get('JWT_REFRESH_EXPIRATION') || '7d'),
            });
            return {
                accessToken,
                refreshToken,
            };
        }
    };
    return AuthService = _classThis;
})();
export { AuthService };
