// src/components/TypeScript/emotions.ts

// 1) 베이스 아이템 타입: 감정 항목 하나
export interface RawEmotionItem {
  label: string;
  color: string;
}

// 2) 감정 그룹 타입: 제목, 아이콘, 아이콘 클래스, 항목 목록
export interface EmotionGroup {
  title: string;
  icon: string;          // 그룹별 아이콘 경로
  iconClass: string;     // 그룹별 CSS 클래스
  items: readonly RawEmotionItem[];
}

// 3) 실제 감정 그룹 데이터: 'icon' 필드 추가
export const EMOTION_GROUPS: EmotionGroup[] = [
  {
    title: '긍정',
    icon: '/chatBot/chat-bot-input.png',
    iconClass: 'heart',
    items: [
      { label: '신나는',     color: '#FFE055' },
      { label: '즐거운',     color: '#FFA94C' },
      { label: '사랑하는',   color: '#FFBEAA' },
      { label: '만족스러운', color: '#AAF9FF' },
      { label: '설레는',     color: '#A6FF6C' },
    ],
  },
  {
    title: '중립',
    icon: '/chatBot/chat-bot-input2.png',
    iconClass: 'fire',
    items: [
      { label: '무기력한',   color: '#005292' },
      { label: '심심한',     color: '#21677B' },
      { label: '그저그런',   color: '#5BA0A8' },
      { label: '궁금한',     color: '#9C5440' },
      { label: '혼란스러운', color: '#D74F3D' },
    ],
  },
  {
    title: '부정',
    icon: '/chatBot/chat-bot-input3.png',
    iconClass: 'green',
    items: [
      { label: '실망한',     color: '#045BDE' },
      { label: '피곤한',     color: '#042D4D' },
      { label: '지친',       color: '#2657A9' },
      { label: '짜증나는',   color: '#B14052' },
      { label: '억울한',     color: '#6C2C4D' },
    ],
  },
];

// 4) 타입 추출
export type EmotionItem  = RawEmotionItem;
export type Emotion      = EmotionItem['label'];
export type EmotionGroupType = typeof EMOTION_GROUPS[number];
