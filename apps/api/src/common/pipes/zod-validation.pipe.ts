import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    // Solo valido el cuerpo (body) de las peticiones
    if (metadata.type !== 'body') {
      return value;
    }

    try {
      // Valido los datos de entrada contra el esquema de Zod
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      // Si la validación falla, lanzo una excepción de BadRequest
      throw new BadRequestException(error);
    }
  }
}
