import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    // Configuro las variables de entorno para que estén disponibles globalmente
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
