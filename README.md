# PRIMERO TACOS × LOS KNIJOS

Base de datos comunitaria de taquerías en la Ciudad de México, calificadas por expertos taqueros.

![Next.js](https://img.shields.io/badge/Next.js-13.5.6-black)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-47A248)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6)

## 🌮 Descripción

Directorio colaborativo de las mejores taquerías de la CDMX, donde cada establecimiento es evaluado en tres categorías: calidad, servicio y lugar. Las nuevas taquerías son agregadas mediante un GPT especializado que extrae automáticamente información de ubicación y mantiene estándares consistentes de evaluación.

## 🚀 Demo

- **Producción**: https://primerotacos-web.onrender.com
- **API**: https://primerotacos.onrender.com/taquerias
- **GPT**: https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos

## ✨ Características

- 🔍 **Búsqueda en tiempo real** por nombre de taquería
- 📊 **Ordenamiento** por calificación o alfabético
- 🗺️ **Filtros por alcaldía** de la CDMX
- 💎 **Taglines únicos** - "Lo más chingón" de cada lugar
- 📍 **Información completa** - Dirección, colonia y alcaldía
- 📱 **Diseño responsive** - Perfecto en móvil y desktop
- 🤖 **GPT integrado** - Agrega y actualiza taquerías automáticamente
- ⚡ **Actualización inteligente** - Promedia calificaciones existentes

## 🛠 Stack Tecnológico

- **Frontend**: Next.js 13.5.6 + TypeScript + Tailwind CSS
- **Backend**: API REST en Node.js/Express (repo separado)
- **Base de datos**: MongoDB Atlas
- **Iconos**: Lucide React
- **Hosting**: Render
- **AI**: ChatGPT personalizado con extracción de datos de Google Maps

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/eljerrywhite/primerotacos-web.git
cd primerotacos-web

# Instalar dependencias
npm install

# Variables de entorno
# Crear archivo .env.local con:
MONGODB_URI=tu_connection_string_de_mongodb

# Iniciar en desarrollo
npm run dev
```

## 🏗 Estructura del Proyecto

```
/
├── pages/
│   ├── index.tsx          # Página principal con toda la UI
│   └── api/
│       └── taquerias.ts   # Proxy API para evitar CORS
├── components/
│   └── PrimeroTacosLogo.tsx  # Logo SVG con variantes
├── lib/
│   └── mongodb.ts         # Conexión a MongoDB
├── types/
│   └── index.ts          # Tipos TypeScript
├── styles/
│   └── globals.css       # Estilos globales con Tailwind
└── public/
    └── favicon.ico       # Favicon
```

## 🗄 Estructura de Datos

```typescript
interface Taqueria {
  _id: string;
  nombre: string;
  calidad: number;          // 1-5
  servicio: number;         // 1-5
  lugar: number;            // 1-5
  calificacionFinal: number; // Calculado: 70% calidad, 20% servicio, 10% lugar
  ubicacion: string;        // URL de Google Maps
  especialidad?: string;    // "Lo más chingón" - tagline
  direccion?: string;       // Extraída de Google Maps
  colonia?: string;         // Extraída de Google Maps
  alcaldia?: string;        // Validada (16 alcaldías CDMX)
  fecha: Date;
}
```

## 🤖 GPT para Agregar Taquerías

El GPT especializado:
1. **Extrae automáticamente** dirección, colonia y alcaldía de URLs de Google Maps
2. **Valida** que la alcaldía sea una de las 16 de CDMX
3. **Pregunta** "¿Qué es lo más chingón?" para crear taglines memorables
4. **Calcula promedios** cuando actualizas una taquería existente

[Usar el GPT](https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos)

## 📝 Agregar Nueva Taquería con Página Individual

### Proceso rápido:
1. **Medios**: Colocar poster en `/public/images/poster-<slug>.jpg` y video (opcional) en `/public/videos/pr-<slug>.mp4`
2. **JSON**: Crear `data/taquerias/<slug>.json` usando el template en `data/_template.json`
3. **Verificar**: Abrir `/api/taquerias` para confirmar `hasDetailPage: true` y luego `/<slug>` para ver la página
4. **Sitemap**: Agregar entrada en `public/sitemap.xml` con la URL y poster

Ver [FUNCIONALIDADES.md](FUNCIONALIDADES.md#-sistema-de-alta-de-taquerías) para detalles completos.

## 🚀 Deployment

El proyecto se despliega automáticamente en Render cuando se hace push a la rama `main`.

```bash
# Para deployment manual
npm run build
npm start
```

## 🔄 API Backend

La API está en un repositorio separado: [primerotacos](https://github.com/eljerrywhite/primerotacos)

Endpoints:
- `GET /taquerias` - Lista todas las taquerías
- `POST /taquerias` - Crea o actualiza una taquería

## 📈 Próximas Mejoras

- [ ] Paginación o scroll infinito
- [ ] Google Analytics
- [ ] Dominio propio (primerotacos.mx)
- [ ] Sistema de favoritos
- [ ] Compartir en redes sociales
- [ ] Fotos de taquerías
- [ ] Mapa interactivo

## 👥 Colaboradores

- **Los Knijos** - Concepto y curaduría
- **Community** - Aportaciones via GPT

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de contribuir.

---

Hecho con 🌮 en la CDMX