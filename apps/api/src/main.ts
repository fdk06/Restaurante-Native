import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuro el prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1');

  // Configuro el filtro global de excepciones para unificar el formato de error
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Configuro Swagger para la documentación interactiva
  const config = new DocumentBuilder()
    .setTitle('API Restaurante')
    .setDescription('Documentación de la API de El Encanto Campestre')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  // Inicio el servidor en el puerto indicado en las variables de entorno o en el 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
