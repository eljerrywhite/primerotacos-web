// types/index.ts

export interface TaqueriaBase {
  _id: string;
  nombre: string;
  calidad: number;
  servicio: number;
  lugar: number;
  ccalificacionFinal: number | null;
  ubicacion?: string;
  especialidad?: string;
  taglines?: string[];
  direccion?: string;
  colonia?: string;
  alcaldia?: string;
  fecha?: string | Date;
  hasDetailPage?: boolean;
  pageSlug?: string;
  snippet?: string;
}

export interface TaqueriaDescripcion {
  quote: string;
  paragraphs: string[];
}

export interface TaqueriaMedia {
  video?: string;
  poster?: string;
}

export interface TaqueriaSEO {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
}

export interface TaqueriaOpeningHours {
  opens: string;
  closes: string;
  days: string[];
}

/**
 * Tipo para la página de detalle.
 * Extiende el base e incluye los campos que vienen del JSON en /data/taquerias/<slug>.json
 */
export interface TaqueriaDetail extends TaqueriaBase {
  slug: string;
  desde?: string;
  descripcion: TaqueriaDescripcion;
  instagram?: string;
  facebook?: string;
  website?: string;
  priceText?: string; // compat: antes usabas "precio" en algunas páginas
  hashtags?: string[];
  openingHours?: TaqueriaOpeningHours;
  media: TaqueriaMedia;
  seo?: TaqueriaSEO;
}
