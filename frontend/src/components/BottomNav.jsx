// src/components/BottomNav.jsx
import React from 'react';
import './BottomNav.css';
import { NavLink, useLocation } from 'react-router-dom';

import { HomeSimple } from "./icons/HomeSimple";
import { ClothesHanger20Regular } from './icons/ClothesHanger20Regular';
import { MoreCircle20Regular } from './icons/MoreCircle20Regular';
import { Medal } from "./icons/Medal";




// 경로별 배경/텍스트 색상 설정
const navConfig = {
  '/':                   { bgColor: '#121212', textColor: '#fff' },
  '/challenges':         { bgColor: '#fff',    textColor: '#000' },
  '/challenges/thisMonth': { bgColor: '#fff',  textColor: '#000' },
  '/challenges/prevMonth_1': { bgColor: '#fff', textColor: '#000' },
  '/challenges/prevMonth_2': { bgColor: '#fff', textColor: '#000' },
  '/calendar':           { bgColor: '#fff', textColor: '#000'},
  '/closet':             { bgColor: '#fff',    textColor: '#000' },
  '/closet/closetDetail':{ bgColor: '#fff',    textColor: '#000' },
  '/more':               { bgColor: '#fff',    textColor: '#000' },
  '/notifications':      { bgColor: '#fff',    textColor: '#000' },
  '/fan-log': { bgColor: '#fff', textColor: '#000'},
  '/postlist': { bgColor: '#fff', textColor: '#000'},
  '/artist' : {bgColor: '#121212', textColor: '#fff'},
  '/main' : {bgColor: '#121212', textColor: '#fff'},
};



function getMatchedNavConfig(pathname) {
  if (pathname === '/closet/closetDetail' || pathname.startsWith('/closet/closetDetail/')) {
    return navConfig['/closet/closetDetail'];
  }

  if (pathname.startsWith('/artist')) {
    return navConfig['/artist'];
  }

  return navConfig[pathname] || {};
}



const BottomNav = () => {
  const location = useLocation();
    const hidePaths = [
      '/fan-log/theme',
      '/fan-log/view' , 
      '/challenges/prevMonth_2' , 
      '/challenges/prevMonth_1', 
      '/challenges/thisMonth',
      '/likelist',
      '/notice',
      '/chatbot',
      '/closet/favorites'
    ];
    

// 기존 기능 유지하면서 penletter/로 시작하는 부분에서만 bottomNav 숨김처리 [김정태_수정]
if (
  !location.pathname.startsWith('/artist') &&
  (hidePaths.some(p => location.pathname.startsWith(p)) ||
  location.pathname.startsWith('/talkWritingPage')) ||
  location.pathname.startsWith('/penletter/')
) {
  return null;
}
// 기존 기능 유지하면서 penletter/로 시작하는 부분에서만 bottomNav 숨김처리 [김정태_수정]
if (
  !location.pathname.startsWith('/artist') &&
  (hidePaths.some(p => location.pathname.startsWith(p)) ||
  location.pathname.startsWith('/talkWritingPage'))
) {
  return null;
}



  // 현재 경로에 맞는 bg/text 컬러
  const { bgColor = 'transparent', textColor = 'inherit' } =
    getMatchedNavConfig(location.pathname);//바뀐 부분2

  const navItems = [
    { id: 'home',      label: 'Home',      icon: <HomeSimple />,                to: '/' },
    { id: 'challenge', label: 'Challenge', icon: <Medal style={{ fontSize: 23, marginTop: 3 }} />, to: '/challenges' },
    { id: 'closet',    label: 'Closet',    icon: <ClothesHanger20Regular style={{ fontSize: 34, paddingBottom: 2 }} />, to: '/closet' },
    { id: 'more',      label: 'More',      icon: <MoreCircle20Regular />,        to: '/more' },
  ];

  const morePaths = ['/more', '/postlist', '/likelist', '/fan-log'];

  return (
    <nav
      className="bottom-nav"
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      {navItems.map(item => (
        <NavLink
          key={item.id}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => {
            // 1) More 탭이고, 현재 경로가 morePaths 중 하나(또는 /fan-log 하위)라면 강제 active
            if (
              item.id === 'more' &&
              (morePaths.some(p => location.pathname === p || location.pathname.startsWith(p + '/')))
            ) {
              return 'nav-item active';
            }

            // ✅ Home 탭일 경우, 특정 경로에서도 active 처리
            if (
              item.id === 'home' &&
              (
                location.pathname.startsWith('/main')||
                location.pathname.startsWith('/artist')
              )
            ) {
              return 'nav-item active';
            }

            // 기본 isActive 기준
            return `nav-item${isActive ? ' active' : ''}`;
          }}
        >
          <div className="nav-icon">{item.icon}</div>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
