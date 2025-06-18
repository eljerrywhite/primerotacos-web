// types/index.ts
export interface Taqueria {
  _id: string;
  nombre: string;
  calidad: number;
  servicio: number;
  lugar: number;
  calificacionFinal: number;
  ubicacion: string;
  // Campos opcionales ya que no están en todos los documentos
  alcaldia?: string;
  colonia?: string;
}