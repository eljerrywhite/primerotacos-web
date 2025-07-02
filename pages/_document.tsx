// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

// ID de tu propiedad de Google Analytics
const GA_MEASUREMENT_ID = 'G-XVGYGJKCMN'; // Reemplaza con tu ID real

export default function Document() {
  return (
    <Html lang="es">
      <Head>
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
      </body>
    </Html>
  );
}