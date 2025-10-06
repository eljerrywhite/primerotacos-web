
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Star, MapPin, Calendar, TrendingUp, ExternalLink } from "lucide-react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/Breadcrumb";

// Importar funciones de analytics
import { trackPageView, trackVideoPlay, trackCTAClick } from "../lib/analytics";

export default function LaBonvi() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [hasTrackedPlay, setHasTrackedPlay] = useState(false);

  // Color temático para La Bonvi (color gourmet/premium)
  const themeColor = "#1a1a1a";

  // Datos de la taquería
  const taqueriaData = {
    nombre: "La Bonvi",
    slug: "la-bonvi",
    año: "2024",
    calificacionFinal: 4.2,
    calidad: 4,
    servicio: 5,
    lugar: 4,
    direccion: "Lomas de Chapultepec",
    mapsUrl: "https://maps.app.goo.gl/FLy4eRwVmWcaYw3C8",
    instagram: "@labonvi.mx",
    instagramUrl: "https://www.instagram.com/labonvi.mx/",
    videoUrl: "/videos/pr-bonvi.mp4",
    posterUrl: "/images/poster-bonvi.jpg",
    taglineHero: "Tacos de primera, sin la experiencia callejera.",
    quote:
      "Sí, son tacos fifis, pero están muy chingones. Obligados: el de New York, Costilla y campechano.",
    parrafos: [
      {
        texto:
          "A las taquerías fifís uno entra con cierta desconfianza. Nunca es claro si hay más interés en el diseño de los platos y los asientos que en el sabor del taco, y eso genera duda. A pesar de eso, se decidió comer en ",
        linkTexto: "La Bonvi",
        linkUrl: "https://maps.app.goo.gl/FLy4eRwVmWcaYw3C8",
        textoFinal:
          " esperando una decepción y terminó callando bocas. La supuesta taquería más cara de la ciudad está muy pinche rica.",
      },
      {
        texto:
          "Tiene gran servicio, pero mejores tacos. No se vayan sin pedir un **campechano**, una **tostada de aguacate**, otro de **asada con tocino** y una joyita: el de **New York**. Con todo y que está en el corazón fresa de la ciudad, hay buen ambiente, el lugar está lindo y, como toda taquería que se digne de serlo, el taco llega rápido. No se pierdan la experiencia.",
      },
    ],
    hashtags: [
      "#PrimeroTacos",
      "#LaBonvi",
      "#TacoFifí",
      "#TacosGourmet",
      "#FoodieCDMX",
      "#TacosEnLomas",
    ],
    precios: "Desde $89 a $145",
    especialidades: ["Campechano", "Tostada de aguacate", "Asada con tocino", "New York"],
  };

  // SEO Metadata
  const metaTitle = "Tacos La Bonvi | Los tacos fifís que sí valen cada mordida";
  const metaDescription =
    "La Bonvi en Lomas de Chapultepec: tacos gourmet que rompen con todos los prejuicios. El de New York, campechano y costilla son obligados. Calificación Knija: 4.2";

  // Open Graph
  const ogTitle = "La Bonvi - Tacos fifís que SÍ valen la pena";
  const ogDescription =
    "¿Tacos de $145? Sí, pero están muy chingones. Prueba el de New York, campechano y asada con tocino en Lomas de Chapultepec.";

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: taqueriaData.nombre,
    image: `https://primerotacos.com${taqueriaData.posterUrl}`,
    description: metaDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressRegion: "CDMX",
      streetAddress: taqueriaData.direccion,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.4326",
      longitude: "-99.1332",
    },
    url: `https://primerotacos.com/${taqueriaData.slug}`,
    servesCuisine: "Tacos",
    priceRange: taqueriaData.precios,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: taqueriaData.calificacionFinal.toString(),
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1",
    },
  };

  // Track page view
  useEffect(() => {
    trackPageView(taqueriaData.nombre, taqueriaData.slug);
  }, []);

  // Intersection Observer para autoplay del video
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Autoplay cuando el video está en viewport
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoInView) {
        videoRef.current.play();
        if (!hasTrackedPlay) {
          trackVideoPlay(taqueriaData.nombre);
          setHasTrackedPlay(true);
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoInView, hasTrackedPlay]);

  // Función para procesar texto con negritas
  const procesarTexto = (texto: string) => {
    const parts = texto.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={`https://primerotacos.com${taqueriaData.posterUrl}`} />
        <meta property="og:url" content={`https://primerotacos.com/${taqueriaData.slug}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={`https://primerotacos.com${taqueriaData.posterUrl}`} />

        {/* Theme Color */}
        <meta name="theme-color" content={themeColor} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://primerotacos.com/${taqueriaData.slug}`} />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div className="min-h-screen pattern-background" style={{ backgroundColor: "var(--bg-primary)" }}>
        {/* Hero Section */}
        <section
          className="relative min-h-[50vh] md:min-h-[60vh] flex items-end pb-8 md:pb-12 px-4 md:px-8"
          style={{
            background: `linear-gradient(to bottom, ${themeColor} 0%, var(--bg-primary) 100%)`,
          }}
        >
          <div className="max-w-4xl mx-auto w-full">
            <div className="space-y-4 md:space-y-6">
              {/* Badge "Reseña Knija" */}
              <div className="badge-reseña">
                <svg
                  className="badge-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Reseña Knija</span>
              </div>

              {/* Título */}
              <h1
                className="text-4xl md:text-6xl font-bold leading-tight"
                style={{ color: "white" }}
              >
                {taqueriaData.nombre}
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-xl" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                {taqueriaData.taglineHero}
              </p>

              {/* Metadata row */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  Fundada en {taqueriaData.año}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  {taqueriaData.direccion}
                </div>
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

        {/* Breadcrumb */}
        <Breadcrumb taqueriaNombre={taqueriaData.nombre} />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Video con lazy loading */}
          <div className="mb-8 md:mb-12 rounded-lg overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="w-full"
              loop
              muted
              playsInline
              poster={taqueriaData.posterUrl}
              preload="metadata"
            >
              <source src={taqueriaData.videoUrl} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          {/* Quote destacado */}
          <blockquote
            className="text-xl md:text-2xl font-bold mb-8 md:mb-12 pl-4 md:pl-6 border-l-4 italic"
            style={{
              color: "var(--text-primary)",
              borderColor: themeColor,
            }}
          >
            "{taqueriaData.quote}"
          </blockquote>

          {/* Artículo */}
          <article className="prose prose-lg max-w-none mb-8 md:mb-12 space-y-6" style={{ color: "var(--text-primary)" }}>
            {taqueriaData.parrafos.map((parrafo, index) => (
              <p key={index} className="leading-relaxed">
                {parrafo.linkTexto ? (
                  <>
                    {procesarTexto(parrafo.texto)}
                    <a
                      href={parrafo.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:underline inline-flex items-center gap-1"
                      style={{ color: themeColor }}
                      onClick={() => trackCTAClick("Ver en Google Maps", taqueriaData.nombre)}
                    >
                      {parrafo.linkTexto}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    {procesarTexto(parrafo.textoFinal || "")}
                  </>
                ) : (
                  procesarTexto(parrafo.texto)
                )}
              </p>
            ))}
          </article>

          {/* Desglose de calificaciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "var(--text-secondary)" }}>Calidad</span>
                <TrendingUp className="w-5 h-5" style={{ color: themeColor }} />
              </div>
              <div className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                {taqueriaData.calidad.toFixed(1)}
              </div>
            </div>

            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "var(--text-secondary)" }}>Servicio</span>
                <Star className="w-5 h-5" style={{ color: themeColor }} />
              </div>
              <div className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                {taqueriaData.servicio.toFixed(1)}
              </div>
            </div>

            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "var(--text-secondary)" }}>Lugar</span>
                <MapPin className="w-5 h-5" style={{ color: themeColor }} />
              </div>
              <div className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                {taqueriaData.lugar.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div
            className="p-6 md:p-8 rounded-lg mb-8 md:mb-12"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Información
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: themeColor }} />
                <div>
                  <div className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    Ubicación
                  </div>
                  <a
                    href={taqueriaData.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={() => trackCTAClick("Ver en Google Maps", taqueriaData.nombre)}
                  >
                    {taqueriaData.direccion}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {taqueriaData.instagram && (
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: themeColor }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                      Instagram
                    </div>
                    <a
                      href={taqueriaData.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                      style={{ color: "var(--text-secondary)" }}
                      onClick={() => trackCTAClick("Ver Instagram", taqueriaData.nombre)}
                    >
                      {taqueriaData.instagram}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  style={{ color: themeColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    Precios
                  </div>
                  <div style={{ color: "var(--text-secondary)" }}>Taco: {taqueriaData.precios}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
            {taqueriaData.hashtags.map((hashtag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: "var(--tag-bg)",
                  color: "var(--text-secondary)",
                }}
              >
                {hashtag}
              </span>
            ))}
          </div>

          {/* CTA final */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: themeColor,
                color: "white",
              }}
              onClick={() => trackCTAClick("Ver más taquerías", taqueriaData.nombre)}
            >
              Ver más taquerías
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
