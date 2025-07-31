import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'; // [김정태_수정]
import './MainHeader.css';
import './Header.css';
import { FiChevronLeft, FiChevronUp } from 'react-icons/fi';
import { PiBell, PiStar, PiStarFill } from 'react-icons/pi';
import { GoCalendar } from 'react-icons/go';
import NotificationBell from './Notification/NotificationBell';
import { artists } from '../pages/Home/Artist/artistsData';


// 헬퍼: 두 hex 색상 사이를 ratio만큼 보간
function interpolateColor(startHex, endHex, ratio) {
  // 16진수 두 자리를 싹쓸이해 RGB 숫자로 변환
  const hexToRgb = hex => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const start = hexToRgb(startHex);
  const end   = hexToRgb(endHex);

  // 각 채널별 보간
  const r = Math.round(start.r + (end.r - start.r) * ratio);
  const g = Math.round(start.g + (end.g - start.g) * ratio);
  const b = Math.round(start.b + (end.b - start.b) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
}


export default function MainHeader() {
  const headerRef = useRef();
  const tabsRef          = useRef(null);  // .Tabs 요소를 저장할 ref
  const headerHeightRef  = useRef(0);     // 헤더 높이를 저장할 ref
  const [bgColor, setBgColor] = useState('#121212');




  useEffect(() => {
    // 1) .Tabs 요소를 찾고 저장
    const tabsEl = document.querySelector('.Tabs');
    if (tabsEl) tabsRef.current = tabsEl;

    // 2) 헤더 높이도 한 번만 계산해서 저장
    if (headerRef.current) headerHeightRef.current = headerRef.current.offsetHeight;


    // 1) 스크롤 이벤트 등록
    //    성능 최적화를 위해 requestAnimationFrame 기반으로 throttling
    let ticking = false;

    
    
    // 스크롤 시 헤더 색상을 보간하는 로직
  function onScroll() {
    const tabs = tabsRef.current;
    const hgt  = headerHeightRef.current;
    if (!tabs || !hgt) return;
    const tabsDocTop = tabs.getBoundingClientRect().top + window.scrollY;
    const start      = tabsDocTop - hgt;
    const ratio      = Math.min(Math.max(window.scrollY / start, 0), 1);
    setBgColor(interpolateColor('#121212', '#ff4187', ratio));
  }
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const tabsEl = tabsRef.current;
          const headerHeight = headerHeightRef.current;
          if (!tabsEl || !headerHeight) return;
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    // 3) 언마운트 시 이벤트 해제
    return () => {window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 빈 배열: 마운트/언마운트 때만 실행


  const navigate = useNavigate();
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ[김정태_수정]
  const { search, pathname } = useLocation();
  const {artistKey: paramArtistKey = ''} = useParams();
  const params         = new URLSearchParams(search);
  const queryArtistKey = params.get('artist') || '';

  const artistKey = pathname.startsWith('/penletter')
    ? paramArtistKey    // /penletter/... 일 땐 :artistKey
    : queryArtistKey;   // 그 외
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ[김정태_수정]
  
const handleBackToToSection = () => {
  navigate(-1);
};

  const artist = artists.find(a => a.key === artistKey) || {};

  // 좋아요 드롭다운 상태 및 즐겨찾기 로딩
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [pickedGroups, setPickedGroups] = useState([]);
  const dropdownRef = useRef(null);

  

useEffect(() => {
  if (!isLikesOpen) return;
  const raw = localStorage.getItem('pickedGroups');
  if (!raw) {
    setPickedGroups([]);
    return;
  }
  try {
    setPickedGroups(JSON.parse(raw));
  } catch (e) {
    console.error('pickedGroups 파싱 에러', e);
    setPickedGroups([]);
  }
}, [isLikesOpen]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    if (!isLikesOpen) return;
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLikesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isLikesOpen]);

  // 헤더 구성 (Artist 헤더와 동일)
  const config = {
    bgColor: '#121212',
    textColor: '#fff',
    left: [
      {
        id: 'goBack',
        icon: <FiChevronLeft style={{width:"25px", height:"25px", display:'inline-block', marginTop: '3px'}} />, 
        onClick: handleBackToToSection
      },
      {
        id: 'artistName',
        element: (
          <span style={{ marginLeft: 8, color: '#fff', fontSize: 17, fontWeight: 500 }}>
            {artist && artist.titleName ? artist.titleName : 'My Pick'}
          </span>
        ),
      }
    ],
    center: [],
    right: [
      { id: 'likes',    icon: <PiStar />,     onClick: () => setIsLikesOpen(o => !o) },
      { id: 'alerts',   icon: <PiBell />,     to: '/notifications' },
      { id: 'calendar', icon: <GoCalendar />, to: '/calendar' },
    ],
  };

  // 아이템 렌더러
  const renderItem = item => {
    // 알림 버튼은 bell-button 클래스 추가
    if (item.id === 'alerts') {
      const iconEl = React.cloneElement(item.icon, { size:24, color: config.textColor });
      return (
        <Link key="alerts" to={item.to} className="header-link bell-button">
          {iconEl}
          <NotificationBell />
        </Link>
      );
    }
    if (item.id === 'likes') {
      return (
        <button key="likes" className="header-link" onClick={item.onClick}>
          {isLikesOpen
            ? <PiStarFill size={24} color="#FF4187" />
            : <PiStar     size={24} color={config.textColor} />
          }
        </button>
      );
    }
    if (item.to) {
      const iconEl = React.cloneElement(item.icon, { size:24, color:config.textColor });
      return (
        <Link key={item.id} to={item.to} className="header-link">
          {iconEl}
          {item.id === 'alerts' && <NotificationBell />}
        </Link>
      );
    }
    if (item.onClick) {
      const iconEl = React.cloneElement(item.icon, { size:24, color:config.textColor });
      return (
        <button key={item.id} onClick={item.onClick} className="header-link back-button">
          {iconEl}
        </button>
      );
    }
    if (item.element) {
      return <React.Fragment key={item.id}>{item.element}</React.Fragment>;
    }
    return null;
  };

  return (
    <>
      <header 
        ref={headerRef}
        className="header" 
        style={{ backgroundColor: bgColor, color: config.textColor }}>
        <div className="header-section left">
          {config.left.map(renderItem)}
        </div>
        <div className="header-section center">
          {config.center.map((el, i) => React.cloneElement(el, { key: el.key || i }))}
        </div>
        <div className="header-section right">
          {config.right.map(renderItem)}
        </div>
      </header>

      {isLikesOpen && (
        <>
          <div className="likes-overlay" onClick={() => setIsLikesOpen(false)} />
          <div className="likes-dropdown" ref={dropdownRef}>
            <div className="likes-dropdown-inner">
              <ul className="likes-list">
                {pickedGroups.length > 0 ? pickedGroups.map(g => {
                  const art = artists.find(a => a.key === g.id);
                  if (!art) return null;
                  return (
                    <li key={g.id} className="likes-item">
                      <div className="likes-item-inner">
                        <img 
                          src={`${import.meta.env.BASE_URL}${art.poster}`}  
                          alt={art.name} 
                          className="likes-thumb" />
                        <div className="likes-info">
                          <div className={art.titleName}>{art.titleName}</div>
                          <div className="likes-groupname">{art.groupName}</div>
                        </div>
                        <Link
                          to={`/main?group=${art.key}`}
                          className="likes-btn"
                          onClick={() => setIsLikesOpen(false)}
                        >
                          이동
                        </Link>
                      </div>
                    </li>
                  );
                }) : (
                  <li className="likes-empty">즐겨찾기 아티스트를 선택해주세요</li>
                )}
              </ul>
              <div className="likes-footer">
                <button onClick={() => setIsLikesOpen(false)} className="likes-close-btn">
                  <FiChevronUp size={26} color="#aaa" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
