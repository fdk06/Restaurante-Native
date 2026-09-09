import { Controller, Post, Body, UsePipes, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RegisterSchema, LoginSchema } from '@encanto/shared';
import type { RegisterDto, LoginDto } from '@encanto/shared';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de registro inválidos' })
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() registerDto: RegisterDto) {
    // Proceso el registro a través del servicio
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión iniciada, retorna tokens' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() loginDto: LoginDto) {
    // Proceso el login para obtener los tokens JWT
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refrescar tokens' })
  @ApiBody({ schema: { type: 'object', properties: { refreshToken: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Nuevos tokens generados' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido o expirado' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    // Invalido el token anterior (implícito al requerir uno válido y emitir otro)
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  async logout(@Req() req: any) {
    // Extraigo el ID del usuario desde el token (en un entorno real usaría un Guard)
    const userId = req.user?.['sub'] || 'unknown';
    // Invalido el refresh token del dispositivo
    return this.authService.logout(userId);
  }
}
