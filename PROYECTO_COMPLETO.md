# PROYECTO PRIMERO TACOS - DOCUMENTACIÓN COMPLETA
*Fecha: 2 de Julio de 2025*

## 🎯 RESUMEN EJECUTIVO

**Primero Tacos** es una base de datos comunitaria de taquerías en CDMX, con calificaciones por expertos taqueros. Sistema completo con frontend, backend, base de datos y GPT integrado.

### URLs en Producción
- **Web App**: https://primerotacos-web.onrender.com
- **API**: https://primerotacos.onrender.com
- **GPT**: https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos

## 🏗 ARQUITECTURA DEL SISTEMA

### Frontend (primerotacos-web)
- **Stack**: Next.js 13.5.6, TypeScript, Tailwind CSS
- **Host**: Render (Web Service)
- **Repo**: https://github.com/eljerrywhite/primerotacos-web

### Backend API (primerotacos)
- **Stack**: Node.js, Express, MongoDB
- **Host**: Render (Web Service)
- **Repo**: https://github.com/eljerrywhite/primerotacos

### Base de Datos
- **MongoDB Atlas** (Cloud)
- **Colección**: taquerias

### GPT
- **ChatGPT** personalizado con Actions
- Extrae datos de Google Maps automáticamente
- Calcula promedios en actualizaciones

## 📊 MODELO DE DATOS

```javascript
// MongoDB Schema ACTUALIZADO
{
  nombre: String (required),
  calidad: Number (1-5, required),
  servicio: Number (1-5, required),
  lugar: Number (1-5, required),
  calificacionFinal: Number (calculado: 70% calidad, 20% servicio, 10% lugar),
  ubicacion: String (URL Google Maps),
  especialidad: String (tagline individual - mantiene compatibilidad),
  taglines: [String] (NUEVO - array de taglines para rotación),
  direccion: String,
  colonia: String,
  alcaldia: String (validada - 16 alcaldías CDMX),
  fecha: Date
}
```

## 🔧 CARACTERÍSTICAS IMPLEMENTADAS

### Funcionalidades Avanzadas
- ✅ **Taglines rotativos**: Sistema único de rotación de frases cada 4 segundos
- ✅ **Transiciones suaves**: Fade in/out con CSS transitions
- ✅ **Detección automática**: Usa componente rotativo o fallback según datos
- ✅ **Gestión inteligente**: GPT agrega taglines sin duplicar

### UI/UX
- ✅ Diseño minimalista blanco y negro
- ✅ Logo con variantes (positive/negative)
- ✅ Pattern de fondo actualizado (24 Junio)
- ✅ Efecto parallax en pattern (desktop)
- ✅ Búsqueda en tiempo real
- ✅ **Botón limpiar búsqueda**: Ícono X cuando hay texto
- ✅ Ordenamiento (calificación/alfabético)
- ✅ Filtros por alcaldía
- ✅ Cards con taglines en cursiva
- ✅ **Modal mejorado**: Botón "Calificar taquería"
- ✅ Separadores con 3 gemas
- ✅ Iconos contextuales (MapPin, Gem)
- ✅ 100% responsive
- ✅ **Paginación responsive**: 10 items iniciales
- ✅ **Dark mode automático**: Basado en preferencias del sistema
- ✅ **Sistema de variables CSS**: Temas centralizados y mantenibles
- ✅ **Focus states accesibles**: Consistentes en todos los navegadores

### Funcionalidades
- ✅ Sistema de calificaciones con promedio
- ✅ **Paginación**: Carga inicial de 10, botón "Ver más"
- ✅ **Búsqueda avanzada**: Por nombre, especialidad y taglines
- ✅ **Contador de resultados**: Muestra items visibles vs total
- ✅ **Link "Volver al inicio"**: Navegación mejorada
- ✅ Extracción automática de datos desde Google Maps
- ✅ Validación de alcaldías de CDMX
- ✅ Actualización inteligente (upsert)
- ✅ API REST con CORS habilitado

