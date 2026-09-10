import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import type { RegisterDto, LoginDto } from '@encanto/shared';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async register(registerDto: RegisterDto) {
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

  async login(loginDto: LoginDto) {
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

  async refresh(refreshToken: string) {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
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
    } catch (error) {
      console.error('Error en refresh:', error);
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async logout(userId: string) {
    // Revoca todos los refresh tokens activos del usuario
    await this.prisma.refreshToken.updateMany({
      where: { usuarioId: userId, revocadoEn: null },
      data: { revocadoEn: new Date() },
    });
    return { message: 'Sesión cerrada correctamente' };
  }

  private async generateTokens(payload: any) {
    // Emito un Access Token JWT
    const accessToken = this.jwtService.sign(payload);

    // Emito un Refresh Token rotatorio
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d') as any,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
