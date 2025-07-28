// src/pages/Notifications/NotificationsPage.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './NotificationsPage.css';

import banner from '../../assets/Notifications/banner.png';
import txtIcon   from '../../assets/Tabs/txt.png';
import aespaIcon from '../../assets/Tabs/asepa.png';
import iuIcon    from '../../assets/Tabs/iu.png';
import riizeIcon from '../../assets/Tabs/riize.png';
import iveIcon   from '../../assets/Tabs/ive.png';

const ICON_MAP = {
  TXT:   txtIcon,
  AESPA: aespaIcon,
  IU:    iuIcon,
  RIIZE: riizeIcon,
  IVE:   iveIcon,
  ALL:   '',
};

export default function NotificationsPage() {
  const { notifications, markAsRead } = useNotifications();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('ALL');
  const [pickedGroups, setPickedGroups] = useState([]);

  // 1) 즐겨찾기 그룹 로컬스토리지에서 불러오기
  useEffect(() => {
    const raw = localStorage.getItem('pickedGroups');
    if (raw) {
      try {
        setPickedGroups(JSON.parse(raw));
      } catch (e) {
        console.warn('pickedGroups 파싱 실패:', e);
      }
    }
  }, []);

  // 2) 탭 리스트 생성 (ALL + 즐겨찾기한 그룹들)
  const tabs = useMemo(
    () => ['ALL', ...pickedGroups.map(g => g.id.toUpperCase())],
    [pickedGroups]
  );

  // 3) 필터링: ALL일 땐 즐겨찾기한 그룹 알림만, 아니면 특정 타입만
  const filtered = useMemo(() => {
    const pickedTypes = pickedGroups.map(g => g.id.toUpperCase());
    return notifications.filter(n => {
      const t = String(n.type).toUpperCase();
      if (filter === 'ALL') {
        return pickedTypes.includes(t);
      }
      return t === filter;
    });
  }, [notifications, filter, pickedGroups]);

  // 4) 날짜별 그룹핑
  const grouped = useMemo(() => {
    const today = dayjs();
    const groups = { 오늘: [], 어제: [], 이전: [] };
    filtered.forEach(n => {
      const diff = today.diff(dayjs(n.createdAt), 'day');
      const key = diff === 0 ? '오늘' : diff === 1 ? '어제' : '이전';
      groups[key].push(n);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="notifications-page">
      {/* 배너 */}
      <div className="imgBox">
        <img src={banner} alt="알림 배너" className="banner-image" />
      </div>

      {/* 탭 */}
      <div className="tabSection">
        <div className="tabs">
          {tabs.map(type => {
            const icon = ICON_MAP[type];
            return (
              <button
                key={type}
                className={filter === type ? 'active' : ''}
                onClick={() => setFilter(type)}
              >
                {icon && <img src={icon} alt={type} className="tab-icon" />}
                <span>{type}</span>
              </button>
            );
          })}
        </div>

        {/* 알림 리스트 */}
        {filtered.length === 0 ? (
          <div className="no-notifs">알림이 없습니다.</div>
        ) : (
          Object.entries(grouped).map(([label, list]) =>
            list.length > 0 && (
              <section key={label}>
                <h2 className="day-title">{label}</h2>
                {list.map(n => {
                  const url = n.payload?.url;
                  const icon = ICON_MAP[String(n.type).toUpperCase()];

                  return (
                    <article
                      key={n._id}
                      className={`notif-item ${n.isRead ? 'read' : 'unread'}`}
                      onClick={() => {
                        markAsRead(n._id);
                        if (url && /^https?:\/\//.test(url)) {
                          // 외부 링크: 새 탭 열기
                          window.open(url, '_blank');
                        } else {
                          // 내부 링크: 리액트 라우터로 이동
                          navigate(url || '/');
                        }
                      }}
                    >
                      <div className="avatar">
                        {icon
                          ? <img src={icon} alt={n.type} className="notif-avatar-icon" />
                          : <span className="notif-emoji">🔔</span>}
                      </div>

                      <div className="content">
                        <strong>{n.title}</strong>
                        <div className="text">
                          <p>{n.message}</p>
                          <span>· </span>
                          <time>{dayjs(n.createdAt).format('YYYY. MM. DD. HH:mm')}</time>
                        </div>
                      </div>

                      {n.payload?.imageUrl && (
                        <div className="notif-image">
                          <img
                            src={n.payload.imageUrl}
                            alt="notification media"
                            className="notif-media"
                          />
                        </div>
                      )}
                    </article>
                  );
                })}
              </section>
            )
          )
        )}
      </div>
    </div>
  );
}
