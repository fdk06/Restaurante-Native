// funcion para formatear precios en pesos colombianos (COP) sin decimales
// por ejemplo si le paso 25000 me devuelve '$ 25.000'
export function formatCurrencyCOP(valor: number): string {
  // si por alguna razon el valor llega invalido o no es numero, devuelvo cero formateado
  if (isNaN(valor) || valor === null || valor === undefined) {
    return '$ 0';
  }

  // uso el formateador oficial de JavaScript con localizacion colombiana
  const formateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);

  return formateado;
}

// funcion para formatear fechas en el formato oficial colombiano dd/mm/aaaa
// acepta una fecha tipo Date o una cadena de texto (como la que viene de Supabase)
export function formatDateDMY(fecha: Date | string): string {
  const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;

  // valido que la fecha sea valida antes de intentar formatearla
  if (isNaN(fechaObj.getTime())) {
    return '';
  }

  const dia = String(fechaObj.getDate()).padStart(2, '0');
  const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
  const anio = fechaObj.getFullYear();

  return `${dia}/${mes}/${anio}`;
}