### Sistema de Calificaciones Mejorado
- ✅ **Nueva ponderación**: 80% calidad, 10% servicio, 10% lugar
- ✅ **Decimales visibles**: Calificaciones mostradas con 1 decimal
- ✅ **Prompts mejorados**: Guía más clara para calificar tacos
- ✅ **Separación por comas**: Instrucciones específicas (ej: 4,3,5)

### GPT Personalizado
- ✅ Búsqueda inteligente**: Solo muestra coincidencias relevantes (máx 5)
- ✅ Extrae dirección, colonia, alcaldía de URLs
- ✅ Manejo flexible de URLs: Soporta formatos google.com/maps y maps.app.goo.gl
- ✅ Opción de coordenadas: Puede usar lat/lng si el parsing falla
- ✅ Pregunta "¿Qué es lo más chingón?"
- ✅ **Tips de uso**: Recomienda nombre completo y compartir links

## 📊 Analítica y Medición

### Google Analytics 4
- ✅ **Implementación completa**: Integración de Google Analytics 4 para rastrear interacciones de usuarios
- ✅ **Eventos personalizados configurados**:
  - Visualización de detalles de taquerías
  - Búsquedas y términos de búsqueda
  - Aplicación de filtros
  - Interacciones con mapas y calificaciones
  - Paginación y navegación
- ✅ **Informes personalizados**:
  - "Taquerías más vistas" - Análisis de popularidad
  - "Análisis de Búsquedas" - Términos y resultados
  - "Filtros más utilizados" - Patrones de filtrado
- ✅ **Implementación técnica**:
  - Código de rastreo en `_document.tsx`
  - Biblioteca de eventos en `lib/analytics.ts`
  - Integración no intrusiva en componentes de UI

## 🔍 SEO Y OPTIMIZACIÓN

### Implementación SEO Completa
- ✅ **Meta tags SEO**: Implementados en `_document.tsx`
  - Descripción optimizada para búsquedas
  - Palabras clave relevantes (tacos, taquerías, CDMX, calificaciones)
  - Datos estructurados Schema.org para negocios locales
- ✅ **Open Graph y Twitter Cards**: Configurados para compartir en redes
  - Título: "Top Tacos y Taquerías CDMX por PrimeroTacos.mx"
  - Imagen OG personalizada
  - Descripción atractiva para redes sociales
- ✅ **Archivos de indexación**:
  - `sitemap.xml`: Mapa del sitio para motores de búsqueda
  - `robots.txt`: Directivas de rastreo configuradas
  - `site.webmanifest`: Configuración PWA
- ✅ **Sistema completo de favicons**:
  - Favicons para Android Chrome (192x192, 512x512)
  - Favicons para Apple Touch (icono de app)
  - Favicon estándar (16x16, 32x32)
  - og-image para compartir en redes
- ✅ **Google Search Console**: Sitio registrado y verificado


## 🌐 Dominios Personalizados

### Dominio Principal
- ✅ **primerotacos.mx**: Configurado y funcionando como dominio principal
- ✅ **www.primerotacos.mx**: Redirección configurada hacia la versión sin www
- ✅ **Certificados SSL**: Implementados correctamente para conexiones seguras

### Dominio Secundario
- ✅ **primerotacos.com**: Configurado para redirigir al dominio principal
- ✅ **www.primerotacos.com**: Redirección configurada
- ✅ **Wildcard Redirect**: Configurado para cubrir todos los subdominios

### Configuración Técnica
- ✅ **Registros DNS**: Configurados correctamente en GoDaddy y Namecheap
- ✅ **Integración con Render**: Configuración para servir exclusivamente desde dominios personalizados
- ✅ **Redirecciones 301**: Implementadas para optimización SEO

## 📁 ESTRUCTURA DE ARCHIVOS

