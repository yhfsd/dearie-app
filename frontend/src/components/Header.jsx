// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation }            from 'react-router-dom';
import NotificationBell                 from './Notification/NotificationBell';
import './Header.css';
import MainHeader from './MainHeader'; 
import logo                             from '../assets/Header/Header-logo.png';
import { IoHeartOutline, IoCloseOutline } from 'react-icons/io5';
import { GoCalendar, GoShareAndroid }     from 'react-icons/go';
import { PiBell, PiStar, PiStarFill }     from 'react-icons/pi';
import { FiChevronLeft, FiChevronUp }     from 'react-icons/fi';

import { artists }                      from '../pages/Home/Artist/artistsData';

// 정적 경로별 헤더 설정
const headerConfig = {
  '/': {
    bgColor: '#121212',
    textColor: '#fff',
    left: [],
    center: [<img key="logo" src={logo} alt="Logo" className="header-logo" />],
    right: [{ id: 'alerts', icon: <PiBell color="#fff" />, to: '/notifications' }],
  },
  '/challenges': {
    bgColor: '#fff',
    textColor: '#000',
    left: [],
    center: [<img key="logo" src={logo} alt="Logo" className="header-logo" />],
    right: [
      { id: 'alerts', icon: <PiBell />, to: '/notifications' },
      { id: 'calendar', icon: <GoCalendar />, to: '/calendar' },
    ],
  },
  '/challenges/thisMonth': {
    bgColor: '#FF4187',
    textColor: '#fff',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft color="#fff" />,
      onClick: () => window.history.back(),
    }],
    center: [
      <h2 key="title" style={{ color: '#fff', fontSize: 17, fontWeight: 500 }}>
        이달의 챌린지
      </h2>
    ],
    right: [
      { id: 'calendar', icon: <GoCalendar color="#fff" />, to: '/calendar' },
      { id: 'share', icon: <GoShareAndroid color="#fff" />, onClick: () => window.dispatchEvent(new Event('shareCalendar'))},
    ],
  },
  '/challenges/prevMonth_1': {
    bgColor: '#FF4187',
    textColor: '#fff',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft color="#fff" />,
      onClick: () => window.history.back(),
    }],
    center: [<h2 key="prev1" style={{ color: '#fff', fontSize: 17, fontWeight: 500 }}>7월의 챌린지</h2>],
    right: [
      { id: 'calendar', icon: <GoCalendar color="#fff" />, to: '/calendar' },
      { id: 'share', icon: <GoShareAndroid color="#fff" />, onClick: () => window.dispatchEvent(new Event('shareCalendar'))}, 
    ],
  },
  '/challenges/prevMonth_2': {
    bgColor: '#FF4187',
    textColor: '#fff',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft color="#fff" />,
      onClick: () => window.history.back(),
    }],
    center: [<h2 key="prev2"  style={{ color: '#fff', fontSize: 17, fontWeight: 500 }}
    >6월의 챌린지</h2>],
    right: [
      { id: 'calendar', icon: <GoCalendar color="#fff" />, to: '/calendar' },
      { id: 'share', icon: <GoShareAndroid color="#fff" />, onClick: () => window.dispatchEvent(new Event('shareCalendar'))},
    ],
  },
    '/calendar': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{ id: 'goBack', icon: <FiChevronLeft color="#000" />, onClick: () => window.history.back() }],
    center: [<img key="logo" src={logo} alt="Logo" className="header-logo" />],
    right: [{ id: 'alerts', icon: <PiBell color="#000" />, to: '/notifications' },],
  },
  '/closet': {
    bgColor: '#fff',
    textColor: '#000',
    left: [],
    center: [<img key="logo" src={logo} alt="Logo" className="header-logo" />],
    right: [{ id: 'heart', icon: <IoHeartOutline />, to: '/closet/favorites' }],
  },
  '/closet/closetDetail': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft color="#000" />,
      onClick: () => window.history.back(),
    }],
    center: [<img key="logo" src={logo} alt="Logo" className="header-logo" />],
    right: [
      { id: 'alerts', icon: <PiBell />, to: '/notifications' },
      { id: 'heart',  icon: <IoHeartOutline />, to: '/closet/favorites' },
    ],
  },
  '/closet/favorites': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft color="#000" />,
      onClick: () => window.history.back(),
    }],
    center: [<h2 key="title" style={{ color: '#000', fontWeight: '500', fontSize: '17px'}}>좋아요</h2>],
    right: [],
  },
  '/more': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft  />,
      onClick: () => window.history.back(),
    }],
    center: [<img key="logo" src={logo} alt="Logo" className="header-logo" />],
    right: [
      { id: 'alerts',   icon: <PiBell />, to: '/notifications' },
      { id: 'calendar', icon: <GoCalendar />, to: '/calendar' },
    ],
  },
  '/notifications': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft />,
      onClick: () => window.history.back(),
    }],
    center: [<h2 key="title" style={{ color: '#000', fontWeight: '500', fontSize: '17px'}}>알림</h2>],
    right: [{ id: 'calendar', icon: <GoCalendar />, to: '/calendar' }],
  },
  '/fan-log': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{ id: 'goBack', icon: <FiChevronLeft style={{ width: "25px", height:'25px'}} />, to: '/more' }],
    center: [<h2 key="write-title" style={{ color: '#000', fontWeight: '500', fontSize: '17px'}}>덕심일지</h2>],
    right: [
      { id: 'alerts', icon: <PiBell />, to: '/notifications' },
      { id: 'theme',  icon: <GoCalendar />, to: '/calendar' },
    ],
  },
  '/fan-log/theme': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft />,
      onClick: () => window.history.back(),
    }],
    center: [<h2 key="theme-title" style={{ color: '#000', fontWeight: '500', fontSize: '17px'}}>덕심일지</h2>],
    right: [],
  },
  '/fan-log/write': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{ id: 'goBack', icon: <IoCloseOutline />, onClick: () => window.history.back() }],
    center: [<h2 key="write-title" style={{ color: '#000', fontWeight: '500', fontSize: '17px'}}>덕심일지</h2>],
    right: [
              { id: 'debug',
                element: <button
                        key="save-btn"
                        className="we-save-btn"
                        onClick={() => window.dispatchEvent(new Event('fanLogSave'))}
                        style={{color: '#ff4187', fontSize: '15px', fontWeight: '500'}}
                        >
                        등록
                          </button>
              }
            ],
  },
  '/fan-log/view': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{
      id: 'goBack',
      icon: <FiChevronLeft />,
      onClick: () => window.history.back(),
    }],
    center: [],
    right: [
              { id: 'debug',
                element: <button
                        key="save-btn"
                        className="we-save-btn"
                        onClick={() => window.dispatchEvent(new Event('fanLogEdit'))}
                        style={{color: '#ff4187', fontSize: '15px', fontWeight: '500'}}
                        >
                        수정
                          </button>
              }
            ],
  },
  '/likelist': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{ id: 'goBack', icon: <FiChevronLeft style={{width:"25px", height:"25px"}}/>, to: '/more' }],
    center: [<h2 key="likelist-title" style={{ color: '#000', fontWeight: '500', fontSize: '17px'}}>좋아요 목록</h2>],
    right: [],
  },
  '/postlist': {
    bgColor: '#fff',
    textColor: '#000',
    left: [{ id: 'goBack', icon: <FiChevronLeft style={{width:"25px", height:"25px"}}/>, to: '/more' }],
    center: [<h2 key="postlist-title" style={{ color: '#000', fontWeight: '500', fontSize: '17px'}}>내가 쓴 글</h2>],
    right: [],
  },
  /* ----------------------방용민 수정 */ 
   '/artistPostDetail': {
    bgColor: '#121212',
    textColor: '#fff',
    left: [
      { id: 'goBack', icon: <FiChevronLeft style={{width:"25px", height:"25px"}}/>,  onClick: () =>{localStorage.setItem('lastActiveTab', 'artist'), window.history.back()} },
    ],
    center: [],
    right: [
        { id: 'likes',    icon: <PiStar />,    to: '/'               },
        { id: 'alerts',   icon: <PiBell />,    to: '/notifications'  },
        { id: 'calendar', icon: <GoCalendar />, to: '/calendar'      },
      ],
  }, 
  '/talkWritingPage': {
    bgColor: '#1A1A1A',
    textColor: '#fff',
    left: [
      { id: 'goBack', icon: <IoCloseOutline style={{width:"25px", height:"25px"}}/>,  onClick: () =>{localStorage.setItem('lastActiveTab', 'talk'), window.history.back()} },
    ],
    center: [<h2 key="write-title" style={{ color: '#fff', fontWeight: '500', fontSize: '17px'}}>포스트 쓰기</h2>],
    right: [],
  },
};



