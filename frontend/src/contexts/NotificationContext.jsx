// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readIds, setReadIds] = useState(() => {
    // 로컬스토리지에서 읽은 ID 목록 불러오기
    try {
      return JSON.parse(localStorage.getItem('readNotifications')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    api.get('/notifications', { params: { userId: 'testUser' } })
      .then(res => {
        // 로컬Storage의 readIds 기준으로만 isRead 설정 (백엔드 isRead 무시)
        const data = res.data.map(n => ({
          ...n,
          isRead: readIds.includes(n._id)
        }));
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length);
      })
      .catch(err => console.error(err));
  }, [readIds]);

  const markAsRead = id => {
    // 클라이언트 메모리 업데이트
    setNotifications(prev =>
      prev.map(n => n._id === id ? { ...n, isRead: true } : n)
    );
    setUnreadCount(c => Math.max(0, c - 1));

    // 로컬스토리지에 추가
    const updated = [...new Set([...readIds, id])];
    setReadIds(updated);
    localStorage.setItem('readNotifications', JSON.stringify(updated));

    // 필요하다면 서버에도 반영
    // api.patch(`/notifications/${id}`, { isRead: true });
  };

  const clearReadFlags = () => {
    // 읽은 목록 초기화
    setReadIds([]);
    localStorage.removeItem('readNotifications');
    // 클라이언트 메모리 초기화
    setNotifications(prev => prev.map(n => ({ ...n, isRead: false })));
    setUnreadCount(notifications.length);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      clearReadFlags
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
