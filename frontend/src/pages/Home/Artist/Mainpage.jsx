// src/pages/MainPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation }                  from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css';
import { artists }                      from './artistsData';
import GroupIntro                       from '../../../components/Main/GroupIntro';
import Tabs                             from '../../../components/Main/Tabs';
import HighlightSection                 from './sections/HighlightSection';
import ArtistSection                    from './sections/ArtistSection';
import ToSection                        from './sections/ToSection';
import TalkSection                      from './sections/TalkSection';
import ContentSection                   from './sections/ContentSection';




// 탭 설정: label은 기본 문자열
const TABS = [
  { key: 'highlight', label: 'Highlight', component: HighlightSection },
  { key: 'artist',    label: 'Artist',    component: ArtistSection },
  { key: 'to',        label: 'To.',        component: ToSection },
  { key: 'talk',      label: 'Talk',      component: TalkSection },
  { key: 'content',   label: 'Content',   component: ContentSection },
];



export default function MainPage() {
  const { search }     = useLocation();
  const navigate = useNavigate();
  const params         = new URLSearchParams(search);
  const key            = params.get('group') || '';
  const artistInfo     = artists.find(a => a.key.toLowerCase() === key.toLowerCase());

  const [isPicked, setIsPicked]   = useState(false);
  const introRef                  = useRef(null);
const [activeTab, setActiveTab] = useState(() => {
  const storedTab = localStorage.getItem('lastActiveTab');
  return storedTab || TABS[0].key;
});
const [isTabClicked, setIsTabClicked] = useState(false); // ✅ 추가

const handleTabChange = key => {
  setActiveTab(key);
  setIsTabClicked(true); // ✅ 클릭으로 변경됐다는 표시
};


   const [themeClass, setThemeClass] = useState('heart'); // 'heart'|'fire'|'green'
 useEffect(() => {
   const raw = localStorage.getItem('chatData');
   if (raw) {
     try {
       const { theme } = JSON.parse(raw);
       if (theme === 'heart' || theme === 'fire' || theme === 'green') {
         setThemeClass(theme);
       }
     } catch {''}
   }
 }, []);



useEffect(() => {
  if (!isTabClicked) return;

  const checkScrollable = () => {
    if (document.body.scrollHeight < 500) {
      // 아직 DOM이 다 안 만들어졌거나 너무 짧음 → 기다렸다가 재시도
      setTimeout(checkScrollable, 50);
      return;
    }

    window.scrollTo({
      top: 420,
      behavior: 'smooth',
    });
  };

  setTimeout(checkScrollable, 200); // 콘텐츠 렌더 시간 확보
}, [activeTab]);







  useEffect(() => {
  const storedTab = localStorage.getItem('lastActiveTab');
  if (storedTab) {
    setActiveTab(storedTab);
    localStorage.removeItem('lastActiveTab'); // 뒤로가기 복원 후 초기화
    }
  }, []);

  useEffect(() => {
    if (!artistInfo) return;
    const raw = localStorage.getItem('pickedGroups');
    if (raw) {
      const arr = JSON.parse(raw);
      setIsPicked(arr.some(g => g.id === artistInfo.key));
    }
  }, [artistInfo]);

  const handleJoin = () => {
    if (isPicked) return;
    const raw = localStorage.getItem('pickedGroups');
    const arr = raw ? JSON.parse(raw) : [];
    const updated = [...arr, { id: artistInfo.key, name: artistInfo.titleName }];
    localStorage.setItem('pickedGroups', JSON.stringify(updated));
    setIsPicked(true);
  };

  if (!artistInfo) {
    return (
      <div className="main-page">
        <h1>아티스트 정보를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  // 탭 네비용 배열: To 탭만 동적으로 'To. {artistName}'으로 렌더링
  const renderedTabs = TABS.map(tab => ({
    key: tab.key,
    label: tab.key === 'to'
      ? `To. ${artistInfo.titleName}`
      : tab.label
  }));

  // 현재 탭에 매핑된 컴포넌트
  const ActiveComponent = TABS.find(t => t.key === activeTab)?.component;




  return (
    <div className="main-page">
      {/* Group Intro */}
      <div className="group-intro-wrapper" ref={introRef}>
        <GroupIntro
          id={artistInfo.key}
          title={artistInfo.titleName}
          heroImage={artistInfo.heroImage}
          social={artistInfo.social}
          onJoin={handleJoin}
          showJoinButton={!isPicked}
          joinLabel="가입하기"
        />
      </div>


      {/* 탭 네비게이션 */}
      <section className="Tabs">
        <Tabs
          tabs={renderedTabs}
          activeKey={activeTab}
          onChange={handleTabChange}
        />
      </section>

      {/* 선택된 섹션 렌더링 */}
 <section className="main-page__content">
   {ActiveComponent && (
     <ActiveComponent
       artist={artistInfo}
       onTabChange={setActiveTab}    /* ← 여기 추가 */
     />
   )}
 </section>


 <div className="chatBotBox">
<button className="chatBotBtn" onClick={() => navigate('/chatbot')}>
         <img
           src={`${import.meta.env.BASE_URL}chatBot/chatBot-fixedImg-${themeClass}.png`}
           alt="Chat Bot"
           className="chatBotBtn-img"
         />
</button>
 </div>
    </div>
  );
}
