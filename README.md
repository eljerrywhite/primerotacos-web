# PRIMERO TACOS × LOS KNIJOS

Base de datos comunitaria de taquerías en la Ciudad de México, calificadas por expertos taqueros.

![Next.js](https://img.shields.io/badge/Next.js-13.5.6-black)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-47A248)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6)

## 🌮 Descripción

Directorio colaborativo de las mejores taquerías de la CDMX, donde cada establecimiento es evaluado en tres categorías: calidad, servicio y lugar. Las nuevas taquerías son agregadas mediante un GPT especializado que mantiene estándares consistentes de evaluación.

## 🚀 Demo

- **Producción**: https://primerotacos-web.onrender.com
- **API**: https://primerotacos.onrender.com/taquerias
- **GPT**: https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos

## 🛠 Stack Tecnológico

- **Frontend**: Next.js 13.5.6 + TypeScript + Tailwind CSS
- **Backend**: API REST integrada en Next.js
- **Base de datos**: MongoDB Atlas
- **Iconos**: Lucide React
- **Hosting**: Render (plan de pago)
- **AI**: ChatGPT personalizado para evaluaciones

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
│   ├── index.tsx          # Página principal con UI v2
│   └── api/
│       └── taquerias.ts   # Proxy API para evitar CORS
├── components/
│   ├── PrimeroTacosLogo.tsx  # Logo SVG con variantes
│   ├── Header.tsx         # Header (no usado en v2)
│   └── Footer.tsx         # Footer (no usado en v2)
├── lib/
│   └── mongodb.ts         # Conexión a MongoDB
├── types/
│   └── index.ts          # Tipos TypeScript compartidos
├── styles/
│   └── globals.css       # Estilos globales con Tailwind
├── public/
│   └── favicon.ico       # Favicon
├── tailwind.config.js    # Configuración de Tailwind
└── postcss.config.js     # Configuración de PostCSS
```

## 🗄 Estructura de Datos (MongoDB)

```json
{
  "_id": "ObjectId",
  "nombre": "Nombre de la taquería",
  "calidad": 4.5,
  "servicio": 4.0,
  "lugar": 3.5,
  "calificacionFinal": 4.0,
  "ubicacion": "https://maps.google.com/..."
}
```

## 🎨 Características

- ✅ Diseño minimalista en blanco y negro
- ✅ Búsqueda en tiempo real
- ✅ Ordenamiento por calificación o alfabético
- ✅ Modal con información detallada
- ✅ Diseño responsive
- ✅ Logo SVG personalizado
- ✅ Integración con GPT para agregar taquerías

## 🤖 GPT para Agregar Taquerías

Las nuevas taquerías se agregan mediante nuestro GPT especializado que evalúa consistentemente en tres categorías:

- **Calidad**: Sabor, frescura, preparación
- **Servicio**: Atención, rapidez, amabilidad
- **Lugar**: Limpieza, ambiente, comodidad

[Usar el GPT](https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos)

## 🔄 Estado del Proyecto

- ✅ MVP funcional en producción
- ✅ UI v2 implementado
- ✅ Conexión con MongoDB Atlas
- ✅ API funcionando en Render
- ⏳ Pendiente: Campos adicionales (alcaldía, colonia)
- ⏳ Pendiente: Sistema de filtros avanzados

## 🚀 Deployment

El proyecto se despliega automáticamente en Render cuando se hace push a la rama `main`.

Para deployment manual:
```bash
npm run build
npm start
```

## 👥 Colaboradores

- **Los Knijos** - Concepto y curaduría
- **Community** - Aportaciones via GPT

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de contribuir.

---

Hecho con 🌮 en la CDMX