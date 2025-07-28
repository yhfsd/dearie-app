import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message } from '../../pages/ChatbotPage';
import CustomAudioPlayer from './CustomAudioPlayer';
import './ChatbotWindow.css';
import { IoAddOutline } from 'react-icons/io5';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { FaAngleRight } from 'react-icons/fa6';
import EmotionPanel from './EmotionPanel';
import { EMOTION_GROUPS, Emotion } from './emotions';
import SongSelector from './SongSelector';
import { SONGS_BY_EMOTION } from './emusics';
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
}

export default function ChatWindow({
  messages,
  onSendMessage,
  panelOpen,
  setPanelOpen,
  chatStarted,
  onUserMessageClick,
  onSelectSong,
  isDisabled = false,
  onDismissOption,
}: ChatWindowProps) {
  const [input, setInput] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showSongSelector, setShowSongSelector] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(null);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number | null>(null);
  const [playerSong, setPlayerSong] = useState<Song | null>(null);

  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatStarted && !showDate) setShowDate(true);
  }, [chatStarted, showDate]);

  const scrollToBottom = () => {
    const el = messagesRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages, isDisabled]);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => setTimeout(scrollToBottom, 50);
    vv.addEventListener('resize', handler);
    return () => vv.removeEventListener('resize', handler);
  }, [messages, isDisabled]);

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

  const mappedSongs = currentEmotion ? (SONGS_BY_EMOTION[currentEmotion] || []) : [];

  const todayString = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  });

  // 메시지 배열에 limit 메시지 추가
    // 메시지 배열에 limit 메시지 추가 (이미지 포함)
  const displayMessages: Message[] = isDisabled
    ? [...messages,
       {
         from: 'bot',
         text: '앗, 오늘은 대화가 모두 끝났어요!\n내일 또 놀러 와 주세요😉',
         imageUrl: `${import.meta.env.BASE_URL}chatBot/dearie.png`
       }
      ]
    : messages;

  return (
    <div className="chat-window">
      {showSongSelector && currentEmotion !== null && (
        <SongSelector
          emotion={currentEmotion}
          songs={mappedSongs}
          onClose={() => setShowSongSelector(false)}
          onSelect={song => {
            if (currentOptionIndex !== null) {
              onDismissOption?.(currentOptionIndex);
              setCurrentOptionIndex(null);
            }
            onSelectSong(song);
            setShowSongSelector(false);
          }}
        />
      )}

      <div className="messages" ref={messagesRef}>
        {showDate && (
          <div className="chat-date">
            <p className="text">{todayString}</p>
          </div>
        )}
        {displayMessages.map((m, i) => {
          // 봇 옵션 메시지
          if (m.from === 'bot' && m.showOptions) {
            return (
              <div key={i} className="chatbot-textBox">
                <div className="chatbot-textBox-inner">
                  <div className="titleBox">
                    <div className="imgBox">
                      <img
                        src={`${import.meta.env.BASE_URL}chatBot/music-commend.png`}
                        alt="설명 이미지"
                        className="text-box-image"
                      />
                    </div>
                    <p className="text">{m.text ?? ''}</p>
                  </div>
                  <div className="bottom-btn">
                    <button className="fine" onClick={() => onDismissOption?.(i)}>
                      괜찮아요
                    </button>
                    <button
                      className="like"
                      onClick={() => {
                        setCurrentOptionIndex(i);
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
          // 내가 고른 음악 버튼 메시지
          if (m.from === 'bot' && m.type === 'music' && m.song) {
            return (
              <div key={i} className="message bot">
                <button className="music-btn" onClick={() => setPlayerSong(m.song!)}>
                  내가 고른 음악 <FaAngleRight style={{ marginLeft: '10px' }} />
                </button>
              </div>
            );
          }
          // 사용자 감정 버튼
          if (m.from === 'user' && m.text && colorMap[m.text] && onUserMessageClick) {
            return (
              <button key={i} className="message user" onClick={() => handleEmotionClick(m.text as Emotion)}>
                <span className="message-dot" style={{ backgroundColor: colorMap[m.text] }} />
                <span className="message-text">{m.text}</span>
                <FaAngleRight className="message-arrow" style={{ fontSize: 15 }} />
              </button>
            );
          }
          // 일반 봇 텍스트 메시지
          if (m.from === 'bot' && m.text) {
            return (
              <div key={i} className="message bot">
                <div className="bot-content">
                  <div className="bot-avatar-wrapper" style={{ opacity: m.imageUrl ? 1 : 0 }}>
                    {m.imageUrl && <img className="bot-avatar" src={m.imageUrl} alt="bot avatar" />}
                  </div>
                  <div className="bot-bubble">
                    <div className="bot-text" style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                  </div>
                </div>
              </div>
            );
          }
          // 기타 텍스트 메시지
          if (m.text) {
            return (
              <div key={i} className={`message ${m.from}`}>
                <span className="message-text">{m.text}</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      {playerSong && <SongPlayerPanel song={playerSong} onClose={() => setPlayerSong(null)} />}

      {panelOpen && (
        <>
          <div className="emotion-backdrop" onClick={() => setPanelOpen(false)} />
          <EmotionPanel
            groups={EMOTION_GROUPS}
            onSelect={emo => {
              setCurrentEmotion(emo);
              onUserMessageClick?.(emo);
              setPanelOpen(false);
            }}
            onClose={() => setPanelOpen(false)}
          />
        </>
      )}

      <div className="input-area">
        <button className="btn add-btn" onClick={() => !isDisabled && setPanelOpen(true)} disabled={isDisabled}>
          <IoAddOutline size={24} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder={isDisabled ? '채팅 횟수를 모두 사용하셨어요' : '답장하기'}
          onFocus={scrollToBottom}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submitText(input);
            }
          }}
          disabled={isDisabled}
        />
        <button className="btn send-btn" onClick={() => submitText(input)} disabled={isDisabled}>
          <PiPaperPlaneTilt size={24} style={{ marginRight: '15px', marginTop: '0px', marginLeft:'8px',display:'block' }} />
        </button>
      </div>
    </div>
  );
}
