// public/sw.js

const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = '/index.html';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([OFFLINE_URL]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(event.request);
      } catch {
        // err 바인딩을 제거하고, 네트워크 실패 시 캐시된 페이지를 반환
        const cache = await caches.open(CACHE_NAME);
        return cache.match(OFFLINE_URL);
      }
    })());
  }
  // 기타 리소스(js/css/이미지 등)는 기본 동작을 유지합니다.
});
