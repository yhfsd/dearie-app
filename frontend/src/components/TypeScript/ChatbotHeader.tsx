import React from 'react';
import './ChatbotHeader.css';
import { FiChevronLeft } from 'react-icons/fi';
import rightBoxIcon from '../../../public/chatBot/Header-right.png';




interface ChatbotHeaderProps {
  remainingChats: number;
  chatStarted?: boolean;
  onBack: () => void;
  themeClass: 'heart' | 'fire' | 'green';
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  remainingChats,
  chatStarted = false,
  onBack,
  themeClass,
}) => {
  const headerClass = chatStarted
    ? 'chatbot-header started'
    : 'chatbot-header';

  // 테마별 봇 이름 매핑
  const nameMap: Record<'heart' | 'fire' | 'green', string> = {
    heart: '디어리',
    fire: '비티',
    green: '루아',
  };
  const botName = nameMap[themeClass] || '디어리';

  return (
    <header className={headerClass}>
      <div className="leftBoX">
        <button
          type="button"
          className="chatbot-header__back"
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <FiChevronLeft style={{ width: 25, height: 25 }} />
        </button>
      </div>

      <div className="midBox">
        <div className="glass-card">
          <h1 className="chatbot-header__title">
            {botName}와 대화중 ···
          </h1>
        </div>
      </div>

      <div className="rightBox">
        <div className="glass-card rightBox">
          <div className="chatbot-header__count">
            {remainingChats}
            <div className="imgBox">
              <img
                src={rightBoxIcon}
                alt="채팅 아이콘"
                className="chatbot-header__icon"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatbotHeader;
