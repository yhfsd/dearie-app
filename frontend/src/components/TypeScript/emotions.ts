// 1) 베이스 아이템 타입
export interface RawEmotionItem {
  label: string;
  color: string;    // dot 색
}

// 2) 그룹 정의
export const EMOTION_GROUPS = [
  {
    title: '긍정',
    items: [
      { label: '신나는',     color: '#FFE055' },
      { label: '즐거운',     color: '#FFA94C' },
      { label: '사랑하는',   color: '#FFBEAA' },
      { label: '만족스러운', color: '#AAF9FF' },
      { label: '설레는',     color: '#A6FF6C' },
    ] as const,
  },
  {
    title: '중립',
    items: [
      { label: '무기력한',   color: '#005292' },
      { label: '심심한',     color: '#21677B' },
      { label: '그저그런',   color: '#5BA0A8' },
      { label: '궁금한',     color: '#9C5440' },
      { label: '혼란스러운', color: '#D74F3D' },
    ] as const,
  },
  {
    title: '부정',
    items: [
      { label: '실망한',     color: '#045BDE' },
      { label: '피곤한',     color: '#042D4D' },
      { label: '지친',       color: '#2657A9' },
      { label: '짜증나는',   color: '#B14052' },
      { label: '억울한',     color: '#6C2C4D' },
    ] as const,
  },
] as const;

// 3) 타입 추출
export type EmotionGroup = typeof EMOTION_GROUPS[number];
export type EmotionItem  = EmotionGroup['items'][number];
export type Emotion      = EmotionItem['label'];
