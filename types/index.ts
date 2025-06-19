// types/index.ts
export interface Taqueria {
  _id: string;
  nombre: string;
  calidad: number;
  servicio: number;
  lugar: number;
  calificacionFinal: number;
  ubicacion: string;
  especialidad?: string;    
  direccion?: string;       
  colonia?: string;         
  alcaldia?: string;        
  fecha?: string | Date;
}