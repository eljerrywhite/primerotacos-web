# CHANGELOG
*Historial cronológico de todas las actualizaciones*

## [1.4.0] - 2025-01-21
### 🆕 PÁGINAS INDIVIDUALES DE TAQUERÍAS
- **El Rey del Pastor**
  - Página completa con video hero background optimizado
  - Historia detallada desde 1974, especialidades únicas (pastor sin piña)
  - Información completa: precios específicos, ubicación, redes sociales
  - SEO Schema.org Restaurant markup para mejor posicionamiento

- **Ricos Tacos Toluca**
  - Página destacando distinción Michelin y especialidades únicas
  - Contenido editorial sobre familia viajando desde Toluca diariamente
  - Chorizo tamarindo y campechano como protagonistas
  - Integración completa con Instagram oficial

- **La Bonvi**
  - Página individual con video hero y contenido editorial
  - Especialidades: New York, costilla, campechano
  - Instagram integrado

### 🔗 FUNCIONALIDAD DE ENLACES A PÁGINAS INDIVIDUALES
- **Cards clickeables:** Taquerías con páginas de detalle tienen cards completamente clickeables
- **Detección automática:** Sistema que verifica si existe página individual (hasDetailPage)
- **Hover effect mejorado:** Cursor pointer y feedback visual en cards con enlace
- **Navegación fluida:** Click en cualquier parte de la card lleva a página de detalle
- **Compatibilidad:** Taquerías sin página individual mantienen funcionalidad normal

### 🎥 OPTIMIZACIÓN DE VIDEOS
- **Lazy loading:** Videos cargan después de 500ms para mejor performance
- **Posters de respaldo:** Imágenes estáticas mientras carga el video
- **Autoplay responsivo:** Optimizado para mobile y desktop
- **Compresión optimizada:** Videos ligeros sin perder calidad

### 🔍 SEO AVANZADO INDIVIDUAL
- **Schema.org Restaurant:** Datos estructurados para cada taquería
- **Meta tags únicos:** Títulos y descripciones optimizadas por página
- **Open Graph personalizado:** Mejores previews en redes sociales
- **Canonical URLs:** SEO optimizado para cada landing page

### 🎨 DESIGN SYSTEM CONSISTENTE
- **Integración perfecta:** Mismo tema dark/light que página principal
- **Variables CSS:** Reutilización del sistema de colores existente
- **Responsive óptimo:** Mobile-first con breakpoints perfectos
- **CTAs estratégicos:** Botones para mapa y calificación en cada página
- **Breadcrumb mejorado:** Navegación posicionada debajo del hero-video
  - Fondo adaptativo con variables CSS (card-bg)
  - Padding consistente con hero-banner (27px móvil, 48px desktop)
  - Texto truncado para pantallas pequeñas
  - Iconos responsive y accesibles

---

## [1.3.0] - 2025-07-24
### 🎯 NUEVAS FUNCIONALIDADES
- **Filtro contador inteligente:** Solo muestra números cuando hay taquerías
  - Formato: `Benito Juárez (4)` vs `Coyoacán` (sin número)
  - "Todas las alcaldías" sin contador para evitar confusión
  - UX estratégica: guía usuarios hacia empty state → CTA

- **Modal "Acerca de los Knijos"**
  - Historia auténtica del proyecto desde septiembre 2020
  - Enlace estratégico debajo de "Calificar con GPT"
  - Accesibilidad completa (ESC, focus management)
  - Compatible con dark mode

- **Búsqueda inteligente con sinónimos**
  - 14 sinónimos implementados (sirloin↔sirlion, veggie↔vegetariano, etc)
  - Búsqueda invisible: funciona automáticamente
  - Mantiene lógica existente de normalización

### 🔧 MEJORAS TÉCNICAS
- Dark mode fix con `!important` para máximo contraste
- Función `getSynonyms()` con mapeo bidireccional
- Código optimizado sin romper funcionalidad existente

---

## [1.2.0] - 2025-07-21
### 🎨 DISEÑO Y UX
- **Dark Mode automático:** Detecta preferencias del sistema
- **Variables CSS:** Sistema completo de temas centralizados
- **Pattern adaptativo:** Fondo ajustado para light/dark mode
- **Accesibilidad mejorada:** Focus states consistentes
- **Filtros móviles:** Corregidos para dark mode
- **Botón scroll-to-top:** Más grande y visible en móvil
- **Chevrons adaptativos:** Cambian color según tema
- **Footer dinámico:** Logo y colores se adaptan al modo

---

## [1.1.0] - 2025-07-09
### 🔄 FUNCIONALIDADES CORE
- **Skeleton loaders:** Feedback visual mientras cargan taquerías
- **Búsqueda mejorada:** Ignora acentos para mejor UX
- **Taglines estables:** Random pero fijos, no cambian al scrollear
- **GPT actualizado:** Moderación de contenido y flujo mejorado
- **Componente TaqueriaSkeleton:** Con efecto shimmer elegante

### 🎯 UI/UX REFINADO
- **Logo animado:** Crece 50% al cargar, se reduce al scrollear
- **Cards rediseñadas:** Taglines random, mejor jerarquía visual
- **Modal nueva estructura:** Calificación protagonista, desglose horizontal
- **Botón flotante "Subir":** Circular con outline blanco
- **Micro-animaciones:** Loading dots, fade in cards, transiciones suaves

---

## [1.0.0] - 2025-07-02
### 🚀 LANZAMIENTO INICIAL
- **Sistema completo funcionando:** Frontend + API + GPT + Base de datos
- **Dominio personalizado:** primerotacos.mx configurado
- **SEO completo:** Meta tags, Open Graph, sitemap, robots.txt
- **Seguridad empresarial:** Headers de seguridad calificación A
- **Google Analytics 4:** Eventos personalizados implementados

### 📊 CARACTERÍSTICAS CORE
- **40+ taquerías** en base de datos inicial
- **Sistema de calificaciones:** 70% calidad, 20% servicio, 10% lugar
- **Taglines rotativos:** Feature única en apps de taquerías
- **Filtros por alcaldía:** 16 alcaldías CDMX
- **Búsqueda en tiempo real:** Nombres, especialidades, taglines
- **100% responsive:** Optimizado móvil y desktop

### 🤖 INTEGRACIÓN GPT
- **ChatGPT personalizado:** Extracción automática Google Maps
- **Validación alcaldías:** Solo oficiales CDMX
- **Actualización inteligente:** Promedio de calificaciones
- **Moderación contenido:** Manejo profesional de input

### 🔒 SEGURIDAD Y PERFORMANCE
- **SSL/HTTPS:** Certificados válidos
- **security.txt:** Divulgación responsable
- **Favicons completos:** Multiplataforma
- **CDN optimizado:** Para audiencia mexicana

---

## Próximas Versiones

### [1.4.0] - Planificado
- Fase 2 sinónimos basada en analytics de búsquedas
- Sistema de favoritos
- Compartir en redes sociales

### [1.5.0] - Considerando
- PWA para móvil
- Fotos de taquerías
- Mapa interactivo

---
*Para detalles técnicos completos, ver FUNCIONALIDADES.md*