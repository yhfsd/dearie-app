// src/assets/Home/images.js

// Vite 4+ 에서 권장하는 globEager 사용법
const modules = import.meta.glob('./*.png', {
  eager: true,
  query: '?url',
  import: 'default'
});

export const images = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const key = path.replace(/^\.\/|\.png$/g, '').toLowerCase();
    return [key, url];
  })
);
