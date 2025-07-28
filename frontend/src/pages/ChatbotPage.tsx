// src/pages/ChatbotPage.tsx
import React, { useState, useEffect } from 'react';
import './ChatbotPage.css';
import ChatbotHeader from '../components/TypeScript/ChatbotHeader';
import ChatWindow from '../components/TypeScript/ChatbotWindow';
import { createBotMessages } from '../utils/chatbotResponses';
import type { Emotion } from '../components/TypeScript/emotions';
import type { Song } from '../components/TypeScript/emusics';
import { responses } from '../components/TypeScript/responses';

export interface Message {
  from: 'user' | 'bot';
  text?: string;
  imageUrl?: string;
  showOptions?: boolean;
  type?: 'music';
  song?: Song;
}

const ChatbotPage: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const storageKey = "chatData";
  const [remainingChats, setRemainingChats] = useState<number>(10);
  const [messages, setMessages] = useState<Message[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const chatStarted = messages.length > 0;

  const handleDismissOption = (index: number) => {
    setMessages(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };


    useEffect(() => {
    if (!isLoggedIn) {
      setMessages([]);
      setRemainingChats(10);
      return;
    }
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const { msgs, rem } = JSON.parse(raw);
        setMessages(msgs);
        setRemainingChats(rem);
      } catch {}
    }
  }, [isLoggedIn]);

  // ── 2) messages or remainingChats 변경 시 저장
  useEffect(() => {
    if (!isLoggedIn) return;
    localStorage.setItem(
      storageKey,
      JSON.stringify({ msgs: messages, rem: remainingChats })
    );
  }, [isLoggedIn, messages, remainingChats]);

  // 사용자의 일반 메시지 처리: responses 매핑 이용
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    if (remainingChats <= 0) {
      setMessages(prev => [
        ...prev,
        {
          from: 'bot',
          text: '오늘의 대화 횟수를 모두 사용하셨어요 😭 내일 다시 찾아와 주세요!',
          imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`
        }
      ]);
      return
    }
    // 1) 사용자 메시지 추가
    setMessages(prev => [...prev, { from: 'user', text }]);
    setRemainingChats(prev => Math.max(prev - 1, 0));

    // 2) 응답 매핑 검색 (대소문자 구분 없이)
    const found = responses.find(item =>
      item.triggers.some(trigger =>
        text.toLowerCase().includes(trigger.toLowerCase())
      )
    );
    const reply = found?.response
      || `제가 아직 "${text}" 에 대한 내용을 생각중이에요 😥 다른 질문을 해주시면 바로 답변드릴께요`;
 setTimeout(() => {
   setMessages(prev => [
     ...prev,
     { 
       from: 'bot',
       text: reply,
       imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`
     }
   ]);
 }, 800);};

  // 감정 선택 처리
  const handleEmotionSelect = (emo: string) => {
    setMessages(prev => [...prev, { from: 'user', text: emo }]);
    setRemainingChats(prev => Math.max(prev - 1, 0));

    setTimeout(() => {
      const botMsgs = createBotMessages(emo as Emotion);
      setMessages(prev => [...prev, ...botMsgs]);
    }, 1000);
  };

  // 노래 선택 처리
  const handleSelectSong = (song: Song) => {
    setMessages(prev => [
      ...prev,
      { from: 'bot', type: 'music', song }
    ]);
  };

  return (
    <div className="chatbot-page">
      {(panelOpen || chatStarted) && (
        <div
          className='chatbot-backdrop'
          onClick={() => {
            if (panelOpen) setPanelOpen(false);
          }}
        />
      )}

      {!panelOpen && <ChatbotHeader remainingChats={remainingChats} chatStarted={chatStarted} />}

      <div className="chatbot-body">
        <img
          src={`${import.meta.env.BASE_URL}chatBot/chatBot-bg.png`}
          alt="채팅 배경"
          className="chatbot-bg-img"
        />
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          panelOpen={panelOpen}
          setPanelOpen={setPanelOpen}
          chatStarted={chatStarted}
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
