// src/components/challenge/ChallengePrevTitle.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './ChallengePrevTitle.css'
import trophy from '../../assets/Challenge/Challengezone/trophy.png'
import resultMedal from '../../assets/Challenge/Challengezone/resultMedal.png'
import pointIcon from '../../assets/Challenge/Challengezone/pointIcon.png'

export default function ChallengePrevTitle({
  to,
  clickable = true,
  monthImage,
  monthAlt,
  headTitle,
  challengeTitle,
  count,
  // 두 가지 토글 prop 추가
  disableFilter = false,      // prevTitleBox 및 배경 이미지 필터 해제
  showLookResult = true,      // lookresult 보이기/숨기기
  showLookTextBox = true,
  disableBgAnimation = false,
}) {
  const Wrapper = clickable ? Link : 'div'
  const wrapperProps = clickable ? { to } : {}

  return (
    <div className={`challengePrevTitle 
    ${disableFilter ? 'no-filter-bg' : ''}
    ${disableBgAnimation ? 'no-bg-animation' : ''}
    `}>
      <Wrapper {...wrapperProps} className="challengePrevTitle-link">
        <div className="challImgBox">
          {/* 배경 이미지에도 필터가 걸려 있으니, 부모에 클래스 토글 */}
          <img src={monthImage} alt={monthAlt} />

          {/* prevTitleBox 영역 */}
          <div className={`prevTitleBox ${disableFilter ? 'no-filter' : ''}`}>
            <h2>{headTitle}</h2>
            <span className="win">WINNER</span>
            <div className="imgBox">
              <img src={trophy} alt="트로피" />
            </div>
          </div>

          {/* 결과보기 버튼 */}
          { showLookResult && (
            <div className="lookresult">
              <div className="imgBox">
                <img src={resultMedal} alt="결과보기아이콘" />
              </div>
              <span>결과 보기</span>
            </div>
          )}
        </div>

        {/* 텍스트 영역 */}
        { showLookTextBox && (
        <div className="textBox">
          <h3>{challengeTitle}</h3>
          <div className="count">
            <div className="imgBox">
              <img src={pointIcon} alt="포인트 아이콘" className="pic" />
            </div>
            <h4 className="counttxt">{count}</h4>
          </div>
        </div>
        )}

      </Wrapper>
    </div>
  )
}