### Estructura General del Proyecto
```
primerotacos-web/
├── components/
│   ├── PrimeroTacosLogo.tsx      # Componente del logo
│   └── RotatingTagline.tsx       # Componente de taglines rotatorios
├── lib/
│   └── analytics.ts              # Funciones de Google Analytics
├── pages/
│   ├── _app.tsx                  # App wrapper de Next.js
│   ├── _document.tsx             # Documento HTML personalizado
│   ├── index.tsx                 # Página principal
│   └── api/
│       └── taquerias.js          # API route para datos
├── public/                       # Assets estáticos (ver abajo)
├── styles/
│   ├── globals.css               # Estilos globales y animaciones
│   └── theme.css                 # Variables CSS para light/dark mode
├── types/
│   └── index.ts                  # TypeScript types (Taqueria, etc)
├── .env.local                    # Variables de entorno
├── next.config.js                # Configuración de Next.js
├── package.json                  # Dependencias
├── README.md                     # Documentación
└── tsconfig.json                 # Configuración TypeScript
```
### Archivos SEO y Assets en public/
```
public/
├── android-chrome-192x192.png   # Favicon Android grande
├── android-chrome-512x512.png   # Favicon Android extra grande
├── apple-touch-icon.png         # Icono para dispositivos Apple
├── bg-pattern.png              # Pattern de fondo
├── favicon-16x16.png           # Favicon pequeño
├── favicon-32x32.png           # Favicon estándar
├── favicon.ico                 # Favicon principal
├── og-image.png               # Imagen Open Graph
├── site.webmanifest           # Manifest PWA
├── sitemap.xml                # Mapa del sitio
├── robots.txt                 # Directivas para bots
└── .well-known/
└── security.txt           # Información de seguridad
```
### Backend API (repositorio separado)
```
primerotacos/
├── index.js                    # Servidor Express principal
├── models/
│   └── Taqueria.js            # Modelo MongoDB
├── routes/
│   └── taquerias.js           # Rutas API
├── .env                       # Variables de entorno
└── package.json               # Dependencias
```
## 🔒 SEGURIDAD Y REPUTACIÓN

### Headers de Seguridad Implementados
- ✅ **Calificación A** en SecurityHeaders.com
- ✅ **Headers implementados**:
  - `Strict-Transport-Security`: HTTPS obligatorio
  - `X-Content-Type-Options`: Previene MIME sniffing
  - `X-Frame-Options`: Protección contra clickjacking
  - `Content-Security-Policy`: Control de recursos
  - `Referrer-Policy`: Control de información referrer
  - `Permissions-Policy`: Control de APIs del navegador

### Configuración en next.config.js
```javascript
async headers() {
  return [{
    source: '/:path*',
    headers: [
      // Headers de seguridad configurados
    ]
  }]
}
```

### security.txt
- ✅ **Ubicación**: `/.well-known/security.txt`
- ✅ **Contenido**: Información de contacto para reportes de seguridad
- ✅ **Estándar**: Cumple con RFC 9116

### Beneficios de Seguridad
- Menor probabilidad de bloqueo por filtros corporativos
- Mayor confianza de usuarios y sistemas automatizados
- Mejor posicionamiento en búsquedas (Google valora HTTPS y seguridad)
- Protección contra ataques comunes (XSS, clickjacking, etc.)

### 🔄 **Archivos Modificados en la Última Actualización:**

#### **Frontend (primerotacos-web):**
- ✅ **`styles/theme.css`** - CREADO
  - Variables CSS para light y dark mode
  - Colores, fondos, bordes adaptativos
  - Sistema completo de temas
- ✅ **`pages/index.tsx`** - MODIFICADO
  - Cards completamente clickeables con hover effects
  - Logo con animación de escala al scroll
  - Taglines random en cards (rotatorios en modal)
  - Botón flotante "Subir" implementado
  - Micro-animaciones agregadas
  - Función `normalizeText` para búsqueda sin acentos
  - Estado `randomIndexes` para taglines estables
  - Implementación de skeleton loaders
  - Import del componente TaqueriaSkeleton

- ✅ **`components/TaqueriaSkeleton.tsx`** - CREADO
 - Componente de skeleton loader con efecto shimmer
 - Estructura idéntica a las cards reales
 - Optimizado para performance

