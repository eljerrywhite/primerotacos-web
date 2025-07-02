// pages/_app.tsx
import type { AppProps } from 'next/app';
import { GoogleAnalytics } from '@next/third-parties/google';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-XVGYGJKCMN" /> {/* Ejemplo: tu ID real */}
    </>
  );
}