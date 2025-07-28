// src/pages/Closets/ClosetImg.js
const mainImages = import.meta.glob('../../assets/ClosetImg/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});

const extractImages = (files) => {
  const result = {};
  Object.entries(files).forEach(([path, module]) => {
    const fileName = path.split('/').pop().split('.')[0]; // "IUImg1.jpg" -> "IUImg1"
    result[fileName] = module;
  });
  return result;
};

export const mainImgs = extractImages(mainImages);
