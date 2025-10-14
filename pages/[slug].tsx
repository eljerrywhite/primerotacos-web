// pages/[slug].tsx
import fs from "fs";
import path from "path";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { TaqueriaDetail } from "../types"; 
import React, { useEffect, useState } from "react";
import { MapPin, Star, Globe, DollarSign, Instagram } from "lucide-react";
import PrimeroTacosLogo from "../components/PrimeroTacosLogo";
import Breadcrumb from "../components/Breadcrumb";


/** ---------- Utils ---------- */
function computeFinal(calidad: number, servicio: number, lugar: number, given?: number | null) {
  if (typeof given === "number") return given;
  // 70% calidad, 20% servicio, 10% lugar
  const n = (calidad * 0.7 + servicio * 0.2 + lugar * 0.1);
  // redondeo a 1 decimal
  return Math.round(n * 10) / 10;
}

// Helpers sociales
function instagramLabel(value?: string) {
  if (!value) return "";
  const v = value.trim();
  if (v.startsWith("http")) {
    try {
      const u = new URL(v);
      const handle = u.pathname.replace(/^\/+/, "").split("/")[0];
      return handle ? `@${handle}` : "@instagram";
    } catch {
      return "@instagram";
    }
  }
  return `@${v.replace(/^@+/, "")}`;
}

function instagramHref(value?: string) {
  if (!value) return "";
  const v = value.trim();
  if (v.startsWith("http")) return v;
  return `https://instagram.com/${v.replace(/^@+/, "")}`;
}

function prettyDomain(url?: string) {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.host; // ej: www.sitio.com
  } catch {
    try {
      const u2 = new URL(`https://${url}`);
      return u2.host;
    } catch {
      return url;
    }
  }
}

/** ---------- Página ---------- */
interface PageProps {
  taqueria: TaqueriaDetail;
}

