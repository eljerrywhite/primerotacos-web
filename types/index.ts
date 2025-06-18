
export interface Taqueria {
  _id: string;
  nombre: string;
  calidad: number;
  servicio: number;
  lugar: number;
  calificacionFinal: number;
  ubicacion?: string;
  direccion?: string;
  especialidad?: string;
  colonia?: string;
  alcaldia?: string;
}