function getMatchedHeaderConfig(pathname) {
  if (pathname.startsWith('/artist/')){
    const key = pathname.replace('/artist/', '');
    const art = artists.find(a => a.key === key);

    return {
      bgColor: '#121212', textColor: '#fff',
      left: [
        {
          id: 'goBack',
          icon: <FiChevronLeft style={{ width: "25px", height: "25px", marginTop:'3px' }} />,
          onClick: () => window.history.back()
        },
        {
          id: 'artistName',
          element: (
            <span style={{ marginLeft: 8, color: '#fff', fontSize: 17, fontWeight: 500 }}>
              {art?.titleName || art?.name}
            </span>
          ),
        },
      ],
      center: [],
      right: [
        { id: 'likes',    icon: <PiStar />,     to: '/'              },
        { id: 'alerts',   icon: <PiBell />,     to: '/notifications' },
        { id: 'calendar', icon: <GoCalendar />, to: '/calendar'      },
      ],
    };
  }

  // closetDetail 하위 경로 대응
  if (pathname.startsWith('/closet/closetDetail')) {
    return headerConfig['/closet/closetDetail'];
  }


  
  if (pathname.startsWith('/penletter/')) {
  const segments = pathname.split('/');
  const key = segments[2]; // 예: /talkPostDetail/riize/... → 'riize'
  const art = artists.find(a => a.key === key);

  return {
    bgColor: '#121212',
    textColor: '#fff',
    left: [
      {
        id: 'goBack',
        icon: <FiChevronLeft style={{ width: "25px", height: "25px",marginTop:'3px' }} />,
        onClick: () => {
          localStorage.setItem('lastActiveTab', 'to');
          window.history.back();
        },
      },
      {
        id: 'artistName',
        element: (
          <span style={{ marginLeft: 8, color: '#fff', fontSize: 17, fontWeight: 500 }}>
            {art?.titleName || art?.name || ''}
          </span>
        ),
      },
    ],
    center: [],
      right: [
        { id: 'likes',    icon: <PiStar />,     to: '/'              },
        { id: 'alerts',   icon: <PiBell />,     to: '/notifications' },
        { id: 'calendar', icon: <GoCalendar />, to: '/calendar'      },
      ],
  };
}

  //talkPostDetail 하위경로 대응
  if (pathname.startsWith('/talkPostDetail/')) {
  const segments = pathname.split('/');
  const key = segments[2]; // 예: /talkPostDetail/riize/... → 'riize'
  const art = artists.find(a => a.key === key);

  return {
    bgColor: '#121212',
    textColor: '#fff',
    left: [
      {
        id: 'goBack',
        icon: <FiChevronLeft style={{ width: "25px", height: "25px", marginTop:'3px' }} />,
        onClick: () => {
          localStorage.setItem('lastActiveTab', 'talk');
          window.history.back();
        },
      },
      {
        id: 'artistName',
        element: (
          <span style={{ marginLeft: 8, color: '#fff', fontSize: 17, fontWeight: 500 }}>
            {art?.titleName || art?.name || ''}
          </span>
        ),
      },
    ],
    center: [],
      right: [
        { id: 'likes',    icon: <PiStar />,     to: '/'              },
        { id: 'alerts',   icon: <PiBell />,     to: '/notifications' },
        { id: 'calendar', icon: <GoCalendar />, to: '/calendar'      },
      ],
  };
}
  if (pathname.startsWith('/artistPostDetail/')) {
  const segments = pathname.split('/');
  const key = segments[2]; // 예: /talkPostDetail/riize/... → 'riize'
  const art = artists.find(a => a.key === key);

  return {
    bgColor: '#121212',
    textColor: '#fff',
    left: [
      {
        id: 'goBack',
        icon: <FiChevronLeft style={{ width: "25px", height: "25px",marginTop:'3px' }} />,
        onClick: () => {
          localStorage.setItem('lastActiveTab', 'artist');
          window.history.back();
        },
      },
      {
        id: 'artistName',
        element: (
          <span style={{ marginLeft: 8, color: '#fff', fontSize: 17, fontWeight: 500 }}>
            {art?.titleName || art?.name || ''}
          </span>
        ),
      },
    ],
    center: [],
      right: [
        { id: 'likes',    icon: <PiStar />,     to: '/'              },
        { id: 'alerts',   icon: <PiBell />,     to: '/notifications' },
        { id: 'calendar', icon: <GoCalendar />, to: '/calendar'      },
      ],
  };
}
  if (pathname.startsWith('/talkWritingPage')) {
    return headerConfig['/talkWritingPage'];
  }


  return headerConfig[pathname] || {};
}
  /* ----------------------방용민 수정 */

