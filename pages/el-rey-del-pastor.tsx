// pages/el-rey-del-pastor.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { MapPin, Gem, ChevronLeft, Star } from 'lucide-react';
import RotatingTagline from '../components/RotatingTagline';

const ElReyDelPastor = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Data para El Rey del Pastor
  const taqueriaData = {
    nombre: "El Rey del Pastor",
    desde: "1974",
    calificacionFinal: 4.2,
    calidad: 4.5,
    servicio: 4.0,
    lugar: 3.8,
    direccion: "Colonia Guerrero, afuera del Metro Guerrero",
    instagram: "@elreydelpastor",
    ubicacion: "https://maps.google.com/?q=El+Rey+del+Pastor+Guerrero+CDMX",

    taglines: [
      "50 años de tacos bien puestos en la Colonia Guerrero",
      "Pastor directo desde Jalisco, sin piña, puro trompo con cebolla caramelizada",
      "Dos generaciones perfeccionando el taco al punto de leyenda",
      "No es moda, es tradición taquera de medio siglo",
      "Tacos de cabeza que están pa' repetir, lengua y surtida de antología"
    ],

    descripcion: {
      quote: "Pastor directo desde Jalisco: sin piña, sin cebolla, sin cilantro. Puro trompo con carne y cebolla caramelizada al fuego directo. Resultado: un sabor profundo, chingón y sin distracciones.",

      paragraphs: [
        "Si andas rolando por la Guerrero, justo saliendo del Metro o Metrobús, lánzate sin pensarla a El Rey del Pastor —una taquería con más de medio siglo de historia, donde dos generaciones han perfeccionado el taco al punto de leyenda.",

        "La joya escondida son los tacos de cabeza. Lengua y surtida que se discuten. Te lo decimos sin rodeos: están pa' repetir. Y la salsa ya viene servida en los de pastor —es su sello. Esos tacos ya te los dan listos, bañaditos con una salsa casera estupenda que eleva todo el viaje.",

        "Tacos normales a $11-12 pesos, el de lengua a $20 baros. Comida de barrio, precio de barrio, sabor muy auténtico. Porque este lugar no es moda, es tradición taquera. Su pastor es distinto a todo lo que has probado."
      ]
    },

    hashtags: [
      "#PrimeroTacos", 
      "#ElReyDelPastor", 
      "#50AñosDeTradición", 
      "#PastorSinPiña", 
      "#ColoniaGuerrero",
      "#TacosDeCabeza"
    ]
  };

  useEffect(() => {
    // Preload video
    const video = document.querySelector('video');
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>El Rey del Pastor: Tacos legendarios en la Colonia Guerrero</title>
        <meta name="description" content="Más de 50 años sirviendo tacos al pastor y de cabeza únicos en CDMX. Sin piña, con sabor brutal. Frente al Metro Guerrero. ¡Pruébalos ya!" />
        <meta property="og:title" content="El Rey del Pastor - 50 años de tradición | Primero Tacos" />
        <meta property="og:description" content="Pastor directo desde Jalisco, sin piña. Tacos de cabeza legendarios. Frente al Metro Guerrero." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="restaurant" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="El Rey del Pastor - Primero Tacos" />
        <meta name="twitter:description" content="50 años de tacos bien puestos en la Colonia Guerrero" />
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden flex items-center justify-center">
          {/* Video Background */}
          <video 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ filter: 'var(--video-filter, none)' }}
          >
            <source src="/videos/hero-taqueria.mp4" type="video/mp4" />
          </video>

          {/* Pattern Overlay */}
          <div 
            className="absolute inset-0 z-10 mix-blend-multiply"
            style={{
              backgroundImage: 'url(/bg-pattern.png)',
              backgroundSize: '480px 480px',
              backgroundRepeat: 'repeat',
              opacity: 0.3
            }}
          />

          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/30 to-black/20" />

          {/* Hero Content */}
          <div 
            className="relative z-20 text-center px-6 py-8 md:px-8 md:py-10 max-w-2xl mx-4 rounded-lg backdrop-blur-md animate-fadeInUp hero-content-box"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
            }}
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-bold uppercase mb-2 tracking-tight" 
                  style={{ color: 'var(--text-primary)' }}>
                {taqueriaData.nombre}
              </h1>
              <p className="text-base md:text-lg mb-6" 
                 style={{ color: 'var(--text-secondary)' }}>
                Desde {taqueriaData.desde}
              </p>

              {/* Rotating Tagline in Hero */}
              <div className="mb-6 flex justify-center">
                <RotatingTagline taglines={taqueriaData.taglines} interval={4000} />
              </div>

              {/* Rating */}
              <div className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2"
                   style={{ color: 'var(--text-primary)' }}>
                <Star className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                {taqueriaData.calificacionFinal.toFixed(1)}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Left Column - Editorial Content */}
            <div className="space-y-8">
              {/* Quote Section */}
              <section>
                <p className="text-xl md:text-2xl italic leading-relaxed mb-6"
                   style={{ color: 'var(--text-primary)' }}>
                  "{taqueriaData.descripcion.quote}"
                </p>
                <div className="text-center text-2xl tracking-widest"
                     style={{ color: 'var(--text-secondary)' }}>
                  🌮 🌮 🌮
                </div>
              </section>

              {/* Description Section */}
              <section className="space-y-4">
                {taqueriaData.descripcion.paragraphs.map((paragraph, index) => (
                  <p key={index} 
                     className="text-base md:text-lg leading-relaxed"
                     style={{ color: 'var(--text-primary)' }}>
                    {paragraph}
                  </p>
                ))}
              </section>

              {/* Tags Section - Desktop only */}
              <section className="hidden lg:block pt-8 border-t" 
                       style={{ borderColor: 'var(--card-border)' }}>
                <div className="flex flex-wrap gap-3">
                  {taqueriaData.hashtags.map((tag, index) => (
                    <span key={index} 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Details Card */}
            <div className="lg:sticky lg:top-8">
              <div className="border-2 p-6 md:p-8"
                   style={{ 
                     backgroundColor: 'var(--card-bg)',
                     borderColor: 'var(--card-border)'
                   }}>

                {/* Main Rating */}
                <div className="text-center mb-8">
                  <div className="text-5xl md:text-6xl font-bold"
                       style={{ color: 'var(--text-primary)' }}>
                    {taqueriaData.calificacionFinal.toFixed(1)}
                  </div>
                  <p className="text-sm mt-2"
                     style={{ color: 'var(--text-secondary)' }}>
                    Promedio ponderado
                  </p>
                </div>

                {/* Ratings Breakdown */}
                <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b"
                     style={{ borderColor: 'var(--card-border)' }}>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold"
                         style={{ color: 'var(--text-primary)' }}>
                      {taqueriaData.calidad.toFixed(1)}
                    </div>
                    <div className="text-xs md:text-sm"
                         style={{ color: 'var(--text-secondary)' }}>
                      Calidad
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold"
                         style={{ color: 'var(--text-primary)' }}>
                      {taqueriaData.servicio.toFixed(1)}
                    </div>
                    <div className="text-xs md:text-sm"
                         style={{ color: 'var(--text-secondary)' }}>
                      Servicio
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold"
                         style={{ color: 'var(--text-primary)' }}>
                      {taqueriaData.lugar.toFixed(1)}
                    </div>
                    <div className="text-xs md:text-sm"
                         style={{ color: 'var(--text-secondary)' }}>
                      Lugar
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0"
                            style={{ color: 'var(--text-secondary)' }} />
                    <p className="text-sm leading-relaxed"
                       style={{ color: 'var(--text-secondary)' }}>
                      {taqueriaData.direccion}
                    </p>
                  </div>

                  {taqueriaData.instagram && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm"
                            style={{ color: 'var(--text-secondary)' }}>
                        📱 {taqueriaData.instagram}
                      </span>
                    </div>
                  )}

                  {/* Precios */}
                  <div className="flex items-start gap-3">
                    <span className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}>
                      💵 Tacos: $11-12 | Lengua: $20
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href={taqueriaData.ubicacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 text-sm md:text-base uppercase font-medium transition-all"
                    style={{
                      backgroundColor: 'var(--header-bg)',
                      color: 'var(--header-text)',
                      border: '2px solid var(--header-bg)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    Ver mapa
                  </a>
                  <a
                    href="https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 py-3 text-sm md:text-base text-center uppercase font-medium transition-all"
                    style={{
                      borderColor: 'var(--btn-border)',
                      backgroundColor: 'var(--btn-bg)',
                      color: 'var(--btn-text)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--btn-hover-bg)';
                      e.currentTarget.style.color = 'var(--btn-hover-text)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--btn-bg)';
                      e.currentTarget.style.color = 'var(--btn-text)';
                    }}
                  >
                    Calificar
                  </a>
                </div>
              </div>

              {/* Tags Section - Mobile only */}
              <section className="lg:hidden mt-8 pt-8 border-t" 
                       style={{ borderColor: 'var(--card-border)' }}>
                <div className="flex flex-wrap gap-3">
                  {taqueriaData.hashtags.map((tag, index) => (
                    <span key={index} 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-12 text-center"
                style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <a href="/"
             className="inline-flex items-center gap-2 font-medium hover:opacity-70 transition-opacity"
             style={{ color: 'var(--text-primary)' }}>
            <ChevronLeft className="w-5 h-5" />
            Ver directorio de taquerías
          </a>
        </footer>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        @media (prefers-color-scheme: dark) {
          video {
            filter: brightness(0.7);
          }
          .hero-content-box {
            background: linear-gradient(to bottom, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.9) 100%) !important;
          }
        }
      `}</style>
    </>
  );
};

export default ElReyDelPastor;