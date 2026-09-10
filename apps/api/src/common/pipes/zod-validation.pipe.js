import { BadRequestException } from '@nestjs/common';
export class ZodValidationPipe {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        // Solo valido el cuerpo (body) de las peticiones
        if (metadata.type !== 'body') {
            return value;
        }
        try {
            // Valido los datos de entrada contra el esquema de Zod
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        }
        catch (error) {
            // Si la validación falla, lanzo una excepción de BadRequest
            throw new BadRequestException(error);
        }
    }
}