export default function TaqueriaPage({ taqueria }: PageProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShouldLoadVideo(true), 500);
    return () => clearTimeout(t);
  }, []);

  const finalScore = computeFinal(taqueria.calidad, taqueria.servicio, taqueria.lugar, taqueria.calificacionFinal);

  const title = taqueria.seo?.title || `${taqueria.nombre} | Primero Tacos`;
  const metaDesc =
    taqueria.seo?.description ||
    (taqueria.descripcion?.quote
      ? taqueria.descripcion.quote.slice(0, 160)
      : `Tacos en CDMX: ${taqueria.nombre}`);
  const ogTitle = taqueria.seo?.ogTitle || title;
  const ogDescription = taqueria.seo?.ogDescription || metaDesc;
  const posterPath = taqueria.media?.poster || "/images/poster-default.jpg";
  const ogImage = posterPath.startsWith("http")
    ? posterPath
    : `https://primerotacos.mx${posterPath}`;

  const ogImageAlt = taqueria.seo?.ogImageAlt || `${taqueria.nombre} - poster`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:site_name" content="Primero Tacos" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />

        <meta property="og:type" content="restaurant" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <link rel="canonical" href={`https://primerotacos.mx/${taqueria.slug}`} />
        {/* Schema.org minimal */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: taqueria.nombre,
              image: ogImage,
              servesCuisine: "Mexican",
              address: taqueria.direccion
                ? {
                    "@type": "PostalAddress",
                    streetAddress: taqueria.direccion,
                    addressLocality: "Ciudad de México",
                    addressRegion: "CDMX"
                  }
                : undefined,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: String(finalScore),
                bestRating: "5",
                worstRating: "1"
              },
              foundingDate: taqueria.desde || undefined
            })
          }}
        />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        {/* Hero */}
        <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden flex items-center justify-start">
          {shouldLoadVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={taqueria.media?.poster || "/images/poster-default.jpg"}
              style={{ filter: "var(--video-filter, none)" }}
            >
              {taqueria.media?.video && <source src={taqueria.media.video} type="video/mp4" />}
            </video>
          ) : (
            <img
              src={taqueria.media?.poster || "/images/poster-default.jpg"}
              className="absolute inset-0 w-full h-full object-cover"
              alt={taqueria.nombre}
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
              <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 tracking-tight" style={{ color: "white" }}>
                {taqueria.nombre}
              </h1>

              {taqueria.taglines?.[0] && (
                <div className="mb-6">
                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: "white" }}>
                    {taqueria.taglines[0]}
                  </p>
                </div>
              )}

              <div className="text-3xl md:text-4xl font-bold flex items-center gap-2" style={{ color: "white" }}>
                <Star className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                {finalScore.toFixed(1)}
                <span className="text-sm md:text-base font-normal ml-2">Calificación Knija</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <Breadcrumb taqueriaNombre={taqueria.nombre} />

        {/* Contenido principal */}
        <section className="relative z-10 py-4 md:py-6" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="container mx-auto max-w-6xl px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Izquierda */}
              <div className="space-y-8">
                {/* Quote */}
                {!!taqueria.descripcion?.quote && (
                  <section>
                    <p className="text-xl md:text-2xl italic leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
                      "{taqueria.descripcion.quote}"
                    </p>
                    <div className="text-center text-2xl tracking-widest" style={{ color: "var(--text-secondary)" }}>
                      🌮 🌮 🌮
                    </div>
                  </section>
                )}

                {/* Descripción */}
                <section className="space-y-4">
                  {(taqueria.descripcion?.paragraphs || []).map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {index === 0 && taqueria.ubicacion ? (
                        <>
                        
                          {paragraph}
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </section>
              </div>

              {/* Derecha: Card lateral */}
              <div className="lg:sticky lg:top-8">
                <div className="border-2 p-6 md:p-8" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  {/* Score */}
                  <div className="text-center mb-8">
                    <div className="text-5xl md:text-6xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {finalScore.toFixed(1)}
                    </div>
                    <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                      Promedio ponderado
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b" style={{ borderColor: "var(--card-border)" }}>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {taqueria.calidad.toFixed(1)}
                      </div>
                      <div className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>
                        Calidad
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {taqueria.servicio.toFixed(1)}
                      </div>
                      <div className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>
                        Servicio
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {taqueria.lugar.toFixed(1)}
                      </div>
                      <div className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>
                        Lugar
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4 mb-8">
                    {/* Dirección */}
                    {taqueria.direccion && taqueria.ubicacion && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <a
                          href={taqueria.ubicacion}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm leading-relaxed underline hover:opacity-70 transition-opacity"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {taqueria.direccion}
                        </a>
                      </div>
                    )}

                    {/* Sitio web (Globe + dominio) */}
                    {taqueria.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <a
                          href={taqueria.website.startsWith("http") ? taqueria.website : `https://${taqueria.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline hover:opacity-70 transition-opacity"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {prettyDomain(taqueria.website)}
                        </a>
                      </div>
                    )}

                    {/* Instagram (icono + @usuario) */}
                    {taqueria.instagram && (
                      <div className="flex items-start gap-3">
                        <Instagram className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <a
                          href={instagramHref(taqueria.instagram)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline hover:opacity-70 transition-opacity"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {instagramLabel(taqueria.instagram)}
                        </a>
                      </div>
                    )}

                    {/* Facebook (Globe + label fijo) */}
                    {taqueria.facebook && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <a
                          href={taqueria.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline hover:opacity-70 transition-opacity"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Perfil en Facebook
                        </a>
                      </div>
                    )}

                    {/* Precios */}
                    {taqueria.priceText && (
                      <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {taqueria.priceText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3">
                    {taqueria.ubicacion && (
                      <a
                        href={taqueria.ubicacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-3 text-sm md:text-base uppercase font-medium transition-all"
                        style={{
                          backgroundColor: "var(--header-bg)",
                          color: "var(--header-text)",
                          border: "2px solid var(--header-bg)"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        Ver mapa
                      </a>
                    )}
                    <a
                      href="https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 py-3 text-sm md:text-base text-center uppercase font-medium transition-all"
                      style={{
                        borderColor: "var(--btn-border)",
                        backgroundColor: "var(--btn-bg)",
                        color: "var(--btn-text)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--btn-hover-bg)";
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

                {/* Hashtags */}
                {Array.isArray(taqueria.hashtags) && taqueria.hashtags.length > 0 && (
                  <div className="mt-12">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {taqueria.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Promo */}
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

        {/* Footer */}
        <footer className="pattern-background py-8" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-4">
              <div className="h-12 md:h-16">
                <PrimeroTacosLogo className="h-full w-auto max-w-[180px] md:max-w-[240px] dark-mode-invert" variant="positive" />
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
}

/** ---------- SSG ---------- */
export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "data", "taquerias");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const slugs = files
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => f.replace(".json", ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug || "");
  const file = path.join(process.cwd(), "data", "taquerias", `${slug}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  const data = JSON.parse(raw);

  // compatibilidad: algunos JSON antiguos usan "precio" en vez de "priceText"
  if (!data.priceText && data.precio) data.priceText = data.precio;

  return {
    props: {
      taqueria: { ...data, slug }
    }
  };
};