export default function Header() {
  const { pathname } = useLocation();

  // 훅은 최상단에서 호출
  const [isLikesOpen, setIsLikesOpen]   = useState(false);
  const [pickedGroups, setPickedGroups] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isLikesOpen) return;
    const raw = localStorage.getItem('pickedGroups');
    setPickedGroups(raw ? JSON.parse(raw) : []);
  }, [isLikesOpen]);

  useEffect(() => setIsLikesOpen(false), [pathname]);

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

  // 조건부 렌더링: 챗봇 숨김, 메인페이지 MainHeader 사용
  if (pathname.startsWith('/chatbot')) return null;
  if (pathname.startsWith('/main'))    return <MainHeader />;

  // 일반 헤더 렌더링
  const config = getMatchedHeaderConfig(pathname);
  const headerStyle = { backgroundColor: config.bgColor, color: config.textColor, overflow: 'visible' };

  const renderItem = item => {
    if (item.id === 'likes') {
      return (
        <button key="likes" onClick={() => setIsLikesOpen(o => !o)} className="header-link">
          {isLikesOpen
            ? <PiStarFill size={24} color="#FF4187" />
            : <PiStar     size={24} color={config.textColor} />}
        </button>
      );
    }
    if (item.id === 'alerts') {
      return (
        <Link key="alerts" to={item.to} className="header-link bell-button">
          {React.cloneElement(item.icon, { size:24, color:config.textColor })}
          <NotificationBell />
        </Link>
      );
    }
    if (item.to) {
      return (
        <Link key={item.id} to={item.to} className="header-link">
          {React.cloneElement(item.icon, { size:24, color:config.textColor })}
        </Link>
      );
    }
    if (item.onClick) {
      return (
        <button key={item.id} onClick={item.onClick} className="header-link back-button">
          {React.cloneElement(item.icon, { size:24, color:config.textColor })}
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
      {/* path 할당이 안된 url에서 헤더 관련 오류 방어용 [김정태_수정] */}
      <header className="header" style={headerStyle}>
        <div className="header-section left">
          {Array.isArray(config.left) && config.left.map(renderItem)}
        </div>
        <div className="header-section center">
          {Array.isArray(config.center) && config.center.map((el, i) => 
            React.cloneElement(el, { key: el.key || i })
          )}
        </div>
        <div className="header-section right">
          {Array.isArray(config.right) && config.right.map(renderItem)}
        </div>
      </header>
      {/* path 할당이 안된 url에서 헤더 관련 오류 방어용 [김정태_수정] */}

      {isLikesOpen && (
        <>
          {/* 배경 오버레이 */}
          <div className="likes-overlay" onClick={() => setIsLikesOpen(false)} />

          {/* 드롭다운 */}
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
                          className="likes-thumb"
                        />
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
                <button
                  onClick={() => setIsLikesOpen(false)}
                  className="likes-close-btn"
                >
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
