// pages/api/taquerias.ts
import fs from 'fs';
import path from 'path';

/** Convierte texto a slug amigable: minúsculas, sin acentos, solo a-z0-9- */
function slugify(input = '') {
  return input
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** Limpia slugs que vengan de BD: sin "/" inicial, sin ".tsx", sin chars raros */
function cleanSlug(s = '') {
  return s
    .toString()
    .trim()
    .replace(/^\//, '')
    .replace(/\.tsx?$/i, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** Intenta obtener el arreglo de taquerías desde una URL (si responde 2xx y es array JSON). */
async function tryFetchArray(url: string): Promise<any[] | null> {
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();

      // Manejar ambos formatos
      if (data && data.taquerias) {
        return data.taquerias;  // Nuevo formato
      } else if (Array.isArray(data)) {
        return data;  // Formato antiguo
      }
    }
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
  }
  return null;
}

/** Resuelve la fuente de datos:
 * 1) Si existe RENDER_API_URL, úsala.
 * 2) Si no, prueba múltiples rutas (tu lógica actual).
 */
async function fetchTaqueriasBase(): Promise<any[]> {
  const fromEnv = process.env.RENDER_API_URL;
  if (fromEnv) {
    const data = await tryFetchArray(fromEnv);
    if (data) {
      return data;
    }
  }

  const possibleRoutes = [
    "https://primerotacos.onrender.com/api/taquerias",
    "https://primerotacos.onrender.com/taquerias",
    "https://primerotacos.onrender.com/api/taqueria",
    "https://primerotacos.onrender.com/"
  ];

  for (const route of possibleRoutes) {
    const data = await tryFetchArray(route);
    if (data) {
      return data;
    }
  }

  return []; // último recurso
}

export default async function handler(req: any, res: any) {
  try {
    // 1) Trae taquerías desde Render (env var o rutas de respaldo)
    const base = await fetchTaqueriasBase();
    const taquerias: any[] = Array.isArray(base) ? base : [];

    // 2) Manifest de JSONs en /data/taquerias (para inferir hasDetailPage)
    const dataDir = path.join(process.cwd(), 'data', 'taquerias');
    const exists = fs.existsSync(dataDir);
    const jsonFiles = exists
      ? fs.readdirSync(dataDir)
          .filter(f => f.endsWith('.json') && !f.startsWith('_')) // ignora _template y otros privados
          .map(f => f.replace('.json', ''))
      : [];
    const jsonSet = new Set(jsonFiles);

    // 3) Enriquecer cada taquería con pageSlug + hasDetailPage (derivado del manifest)
    const enriched = taquerias.map((t: any) => {
      const fromDb = cleanSlug(t.pageSlug || '');
      const fallback = slugify(t.nombre || '');
      const pageSlug = fromDb || fallback;
      const hasDetailPage = pageSlug ? jsonSet.has(pageSlug) : false;

      return {
        ...t,
        pageSlug,       // string limpio (sin "/", sin ".tsx")
        hasDetailPage,  // true si existe data/taquerias/<slug>.json
      };
    });

    return res.status(200).json(enriched);
  } catch (error: any) {
    console.error('Error /api/taquerias:', error);
    return res.status(500).json({ error: 'Error fetching data', message: error?.message });
  }
}
