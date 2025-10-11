# FUNCIONALIDADES COMPLETAS
*Catálogo de todas las características implementadas*

## 🌮 Core Features

### **Sistema de Calificaciones**
- **Algoritmo ponderado:** 70% calidad, 20% servicio, 10% lugar
- **Escala 1-5:** Con decimales visibles
- **Promedio automático:** Cálculo en tiempo real
- **Validación:** Solo acepta valores válidos

### **Base de Datos Inteligente**
- **MongoDB Atlas:** Cloud hosting
- **40+ taquerías:** Constantemente creciendo
- **16 alcaldías:** Cobertura completa CDMX
- **Datos ricos:** Direcciones, especialidades, taglines múltiples

## 🔍 Búsqueda y Filtros

### **Búsqueda Inteligente**
- **Sin acentos:** Encuentra resultados ignorando tildes
- **Sinónimos:** 14 términos implementados
  - `sirloin` ↔ `sirlion` ↔ `sirlon`
  - `vegetariano` ↔ `veggie` ↔ `veggies` ↔ `vegetariana`
  - `costilla` ↔ `costiya` ↔ `costillita`
  - `suadero` ↔ `suadera`
  - `pastor` ↔ `al pastor` ↔ `trompo`
  - `carnitas` ↔ `carnita`
  - `chorizera` ↔ `chorizo` ↔ `chorisera`
  - `bistec` ↔ `bistek`
- **Búsqueda en:** Nombres, especialidades, taglines
- **Tiempo real:** Resultados instantáneos

### **Filtros Avanzados**
- **Por alcaldía:** Contador inteligente solo muestra números cuando hay contenido
- **Ordenamiento:** Calificación, alfabético, fecha
- **Toggle "Taquerías con reseña":** Filtra solo las taquerías con página individual completa
- **Responsive:** Desktop y móvil
- **UX estratégica:** Guía hacia empty states con CTA

## 🎨 Interfaz y Experiencia

### **Design System**
- **Tema dual:** Light/Dark automático basado en sistema
- **Variables CSS:** Sistema centralizado de colores
- **Tipografía responsiva:** Optimizada para lectura
- **Accesibilidad:** WCAG 2.1, navegación por teclado, focus states

### **Animaciones y Micro-interacciones**
- **Taglines rotativos:** Feature única, rotación cada 4 segundos
- **Skeleton loaders:** Feedback visual durante carga
- **Modal slide-up:** Animaciones suaves
- **Hover effects:** Cards interactivas
- **Loading states:** Micro-animaciones con CSS

### **Componentes Únicos**
- **RotatingTagline:** Sistema de taglines múltiples
- **TaqueriaSkeleton:** Loading states elegantes
- **EmptyState:** Estados vacíos con CTAs estratégicos
- **PrimeroTacosLogo:** Componente adaptativo
- **Página de Error:** Manejo profesional de errores 404 y 500 con diseño consistente

### **Sistema de Enlaces a Páginas Individuales**
- **Detección automática:** Propiedad `hasDetailPage` en cada taquería
- **Cards clickeables:** Toda la card es clickeable cuando existe página de detalle
- **Navegación intuitiva:** Click en cualquier parte de la card (excepto botones específicos)
- **Debug mode:** Console logs para verificar qué taquerías tienen páginas
- **Cursor pointer:** Feedback visual inmediato en hover
- **Compatibilidad:** Sistema retrocompatible con taquerías sin página individual

## 📱 Responsive y Mobile

### **Mobile-First**
- **Touch targets:** Mínimo 44px
- **Filtros móviles:** Expandibles con scroll inteligente
- **Modal optimizado:** Scroll solo en contenido
- **Botón flotante:** Scroll-to-top contextual

### **Desktop Experience**
- **Parallax sutil:** Pattern de fondo
- **Hover states:** Interacciones refinadas
- **Logo dinámico:** Responde al scroll
- **Layout optimal:** Maximiza contenido útil

## 🤖 Integración GPT

### **ChatGPT Personalizado**
- **Extracción automática:** Datos desde Google Maps URLs
- **Validación:** Alcaldías oficiales CDMX
- **Promedio inteligente:** Actualización de calificaciones
- **Taglines múltiples:** Agrega sin duplicar

### **Flujo de Datos**
1. Usuario comparte URL Maps con GPT
2. GPT extrae dirección, colonia, alcaldía
3. GPT solicita calificaciones (1-5)
4. API guarda/actualiza con promedio
5. Frontend muestra inmediatamente

## 📊 Analytics y SEO

### **Google Analytics 4**
- **Eventos personalizados:** Visualizaciones, búsquedas, filtros
- **Funnel tracking:** Desde búsqueda hasta GPT
- **Informes custom:** Taquerías más vistas, términos de búsqueda

### **SEO Completo**
- **Meta tags:** Títulos, descripciones optimizadas
- **Open Graph:** Compartir en redes sociales
- **Sitemap.xml:** Indexación completa
- **Schema.org:** Datos estructurados
- **Favicons:** Set completo multiplataforma

## 🔒 Seguridad y Performance

### **Headers de Seguridad (Calificación A)**
- **HTTPS:** SSL forzado
- **CSP:** Content Security Policy
- **HSTS:** HTTP Strict Transport Security
- **X-Frame-Options:** Protección clickjacking

### **Performance**
- **CDN:** Optimizado para México
- **Compression:** Assets minificados
- **Lazy loading:** Componentes bajo demanda
- **Caching:** Estrategias optimizadas

