// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

// ID de tu propiedad de Google Analytics
const GA_MEASUREMENT_ID = 'G-XVGYGJKCMN'; // Asegúrate de usar tu ID real

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Meta tags básicos */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Meta tags para SEO */}
        <meta name="description" content="Base de datos comunitaria de taquerías en CDMX, calificadas por expertos taqueros. Encuentra las mejores taquerías por calidad, servicio y ubicación." />
        <meta name="keywords" content="tacos, taquerías, CDMX, Ciudad de México, comida mexicana, tacos al pastor, tacos de suadero, mejores taquerías" />
        <meta name="author" content="Los Knijos" />
        
        {/* Etiquetas para redes sociales (Open Graph) */}
        <meta property="og:title" content="Primero Tacos - Base de datos comunitaria de taquerías en CDMX" />
        <meta property="og:description" content="Encuentra las mejores taquerías en CDMX, calificadas por expertos taqueros según calidad, servicio y ubicación." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://primerotacos.mx" />
        <meta property="og:image" content="https://primerotacos.mx/og-image.png" />
        
        {/* Etiquetas para Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Primero Tacos - Base de datos comunitaria de taquerías en CDMX" />
        <meta name="twitter:description" content="Encuentra las mejores taquerías en CDMX, calificadas por expertos taqueros según calidad, servicio y ubicación." />
        <meta name="twitter:image" content="https://primerotacos.mx/og-image.png" />
        
        {/* Favicon y otros iconos - Actualizado para incluir todos los tamaños */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />

        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Schema.org para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Primero Tacos",
                "url": "https://primerotacos.mx",
                "description": "Base de datos comunitaria de taquerías en CDMX, calificadas por expertos taqueros.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://primerotacos.mx/?search={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `
          }}
        />
        
        {/* Schema.org para información local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Primero Tacos",
                "url": "https://primerotacos.mx",
                "logo": "https://primerotacos.mx/favicon.ico",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Ciudad de México",
                  "addressRegion": "CDMX",
                  "addressCountry": "MX"
                }
              }
            `
          }}
        />
      </body>
    </Html>
  );
}