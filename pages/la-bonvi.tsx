// pages/la-bonvi.tsx
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { MapPin, Star, Instagram, DollarSign } from "lucide-react";
import PrimeroTacosLogo from "../components/PrimeroTacosLogo";
import Breadcrumb from "../components/Breadcrumb";

const LaBonvi = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoadVideo(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const taqueriaData = {
    nombre: "La Bonvi",
    desde: "2024",
    calificacionFinal: 4.2,
    calidad: 4.0,
    servicio: 5.0,
    lugar: 4.0,
    direccion:
      "Pedregal 33, Lomas - Virreyes, Lomas de Chapultepec IV Secc, Miguel Hidalgo, 11000 Ciudad de México, CDMX",
    ubicacion: "https://maps.app.goo.gl/FLy4eRwVmWcaYw3C8",
    taglines: ["Tacos de primera, sin la experiencia callejera."],
    snippet:
      "Taquería La Bonvi: los fifís que callan bocas. 🌮 Prueba el de New York, el campechano y el de costilla — servicio top y ambiente con flow.",
    descripcion: {
      quote:
        "Sí, son tacos fifis, pero están muy chingones. Obligados: el de New York, Costilla y campechano.",
      paragraphs: [
        "A las taquerías fifís uno entra con cierta desconfianza. Nunca es claro si hay más interés en el diseño de los platos y los asientos que en el sabor del taco, y eso genera duda. A pesar de eso, se decidió comer en La Bonvi esperando una decepción y terminó callando bocas. La supuesta taquería más cara de la ciudad está muy pinche rica.",
        "Tiene gran servicio, pero mejores tacos. No se vayan sin pedir un campechano, una tostada de aguacate, otro de asada con tocino y una joyita: el de New York. Con todo y que está en el corazón fresa de la ciudad, hay buen ambiente, el lugar está lindo y, como toda taquería que se digne de serlo, el taco llega rápido. No se pierdan la experiencia.",
      ],
    },
    instagram: "https://www.instagram.com/labonvi.mx/",
    priceText: "Tacos: $89–$145",
    especialidades: ["campechano", "tostada de aguacate", "asada con tocino", "New York"],
    hashtags: ["#PrimeroTacos", "#LaBonvi", "#Tacofifí", "#TacosGourmet", "#FodieCDMX", "#TacosEnLomas"],
  };

  return (
    <>
      <Head>
        <title>Taquería La Bonvi | Los tacos fifís que sí valen cada mordida</title>
        <meta
          name="description"
          content="Tacos fifís con sabor real: prueba el de New York, costilla y campechano. Servicio top, lugar bonito y sabor que calla bocas."
        />
        <meta name="robots" content="max-image-preview:large" />
        <meta property="og:title" content="La Bonvi: los tacos fifís más ricos de la CDMX" />
        <meta
          property="og:description"
          content="Sí, son tacos fifís, pero están muy chingones. Obligados: el de New York, costilla y campechano. Un lujo taquero que sorprende hasta al más escéptico."
        />
        <meta property="og:url" content="https://primerotacos.mx/la-bonvi" />
        <meta property="og:site_name" content="Primero Tacos" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:image" content="https://primerotacos.mx/og-image.png" />
        <meta
          property="og:image:alt"
          content="Plato de tacos de costilla y New York en La Bonvi, CDMX – tacos fifís con sabor real."
        />
        <meta name="twitter:image" content="https://primerotacos.mx/og-image.png" />
        <meta property="og:type" content="restaurant" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="La Bonvi - Primero Tacos" />
        <meta name="twitter:description" content="Tacos fifís que callan bocas: New York, costilla y campechano." />
        <link rel="canonical" href="https://primerotacos.mx/la-bonvi" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "La Bonvi",
            "image": "https://primerotacos.mx/og-image.png",
            "servesCuisine": "Mexican",
            "priceRange": "$$",
            "description":
              "Tacos La Bonvi: los fifís que callan bocas. Prueba el de New York, el campechano y el de costilla — servicio top y ambiente con flow.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Pedregal 33, Lomas - Virreyes, Lomas de Chapultepec IV Secc",
              "addressLocality": "Ciudad de México",
              "addressRegion": "CDMX",
              "postalCode": "11000"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.2",
              "bestRating": "5",
              "worstRating": "1"
            },
            "foundingDate": "2024",
            "sameAs": ["https://www.instagram.com/labonvi.mx/"],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
                ],
                "opens": "12:00",
                "closes": "23:30"
              }
            ]
          })}
        </script>
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden flex items-center justify-start">
          {shouldLoadVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/poster-bonvi.jpg"
              style={{ filter: "var(--video-filter, none)" }}
            >
              <source src="/videos/pr-bonvi.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src="/images/poster-bonvi.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              alt="La Bonvi"
            />
          )}

          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/50 to-black/40" />

          <div className="relative z-20 text-left py-8 md:py-10 max-w-2xl mx-4 animate-fadeInUp hero-content-box px-2 md:px-8">
            <div className="mb-6">
              <a href="/" className="inline-block hover:opacity-80 transition-opacity">
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

              <div className="mb-6">
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: "white" }}>
                  {taqueriaData.taglines[0]}
                </p>
              </div>

              <div className="text-3xl md:text-4xl font-bold flex items-center gap-2" style={{ color: "white" }}>
                <Star className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                {taqueriaData.calificacionFinal.toFixed(1)}
                <span className="text-sm md:text-base font-normal ml-2">Calificación Knija</span>
              </div>
            </div>
          </div>
        </section>

        <Breadcrumb taqueriaNombre="La Bonvi" />

        <section className="relative z-10 py-4 md:py-6" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="container mx-auto max-w-6xl px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-8">
                <section>
                  <p className="text-xl md:text-2xl italic leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
                    "{taqueriaData.descripcion.quote}"
                  </p>
                  <div className="text-center text-2xl tracking-widest" style={{ color: "var(--text-secondary)" }}>
                    🌮 🌮 🌮
                  </div>
                </section>

                <section className="space-y-4">
                  {taqueriaData.descripcion.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {index === 0 ? (
                        <>
                          A las taquerías fifís uno entra con cierta desconfianza. Nunca es claro si hay más interés en el diseño de los platos y los asientos que en el sabor del taco, y eso genera duda. A pesar de eso, se decidió comer en{" "}
                          <a
                            href={taqueriaData.ubicacion}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:opacity-70 transition-opacity"
                            style={{ color: "var(--text-primary)" }}
                          >
                            La Bonvi
                          </a>{" "}
                          esperando una decepción y terminó callando bocas. La supuesta taquería más cara de la ciudad está muy pinche rica.
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </section>
              </div>

              <div className="lg:sticky lg:top-8">
                <div
                  className="border-2 p-6 md:p-8"
                  style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
                >
                  <div className="text-center mb-8">
                    <div className="text-5xl md:text-6xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {taqueriaData.calificacionFinal.toFixed(1)}
                    </div>
                    <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                      Promedio ponderado
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b" style={{ borderColor: "var(--card-border)" }}>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {taqueriaData.calidad.toFixed(1)}
                      </div>
                      <div className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>Calidad</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {taqueriaData.servicio.toFixed(1)}
                      </div>
                      <div className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>Servicio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {taqueriaData.lugar.toFixed(1)}
                      </div>
                      <div className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>Lugar</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
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
                      <Instagram className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                      <a
                        href={taqueriaData.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline hover:opacity-70 transition-opacity"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        @labonvi.mx
                      </a>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {taqueriaData.priceText}
                      </span>
                    </div>
                  </div>

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
                    >
                      Calificar
                    </a>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {taqueriaData.hashtags.map((tag, index) => (
                      <span key={index} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 text-center">
          <div className="container mx-auto px-6">
            <p className="text-lg md:text-xl mb-2" style={{ color: "var(--text-primary)" }}>
              ¿Listo pa' la ruta taquera?
            </p>
            <p className="text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
              Encuentra más joyas como esta en{" "}
              <a href="/" className="underline hover:opacity-70 transition-opacity font-medium" style={{ color: "var(--text-primary)" }}>
                primerotacos.mx
              </a>
            </p>
          </div>
        </section>

        <footer className="pattern-background py-8" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-4">
              <div className="h-12 md:h-16">
                <PrimeroTacosLogo
                  className="h-full w-auto max-w-[180px] md:max-w-[240px] dark-mode-invert"
                  variant="positive"
                />
              </div>
            </div>
            <div className="text-center text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
              <p>© 2025 PRIMERO TACOS × LOS KNIJOS</p>
              <p className="mt-1">Hecho con 🌮, barrio y amor por la CDMX.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .hero-content-box { color: white; }
        .hero-content-box h1, .hero-content-box p { color: white !important; }
      `}</style>
    </>
  );
};

export default LaBonvi;
