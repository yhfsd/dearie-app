// src/components/ChatbotHeader.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatbotHeader.css';
import { FiChevronLeft} from 'react-icons/fi';



import rightBoxIcon from '../../../public/chatBot/Header-right.png';






interface ChatbotHeaderProps {
  remainingChats: number;      // 남은 채팅 수를 Prop으로 받음
  chatStarted?: boolean;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ remainingChats, chatStarted = false }) => {
  const navigate = useNavigate();
  const headerClass = chatStarted
  ? 'chatbot-header started' : 'chatbot-header';

  return (
    <header className={headerClass}>
      <div className="leftBoX">
        <button
        type="button"
        className="chatbot-header__back"
        onClick={() => navigate(-1)}
        aria-label="뒤로가기"
      >
        <FiChevronLeft style={{ width: 25, height: 25 }} />
      </button>
      </div>
      <div className="midBox">
              <div className="glass-card">
        <h1 className="chatbot-header__title">디어리와 대화중 ···</h1>
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
