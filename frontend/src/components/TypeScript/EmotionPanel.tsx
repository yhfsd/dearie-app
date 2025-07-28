import React, { useState } from 'react';
import './EmotionPanel.css';
import { EMOTION_GROUPS, EmotionGroup, Emotion } from './emotions';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import inputIcon from '/chatBot/chat-bot-input.png'

interface EmotionPanelProps {
  groups?: readonly EmotionGroup[];     // 기본값으로 EMOTION_GROUPS 사용
  onSelect: (emo: Emotion) => void;
  onClose: () => void;
}

const EmotionPanel: React.FC<EmotionPanelProps> = ({
  groups = EMOTION_GROUPS,              // prop 미전달 시 기본으로 전체 그룹
  onSelect,
  onClose,
}) => {
  const [selected, setSelected] = useState<Emotion | null>(null);

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <div className="emotion-panel">
        <div className="icon-Box">
                <div className="emotion-input-icon">
        <img src={inputIcon} alt="input icon"/>
      </div>
        </div>

      <div className="emotion-header">
        <button className="header-btn" onClick={onClose} aria-label="뒤로가기">
          <FiChevronLeft size={24} />
        </button>
        <button className="header-btn" onClick={onClose} aria-label="닫기">
          <FiX size={24} />
        </button>
      </div>

      <div className="emotion-TitleBox">
        <p className="title">지금 느끼는 감정을 나에게 알려줄래?</p>
      </div>

      <div className="mainBox">
        <div className="emotion-GroupBox">
          {groups.map(group => (
            <div key={group.title} className="emotion-group">
              <h4 className="emotion-group-title">{group.title}</h4>
              <div className="emotion-btnBox">
                {group.items.map(item => (
                  <button
                    key={item.label}
                    className={`emotion-btn${selected === item.label ? ' selected' : ''}`}
                    onClick={() => setSelected(item.label)}
                    title={item.label}
                  >
                    <span className='emotion-dot' style={{backgroundColor: item.color}}></span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="emotion-footer">
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={!selected}
        >
          선택 완료
        </button>
      </div>
      </div>


    </div>
  );
};

export default EmotionPanel;
