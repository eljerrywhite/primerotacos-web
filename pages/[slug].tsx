// pages/[slug].tsx
import fs from "fs";
import path from "path";
import type { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { MapPin, Star, Globe, DollarSign } from "lucide-react";
import PrimeroTacosLogo from "../components/PrimeroTacosLogo";
import Breadcrumb from "../components/Breadcrumb";

// --- Tipos locales (puedes moverlos a /types si quieres)
type OpeningHours = { opens: string; closes: string; days: string[] };
type Media = { video: string; poster: string };
type Seo = {
  title: string; description: string;
  ogTitle: string; ogDescription: string;
  ogImage: string; ogImageAlt?: string;
};
type Descripcion = { quote?: string; paragraphs?: string[] };
export interface TaqueriaFull {
  _id: string;
  slug: string;
  nombre: string;
  desde?: string;
  calidad: number;
  servicio: number;
  lugar: number;
  calificacionFinal: number | null;
  direccion?: string;
  ubicacion: string;
  taglines?: string[];
  descripcion?: Descripcion;
  instagram?: string; // puede ser facebook o insta
  priceText?: string;
  especialidades?: string[];
  hashtags?: string[];
  openingHours?: OpeningHours;
  media: Media;
  seo: Seo;
}

function computeFinal(c: number, s: number, l: number) {
  return +(0.7 * c + 0.2 * s + 0.1 * l).toFixed(1);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "data", "taquerias");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
  const paths = files.map((f) => ({ params: { slug: f.replace(".json", "") } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug);
  const filePath = path.join(process.cwd(), "data", "taquerias", `${slug}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const data: TaqueriaFull = JSON.parse(raw);

  const calificacionFinal =
    data.calificacionFinal ?? computeFinal(data.calidad, data.servicio, data.lugar);

  return { props: { taqueria: { ...data, calificacionFinal } } };
};

export default function TaqueriaPage({ taqueria }: { taqueria: TaqueriaFull }) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShouldLoadVideo(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>{taqueria.seo.title}</title>
        <meta name="description" content={taqueria.seo.description} />
        <meta name="robots" content="max-image-preview:large" />
        <meta property="og:title" content={taqueria.seo.ogTitle} />
        <meta property="og:description" content={taqueria.seo.ogDescription} />
        <meta property="og:image" content={taqueria.seo.ogImage} />
        {taqueria.seo.ogImageAlt && (
          <meta property="og:image:alt" content={taqueria.seo.ogImageAlt} />
        )}
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content={`https://primerotacos.mx/${taqueria.slug}`} />
        <meta property="og:site_name" content="Primero Tacos" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={taqueria.seo.ogTitle} />
        <meta name="twitter:description" content={taqueria.seo.ogDescription} />
        <meta name="twitter:image" content={taqueria.seo.ogImage} />
        <link rel="canonical" href={`https://primerotacos.mx/${taqueria.slug}`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": taqueria.nombre,
              "image": taqueria.seo.ogImage,
              "servesCuisine": "Mexican",
              "priceRange": taqueria.priceText ? "$$" : "$",
              "description": taqueria.seo.description,
              "address": taqueria.direccion
                ? {
                    "@type": "PostalAddress",
                    "streetAddress": taqueria.direccion,
                    "addressLocality": "Ciudad de México",
                    "addressRegion": "CDMX"
                  }
                : undefined,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": String(taqueria.calificacionFinal),
                "bestRating": "5",
                "worstRating": "1"
              },
              "foundingDate": taqueria.desde ?? undefined,
              "sameAs": taqueria.instagram ? [taqueria.instagram] : [],
              "openingHoursSpecification": taqueria.openingHours
                ? [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": taqueria.openingHours.days,
                      "opens": taqueria.openingHours.opens,
                      "closes": taqueria.openingHours.closes
                    }
                  ]
                : undefined
            })
          }}
        />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        {/* Hero */}
        <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden flex items-center justify-start">
          {shouldLoadVideo ? (
            <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline poster={taqueria.media.poster}>
              <source src={taqueria.media.video} type="video/mp4" />
            </video>
          ) : (
            <img src={taqueria.media.poster} className="absolute inset-0 w-full h-full object-cover" alt={taqueria.nombre} />
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
                {taqueria.calificacionFinal.toFixed(1)}
                <span className="text-sm md:text-base font-normal ml-2">Calificación Knija</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <Breadcrumb taqueriaNombre={taqueria.nombre} />

        {/* Main */}
        <section className="relative z-10 py-4 md:py-6" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="container mx-auto max-w-6xl px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Editorial */}
              <div className="space-y-8">
                <section>
                  {taqueria.descripcion?.quote && (
                    <p className="text-xl md:text-2xl italic leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
                      "{taqueria.descripcion.quote}"
                    </p>
                  )}
                  <div className="text-center text-2xl tracking-widest" style={{ color: "var(--text-secondary)" }}>🌮 🌮 🌮</div>
                </section>

                <section className="space-y-4">
                  {taqueria.descripcion?.paragraphs?.map((p, i) => (
                    <p key={i} className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {p}
                    </p>
                  ))}
                </section>
              </div>

              {/* Card lateral */}
              <div className="lg:sticky lg:top-8">
                <div className="border-2 p-6 md:p-8" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="text-center mb-8">
                    <div className="text-5xl md:text-6xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {taqueria.calificacionFinal.toFixed(1)}
                    </div>
                    <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>Promedio ponderado</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b" style={{ borderColor: "var(--card-border)" }}>
                    {[
                      { label: "Calidad", value: taqueria.calidad },
                      { label: "Servicio", value: taqueria.servicio },
                      { label: "Lugar", value: taqueria.lugar }
                    ].map((r) => (
                      <div className="text-center" key={r.label}>
                        <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                          {r.value.toFixed(1)}
                        </div>
                        <div className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>{r.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 mb-8">
                    {taqueria.direccion && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <a href={taqueria.ubicacion} target="_blank" rel="noopener noreferrer"
                           className="text-sm leading-relaxed underline hover:opacity-70 transition-opacity"
                           style={{ color: "var(--text-secondary)" }}>
                          {taqueria.direccion}
                        </a>
                      </div>
                    )}

                    {taqueria.instagram && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <a href={taqueria.instagram} target="_blank" rel="noopener noreferrer"
                           className="text-sm underline hover:opacity-70 transition-opacity"
                           style={{ color: "var(--text-secondary)" }}>
                          Perfil oficial
                        </a>
                      </div>
                    )}

                    {taqueria.priceText && (
                      <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{taqueria.priceText}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a href={taqueria.ubicacion} target="_blank" rel="noopener noreferrer"
                       className="flex-1 text-center py-3 text-sm md:text-base uppercase font-medium transition-all"
                       style={{ backgroundColor: "var(--header-bg)", color: "var(--header-text)", border: "2px solid var(--header-bg)" }}>
                      Ver mapa
                    </a>
                    <a href="https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos" target="_blank" rel="noopener noreferrer"
                       className="flex-1 border-2 py-3 text-sm md:text-base text-center uppercase font-medium transition-all"
                       style={{ borderColor: "var(--btn-border)", backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}>
                      Calificar
                    </a>
                  </div>
                </div>

                {taqueria.hashtags?.length ? (
                  <div className="mt-12">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {taqueria.hashtags.map((tag) => (
                        <span key={tag} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-6">
            <p className="text-lg md:text-xl mb-2" style={{ color: "var(--text-primary)" }}>¿Listo pa' la ruta taquera?</p>
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
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .hero-content-box h1, .hero-content-box p { color: white !important; }
      `}</style>
    </>
  );
}
