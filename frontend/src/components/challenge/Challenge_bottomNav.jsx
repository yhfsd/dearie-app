// src/components/challenge/Challenge_bottomNav.jsx
import React, { useState } from 'react';
import './Challenge_bottomNav.css';
import { GoChevronDown } from 'react-icons/go';

/**
 * @param {{ key: string, label: string, imgSrc: string, subText?: string }[]} categories
 * @param {string} selectedCategory
 * @param {(key: string|null) => void} onCategorySelect
 * @param {{ rank?: number|string, imgSrc?: string, percent?: number, value?: string }} summary
 */
export default function Challenge_bottomNav({
  categories = [],
  selectedCategory,
  onCategorySelect = () => {},
  summary = {}
}) {
  const [open, setOpen] = useState(false);
  const currentCat = categories.find(c => c.key === selectedCategory) || {};
  const { label } = currentCat;
  const { imgSrc: handleImg, rank, percent, value } = summary;

  const toggleNav = () => {
    console.log('toggleNav 호출! 이전:', open);
    setOpen(prev => {
      console.log('toggleNav 호출! 이후:', !prev);
      return !prev;
    });
  };

  const handleSelect = key => {
    onCategorySelect(key);
    setOpen(false);
  };

  return (
    <>
      <div
        className={`cbn-overlay ${open ? 'visible' : ''}`}
        onClick={() => setOpen(false)}
      />

      <div className={`cbn-container${open ? ' open' : ''}`}>
        {/* 1) 메뉴 (먼저 렌더링) */}
        <div className="cbn-menu">
          {categories.map(c => (
            <button
              key={c.key}
              className={`cbn-category-btn ${c.key === selectedCategory ? 'active' : ''}`}
              onClick={() => handleSelect(c.key)}
            >
              <div className="imgBox">
                <img src={c.imgSrc} alt={c.label} />
              </div>
              <div className="txtBox">
                {c.label}
                <div className="cbn-category-subtext">{c.subText}</div>
              </div>
              <div className="choose">선택</div>
            </button>
          ))}
        </div>

        {/* 2) 핸들: 선택된 그룹 요약 */}
        <div className="cbn-content" onClick={toggleNav}>
          <div className="cbn-rank">{rank ?? '-'}</div>
          <div className="cbn-imgBox">
            {handleImg && <img src={handleImg} alt={label} />}
          </div>
          <div className="cbn-info">
            <div className="cbn-name">{label}</div>
            <div className="cbn-gauge">
              <div
                className="cbn-gauge-bar"
                style={{ width: `${percent ?? 0}%` }}
              />
            </div>
            <div className="cbn-value">{value ?? '-'}</div>
          </div>
          <button className="cbn-toggle" type="button">
            <GoChevronDown className={`cbn-arrow${open ? ' open' : ''}`} />
          </button>
        </div>
      </div>
    </>
  );
}
