// src/components/ChallengeTitle.jsx
import React from 'react';
import './ChallengeTitle.css';
// 이미지
import heartman from '../../assets/Challenge/heartman.png'
import heartalram from '../../assets/Challenge/heartalram.png'
import stars      from '../../assets/Challenge/stars.png'

export default function ChallengeTitle({ imgSrc, title, trophy }) {
  return (
    <>
    <div className="common_month_challenge_container">
      <div className="challTitle">
        <div className="imgBox">
          <img src={imgSrc} alt={title} />
          {/* 7월 6월때 수정할 부분 */}
          <div className="titleTxt">
            <span className='addTxt'>오늘의 한 걸음이, 우승으로 이어질지도</span>
            <h2>8월의 
              <div className="titleimgBox">
                <img src={trophy} alt="trophy"/>
              </div>
              챌린지
            </h2>
          </div>
        </div>
        <span>{title}</span>
      </div>
    </div>
    <div className="challGuide">
      <div className="guideTitle">
        <h2>챌린지 안내</h2>
        <img src={heartman} alt="어리" />
      </div>
      <div className="guideBox">
        <p>일찍 일어난 당신,<br />오늘도 팬심과 하루를 완벽하게 시작할 시간이에요!</p>
        <p>
          <img src={heartalram} alt="알람 아이콘" className='guideIcon' /> 6:00~7:30 사이에 일어나<br />미라클 모닝 챌린지에 참여해보세요.
        </p>
        <p>좋아하는 아티스트에게 응원을 전하고<br />나만의 기록을 남겨보세요 <img src={stars} alt="별 아이콘" className='guideIcon' /></p>
      </div>
    </div>
  </>
  );
}
