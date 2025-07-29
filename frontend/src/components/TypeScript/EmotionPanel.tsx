// src/components/TypeScript/EmotionPanel.tsx

import React from 'react';
import './EmotionPanel.css';
import { EMOTION_GROUPS, EmotionGroup, Emotion } from './emotions';
import { FiChevronLeft, FiX } from 'react-icons/fi';

interface EmotionPanelProps {
  groups?: readonly EmotionGroup[];
  /** 아이콘 표시용 감정 (외부 currentEmotion) */
  initialEmotion: Emotion | null;
  /** 버튼 하이라이트용 감정 (패널 내에서만 유지) */
  selectedEmotion: Emotion | null;
  /** 버튼 클릭 시 호출 */
  onChange: (emo: Emotion) => void;
  /** 선택 완료 시 호출 */
  onSelect: () => void;
  /** 닫기/취소 시 호출 */
  onClose: () => void;
}

const EmotionPanel: React.FC<EmotionPanelProps> = ({
  groups = EMOTION_GROUPS,
  initialEmotion,
  selectedEmotion,
  onChange,
  onSelect,
  onClose,
}) => {
  // 아이콘에 사용할 그룹은 initialEmotion 기준
  const previewEmotion = selectedEmotion ?? initialEmotion;
  const iconGroup: EmotionGroup = previewEmotion
    ? groups.find(g => g.items.some(i => i.label === previewEmotion))!
    : groups[0];

  return (
    <div className="emotion-panel">
      {/* 아이콘 영역 */}
      <div className="icon-Box">
        <div className={`emotion-input-icon ${iconGroup.iconClass}`}>
          <img src={iconGroup.icon} alt={`${iconGroup.title} icon`} />
        </div>
      </div>

      {/* 헤더 */}
      <div className="emotion-header">
        <button onClick={onClose} aria-label="뒤로가기"><FiChevronLeft size={24} /></button>
        <button onClick={onClose} aria-label="닫기"><FiX size={24} /></button>
      </div>

      {/* 타이틀 */}
      <div className="emotion-TitleBox">
        <p className="title">지금 느끼는 감정을 알려주세요</p>
      </div>

      {/* 감정 버튼들 */}
      <div className="mainBox">
        <div className="emotion-GroupBox">
          {groups.map(group => (
            <div key={group.title} className={`emotion-group ${group.iconClass}`}>
              <h4 className="emotion-group-title">{group.title}</h4>
              <div className="emotion-btnBox">
                {group.items.map(item => (
                  <button
                    key={item.label}
                    className={`emotion-btn${selectedEmotion === item.label ? ' selected' : ''}`}
                    onClick={() => onChange(item.label)}
                  >
                    <span className="emotion-dot" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 확인 버튼 */}
        <div className="emotion-footer">
          <button className="confirm-btn" onClick={onSelect} disabled={!selectedEmotion}>
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionPanel;
