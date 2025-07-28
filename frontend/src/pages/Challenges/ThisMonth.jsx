import React, { useState, useEffect, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import './Month_common.css';

import ChallengeTitle        from '../../components/challenge/ChallengeTitle';
import Challenge_calendar    from '../../components/challenge/Challenge_calendar';
import Challenge_Artist_Rank from '../../components/challenge/Challenge_Artist_Rank';
import Challenge_Fandom_Rank from '../../components/challenge/Challenge_Fandom_Rank';
import Challenge_bottomNav   from '../../components/challenge/Challenge_bottomNav';

// 타이틀 이미지
import augustChallenge from '../../assets/Challenge/augustChallenge.png';
import trophy from '../../assets/Challenge/Challengezone/trophy.png'

// 달력 이미지
import daysicon from '../../assets/Challenge/daysicon.png';

import rank_TXT from '../../assets/Challenge/rank_TXT.png'
import rank_RIZZE from '../../assets/Challenge/rank_RIIZE.png'
import aespaImg from '../../assets/Challenge/rank_AESPA.png';
import iuImg from '../../assets/Challenge/rank_IU.png';
import rank_IVE from '../../assets/Challenge/rank_IVE.png'

// 팬덤랭크 유저 리스트 : 에스파
import winter from '../../assets/Challenge/AespauserList/winter.png'
import ticketing from '../../assets/Challenge/AespauserList/ticketing.png'
import karining from '../../assets/Challenge/AespauserList/karining.png'
import mongmong from '../../assets/Challenge/AespauserList/mongmong.png'
import next from '../../assets/Challenge/AespauserList/next.png'
import karidoong from '../../assets/Challenge/AespauserList/karidoong.png'
import lightguide from '../../assets/Challenge/AespauserList/lightguide.png'
import waitwinter from '../../assets/Challenge/AespauserList/waitwinter.png'
import lovezizel from '../../assets/Challenge/AespauserList/lovezizel.png'
import ningnyang from '../../assets/Challenge/AespauserList/ningnyang.png'


// 팬덤랭크 유저 리스트 : TXT
import fairy from '../../assets/Challenge/TXTuserList/fairy.png'
import idonknow from '../../assets/Challenge/TXTuserList/idonknow.png'
import waterup from '../../assets/Challenge/TXTuserList/waterup.png'
import dogdog from '../../assets/Challenge/TXTuserList/dogdog.png'
import shoulder from '../../assets/Challenge/TXTuserList/shoulder.png'
import staroftomorrow from '../../assets/Challenge/TXTuserList/staroftomorrow.png'
import footend from '../../assets/Challenge/TXTuserList/footend.png'
import beenwhip from '../../assets/Challenge/TXTuserList/beenwhip.png'
import kyarr from '../../assets/Challenge/TXTuserList/kyarr.png'
import bumkyu from '../../assets/Challenge/TXTuserList/bumkyu.png'

const CERT_POINT = 1000;

const initialArtists = [
  { key: 'TXT', label: 'TXT', imgSrc: rank_TXT },
  { key: 'AESPA', label: 'AESPA', imgSrc: aespaImg },
  { key: 'IU', label: 'IU', imgSrc: iuImg },
  { key: 'RIIZE', label: 'RIIZE', imgSrc: rank_RIZZE },
  { key: 'Ive', label: 'IVE', imgSrc: rank_IVE }
];

const initialBottomNav = [
  { key: 'AESPA', label: 'AESPA', imgSrc: aespaImg, subText: '카리나 · 윈터 · 지젤 · 닝닝' },
  { key: 'TXT', label: 'TXT', imgSrc: rank_TXT, subText: '수빈 · 연준 · 범규 · 태현 · 휴닝카이' }
];

const initialFandomMap = {
  AESPA: [
    { imgSrc: winter, name: '순간의 윈터', value: '6,100 p', isMe: true },
    { imgSrc: ticketing, name: '티켓팅전사', value: '13,200 p' },
    { imgSrc: karining, name: '카리닝이', value: '11,300 p' },
    { imgSrc: mongmong, name: '몽몽', value: '10,200 p' },
    { imgSrc: next, name: '넥스트레벨가자', value: '8,700 p' },
    { imgSrc: karidoong, name: '카리둥절', value: '7,500 p' },
    { imgSrc: lightguide, name: '광야길잡이', value: '6,000 p' },
    { imgSrc: waitwinter, name: '겨울만기다려', value: '5,400 p' },
    { imgSrc: lovezizel, name: '지젤언니사랑해', value: '5,200 p' },
    { imgSrc: ningnyang, name: '닝냥이', value: '5,000 p' },
  ],
  TXT: [
    { imgSrc: winter, name: '순간의 윈터', value: '800 p', isMe: true },
    { imgSrc: fairy, name: '얼빡샷요정', value: '12,200 p' },
    { imgSrc: idonknow, name: '투바투밖에몰라', value: '12,000 p' },
    { imgSrc: waterup, name: '물오른', value: '11,800 p' },
    { imgSrc: dogdog, name: '휴닝집강아지', value: '10,000 p' },
    { imgSrc: shoulder, name: '연준이어깨깡', value: '8,800 p' },
    { imgSrc: staroftomorrow, name: '투모로우의별', value: '7,400 p' },
    { imgSrc: footend, name: '태현이발끝만도못한나', value: '6,200 p' },
    { imgSrc: beenwhip, name: '수빈이랑콩나물국밥', value: '5,500 p' },
    { imgSrc: kyarr, name: '꺄르르', value: '4,800 p' },
    { imgSrc: bumkyu, name: '범규주의보', value: '4,000 p' },
  ]
};

export default function ThisMonth() {
  const [fandomMap, setFandomMap] = useState(() => JSON.parse(localStorage.getItem('fandomMap')) || initialFandomMap);
  const [bottomNavCategories, setBottomNavCategories] = useState(() => JSON.parse(localStorage.getItem('bottomNavCategories')) || initialBottomNav);
  const [selectedArtist, setSelectedArtist] = useState(() => localStorage.getItem('selectedArtist') || initialBottomNav[0].key);
  const [navOpen, setNavOpen] = useState(() => JSON.parse(localStorage.getItem('navOpen')) || false);

  const [calendarFolded, setCalendarFolded] = useState(true);
  const [shareTriggered, setShareTriggered] = useState(false);
  const calendarCaptureRef = useRef(null);
  const isSharing = useRef(false);

  useEffect(() => { localStorage.setItem('fandomMap', JSON.stringify(fandomMap)); }, [fandomMap]);
  useEffect(() => { localStorage.setItem('bottomNavCategories', JSON.stringify(bottomNavCategories)); }, [bottomNavCategories]);
  useEffect(() => { localStorage.setItem('selectedArtist', selectedArtist); }, [selectedArtist]);
  useEffect(() => { localStorage.setItem('navOpen', JSON.stringify(navOpen)); }, [navOpen]);

  const handleBottomNavSelect = key => {
    if (key === null) return setNavOpen(false);
    setSelectedArtist(key);
    setNavOpen(true);
  };

  const parseValue = v => Number(v.replace(/,/g, '').replace(/[^0-9.]/g, ''));
  const formatValue = n => n.toLocaleString() + ' p';

  const handleCertSuccess = () => {
    setFandomMap(prev => {
      const list = [...(prev[selectedArtist] || [])];
      const myIdx = list.findIndex(i => i.isMe);
      if (myIdx < 0) return prev;
      const me = { ...list[myIdx] };
      me.value = formatValue(parseValue(me.value) + CERT_POINT);
      list[myIdx] = me;
      list.sort((a, b) => parseValue(b.value) - parseValue(a.value));
      return {
        ...prev,
        [selectedArtist]: list.map(i => ({ ...i, isMe: i.name === me.name }))
      };
    });
  };

const artistRankItems = useMemo(() => {
  // fandomMap 기반 실제 합산
  const realTotal = (key) => {
    return fandomMap[key]
      ? fandomMap[key].reduce((sum, i) => sum + parseValue(i.value), 0)
      : 0;
  };

  // 직접 입력한 아티스트 포인트 (TXT, AESPA 제외)
  const manualTotals = {
    IU: 9200000,
    RIIZE: 7000000,
    Ive: 5600000
  };

  const basePoints = {
    TXT : 12800000,
    AESPA : 11208300,
  };

  const totals = {};
  initialArtists.forEach(a => {
    if (a.key === 'TXT' || a.key === 'AESPA') {
     // 베이스 포인트 + 팬덤 유저 합산 포인트
      totals[a.key] = (basePoints[a.key] || 0) + realTotal(a.key);
    } else {
      totals[a.key] = manualTotals[a.key] || 0;
    }
  });

  const grandTotal = Object.values(totals).reduce((sum, v) => sum + v, 0);

  return initialArtists.map(a => {
    const total = totals[a.key];
    return {
      key: a.key,
      imgSrc: a.imgSrc,
      name: a.label,
      total,
      percent: grandTotal > 0 ? Math.round((total / grandTotal) * 100) : 0
    };
  })
    .sort((a, b) => b.total - a.total)
    .map((item, idx) => ({ ...item, rank: idx + 1, value: formatValue(item.total) }));
}, [fandomMap]);


  useEffect(() => {
    setBottomNavCategories(prev => prev.map(cat => {
      const art = artistRankItems.find(a => a.key === cat.key) || {};
      return { ...cat, summary: { percent: art.percent, value: art.value, rank: art.rank, imgSrc: art.imgSrc } };
    }));
  }, [artistRankItems]);

  const currentList = fandomMap[selectedArtist] || [];
let combined = [...currentList].sort((a, b) => parseValue(b.value) - parseValue(a.value));

// 순위 고정 트릭: TXT일 경우 isMe를 25번째에 위치시키기
if (selectedArtist === 'TXT') {
  const myItem = combined.find(i => i.isMe);
  combined = combined.filter(i => !i.isMe);

  // 앞에 24명만 slice하고, 그 뒤에 내 정보 추가
  combined = [...combined.slice(0, 24), myItem, ...combined.slice(24)];
}

const myRank = selectedArtist === 'TXT'
  ? 25
  : combined.findIndex(i => i.isMe) + 1;




  const currentSummary = bottomNavCategories.find(c => c.key === selectedArtist)?.summary;
  const myPoint = parseValue(fandomMap[selectedArtist].find(item => item.isMe)?.value || '0 p');

  useEffect(() => {
    if (shareTriggered && !calendarFolded) {
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
                  await navigator.share({ files: [file], title: '이달의 챌린지 달력', text: '펼쳐진 달력을 공유합니다!' });
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
  }, [calendarFolded, shareTriggered]);

  useEffect(() => {
    const onShare = () => {
      if (!isSharing.current) {
        setShareTriggered(true);
        setCalendarFolded(false);
      }
    };
    window.addEventListener('shareCalendar', onShare);
    return () => window.removeEventListener('shareCalendar', onShare);
  }, []);

  return (
    <section className="Month_common">
      <div className="common_ChallengeTitle">
        <ChallengeTitle 
        imgSrc={augustChallenge} 
        title="8월 미라클 모닝 챌린지"
        trophy={trophy}
        />
      </div>
      <div className="common_challenge_calendar">
        <Challenge_calendar
          month={8}
          visibleDays={[10, 11, 12, 13, 14, 15, 16]}
          initialStamps={{ 
            1: 'success', 
            2: 'success',
            3: 'success',
            4: 'fail',
            5: 'success',
            6: 'fail',
            7: 'fail',
            8: 'success',
            9: 'success',
            10: 'success',
          }}
          certDate={11}
          certWindow={{ startHour: 0, endHour: 24 }}
          isFolded={calendarFolded}
          selectedArtist={selectedArtist}
          categories={bottomNavCategories}
          onCertSuccess={handleCertSuccess}
          myPoint={myPoint}
          certPoint={CERT_POINT}
          captureRef={calendarCaptureRef}
          daysIcon={daysicon}
        />
      </div>
      <div className="common_challenge_Artist_Rank">
        <Challenge_Artist_Rank items={artistRankItems} />
      </div>
      <div className="common_challenge_Fandom_Rank">
        <Challenge_Fandom_Rank items={combined} myRank={myRank} />
      </div>
      <div className="common_challenge_bottomNav">
        <Challenge_bottomNav
          open={navOpen}
          categories={bottomNavCategories}
          selectedCategory={selectedArtist}
          onCategorySelect={handleBottomNavSelect}
          summary={currentSummary}
        />
      </div>
    </section>
  );
}