- ✅ **`styles/globals.css`** - MODIFICADO
  - Pattern de fondo adaptativo
  - Focus states mejorados
  - Botón scroll-to-top optimizado
  - CSS para efecto shimmer del skeleton
  - Animación optimizada con GPU 
  - Animaciones CSS para modal, cards y botones
  - Estilos del botón flotante circular
  - CSP headers actualizados para Google Fonts
  - Optimizaciones de interlineado

- ✅ **`pages/index.tsx`** - MODIFICADO
  - Implementación de variables CSS
  - Filtros móviles con tema dinámico
  - Chevrons adaptativos
  - Focus states consistentes

- ✅ **`components/EmptyState.tsx`** - MODIFICADO
  - Adaptado a variables de tema
  - Iconos y textos dinámicos

- ✅ **`components/TaqueriaSkeleton.tsx`** - MODIFICADO
  - Colores adaptativos para skeleton loader


- ✅ **`components/RotatingTagline.tsx`** - MODIFICADO
  - Color del ícono Gem consistente (text-gray-600)

- ✅ **`next.config.js`** - MODIFICADO
  - Content Security Policy actualizado para permitir fonts.googleapis.com
- ✅ **`pages/_document.tsx`** - CREADO
  - Implementación de Google Analytics 4
  - Script de rastreo para monitorizar interacciones de usuarios

- ✅ **`lib/analytics.ts`** - CREADO
  - Biblioteca de eventos personalizados para GA4
  - Funciones para rastrear visualizaciones, búsquedas y filtros
  - Implementación optimizada para rendimiento

- ✅ **`pages/_app.tsx`** - MODIFICADO
  - Eliminada dependencia @next/third-parties
  - Optimización para compatibilidad

#### **Configuraciones:**
- ✅ **Dominio personalizado**
  - primerotacos.mx configurado como dominio principal
  - Redirecciones desde primerotacos.com implementadas
  - Certificados SSL para conexiones seguras

#### **GPT Prompt:**
- ✅ **Moderación de contenido** - Manejo inteligente de groserías
- ✅ **Skip ubicación** - No pide dirección en actualizaciones
- ✅ **Instrucciones mejoradas** - Proceso más claro para usuarios

## ♿ ACCESIBILIDAD

### Implementación WCAG 2.1
- ✅ **Skip Navigation**: Link oculto para saltar al contenido principal
- ✅ **Formularios accesibles**: Todos los inputs con labels y aria-labels
- ✅ **Focus Management**: Estados de focus claros y consistentes
- ✅ **Touch Targets**: Mínimo 44x44px en elementos interactivos
- ✅ **Navegación por teclado**: 
  - Tab order lógico
  - ESC cierra modales
  - Enter activa botones
- ✅ **Tipografía escalable**: Sistema responsivo con unidades rem
- ✅ **Contraste**: Diseño B&W garantiza contraste AAA

### Mejoras de UX Móvil
- ✅ Modal optimizado con scroll solo en contenido
- ✅ Header compacto para maximizar espacio
- ✅ Botones con padding extra para facilitar toque
- ✅ Textos con tamaños apropiados para lectura sin zoom

## 🚀 DEPLOYMENT

### Render Configuration
Ambos servicios en Render con auto-deploy desde GitHub `main` branch.

#### Frontend Environment Variables
```
MONGODB_URI=mongodb+srv://...
```

#### API Environment Variables
```
MONGODB_URI=mongodb+srv://...
PORT=3000
```

## 💻 DESARROLLO LOCAL

```bash
# Frontend
cd primerotacos-web
npm install
npm run dev # localhost:3000

# API (repo separado)
cd primerotacos
npm install
npm start # localhost:3000
```

## 🔄 FLUJO DE DATOS

