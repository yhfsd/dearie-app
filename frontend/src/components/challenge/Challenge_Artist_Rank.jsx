// src/components/challenge/Challenge_Artist_Rank.jsx
import React, { useState, useEffect } from 'react';
import './Challenge_Artist_Rank.css';
import { GoChevronDown } from 'react-icons/go';
import goldMedal from '../../assets/Challenge/goldMedal.png'


export default function Challenge_Artist_Rank({ items = [] }) {
  const [showAll, setShowAll] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="challenge_Artist_Rank">
      <h2>아티스트 순위</h2>

      {/* 항상 모든 items 렌더링! */}
      <div className={`listWrapper ${showAll ? 'expanded' : ''}`}>
        <ul className="rankList">
          {items.map((item, idx) => (
            <li key={idx} className="rankItem">
              <div className="num">{idx + 1}</div>
              {/* 1위에만 goldMedal 아이콘 삽입 */}
              {idx === 0 && (
                <div className="goldMedal">
                  <img src={goldMedal} alt="1위 메달" />
                </div>
              )}
              <div className="imgBox">
                <img src={item.imgSrc} alt={item.name} />
              </div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="gauge">
                  <div
                    className="gauge-bar"
                    style={{ width: loaded ? `${item.percent}%` : '0%' }}
                  />
                </div>
                <div className="value">{item.value}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {items.length > 3 && (
        <button
          className="toggle-btn"
          onClick={() => setShowAll((p) => !p)}
        >
          <span className="label">{showAll ? '접기' : '더보기'}</span>
          <GoChevronDown className={`icon ${showAll ? 'open' : ''}`} />
        </button>
      )}
    </section>
  );
}