## 🎯 Empty States y CTAs

### **Estados Vacíos Inteligentes**
- **Por búsqueda:** Sugiere ampliar términos
- **Por filtro:** Sugiere otras alcaldías
- **Combinado:** Búsqueda + filtro
- **Error:** Recarga y contacto

### **CTAs Estratégicos**
- **Calificar con GPT:** Principal conversion
- **Ver mapa:** Secondary action

## 🆕 Sistema de Alta de Taquerías

### **Proceso de 4 Pasos**

#### 1. Medios
- **Poster**: Colocar en `/public/images/poster-<slug>.jpg`
- **Video** (opcional): Colocar en `/public/videos/pr-<slug>.mp4`

#### 2. Crear JSON
- **Ubicación**: `data/taquerias/<slug>.json`
- **Template**: Usar `data/_template.json` como base
- **Campos requeridos**: `_id`, `slug`, `nombre`, `calidad`, `servicio`, `lugar`, `direccion`, `ubicacion`, `taglines`, `descripcion`, `media`, `seo`

#### 3. Verificación Local
- **API**: Abrir `/api/taquerias` → verificar `"hasDetailPage": true` para el slug
- **Página**: Abrir `/<slug>` → verificar render correcto (hero, rating, card lateral, redes)
- **Badge**: Verificar que aparezca badge "Reseña" en la card del home

#### 4. Actualizar Sitemap
- **Archivo**: `public/sitemap.xml`
- **Agregar**: Entry con `<url>`, `<loc>` e `<image:image>` para el poster

### **Detección Automática de Páginas**
- **Manifest de archivos**: Sistema lee automáticamente JSONs en `/data/taquerias/`
- **Propiedad `hasDetailPage`**: Calculada dinámicamente por `/api/taquerias`
- **Cards clickeables**: Si existe JSON, toda la card es clickeable
- **Sistema retrocompatible**: Taquerías sin JSON mantienen funcionalidad normal

### **Template JSON Estandarizado**
```json
{
  "_id": "<slug>",
  "slug": "<slug>",
  "nombre": "Nombre de la taquería",
  "desde": "YYYY",
  "calidad": 4,
  "servicio": 4,
  "lugar": 4,
  "calificacionFinal": null,
  "direccion": "Calle, Colonia, Alcaldía, CP Ciudad, CDMX",
  "ubicacion": "https://maps.app.goo.gl/...",
  "taglines": ["Frase corta para el hero"],
  "descripcion": {
    "quote": "Quote fuerte.",
    "paragraphs": ["Párrafo 1", "Párrafo 2"]
  },
  "website": "https://...",
  "instagram": "@usuario",
  "priceText": "Tacos: $xx–$yy",
  "hashtags": ["#PrimeroTacos"],
  "openingHours": {
    "opens": "12:00",
    "closes": "23:30",
    "days": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  },
  "media": {
    "video": "/videos/pr-<slug>.mp4",
    "poster": "/images/poster-<slug>.jpg"
  },
  "seo": {
    "title": "Meta title…",
    "description": "Meta description…",
    "ogTitle": "OG title…",
    "ogDescription": "OG description…",
    "ogImage": "https://primerotacos.mx/og-image.png",
    "ogImageAlt": "Descripción accesible de la imagen"
  }
}
```

## 📄 Páginas Individuales de Taquerías

### **El Rey del Pastor** (desde 1974)
- **Hero con video:** Background video autoplay optimizado con poster de respaldo
- **Contenido editorial:** Historia desde 1974, especialidades únicas (pastor sin piña)
- **Información completa:** Precios específicos ($11-12 tacos, $20 lengua)
- **Redes sociales:** Links directos a Facebook oficial
- **Layout profesional:** Dos columnas responsive con detalles completos
- **SEO Schema.org:** Restaurant markup completo para buscadores

### **Ricos Tacos Toluca** (desde 2003)
- **Distinción Michelin:** Badge destacado en hero y contenido
- **Especialidades únicas:** Chorizo tamarindo, campechano con cecina
- **Contenido detallado:** Historia familiar, viaje diario desde Toluca
- **Precios específicos:** Taco $30, Campechano $35, Con queso +$10
- **Instagram integrado:** Link directo a @ricostacostoluca_
- **Video hero optimizado:** Lazy loading y poster de respaldo

### **La Bonvi** (desde 2024)
- Taquería fifí con especialidades únicas: New York, costilla, campechano
- Video background con lazy loading y poster de respaldo
- Precios específicos: Desde $89 a $145
- Instagram: @labonvi.mx

### **Características Compartidas**
- **Lazy loading videos:** Cargan después de 500ms para mejor performance
- **SEO completo:** Meta tags, Open Graph, Twitter Cards individuales
- **Schema.org Restaurant:** Datos estructurados para cada taquería
- **Design system:** Integración perfecta con tema principal (dark/light)
- **Responsive optimizado:** Mobile-first con breakpoints perfectos
- **CTAs estratégicos:** Botones mapa y calificación en cada página
- **Footer consistente:** Mismo diseño que página principal
- **Navegación fluida:** Links de regreso a página principal
- **Breadcrumb navegacional:** Ubicado debajo del hero-video con:
  - Padding consistente: 27px móvil, 48px desktop
  - Fondo adaptativo según tema (card-bg)
  - Texto truncado para resoluciones pequeñas (max-width: 200px)
  - Iconos Home y ChevronRight responsive
  - Enlace funcional a página principal