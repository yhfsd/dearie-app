// src/components/Notification/NotificationBell.jsx
import React, { useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useLocation } from 'react-router-dom';

export default function NotificationBell() {
  const { notifications } = useNotifications();
  const { pathname } = useLocation();

  // 1) 로컬스토리지에서 초기 즐겨찾기 불러오기
  const [pickedGroups, setPickedGroups] = useState(() => {
    const raw = localStorage.getItem('pickedGroups');
    return raw ? JSON.parse(raw) : [];
  });

  // 2) 컴포넌트 마운트 시 + 커스텀 이벤트 구독
  useEffect(() => {
    const onChange = () => {
      const raw = localStorage.getItem('pickedGroups');
      setPickedGroups(raw ? JSON.parse(raw) : []);
    };
    window.addEventListener('pickedGroupsChanged', onChange);
    return () => window.removeEventListener('pickedGroupsChanged', onChange);
  }, []);

  // 3) 즐겨찾기한 타입만 카운트
  const pickedTypes = pickedGroups.map(g => g.id.toUpperCase());
  const unreadCount = notifications
    .filter(n => !n.isRead)
    .filter(n => pickedTypes.includes(String(n.type).toUpperCase()))
    .length;

  if (unreadCount === 0) return null;

  const specialPaths = ['/challenges/thisMonth','/challenges/prevMonth_1'];
  const isSpecialArea = specialPaths.some(p => pathname.startsWith(p));
  const badgeClass = isSpecialArea
    ? 'notif-count notif-special'
    : 'notif-count';

  return (
    <span className={badgeClass}>
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
}
