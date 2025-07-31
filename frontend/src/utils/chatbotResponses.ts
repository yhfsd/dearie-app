// src/utils/chatbotResponses.ts
import { Emotion } from '../components/TypeScript/emotions';
import type { Message } from '../pages/ChatbotPage';
import { SONGS_BY_EMOTION } from '../components/TypeScript/emusics';

interface EmotionResponse {
  text: string | string[];
  imageUrl?: string;
}

// 감정별 텍스트+이미지 매핑 (모든 label 포함)
export const EMOTION_RESPONSES: Record<Emotion, EmotionResponse> = {
  // 긍정
  '신나는': {
    text: [
      '오늘 진짜 텐션 최고인 하루였구나!',
      '이런 날은 너의 기분만큼 밝은 음악이\n더 빛날 거야 \n✨이 기분, 오래오래 간직하자!',
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`,
  },
  '즐거운': {
    text: [
        '즐거움이 가득하네! 😊',
        '오늘 하루도 분명 즐거울 거예요!',
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`,
  },
  '사랑하는': {
    text: [
        '마음이 따뜻해지는 하루야, 정말 소중해! 💖',
        '오늘의 행복이 내일의 희망으로 이어지길 바라요!',
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`,
  },
  '만족스러운': {
    text: [
        '만족스러운 기분, 정말 좋지 않니? 👍',
        '이 소중한 순간들이 쌓여 더욱 아름다운 추억으로 남을 거예요',
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`,
  },
  '설레는': {
    text: [
        '설렘으로 가득찬 하루라니, 너무 멋진걸! 🌸',
        '이 설렘 가득한 기운이 더 큰 기쁨을 안겨주었으면 좋겠어! 😀'
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`,
  },

  // 중립
  '무기력한': {
    text: [
        '오늘은 조금 쉬어가는 날도 괜찮아',
        '이 여유로운 시간이 온전히 재충전의 기회가 되기를 바래 🌊'
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/biti.png`,
  },
  '심심한': {
    text: [
        '새로운 것을 찾아보는 건 어때? 🎨',
        '새로운 영감과 즐거움을 발견할꺼야!',
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/biti.png`,
  },
  '그저그런': {
    text: '특별한 날은 아니지만, 평범한 날도 소중해! 🌼',
    imageUrl: `${import.meta.env.BASE_URL}chatBot/biti.png`,
  },
  '궁금한': {
    text: [
        '무엇이든 궁금한 건 나한테 물어봐! 🔍',
        '궁금증을 함께 풀어갈 준비가 되어있어~'
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/biti.png`,
  },
  '혼란스러운': {
    text: '가끔은 혼란스러워도 괜찮아, 잠시 쉬어가자. 🌿',
    imageUrl: `${import.meta.env.BASE_URL}chatBot/biti.png`,
  },

  // 부정
  '실망한': {
    text: [
        '실망스러운 날도 있어, 잘 견뎌줘서 고마워! 🌧️',
        '힘든 시간들을 묵묵히 이겨내신 너는 정말 대단해'
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/ruoa.png`,
  },
  '피곤한': {
    text: '오늘 하루 정말 수고 많았어, 푹 쉬어. 🌙',
    imageUrl: `${import.meta.env.BASE_URL}chatBot/ruoa.png`,
  },
  '지친': {
    text: [
        '지칠 땐 잠깐 쉬는 것도 용기야! ☁️',
        '소중한 과정과 노력들이 더 큰 결실로 이어지기를 응원할께',
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/ruoa.png`,
  },
  '짜증나는': {
    text: '짜증나는 일이 있어도, 내가 곁에 있을게! 🍃',
    imageUrl: `${import.meta.env.BASE_URL}chatBot/ruoa.png`,
  },
  '억울한': {
    text: [
        '억울한 일도 잘 이겨내는 너는 정말 멋져! 💧',
        '너는 많은 친구들에게 큰 힘이 되고 있습니다. ✨'
    ],
    imageUrl: `${import.meta.env.BASE_URL}chatBot/ruoa.png`,
  },
};
export function createBotMessages(userText: Emotion): Message[] {
  // 1) 감정에 따른 기본 응답 가져오기
  const resp = EMOTION_RESPONSES[userText];
  const texts = Array.isArray(resp.text) ? resp.text : [resp.text];

  // 2) 기본 응답 메시지들 생성
  const msgs: Message[] = texts.map((text, idx) => ({
    from: 'bot',
    text,
    imageUrl: idx === 0 ? resp.imageUrl : undefined,
    hideAvatar: idx === 1,
  }));

  // 3) 마지막에 '추천 음악' 옵션 메시지 추가
  msgs.push({
    from: 'bot',
    showOptions: true,  // ChatWindow 에서 버튼으로 렌더링하는 플래그
    songs: SONGS_BY_EMOTION[userText],
    emotion: userText,
    hideAvatar: true,
  });

  return msgs;
}