1. **Usuario → GPT**: "Calificar nuevos tacos"
2. **GPT → Usuario**: Solicita datos y URL Maps
3. **GPT**: Extrae info de la URL
4. **GPT → API**: POST con datos + nuevo tagline se agrega al array
5. **API → MongoDB**: Guarda o actualiza (promedio)
6. **Frontend → API**: GET taquerías
7. **Frontend**: Muestra con filtros y búsqueda

## 🔄 TAGLINES ROTATIVOS - FEATURE ÚNICA

### Implementación Técnica
- **Componente React**: `RotatingTagline.tsx` con hooks
- **Lógica de rotación**: useEffect + setInterval cada 4000ms
- **Transiciones CSS**: opacity con duration-300
- **TypeScript**: Interface actualizada con `taglines?: string[]`
- **Responsive**: Taglines truncados a 2 líneas en móvil con CSS clamp

### Funcionamiento
1. **Detecta** si hay múltiples taglines en el array
2. **Rota** entre taglines cada 4 segundos
3. **Aplica** transición suave fade in/out (300ms)
4. **Fallback** a especialidad si solo hay un tagline

### Integración con GPT
- **Agrega** nuevos taglines al array existente
- **Evita** duplicados automáticamente
- **Mantiene** compatibilidad con datos legacy
- **Calcula** promedios de calificaciones en actualizaciones

### Código de ejemplo
```typescript
<RotatingTagline 
  taglines={["Tagline 1", "Tagline 2"]} 
  interval={4000} 
/>
```

## 📈 PRÓXIMAS MEJORAS

### Corto Plazo
- [x] Rotación de taglines (COMPLETADO ✅)
- [ ] Eliminar endpoint /reset-all por seguridad
- [ ] Llenar base con datos consistentes
- [ ] PWA para móvil

### Mediano Plazo
- [ ] Sistema de favoritos

### Largo Plazo
- [ ] Fotos de taquerías
- [ ] Mapa interactivo
- [ ] Sistema de usuarios
- [ ] App móvil nativa

## 🐛 PROBLEMAS CONOCIDOS

1. **Warning en next.config.js**: `allowedDevOrigins` no reconocido (no afecta)
2. **ESLint**: No instalado (opcional para builds)
3. **Vulnerabilidad npm**: 1 crítica (revisar con `npm audit`)

## 📝 NOTAS IMPORTANTES

1. **Alcaldías válidas**: Solo las 16 oficiales de CDMX
2. **Cálculo de calificación**: 70% calidad, 20% servicio, 10% lugar
3. **Taglines**: Sistema dual - array para rotación, especialidad para compatibilidad
4. **CORS**: Habilitado en API para todos los orígenes

## 🎉 LOGROS DEL PROYECTO

- **Loading states profesionales**: Skeletons con shimmer effect
- **Búsqueda inteligente**: Funciona sin importar acentos
- **UX refinada**: Taglines que no cambian inesperadamente
- **GPT robusto**: Mejor manejo de casos edge
- **Código optimizado**: Componentes reutilizables y performantes
- Sistema completo y funcional en producción
- GPT que automatiza la entrada de datos
- UI profesional y minimalista
- Arquitectura escalable
- Código limpio y documentado
- 100% funcional en móvil y desktop
- **Feature revolucionaria**: Taglines rotativos únicos en apps de taquerías
- **UX avanzada**: Transiciones suaves y timing perfecto
- **Arquitectura robusta**: Componentes reutilizables y TypeScript
- **UI/UX de nivel profesional**: Animaciones, transiciones y micro-interacciones
- **Logo dinámico**: Responde al scroll del usuario
- **Cards inteligentes**: Clickeables con taglines random
- **Modal optimizado**: Jerarquía visual clara con calificación protagonista
- **Navegación mejorada**: Botón flotante contextual
- **100% pulido**: Cada detalle cuidado desde padding hasta animaciones

## 👥 CRÉDITOS

- **Concepto**: Los Knijos
- **Desarrollo**: @eljerrywhite
- **Comunidad**: Usuarios del GPT

---

*"Hecho con 🌮 en la CDMX"*

*Última actualización: 21 de Junio 2025 - Taglines rotativos implementados*