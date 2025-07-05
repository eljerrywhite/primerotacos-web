/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // sustituye por la URL exacta que te muestra Replit
    allowedDevOrigins: [
      "https://4e2fcb78-9303-45e7-b1bf-6d22c26a537a-00-2epf0fbcj09vm.picard.replit.dev"
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://primerotacos.onrender.com; frame-ancestors 'none';`.trim()
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig;