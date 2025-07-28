// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import { NotificationProvider } from './contexts/NotificationContext';




import Home from './pages/Home/Home';
import More from './pages/More/More';
import Closet from './pages/Closets/Closet';
import ClosetDetail from './pages/Closets/ClosetDetail';
import Favorites from './pages/Closets/Favorites';
import Calendar from './pages/Calendar/Calendar';
import ChallengeZone from './pages/Challenges/ChallengeZone';
import ThisMonth from './pages/Challenges/ThisMonth';
import PrevMonth_1 from './pages/Challenges/PrevMonth_1';
import PrevMonth_2 from './pages/Challenges/PrevMonth_2';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import FanLogPage from './pages/FanLog/FanLogPage';
import ThemePage from './pages/FanLog/ThemePage';
import WriteEntryPage from './pages/FanLog/WriteEntryPage';
import ViewEntryPage from './pages/FanLog/ViewEntryPage';
import LikesListPage from './pages/LikeList/LikesListPage';
import MyPostsPage from './pages/MyPostPage/MyPostsPage';
import ArtistPage from './pages/Home/Artist/ArtistPage';
import Mainpage from './pages/Home/Artist/Mainpage';
import ChatbotPage from './pages/ChatbotPage';
import NoticeDetail from "./pages/Home/Artist/sections/Detail/NoticeDetail";
import TosectionDetail from './pages/Home/Artist/sections/Detail/TosectionDetail';
import ArtistPostDetail from './pages/Home/Artist/sections/Detail/ArtistPostDetail';
import TalkPostDetail from './pages/Home/Artist/sections/Detail/TalkPostDetail';
import TalkWritingPage from './pages/Home/Artist/sections/Detail/TalkWritingPage';


function BodyBackgroundController() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pinkBgPaths  = ['/challenges/thisMonth', '/challenges/prevMonth_1', '/challenges/prevMonth_2'];
    const whiteBgPaths = ['/closet', '/challenges', '/more', '/notifications', '/fan-log', '/likelist', '/postlist', '/calendar'];
    const blueBgPaths  = ['/chatbot'];

    let bgColor = '#121212'; // 기본 색상

    if (blueBgPaths.some(p => pathname.startsWith(p))) {
      bgColor = '#07004B ';    // 챗봇 경로: 남색
    } else if (pinkBgPaths.some(p => pathname.startsWith(p))) {
      bgColor = '#FF4187';    // 분홍색 경로
    } else if (whiteBgPaths.some(p => pathname.startsWith(p))) {
      bgColor = '#fff';       // 흰색 경로
    }
    // else는 이미 기본 색상(#121212)을 유지

    document.body.style.backgroundColor = bgColor;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', bgColor);

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [pathname]);

  return null;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  );
  const location = useLocation();

  useEffect(() => {
    if (
      isLoggedIn &&
      location.pathname !== '/' &&
      location.pathname !== '/login'
    ) {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location, isLoggedIn]);

  const savedLast = localStorage.getItem('lastPath') || '/';

  return (
    <>
  <div className="app-container">
          <BodyBackgroundController />
      <ScrollToTop />

      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/" replace />
              : <LoginPage setIsLoggedIn={setIsLoggedIn} />
          }
        />

        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to={savedLast} replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/*"
          element={
            isLoggedIn
              ? (
                  <NotificationProvider>
                    <Layout setIsLoggedIn={setIsLoggedIn} />
                  </NotificationProvider>
                )
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Home />} />
          <Route path="artist/:id" element={<ArtistPage />} />
          <Route path="main" element={<Mainpage />} />
          <Route path="challenges" element={<ChallengeZone />} />
          <Route path="challenges/thisMonth" element={<ThisMonth />} />
          <Route path="challenges/prevMonth_1" element={<PrevMonth_1 />} />
          <Route path="challenges/prevMonth_2" element={<PrevMonth_2 />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="closet" element={<Closet />} />
          <Route path="closet/closetDetail/:teamId/:itemId" element={<ClosetDetail />} />
          <Route path="closet/favorites" element={<Favorites />} />
          <Route path="more" element={<More />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path='fan-log' element={<FanLogPage />}></Route>
          <Route path='fan-log/theme' element={<ThemePage />}></Route>
          <Route path="fan-log/write" element={<WriteEntryPage />} />
          <Route path="fan-log/view" element={<ViewEntryPage />} />
          <Route path="likelist" element={<LikesListPage />} />
          <Route path="postlist" element={<MyPostsPage />} />
          <Route path="artistPostDetail/:id/post/:postId" element={<ArtistPostDetail />} />
          <Route path="penletter/:artistKey/:index" element={<TosectionDetail />} />
          <Route path="notice/:artistKey/:slug" element={<NoticeDetail />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          <Route path="talkWritingPage/:artistKey/:postId" element={<TalkWritingPage />} />
          <Route path="talkPostDetail/:artistKey/:profileIndex/:postType/:entryId" element={<TalkPostDetail />} />
        </Route>
      </Routes>
  </div>
    </>
  );
};

export default App;