// pages/ricos-tacos-toluca.tsx
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { MapPin, Star, ChevronLeft, Instagram, DollarSign } from "lucide-react";
import PrimeroTacosLogo from "../components/PrimeroTacosLogo";
import Breadcrumb from "../components/Breadcrumb";

const RicosTacosToluca = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoadVideo(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Data para Ricos Tacos Toluca
  const taqueriaData = {
    nombre: "Ricos Tacos Toluca",
    desde: "2003",
    calificacionFinal: 4.6,
    calidad: 5.0,
    servicio: 4.0,
    lugar: 3.0,
    direccion: "C. López 103, Colonia Centro, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX",
    ubicacion: "https://maps.app.goo.gl/7HKPK5ZnghGQkynU9",
    instagram: "@ricostacostoluca_",
    precio: "Taco: $30 | Campechano: $35 | Con queso: +$10",

    tagline_hero: "¿De verdad valen la distinción Michelin estos tacos de chorizo?",

    descripcion: {
      quote: "Campechano de chorizo con cecina o el taco de chorizo tamarindo… aquí los sabores no se parecen a nada que hayas probado antes.",

      paragraphs: [
        "En la Calle de López, frente al Mercado de Arcos de Belén, se arma la fila para probar los Ricos Tacos Toluca. Desde 2003, la familia viaja diario desde Toluca pa' servir su especialidad: chorizos rojo, verde, habanero y tamarindo, además de cecina, arrachera, obispo (embutido) y queso de puerco.",

        "El campechano con chorizo y cecina es la joya de la casa, pero el taco de tamarindo es la sorpresa dulce-picosita que te volará la cabeza. Todos los tacos vienen bien armados con papitas, cebollita y salsas caseras únicas, difíciles de dejar de probar. El truco está en mezclarlas y, como decía mi abuelo —pónle color al taco.",

        "Tip de la casa: antes de morder el taco, prueba cada chorizo solito. Así descubres la magia del sazón toluqueño, preparado con almendra, cacahuate y pasas."
      ],
    },

    hashtags: [
      "#PrimeroTacos",
      "#RicosTacosToluca",
      "#TacosDeChorizo",
      "#CentroHistórico",
      "#TacosDeCecina",
      "#TacosObispo",
      "#DistinciónMichelin"
    ],
  };

  return (
    <>
      <Head>
        <title>Ricos Tacos Toluca | Chorizo Michelin en CDMX</title>
        <meta
          name="description"
          content="Tacos de chorizo verde, rojo, habanero y tamarindo en el Centro Histórico. Campechano estrella y distinción Michelin. ¡Prúebalos ya!"
        />
        <meta
          property="og:title"
          content="Ricos Tacos Toluca - Distinción Michelin | Primero Tacos"
        />
        <meta
          property="og:description"
          content="Chorizo rojo, verde, habanero y tamarindo. El campechano con cecina que cambió el juego en CDMX."
        />
        <meta property="og:image" content="https://primerotacos.mx/og-image.png" />
        <meta property="og:type" content="restaurant" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ricos Tacos Toluca - Primero Tacos"
        />
        <meta
          name="twitter:description"
          content="¿De verdad valen la distinción Michelin estos tacos de chorizo?"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="canonical" href="https://primerotacos.mx/ricos-tacos-toluca" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Ricos Tacos Toluca",
            "image": "https://primerotacos.mx/og-image.png",
            "servesCuisine": "Mexican",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "C. López 103",
              "addressLocality": "Ciudad de México",
              "addressRegion": "CDMX",
              "postalCode": "06000"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.6",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "25"
            },
            "award": "Michelin Guide Recognition"
          })}
        </script>
      </Head>

      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden flex items-center justify-start">
          {/* Breadcrumb */}
          <Breadcrumb taqueriaNombre="Ricos Tacos Toluca" />
          {/* Background Video */}
          {shouldLoadVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/poster-ricos.jpg"
              style={{ filter: "var(--video-filter, none)" }}
            >
              <source
                src="/videos/pr-ricos_tacos_toluca.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              src="/images/poster-ricos.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Ricos Tacos Toluca"
            />
          )}

          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/50 to-black/40" />

          {/* Hero Content */}
          <div className="relative z-20 text-left py-8 md:py-10 max-w-2xl mx-4 animate-fadeInUp hero-content-box px-2 md:px-8">
            {/* Logo Component with transparent background */}
            <div className="mb-6">
              <a
                href="/"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <PrimeroTacosLogo className="h-12 md:h-16" variant="negative" />
              </a>
            </div>

            <div>
              <h1
                className="text-5xl md:text-6xl font-bold uppercase mb-6 tracking-tight"
                style={{ color: "white" }}
              >
                {taqueriaData.nombre}
              </h1>

              {/* Updated Description */}
              <div className="mb-6">
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{ color: "white" }}
                >
                  {taqueriaData.tagline_hero}
                </p>
              </div>

              {/* Rating */}
              <div
                className="text-3xl md:text-4xl font-bold flex items-center gap-2"
                style={{ color: "white" }}
              >
                <Star className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                {taqueriaData.calificacionFinal.toFixed(1)}
                <span className="text-sm md:text-base font-normal ml-2">
                  Calificación Knija
                </span>
              </div>


            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto py-8 md:py-16 max-w-6xl px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Editorial Content */}
            <div className="space-y-8">
              {/* Quote Section */}
              <section>
                <p
                  className="text-xl md:text-2xl italic leading-relaxed mb-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  "{taqueriaData.descripcion.quote}"
                </p>
                <div
                  className="text-center text-2xl tracking-widest"
                  style={{ color: "var(--text-secondary)" }}
                >
                  🌮 🌮 🌮
                </div>
              </section>

              {/* Description Section */}
              <section className="space-y-4">
                {taqueriaData.descripcion.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {index === 0 ? (
                      <>
                        En la Calle de López, frente al Mercado de Arcos de Belén, se arma la fila para probar los{" "}
                        <a
                          href={taqueriaData.ubicacion}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:opacity-70 transition-opacity"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Ricos Tacos Toluca
                        </a>
                        . Desde 2003, la familia viaja diario desde Toluca pa' servir su especialidad: <strong>chorizos rojo, verde, habanero y tamarindo</strong>, además de cecina, arrachera, obispo (embutido) y queso de puerco.
                      </>
                    ) : index === 1 ? (
                      <>
                        El <strong>campechano con chorizo y cecina</strong> es la joya de la casa, pero el <strong>taco de tamarindo</strong> es la sorpresa dulce-picosita que te volará la cabeza. Todos los tacos vienen bien armados con papitas, cebollita y salsas caseras únicas, difíciles de dejar de probar. El truco está en mezclarlas y, como decía mi abuelo: <em>"pónle color al taco"</em>.
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </section>
            </div>

            {/* Right Column - Details Card */}
            <div className="lg:sticky lg:top-8">
              <div
                className="border-2 p-6 md:p-8"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                {/* Main Rating */}
                <div className="text-center mb-8">
                  <div
                    className="text-5xl md:text-6xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {taqueriaData.calificacionFinal.toFixed(1)}
                  </div>
                  <p
                    className="text-sm mt-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Promedio ponderado
                  </p>
                </div>

                {/* Ratings Breakdown */}
                <div
                  className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <div className="text-center">
                    <div
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {taqueriaData.calidad.toFixed(1)}
                    </div>
                    <div
                      className="text-xs md:text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Calidad
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {taqueriaData.servicio.toFixed(1)}
                    </div>
                    <div
                      className="text-xs md:text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Servicio
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {taqueriaData.lugar.toFixed(1)}
                    </div>
                    <div
                      className="text-xs md:text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Lugar
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="h-5 w-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <a
                      href={taqueriaData.ubicacion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm leading-relaxed underline hover:opacity-70 transition-opacity"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {taqueriaData.direccion}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram
                      className="h-5 w-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <a
                      href={`https://instagram.com/${taqueriaData.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline hover:opacity-70 transition-opacity"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {taqueriaData.instagram}
                    </a>
                  </div>

                  {/* Precios */}
                  <div className="flex items-start gap-3">
                    <DollarSign
                      className="h-5 w-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {taqueriaData.precio}
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
                      backgroundColor: "var(--header-bg)",
                      color: "var(--header-text)",
                      border: "2px solid var(--header-bg)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
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
                      borderColor: "var(--btn-border)",
                      backgroundColor: "var(--btn-bg)",
                      color: "var(--btn-text)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--btn-hover-bg)";
                      e.currentTarget.style.color = "var(--btn-hover-text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--btn-bg)";
                      e.currentTarget.style.color = "var(--btn-text)";
                    }}
                  >
                    Calificar
                  </a>
                </div>
              </div>

              {/* Tags Section - Outside card */}
              <div className="mt-12">
                <div className="flex flex-wrap gap-3 justify-center">
                  {taqueriaData.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Promotional Section */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-6">
            <p
              className="text-lg md:text-xl mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              ¿Listo pa' la ruta taquera?
            </p>
            <p
              className="text-base md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Encuentra más joyas como esta en{" "}
              <a
                href="/"
                className="underline hover:opacity-70 transition-opacity font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                primerotacos.mx
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="pattern-background py-8"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-4">
              <div className="h-12 md:h-16">
                <PrimeroTacosLogo
                  className="h-full w-auto max-w-[180px] md:max-w-[240px] dark-mode-invert"
                  variant="positive"
                />
              </div>
            </div>
            <div
              className="text-center text-sm sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>© 2025 PRIMERO TACOS × LOS KNIJOS</p>
              <p className="mt-1">Hecho con 🌮, barrio y amor por la CDMX.</p>
            </div>
          </div>
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

        .hero-content-box {
          color: white;
        }

        .hero-content-box h1,
        .hero-content-box p {
          color: white !important;
        }
      `}</style>
    </>
  );
};

export default RicosTacosToluca;