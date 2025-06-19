# PROYECTO PRIMERO TACOS - DOCUMENTACIÓN COMPLETA
*Fecha: 19 de Diciembre de 2024*

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
// MongoDB Schema
{
  nombre: String (required),
  calidad: Number (1-5, required),
  servicio: Number (1-5, required),
  lugar: Number (1-5, required),
  calificacionFinal: Number (calculado: 70% calidad, 20% servicio, 10% lugar),
  ubicacion: String (URL Google Maps),
  especialidad: String (tagline - "lo más chingón"),
  direccion: String,
  colonia: String,
  alcaldia: String (validada - 16 alcaldías CDMX),
  taglines: [String] (para futuro - array de taglines),
  fecha: Date
}
```

## 🔧 CARACTERÍSTICAS IMPLEMENTADAS

### UI/UX
- ✅ Diseño minimalista blanco y negro
- ✅ Logo con variantes (positive/negative)
- ✅ Búsqueda en tiempo real
- ✅ Ordenamiento (calificación/alfabético)
- ✅ Filtros por alcaldía
- ✅ Cards con taglines en cursiva
- ✅ Modal con información completa
- ✅ Separadores con 3 gemas
- ✅ Iconos contextuales (MapPin, Gem)
- ✅ 100% responsive

### Funcionalidades
- ✅ Sistema de calificaciones con promedio
- ✅ Extracción automática de datos desde Google Maps
- ✅ Validación de alcaldías de CDMX
- ✅ Actualización inteligente (upsert)
- ✅ API REST con CORS habilitado

### GPT Personalizado
- ✅ Extrae dirección, colonia, alcaldía de URLs
- ✅ Pregunta "¿Qué es lo más chingón?"
- ✅ Valida las 16 alcaldías de CDMX
- ✅ Maneja actualizaciones y creaciones

## 📁 ESTRUCTURA DE ARCHIVOS

```
primerotacos-web/
├── pages/
│   ├── index.tsx              # UI completa
│   └── api/
│       └── taquerias.ts       # Proxy API
├── components/
│   ├── PrimeroTacosLogo.tsx  # Logo SVG
│   └── RotatingTagline.tsx   # Taglines rotatorios (futuro)
├── lib/
│   └── mongodb.ts             # Conexión DB
├── types/
│   └── index.ts              # TypeScript types
├── styles/
│   └── globals.css           # Estilos Tailwind
└── public/
    └── favicon.ico

primerotacos/ (API)
└── index.js                   # API completa
```

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
4. **GPT → API**: POST con todos los datos
5. **API → MongoDB**: Guarda o actualiza (promedio)
6. **Frontend → API**: GET taquerías
7. **Frontend**: Muestra con filtros y búsqueda

## 📈 PRÓXIMAS MEJORAS

### Corto Plazo
- [ ] Rotación de taglines en modal (código listo)
- [ ] Paginación o scroll infinito
- [ ] PWA para móvil

### Mediano Plazo
- [ ] Sistema de favoritos
- [ ] Compartir en redes
- [ ] Google Analytics
- [ ] Dominio propio (primerotacos.mx)

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
3. **Taglines futuros**: Preparado para array pero usando string por ahora
4. **CORS**: Habilitado en API para todos los orígenes

## 🎉 LOGROS DEL PROYECTO

- Sistema completo y funcional en producción
- GPT que automatiza la entrada de datos
- UI profesional y minimalista
- Arquitectura escalable
- Código limpio y documentado
- 100% funcional en móvil y desktop

## 👥 CRÉDITOS

- **Concepto**: Los Knijos
- **Desarrollo**: @eljerrywhite
- **Comunidad**: Usuarios del GPT

---

*"Hecho con 🌮 en la CDMX"*