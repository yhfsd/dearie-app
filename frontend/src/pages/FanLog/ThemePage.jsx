// src/pages/FanLog/ThemePage.jsx
// @ts-nocheck

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import './ThemePage.css';

// 아이콘
import letterGlass from '../../assets/more/fanLogPage_and_themePage/letterGlass.png'

// 이미지
import aespa01under from '../../assets/more/fanLogPage_and_themePage/aespa01under.png'
import aespa02under from '../../assets/more/fanLogPage_and_themePage/aespa02under.png'
import aespa03under from '../../assets/more/fanLogPage_and_themePage/aespa03under.png'
import aespa04under from '../../assets/more/fanLogPage_and_themePage/aespa04under.png'

import txt01under   from '../../assets/more/fanLogPage_and_themePage/txt01under.png'
import txt02under   from '../../assets/more/fanLogPage_and_themePage/txt02under.png'
import txt03under   from '../../assets/more/fanLogPage_and_themePage/txt03under.png'
import txt04under   from '../../assets/more/fanLogPage_and_themePage/txt04under.png'
import txt05under   from '../../assets/more/fanLogPage_and_themePage/txt05under.png'
import txt06under   from '../../assets/more/fanLogPage_and_themePage/txt06under.png'
import txt07under   from '../../assets/more/fanLogPage_and_themePage/txt07under.png'

import aespa01      from '../../assets/more/fanLogPage_and_themePage/aespa01.png'
import aespa02      from '../../assets/more/fanLogPage_and_themePage/aespa02.png'
import aespa03      from '../../assets/more/fanLogPage_and_themePage/aespa03.png'
import aespa04      from '../../assets/more/fanLogPage_and_themePage/aespa04.png'

import txt01      from '../../assets/more/fanLogPage_and_themePage/txt01.png'
import txt02      from '../../assets/more/fanLogPage_and_themePage/txt02.png'
import txt03      from '../../assets/more/fanLogPage_and_themePage/txt03.png'
import txt04      from '../../assets/more/fanLogPage_and_themePage/txt04.png'
import txt05      from '../../assets/more/fanLogPage_and_themePage/txt05.png'
import txt06      from '../../assets/more/fanLogPage_and_themePage/txt06.png'
import txt07      from '../../assets/more/fanLogPage_and_themePage/txt07.png'

const THEMES = {
  Aespa: [
    { id: 1, thumbnail: aespa01under, preview: aespa01, name: 'aespa01' },
    { id: 2, thumbnail: aespa02under, preview: aespa02, name: 'aespa02' },
    { id: 3, thumbnail: aespa03under, preview: aespa03, name: 'aespa03' },
    { id: 4, thumbnail: aespa04under, preview: aespa04, name: 'aespa04' },
  ],
  TXT: [
    { id: 1, thumbnail: txt01under, preview: txt01, name: 'Tomorrow X Together 1' },
    { id: 2, thumbnail: txt02under, preview: txt02, name: 'Tomorrow X Together 2' },
    { id: 3, thumbnail: txt03under, preview: txt03, name: 'Tomorrow X Together 3' },
    { id: 4, thumbnail: txt04under, preview: txt04, name: 'Tomorrow X Together 4' },
    { id: 5, thumbnail: txt05under, preview: txt05, name: 'Tomorrow X Together 5' },
    { id: 6, thumbnail: txt06under, preview: txt06, name: 'Tomorrow X Together 6' },
    { id: 7, thumbnail: txt07under, preview: txt07, name: 'Tomorrow X Together 6' },
  ],
};

export default function ThemePage() {
  const navigate = useNavigate();

useEffect(() => {
  const images = import.meta.glob('../../assets/**/*.png', { eager: true });

  Object.values(images).forEach((module) => {
    const img = new Image();
    img.src = module.default;
  });
}, []);



  // 1) 로컬스토리지에서 fanLogBg(thumbnail) 꺼내기
  const stored = localStorage.getItem('fanLogBg');

  // 2) 저장된 thumbnail 과 매칭되는 {group,id} 찾기
  const findStored = () => {
    if (!stored) return null;
    for (const [group, items] of Object.entries(THEMES)) {
      const match = items.find(item => item.thumbnail === stored);
      if (match) return { group, id: match.id };
    }
    return null;
  };

  // 3) 초기 selected: 저장된 게 있으면 그것, 없으면 기본값
  const [selected, setSelected] = useState(() => findStored() || { group: 'Aespa', id: 1 });

  const handleSelect = (group, id) => {
    setSelected({ group, id });
  };

  const handleComplete = () => {
    const theme = THEMES[selected.group].find(t => t.id === selected.id);
    if (theme) {
      localStorage.setItem('fanLogBg', theme.thumbnail);
    }
    navigate('/fan-log');
  };

  const preview = THEMES[selected.group].find(t => t.id === selected.id)?.preview;

  return (
    <div className="theme-page">
      <div className="theme-page-inner">
              <div className="phone-mockup">
        <img src={preview} alt="테마 미리보기" />
      </div>
      </div>

      <div className="theme-list">
        <div className="list-title">
          <h3 className="title">이달의 테마</h3>
        </div>
        {Object.entries(THEMES).map(([group, items]) => (
          <section key={group}>
            <h3><img src={letterGlass} alt='편지 아이콘' className='letterGlassIcon' />&nbsp;{group}</h3>
            <div className="theme-grid">
              {items.map(item => (
                <div
                  key={item.id}
                  className={`theme-item ${
                    selected.group === group && selected.id === item.id ? 'selected' : ''
                  }`}
                  onClick={() => handleSelect(group, item.id)}
                >
                  <img src={item.thumbnail} alt={item.name} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

        <div className="btn-inner">
                <button className="btn complete-btn" onClick={handleComplete}>
        선택 완료
      </button>
        </div>
    </div>
  );
}
