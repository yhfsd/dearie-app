import React, { useState, useEffect } from 'react';
import './Challenge_Fandom_Rank.css';
// 이미지, 아이콘
import { GoChevronDown } from 'react-icons/go';
import goldMedal from '../../assets/Challenge/goldMedal.png'
import silverMedal from '../../assets/Challenge/silverMedal.png'
import bronzeMedal from '../../assets/Challenge/bronzeMedal.png'

// 유틸: '1,000 냥' 문자열을 1000 숫자로 파싱
const parseValue = v => Number(v.replace(/,/g, '').replace(/\s*p/, ''));

export default function Challenge_Fandom_Rank({ items = [], myRank: myRankFromProps = null }) {
  const [showAll, setShowAll] = useState(false);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  // 팬덤 총합 포인트 계산
  const totalFandom = items.reduce((sum, i) => sum + parseValue(i.value), 0);

  // displayRanks 계산 (공동 순위 처리)
  const parsedValues = items.map(i => parseValue(i.value));
  const displayRanks = [];
  let prevVal = null;
  let prevRank = 0;
  parsedValues.forEach((val, idx) => {
    let rank;
    if (idx === 0 || val !== prevVal) {
      rank = idx + 1;
      prevRank = rank;
      prevVal = val;
    } else {
      rank = prevRank;
    }
    displayRanks[idx] = rank;
  });

  // 내 정보 위치
  const meIndex = items.findIndex(i => i.isMe);
  const myRank = myRankFromProps !== null
  ? myRankFromProps
  : (meIndex >= 0 ? displayRanks[meIndex] : null);

  const meItem = meIndex >= 0 ? items[meIndex] : {};
  const mePercent = totalFandom > 0 && meIndex >= 0
    ? Math.round(parseValue(meItem.value) / totalFandom * 100)
    : 0;

  return (
    <section className={`challenge_Fandom_Rank ${showAll ? 'expanded' : ''}`}>
      <h2>나는 어디쯤일까?</h2>

      <div className={`fandomListWrapper ${showAll ? 'expanded' : ''}`} style={{ '--item-count': items.length }}>
        <ul className="fandomRankList">
          {/* 요약: 내 순위만 핑크 배경 */}
          <li className="fandomRankItem myRankItem">
            <div className="num">{myRank}</div>
            <div className="imgBox"><img src={meItem.imgSrc} alt={meItem.name} /></div>
            <div className="info">
              <div className="name">{meItem.name}</div>
              <div className="gauge">
                <div
                  className="gauge-bar"
                  style={{ width: loaded ? `${mePercent}%` : '0%' }}
                />
              </div>
              <div className="value">{meItem.value}</div>
            </div>
          </li>

          {/* 전체 리스트: 공동 순위 반영, 일반 배경 */}
          {items.map((item, idx) => {
            const itemPercent = totalFandom > 0
              ? Math.round(parseValue(item.value) / totalFandom * 100)
              : 0;
            const rank = displayRanks[idx];
            // 메달 이미지
            let medalImg = null;
            if (rank === 1) medalImg = goldMedal;
            else if (rank === 2) medalImg = silverMedal;
            else if (rank === 3) medalImg = bronzeMedal; 

            return (
            <li key={idx} className="fandomRankItem">
              <div className="num">
                {medalImg && (
                  <img src={medalImg} alt={`${rank}위 메달`} className="medal-icon" />
                )}
                <span className="rank-number">{rank}</span>
              </div>
              <div className="imgBox">
                <img src={item.imgSrc} alt={item.name} />
              </div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="gauge">
                  <div
                    className="gauge-bar"
                    style={{ width: loaded ? `${itemPercent}%` : '0%' }}
                  />
                </div>
                <div className="value">{item.value}</div>
              </div>
            </li>
            );
          })}
        </ul>
      </div>

      {items.length > 4 && (
        <button className="fandomToggleBtn" onClick={() => setShowAll(prev => !prev)}>
          {showAll ? '접기' : '더보기'} <GoChevronDown className={showAll ? 'open' : ''} />
        </button>
      )}
    </section>
  );
}
