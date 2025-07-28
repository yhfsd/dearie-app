// public/sw.js

/* global workbox */
/* eslint-disable no-undef */

// 1. Workbox 라이브러리 로드
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// 2. 즉시 활성화 및 클라이언트 장악
self.skipWaiting();
workbox.core.clientsClaim();

// 3. 정적 자원 프리캐시(Precache & Route)
workbox.precaching.precacheAndRoute([
  { url: '/registerSW.js', revision: '3ca0b8505b4bec776b69afdba2768812' },
  { url: '/index.html',    revision: '0.hqpr78clibg'                  },
]);

// 4. 오래된 캐시 정리
workbox.precaching.cleanupOutdatedCaches();

// 5. SPA 탐색 요청 처리: 모든 navigation 요청에 index.html 반환
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'html-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// 6. JS/CSS 파일 캐싱 (Stale-while-revalidate)
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

// 7. 이미지 파일 캐싱 (Cache-first)
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
