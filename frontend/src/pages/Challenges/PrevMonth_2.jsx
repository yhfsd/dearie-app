import React, {useEffect, useRef, useState} from 'react'
import html2canvas from 'html2canvas';
// 공통 css
import './Month_common.css'
// 컴포넌트 임포트
import ChallengePrevTitle from '../../components/challenge/ChallengePrevTitle'
import Challenge_Artist_Rank from '../../components/challenge/Challenge_Artist_Rank'
import Challenge_calendar from '../../components/challenge/Challenge_calendar'


// 이미지 임포트
import juneChallenge from '../../assets/Challenge/juneChallenge.png'
import rank_IVE from '../../assets/Challenge/rank_IVE.png'
import rank_RIIZE from '../../assets/Challenge/rank_RIIZE.png'
import rank_TXT from '../../assets/Challenge/rank_TXT.png'
import rank_AESPA from '../../assets/Challenge/rank_AESPA.png'
import rank_IU from '../../assets/Challenge/rank_IU.png'

import juneDaysIcon from '../../assets/Challenge/juneDaysIcon.png'

export default function PrevMonth_2() {
  const year = new Date().getFullYear()
  const daysInJuly = new Date(year, 7, 0).getDate()
  const juneDays = Array.from({ length: daysInJuly }, (_, i) => i + 1)

  // 공유 버튼
  const [shareTriggered, setShareTriggered] = useState(false);
  const calendarCaptureRef = useRef(null);
  const isSharing = useRef(false);

  useEffect(() => {
    const onShare = () => {
      if (!isSharing.current) {
        setShareTriggered(true);
      }
    };
    window.addEventListener('shareCalendar', onShare);
    return () => window.removeEventListener('shareCalendar', onShare);
  }, []);

  useEffect(() => {
    if (shareTriggered) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (!calendarCaptureRef.current) return;
          html2canvas(calendarCaptureRef.current).then(canvas => {
            canvas.toBlob(async blob => {
              if (!blob) return;
              const file = new File([blob], 'calendar.png', { type: 'image/png' });
              const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
              const isChrome = /Chrome/i.test(navigator.userAgent);
              const isDesktop = !isMobile;
              isSharing.current = true;
              try {
                if (isChrome && isDesktop) {
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = 'calendar.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(link.href);
                } else if (navigator.canShare && navigator.canShare({ files: [file] })) {
                  await navigator.share({
                    files: [file],
                    title: '이달의 챌린지 달력',
                    text: '펼쳐진 달력을 공유합니다!'
                  });
                } else {
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = 'calendar.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(link.href);
                }
              } catch (err) {
                console.error('❌ 공유 실패:', err);
                alert('공유에 실패했습니다.');
              } finally {
                isSharing.current = false;
                setShareTriggered(false);
              }
            });
          });
        }, 200);
      });
    }
  }, [shareTriggered]);

     const artistItems = [
      {
        name: 'IU',
        imgSrc: rank_IU,
        percent: 23,
        value: '48,330,800 p'
      },
      {
        name: 'IVE',
        imgSrc: rank_IVE,
        percent: 21.5,
        value: '45,282,900 p'
      },
      {
        name: 'RIIZE',
        imgSrc: rank_RIIZE,
        percent: 20.9,
        value: '44,000,200 p'
      },
      {
        name: 'TXT',
        imgSrc: rank_TXT,
        percent: 17.4,
        value: '36,538,200 p'
      },
      {
        name: 'AESPA',
        imgSrc: rank_AESPA,
        percent: 17,
        value: '35,670,500 p'
      },
    ];
// 총합 118,996,100

  // 날짜별 스탬프 상태 정의
  const juneStamps = {
    1: 'success',
    2: 'fail',
    3: 'success',
    4: 'fail',
    5: 'success',
    6: 'success',
    7: 'fail',
    8: 'fail',
    9: 'fail',
    10: 'fail',
    11: 'success',
    12: 'success',
    13: 'success',
    14: 'success',
    15: 'fail',
    16: 'success',
    17: 'success',
    18: 'fail',
    19: 'fail',
    20: 'fail',
    21: 'success',
    22: 'success',
    23: 'success',
    24: 'success',
    25: 'fail',
    26: 'success',
    27: 'success',
    28: 'success',
    29: 'fail',
    30: 'fail',
    31: 'success',
    // 나머지는 스탬프 없음(empty)
  }

  return (
      <section className="Month_common prev">
        <div className="common_ChallengeTitle">
            <ChallengePrevTitle 
            clickable = {false}
            monthImage={juneChallenge}
            monthAlt={'6월 챌린지'}
            headTitle={'6월 챌린지'}
            challengeTitle={'[6월] 깨끗한 지구 만들기 챌린지'}
            count={'999,999,999'}
            disableFilter={true}
            showLookResult={false}
            showLookTextBox={false}
            daysIcon={juneDaysIcon}
            />
        </div>

        <div className="PrevTitleTxt">
          <span>6월 깨끗한 지구 만들기 챌린지</span>
        </div>

        <div className="common_challenge_calendar" ref={calendarCaptureRef}>
          <Challenge_calendar
            month={6}
            visibleDays={juneDays}
            initialStamps={juneStamps}  // 개별 날짜 상태 전달
            isFolded={false}
            showCertButton={false}
            daysIcon={juneDaysIcon}
            disableToggle={true}
          />
        </div>

      <div className="common_challenge_Artist_Rank">
        <Challenge_Artist_Rank items={artistItems}/>
      </div>


      </section>
  )

}
