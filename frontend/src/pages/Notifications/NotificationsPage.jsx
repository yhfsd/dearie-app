// src/pages/Notifications/NotificationsPage.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './NotificationsPage.css';

import banner from '../../assets/Notifications/banner.png';
import cookie    from '../../assets/Notifications/cookie.png'
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



// 텍스트 분할 후 이미지 삽입
// NotificationsPage.jsx
function TitleWithIcon({ title, iconUrl }) {
  const marker = '님이';
  const idx = title.indexOf(marker);

  // “님이”가 없으면 그냥 텍스트만
  if (idx === -1) {
    return <span>{title}</span>;
  }

  return (
    <div className="title-with-icon">
      {/* marker 앞부분 */}
      <span>{title.substring(0, idx)}</span>
      {/* 아이콘 */}
      <img src={iconUrl} alt="" className="inline-thumb" />
      {/* marker 포함 뒷부분 */}
      <span>{title.substring(idx)}</span>
    </div>
  );
}



export default function NotificationsPage() {
  const { notifications, markAsRead } = useNotifications();
  const navigate = useNavigate();

  // 1) 즐겨찾기 그룹 불러오기
  const [pickedGroups, setPickedGroups] = useState([]);
  useEffect(() => {
    const raw = localStorage.getItem('pickedGroups');
    if (raw) {
      try { setPickedGroups(JSON.parse(raw)); }
      catch {''}
    }
  }, []);

  // 2) 분류 탭 상태
  const [filter, setFilter] = useState('ALL');
  const tabs = useMemo(
    () => ['ALL', ...pickedGroups.map(g => g.id.toUpperCase())],
    [pickedGroups]
  );

  // 3) 분류별 필터링
  const filteredNotifs = useMemo(() => {
    const t = filter.toUpperCase();
    if (t === 'ALL') {
      const pickedTypes = pickedGroups.map(g => g.id.toUpperCase());
      return notifications.filter(n => pickedTypes.includes(n.type.toUpperCase()));
    }
    return notifications.filter(n => n.type.toUpperCase() === t);
  }, [notifications, filter, pickedGroups]);

  // 4) 배치별 분리
  const batch1Notifs = filteredNotifs.filter(n => n.batch === 1);
  const batch2Notifs = filteredNotifs.filter(n => n.batch === 2);

  const batch1NotifsSorted = [...batch1Notifs].sort((a, b) =>
    dayjs(b.dayTime, 'YYYY. MM. DD. HH:mm').diff(
      dayjs(a.dayTime, 'YYYY. MM. DD. HH:mm')
    )
  );

    // (필요하다면 batch2도 똑같이 정렬)
  const batch2NotifsSorted = [...batch2Notifs].sort((a, b) =>
    dayjs(b.dayTime, 'YYYY. MM. DD. HH:mm').diff(
      dayjs(a.dayTime, 'YYYY. MM. DD. HH:mm')
    )
  );

  // 5) 알림창 컴포넌트
  const NotifGroup = ({ dayLabel, data }) => {
    const grouped = useMemo(() => {
      const today = dayjs();
      const groups = { 오늘: [], 어제: [], 이전: [] };
      data.forEach(n => {
        const diff = today.diff(dayjs(n.createdAt), 'day');
        const key = diff === 0 ? '오늘' : diff === 1 ? '어제' : '이전';
        groups[key].push(n);
      });
      return groups;
    }, [data]);

    return (
      <section className="notif-group">
        {Object.entries(grouped).map(([label, list]) =>
          list.length > 0 && (
            <div key={label}>
              <h3 className="day-title">{dayLabel}</h3>
              {list.map(n => {
                const url = n.payload?.url;
                const icon = ICON_MAP[n.type.toUpperCase()];
                return (
                  <article
                    key={n._id}
                    className={`notif-item ${n.isRead ? 'read' : 'unread'}`}
                    onClick={() => {
                      markAsRead(n._id);
                      if (url && /^https?:\/\//.test(url)) window.open(url, '_blank');
                      else navigate(url || '/');
                    }}
                  >
                    <div className="avatar">
                      {icon
                        ? <img src={icon} alt={n.type} className="notif-avatar-icon" />
                        : <span className="notif-emoji">🔔</span>}
                    </div>
                    <div className="content">
                      <TitleWithIcon title={n.title} iconUrl={cookie}/>
                      <div className="text">
                        <span>{n.message}</span>
                        <span>&nbsp;·&nbsp;</span>
                        <span>{n.dayTime}</span>
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
            </div>
          )
        )}
      </section>
    );
  };

  return (
    <div className="notifications-page">
      {/* 배너 */}
      <div className="imgBox">
        <img src={banner} alt="알림 배너" className="banner-image" />
      </div>

      {/* 분류 탭 (즐겨찾기한 아티스트만) */}
      <div className="tabSection">
        <div className="tabs">
          {tabs.map(type => (
            <button
              key={type}
              className={filter === type ? 'active' : ''}
              onClick={() => setFilter(type)}
            >
              {ICON_MAP[type] && <img src={ICON_MAP[type]} alt={type} className="tab-icon" />}
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 배치별 알림창 */}
      <NotifGroup dayLabel="어제" data={batch1NotifsSorted} />
      <NotifGroup dayLabel="이전" data={batch2NotifsSorted} />
    </div>
  );
}
