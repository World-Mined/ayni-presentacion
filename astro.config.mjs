import { defineConfig } from 'astro/config';
import pwa from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // The toolbar overlays bottom controls when testing on a real phone.
  devToolbar: {
    enabled: false
  },
  build: {
    format: 'file'
  },
  integrations: [
    pwa({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AYNI',
        short_name: 'AYNI',
        description: 'AYNI - El Retorno Sagrado de la Energía',
        theme_color: '#000000',
        background_color: '#000000',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Keep the app shell available offline. Optimized slide images are
        // cached on first use so installation does not download every slide.
        globPatterns: ['**/*.{html,js,css,svg,png,ico,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: '/offline.html',
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              request.destination === 'image' && url.origin === self.location.origin,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ayni-slide-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      devOptions: {
        // A development service worker can keep serving an older presentation
        // after the source changes. PWA behavior is verified from the build.
        enabled: false
      }
    })
  ]
});
