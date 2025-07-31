// src/components/TypeScript/ChatbotWindow.tsx

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message } from '../../pages/ChatbotPage';
import './ChatbotWindow.css';
import { IoAddOutline } from 'react-icons/io5';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { FaAngleRight } from 'react-icons/fa6';
import EmotionPanel from './EmotionPanel';
import { EMOTION_GROUPS, Emotion } from './emotions';
import SongSelector from './SongSelector';
import type { Song } from './emusics';
import SongPlayerPanel from './SongPlayerPanel';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  chatStarted: boolean;
  onUserMessageClick?: (text: string) => void;
  onSelectSong: (song: Song) => void;
  isDisabled?: boolean;
  onDismissOption?: (index: number) => void;
  setChatStarted: (v: boolean) => void;
}

export default function ChatWindow({
  messages,
  onSendMessage,
  panelOpen,
  setPanelOpen,
  setChatStarted,
  chatStarted,
  onUserMessageClick,
  onSelectSong,
  isDisabled = false,
  onDismissOption,
}: ChatWindowProps) {
  // state hooks
  const [input, setInput] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showSongSelector, setShowSongSelector] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
  const [panelSelectedEmotion, setPanelSelectedEmotion] = useState<Emotion | null>(null);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number | null>(null);
  const [playerSong, setPlayerSong] = useState<Song | null>(null);
  const [dismissedOptions, setDismissedOptions] = useState<number[]>([]);

  // close & select handlers
  const closeSongSelector = () => {
    setShowSongSelector(false);
    setCurrentOptionIndex(null);
  };

  const handleSongSelect = (song: Song) => {
    onSelectSong(song);
    if (currentOptionIndex !== null) {
      // 카드 숨기기
      setDismissedOptions(prev => [...prev, currentOptionIndex]);
      onDismissOption?.(currentOptionIndex);
    }
    // 모달 닫기
    closeSongSelector();
  };

  // prepare filtered message list
  const displayMessages: Message[] = isDisabled
    ? [
        ...messages,
        {
          from: 'bot',
          text: '앗, 오늘은 대화가 모두 끝났어요!\n내일 또 놀러 와 주세요😉',
          hideAvatar: false,
        },
      ]
    : messages;

  const visibleEntries = displayMessages
    .map((msg, idx) => ({ msg, idx }))
    .filter(({ msg, idx }) => {
      // remove dismissed option cards
      return !(msg.from === 'bot' && msg.showOptions && dismissedOptions.includes(idx));
    });

  // utility & effects
  const getAvatarUrl = () => {
    const base = import.meta.env.BASE_URL + 'chatBot/';
    if (!currentEmotion) return `${base}dearie.png`;
    const group = EMOTION_GROUPS.find(g =>
      g.items.some(i => i.label === currentEmotion)
    )!;
    if (group.title === '긍정') return `${base}dearie.png`;
    if (group.title === '중립') return `${base}biti.png`;
    return `${base}ruoa.png`;
  };

  const recommendedSongs =
    currentOptionIndex !== null
      ? messages[currentOptionIndex].songs || []
      : [];
  const recommendedEmotion =
    currentOptionIndex !== null
      ? messages[currentOptionIndex].emotion!
      : currentEmotion!;

  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatStarted && !showDate) setShowDate(true);
  }, [chatStarted, showDate]);

  const scrollToBottom = () => {
    const el = messagesRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [visibleEntries, isDisabled]);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => setTimeout(scrollToBottom, 50);
    vv.addEventListener('resize', handler);
    return () => vv.removeEventListener('resize', handler);
  }, [visibleEntries, isDisabled]);

  const handleEmotionClick = (emo: Emotion) => {
    setCurrentEmotion(emo);
    onUserMessageClick?.(emo);
  };

  const submitText = (text: string) => {
    if (isDisabled) return;
    if (!text.trim()) return;
    onSendMessage(text);
    setInput('');
    inputRef.current?.blur();
    setPanelOpen(false);
  };

  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    EMOTION_GROUPS.forEach(g =>
      g.items.forEach(i => (map[i.label] = i.color))
    );
    return map;
  }, []);

  const todayString = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <div className="chat-window">
      {/* 추천음악 모달 */}
      {showSongSelector && currentOptionIndex !== null && (
        <SongSelector
          emotion={recommendedEmotion}
          songs={recommendedSongs}
          onClose={closeSongSelector}
          onSelect={handleSongSelect}
        />
      )}

      {/* 메시지 영역 */}
      {chatStarted ? (
        <div className="messages" ref={messagesRef}>
          {showDate && (
            <div className="chat-date">
              <p className="text">{todayString}</p>
            </div>
          )}

          {visibleEntries.map(({ msg: m, idx }) => {
            // 1) 유저 메시지
            if (m.from === 'user' && m.text) {
              const isEmotion = !!colorMap[m.text] && !!onUserMessageClick;
              return isEmotion ? (
                <button
                  key={idx}
                  className="message user"
                  onClick={() => handleEmotionClick(m.text as Emotion)}
                >
                  <span
                    className="message-dot"
                    style={{ backgroundColor: colorMap[m.text] }}
                  />
                  <span className="message-text">{m.text}</span>
                  <FaAngleRight className="message-arrow" />
                </button>
              ) : (
                <div key={idx} className="message user">
                  <span className="message-text">{m.text}</span>
                </div>
              );
            }

            // 2) 봇 추천 음악 옵션 카드
            if (m.from === 'bot' && m.showOptions) {
              return (
                <div key={idx} className="chatbot-textBox">
                  <div className="chatbot-textBox-inner">
                    <div className="titleBox">
                      <div className="imgBox">
                        <img
                          src={`${import.meta.env.BASE_URL}chatBot/music-commend.png`}
                          alt="설명 이미지"
                          className="text-box-image"
                        />
                      </div>
                      <p className="text">추천 음악을 받아보시겠어요?</p>
                    </div>
                    <div className="bottom-btn">
                      <button
                        className="fine"
                        onClick={() => setDismissedOptions(prev => [...prev, idx])}
                      >
                        괜찮아요
                      </button>
                      <button
                        className="like"
                        onClick={() => {
                          setCurrentOptionIndex(idx);
                          setShowSongSelector(true);
                        }}
                      >
                        좋아요
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // 3) 음악 재생 버튼
            if (m.from === 'bot' && m.type === 'music' && m.song) {
              return (
                <div key={idx} className="message bot">
                  <button className="music-btn" onClick={() => setPlayerSong(m.song!)}>
                    내가 고른 음악
                    <FaAngleRight style={{ marginLeft: '10px' }} />
                  </button>
                </div>
              );
            }

            // 4) 일반 봇 텍스트
            return (
              <div key={idx} className="message bot">
                <div className="bot-content">
                  <div
                    className="bot-avatar-wrapper"
                    style={{ opacity: m.hideAvatar ? 0 : 1 }}
                  >
                    <img
                      className="bot-avatar"
                      src={m.imageUrl ?? getAvatarUrl()}
                      alt="bot avatar"
                    />
                  </div>
                  <div className="bot-bubble">
                    <div className="bot-text" style={{ whiteSpace: 'pre-wrap' }}>
                      {m.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="messages--empty" ref={messagesRef} />
      )}

      {/* 음악 플레이어 */}
      {playerSong && <SongPlayerPanel song={playerSong} onClose={() => setPlayerSong(null)} />}

      {/* 감정 선택 패널 */}
      {panelOpen && (
        <>
          <div
            className="emotion-backdrop"
            onClick={() => {
              setPanelSelectedEmotion(currentEmotion);
              setPanelOpen(false);
            }}
          />
          <EmotionPanel
            groups={EMOTION_GROUPS}
            initialEmotion={currentEmotion}
            selectedEmotion={panelSelectedEmotion}
            onChange={emo => setPanelSelectedEmotion(emo)}
            onSelect={() => {
              if (panelSelectedEmotion) {
                setCurrentEmotion(panelSelectedEmotion);
                onUserMessageClick?.(panelSelectedEmotion);
              }
              setPanelOpen(false);
            }}
            onClose={() => {
              setPanelSelectedEmotion(currentEmotion);
              setPanelOpen(false);
            }}
          />
        </>
      )}

      {/* 입력창 */}
      <div className="input-area">
        <button
          className="btn add-btn"
          onClick={() => {
            if (isDisabled) return;
            setPanelSelectedEmotion(null);
            setPanelOpen(true);
          }}
          disabled={isDisabled}
        >
          <IoAddOutline size={24} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder={isDisabled ? '채팅 횟수를 모두 사용하셨어요' : '답장하기'}
          onFocus={() => {
            scrollToBottom();
            if (!chatStarted) setChatStarted(true);
          }}
          onChange={e => {
            if (!isDisabled) setInput(e.target.value);
          }}
          onKeyDown={e => {
            if (!isDisabled && e.key === 'Enter') {
              e.preventDefault();
              submitText(input);
            }
          }}
          readOnly={isDisabled}
        />
        <button className="btn send-btn" onClick={() => submitText(input)} disabled={isDisabled}>
          <PiPaperPlaneTilt size={24} style={{ marginRight: '15px', display: 'block' }} />
        </button>
      </div>
    </div>
  );
}
