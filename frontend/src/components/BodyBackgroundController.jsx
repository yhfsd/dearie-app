import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Path 기반 배경색과, /chatbot 경로에서 저장된 테마(heart/fire/green)에 따라
 * body 클래스 및 meta theme-color를 설정합니다.
 */
export default function BodyBackgroundController() {
  const { pathname } = useLocation();
  const storageKey = 'chatData';

  useEffect(() => {
    const pinkBgPaths        = ['/challenges/thisMonth', '/challenges/prevMonth_1', '/challenges/prevMonth_2'];
    const whiteBgPaths       = ['/closet', '/challenges', '/more', '/notifications', '/fan-log', '/likelist', '/postlist', '/calendar'];
    const transparentBgPaths = ['/chatbot'];

    // 기본 배경색
    let bgColor = '#121212';

    if (transparentBgPaths.some(p => pathname.startsWith(p))) {
      // /chatbot 경로: chatbot-body 클래스 추가
      document.body.classList.add('chatbot-body');

      // 저장된 테마 읽기
      let theme = '';
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        try {
          theme = JSON.parse(raw).theme;
        } catch {''}
      }

      // 테마별 색상 맵
      const themeColorMap = {
        heart: '#FF4187',   // 긍정: 분홍
        fire:  '#ffffff',   // 중립: 흰색
        green: '#E1FFE1',   // 부정: 연녹
      };

      if (theme in themeColorMap) {
        bgColor = themeColorMap[theme];
        document.body.classList.add(theme);
      } else {
        bgColor = 'transparent';
      }
    } else {
      // 챗봇 이외 경로: 관련 클래스 모두 제거
      document.body.classList.remove('chatbot-body', 'heart', 'fire', 'green');

      if (pinkBgPaths.some(p => pathname.startsWith(p))) {
        bgColor = '#FF4187';
      } else if (whiteBgPaths.some(p => pathname.startsWith(p))) {
        bgColor = '#ffffff';
      }
    }

    // body + html 배경색 적용
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;

    // theme-color meta 태그 업데이트
    const DEFAULT_COLOR = '#121212';
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', bgColor !== 'transparent' ? bgColor : DEFAULT_COLOR);

    // 언마운트 시 복원
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
      document.body.classList.remove('chatbot-body', 'heart', 'fire', 'green');
      if (meta) meta.setAttribute('content', DEFAULT_COLOR);
    };
  }, [pathname]);

  return null;
}
