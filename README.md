# PRIMERO TACOS x LOS KNIJOS

Base de datos comunitaria de taquerías en la Ciudad de México, calificadas por expertos taqueros.

## 🌮 Descripción

Directorio colaborativo de las mejores taquerías de la CDMX, donde cada establecimiento es evaluado en tres categorías: calidad, servicio y lugar. Las nuevas taquerías son agregadas mediante un GPT especializado que mantiene estándares consistentes de evaluación.

## 🛠 Stack Tecnológico

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express (API REST)
- **Base de datos**: MongoDB Atlas
- **AI**: ChatGPT personalizado para evaluaciones
- **Hosting**: Render (con plan de pago)

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/primerotacos-web.git
cd primerotacos-web

# Instalar dependencias
npm install

# Variables de entorno
# Crear archivo .env.local con:
MONGODB_URI=tu_connection_string_de_mongodb
```

## 🚀 Desarrollo

```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

## 📁 Estructura del Proyecto

```
/
├── pages/
│   ├── index.tsx          # Página principal
│   └── api/
│       └── taquerias.ts   # API endpoint
├── components/
│   ├── Header.tsx
│   ├── SearchFilter.tsx   # Búsqueda y filtros
│   ├── TaqueriaList.tsx   # Lista de taquerías
│   ├── TaqueriaCard.tsx   # Tarjeta individual
│   ├── TaqueriaModal.tsx  # Modal con detalles
│   └── Footer.tsx
├── lib/
│   └── mongodb.ts         # Conexión a MongoDB
├── types/
│   └── index.ts          # Tipos TypeScript compartidos
└── styles/
    └── globals.css       # Estilos globales
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

## 🤖 GPT para Agregar Taquerías

Las nuevas taquerías se agregan mediante nuestro GPT especializado:
[PRIMERO TACOS GPT](https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos)

## 🔄 Estado del Proyecto

- ✅ MVP funcional
- ✅ Conexión con MongoDB
- ✅ Búsqueda y ordenamiento
- ✅ Diseño responsive
- ⏳ Mejoras de UI/UX pendientes
- ⏳ Campos adicionales (alcaldía, colonia)

## 👥 Colaboradores

- Los Knijos - Concepto y curaduría
- [Tu nombre] - Desarrollo

## 📄 Licencia

[Definir licencia]

---

Hecho con 🌮 en la CDMX