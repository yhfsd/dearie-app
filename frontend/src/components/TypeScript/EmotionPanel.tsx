// src/components/TypeScript/EmotionPanel.tsx

import React, { useState } from 'react';
import './EmotionPanel.css';
import { EMOTION_GROUPS, EmotionGroup, Emotion } from './emotions';
import { FiChevronLeft, FiX } from 'react-icons/fi';

interface EmotionPanelProps {
  groups?: readonly EmotionGroup[];           // 기본 EMOTION_GROUPS 사용
  onSelect: (emo: Emotion) => void;           // 감정 선택 완료 시 호출
  onClose: () => void;                        // 패널 닫기 호출
  initialEmotion?: Emotion | null;            // 패널 열 때 보여줄 아이콘 기반 감정
}

const EmotionPanel: React.FC<EmotionPanelProps> = ({
  groups = EMOTION_GROUPS,
  onSelect,
  onClose,
  initialEmotion = null,
}) => {
  // 버튼 선택 상태는 항상 null로 시작, 닫으면 초기화됨
  const [selected, setSelected] = useState<Emotion | null>(null);

  // 이미지 표시용 그룹은 'selected' 우선, 없으면 'initialEmotion', 없으면 첫 그룹
  const iconGroup: EmotionGroup =
    selected
      ? groups.find(g => g.items.some(i => i.label === selected))!
      : initialEmotion
        ? groups.find(g => g.items.some(i => i.label === initialEmotion))!
        : groups[0];

  // 표시할 아이콘
  const iconSrc = iconGroup.icon;

  // 확인 핸들러
  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <div className="emotion-panel">
      {/* 동적 아이콘 영역 */}
      <div className="icon-Box">
        <div className={`emotion-input-icon ${iconGroup.iconClass}`}>
          <img src={iconSrc} alt={`${iconGroup.title} icon`} />
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
                    <div
          key={group.title}
          className={`emotion-group ${group.iconClass}`}>
              <h4 className="emotion-group-title">{group.title}</h4>
              <div className="emotion-btnBox">
                {group.items.map(item => (
                  <button
                    key={item.label}
                    className={`emotion-btn${selected === item.label ? ' selected' : ''}`}
                    onClick={() => setSelected(item.label)}
                    title={item.label}
                  >
                    <span
                      className='emotion-dot'
                      style={{ backgroundColor: item.color }}
                    />
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
