// src/utils/getYouTubeThumbnail.js

/**
 * 유튜브 URL에서 영상 ID를 추출
 * 지원 포맷: youtu.be/:id, watch?v=:id, embed/:id 등
 */
export function getYouTubeId(url) {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

/**
 * 주어진 유튜브 URL로부터 썸네일 URL 반환
 * quality: default, mqdefault, hqdefault, sddefault, maxresdefault
 */
export function getYouTubeThumbnail(url, quality = 'hqdefault') {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : '';
}
