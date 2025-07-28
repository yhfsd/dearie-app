// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import ScrollToTop from './ScrollToTop';
import NotificationBell from './Notification/NotificationBell';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <NotificationBell />
      <main className='layout-content'>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
