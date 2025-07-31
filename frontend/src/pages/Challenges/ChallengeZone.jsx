import React from 'react'
import {Link} from 'react-router-dom'
import './ChallengeZone.css'


// 이미지 임포트
import augustChallenge from '../../assets/Challenge/augustChallenge.png'
import julyChallenge from '../../assets/Challenge/julyChallenge.png'
import juneChallenge from '../../assets/Challenge/juneChallenge.png'
import trophy from '../../assets/Challenge/Challengezone/trophy.png'
import pointIcon from '../../assets/Challenge/Challengezone/pointIcon.png'

import ChallengePrevTitle from '../../components/challenge/ChallengePrevTitle'
import brand from '../../assets/Challenge/brand.png'


const challengeZone = () => {
  return (
    <>
    <section className="challenges">
      <div className="container">


        <div className="thisMonth">
          <div className="text">
            <h2>이달의 챌린지</h2>
            <img src={brand} alt="브랜드"/>
          </div>
          <Link to="/challenges/thisMonth">
            <div className="challImgBox">
              <img src={augustChallenge} alt="8월 챌린지" />
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

            <div className="textBox">
              <h3>[8월] 미라클 모닝 챌린지</h3>
              <div className="count">
                <div className='imgBox'>
                  <img src={pointIcon} alt="포인트아이콘" className="pic" />
                </div>
                <h4 className='counttxt'>567,392,316</h4>
              </div>
            </div>
          </Link>
        </div>
          

        <ul className="prevMonths">
          <div className="text">
            <h2>지난 챌린지</h2>
          </div>
          <li>
            <ChallengePrevTitle 
            to="/challenges/prevMonth_1"
            monthImage={julyChallenge}
            monthAlt={'7월 챌린지'}
            headTitle={'7월 챌린지'}
            challengeTitle={'[7월] 자기긍정 챌린지'}
            count={'742,724,753'}
            disableBgAnimation={true}
            />
          </li>
          <li>
            <ChallengePrevTitle 
            to="/challenges/prevMonth_2"
            monthImage={juneChallenge}
            monthAlt={'6월 챌린지'}
            headTitle={'6월 챌린지'}
            challengeTitle={'[6월] 깨끗한 지구 만들기 챌린지'}
            count={'643,522,633'}
            disableBgAnimation={true}
            />
          </li>
        </ul>
      </div>
    </section>
    </>
  )
}

export default challengeZone