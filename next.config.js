/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido experimental.allowedDevOrigins ya que no es compatible con Next.js 13.5.6
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
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
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https://www.google-analytics.com;
    connect-src 'self' https://www.google-analytics.com https://primerotacos.onrender.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self'
  `.replace(/\s{2,}/g, ' ').trim()
}
        ]
      }
    ]
  }
};

module.exports = nextConfig;