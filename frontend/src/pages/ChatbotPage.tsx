// src/pages/ChatbotPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatbotPage.css';
import ChatbotHeader from '../components/TypeScript/ChatbotHeader';
import ChatWindow from '../components/TypeScript/ChatbotWindow';
import { createBotMessages } from '../utils/chatbotResponses';
import type { Emotion } from '../components/TypeScript/emotions';
import { EMOTION_GROUPS } from '../components/TypeScript/emotions';
import type { Song } from '../components/TypeScript/emusics';
import { responses } from '../components/TypeScript/responses';

export interface Message {
  from: 'user' | 'bot';
  text?: string;
  imageUrl?: string;
  showOptions?: boolean;
  type?: 'music';
  song?: Song;
  songs?: Song[];
  emotion?: Emotion;
  hideAvatar?: boolean;
}

const getAvatarUrl = (emotion: Emotion | null) => {
  const base = import.meta.env.BASE_URL + 'chatBot/';
  if (!emotion) return `${base}dearie.png`;
  const group = EMOTION_GROUPS.find(g =>
    g.items.some(i => i.label === emotion)
  )!;
  if (group.title === '긍정') return `${base}dearie.png`;
  if (group.title === '중립') return `${base}biti.png`;
  return `${base}ruoa.png`;
};

const ChatbotPage: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const storageKey = "chatData";

  const [remainingChats, setRemainingChats] = useState<number>(10);
  const [messages, setMessages] = useState<Message[]>([]);
  const [themeClass, setThemeClass] = useState<string>('');
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // showChat: false = 첫 화면, true = 대화 화면
  const [showChat, setShowChat] = useState(false);

  // 이전 상태 복원
  useEffect(() => {
    if (!isLoggedIn) {
      setMessages([]);
      setRemainingChats(10);
      return;
    }
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const { msgs, rem, emotion, theme } = JSON.parse(raw);
        setMessages(msgs);
        setRemainingChats(rem);
        if (emotion) setCurrentEmotion(emotion);
        if (theme) setThemeClass(theme);
      } catch {}
    }
  }, [isLoggedIn]);

  // 상태 저장
  useEffect(() => {
    if (!isLoggedIn) return;
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        msgs: messages,
        rem: remainingChats,
        emotion: currentEmotion,
        theme: themeClass,
      })
    );
  }, [isLoggedIn, messages, remainingChats, currentEmotion, themeClass]);

  // 뒤로가기 버튼 동작
  const handleBack = () => {
    if (showChat) {
      // 대화 중이면 UI만 “첫 화면”으로
      setShowChat(false);
    } else {
      // 첫 화면이면 실제 뒤로가기
      navigate(-1);
    }
  };

  // 대화 옵션 닫기
  const handleDismissOption = (index: number) => {
    setMessages(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  // 일반 메시지 전송
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    // 화면 전환
    if (!showChat) setShowChat(true);

    if (remainingChats <= 0) {
      const avatar = getAvatarUrl(currentEmotion);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: '오늘의 대화 횟수를 모두 사용하셨어요 😭 내일 다시 찾아와 주세요!', imageUrl: avatar }
      ]);
      return;
    }

    // 1) 유저 메시지
    setMessages(prev => [...prev, { from: 'user', text }]);
    setRemainingChats(prev => Math.max(prev - 1, 0));

    // 2) 봇 응답
    const found = responses.find(item =>
      item.triggers.some(trigger =>
        text.toLowerCase().includes(trigger.toLowerCase())
      )
    );
    const reply = found?.response
      || `제가 아직 "${text}" 에 대한 내용을 생각중이에요 😥 다른 질문을 해주시면 바로 답변드릴께요`;
    const avatar = getAvatarUrl(currentEmotion);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: reply, imageUrl: avatar, hideAvatar: false }
      ]);
    }, 800);
  };

  // 감정 선택 처리
  const handleEmotionSelect = (emo: string) => {
    // 화면 전환
    if (!showChat) setShowChat(true);

    // 1) 유저 메시지
    setMessages(prev => [...prev, { from: 'user', text: emo }]);
    setRemainingChats(prev => Math.max(prev - 1, 0));

    // 2) 감정 & 테마 업데이트
    const emotion = emo as Emotion;
    setCurrentEmotion(emotion);
    const group = EMOTION_GROUPS.find(g =>
      g.items.some(i => i.label === emo)
    );
    if (group) setThemeClass(group.iconClass);

    const avatar = getAvatarUrl(emotion);
    // 3) 감정별 봇 메시지
    setTimeout(() => {
      const botMsgs = createBotMessages(emotion).map(m => ({
        ...m,
        imageUrl: m.imageUrl ?? avatar
      }));
      setMessages(prev => [...prev, ...botMsgs]);
    }, 1000);
  };

  // 노래 선택
  const handleSelectSong = (song: Song) => {
    setMessages(prev => [...prev, { from: 'bot', type: 'music', song }]);
  };

  return (
    <div className="chatbot-page">
      {(panelOpen || showChat) && (
        <div
          className='chatbot-backdrop'
          onClick={() => panelOpen && setPanelOpen(false)}
        />
      )}

      {!panelOpen && (
        <ChatbotHeader
          remainingChats={remainingChats}
          chatStarted={showChat}
          onBack={handleBack}
        />
      )}

      <div className={`chatbot-body ${themeClass}`}>
        {/* ChatWindow는 항상 렌더; chatStarted 플래그로 메시지 영역만 토글됩니다 */}
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          panelOpen={panelOpen}
          setPanelOpen={setPanelOpen}
          chatStarted={showChat}
          onUserMessageClick={handleEmotionSelect}
          onSelectSong={handleSelectSong}
          onDismissOption={handleDismissOption}
          isDisabled={remainingChats <= 0}
        />
      </div>
    </div>
  );
};

export default ChatbotPage;
