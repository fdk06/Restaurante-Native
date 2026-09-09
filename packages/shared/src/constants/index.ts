// definimos los roles que puede tener una persona en la aplicacion
// comensal: cliente normal que consulta y solicita reservas
// staff: meseros y cocina que operan la agenda del dia
// admin: dueno que aprueba reservas, publica noticias y modifica la carta
export enum Role {
  COMENSAL = 'COMENSAL',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}

// estos son los estados por los que puede pasar una reserva en el restaurante
// el flujo normal es: SOLICITADA -> CONFIRMADA -> EN_CURSO -> COMPLETADA
export enum ReservationStatus {
  SOLICITADA = 'SOLICITADA',
  CONFIRMADA = 'CONFIRMADA',
  RECHAZADA = 'RECHAZADA',
  CANCELADA = 'CANCELADA',
  EN_CURSO = 'EN_CURSO',
  COMPLETADA = 'COMPLETADA',
  NO_ASISTIO = 'NO_ASISTIO',
}

// reglas generales del negocio que acordamos con el restaurante
export const BUSINESS_RULES = {
  // tiempo de duracion base de una mesa para 1 a 4 personas (en minutos)
  DURACION_RESERVA_ESTANDAR_MIN: 90,
  // tiempo de duracion para grupos de 5 o mas personas (en minutos)
  DURACION_RESERVA_GRUPOS_MIN: 120,
  // tiempo limite para cancelar una reserva antes de la hora acordada (en minutos)
  CANCELACION_ANTICIPACION_MIN: 60,
  // margen de espera antes de marcar que el cliente no llego (en minutos)
  TOLERANCIA_LLEGADA_MIN: 30,
  // a partir de cuantas personas es obligatorio pedir platos por adelantado
  PERSONAS_MINIMAS_PEDIDO_OBLIGATORIO: 8,
};
