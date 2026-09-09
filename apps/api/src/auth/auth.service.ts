import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import type { RegisterDto, LoginDto } from '@encanto/shared';

@Injectable()
export class AuthService {
  // Simulo una base de datos temporal en memoria (Fabián la reemplazará con Prisma)
  private mockUsers: any[] = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Hasheo la contraseña obligatoriamente con argon2id
    const hashedPassword = await argon2.hash(registerDto.password, {
      type: argon2.argon2id,
    });

    const newUser = {
      id: Date.now().toString(),
      nombre: registerDto.nombre,
      correo: registerDto.correo,
      telefono: registerDto.telefono,
      password: hashedPassword,
    };

    // Guardo el usuario en la "base de datos" simulada
    this.mockUsers.push(newUser);

    // Retorno el usuario sin la contraseña
    const { password, ...userSinPassword } = newUser;
    return userSinPassword;
  }

  async login(loginDto: LoginDto) {
    // Busco el usuario por correo
    const user = this.mockUsers.find((u) => u.correo === loginDto.correo);

    // Valido credenciales y devuelvo un error genérico si fallan
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await argon2.verify(user.password, loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Genero los tokens si la autenticación es exitosa
    const payload = { sub: user.id, correo: user.correo };
    return this.generateTokens(payload);
  }

  async refresh(refreshToken: string) {
    try {
      // Verifico el refresh token usando el secreto configurado
      const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
      const payload = this.jwtService.verify(refreshToken, { secret });
      
      // Emito un nuevo par de tokens
      return this.generateTokens({ sub: payload.sub, correo: payload.correo });
    } catch (error) {
      // Invalido la operación si el token no es válido o expiró
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async logout(userId: string) {
    // Aquí iría la lógica para invalidar el refresh token del dispositivo
    // (Ej. borrar el hash de la DB). Por ahora, retorno éxito.
    return { message: 'Sesión cerrada correctamente' };
  }

  private async generateTokens(payload: any) {
    // Emito un Access Token JWT (15 min)
    const accessToken = this.jwtService.sign(payload);

    // Emito un Refresh Token rotatorio (7 días)
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
