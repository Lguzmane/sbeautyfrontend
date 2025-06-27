import servicesData from '../data/services.json';

export function getCategoryFromService(servicioNombre) {
  if (!servicioNombre) return null;

  for (const categoria of servicesData.categorias) {
    if (categoria.servicios.some(s => s.toLowerCase() === servicioNombre.toLowerCase())) {
      return categoria.nombre;
    }
  }

  return null;
}
