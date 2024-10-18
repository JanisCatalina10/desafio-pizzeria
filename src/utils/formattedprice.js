// formattedPrice.js
export function FormattedPrice(valor) {
return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
}
