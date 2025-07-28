// src/pages/FanLog/ViewEntryPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import './ViewEntryPage.css';

// Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

export default function ViewEntryPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // URL 파라미터
  const year  = params.get('year') || '';
  const month = params.get('month') || '';
  const day   = params.get('day') || '';

  // ✅ 수정 버튼 동작 (useCallback으로 고정)
  const goEdit = useCallback(() => {
    navigate(`/fan-log/write?year=${year}&month=${month}&day=${day}`);
  }, [navigate, year, month, day]);

  // ✅ fanLogEdit 이벤트 발생 시 goEdit 실행
  useEffect(() => {
    const handler = () => goEdit();
    window.addEventListener('fanLogEdit', handler);
    return () => window.removeEventListener('fanLogEdit', handler);
  }, [goEdit]);

  // 요일 계산
  const WEEKDAYS_KR = ['일','월','화','수','목','금','토'];
  const dateObj = new Date(+year, +month - 1, +day);
  const weekday = WEEKDAYS_KR[dateObj.getDay()] || '';

  // 사용자 정보
  const [userName, setUserName] = useState('익명');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
    const storedImg = localStorage.getItem('profileImage');
    if (storedImg) setProfileImage(storedImg);
  }, []);

  // 프로필 이미지
  const profileSrc = profileImage || '/More/default-profile.png';

  // 작성된 엔트리
  const [entry, setEntry] = useState({
    text: '',
    images: [],
    links: [],
    selectedTab: '',
    createdAt: ''
  });

  useEffect(() => {
    const key = `fanLogEntry-${year}-${month}-${day}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setEntry({
          text:        data.text || '',
          images:      data.images || [],
          links:       data.links || [],
          selectedTab: data.selectedTab || '',
          createdAt:   data.createdAt || '',
        });
      } catch (e) {
        console.error('Entry parse error', e);
      }
    }
  }, [year, month, day]);

  function getTimeAgo(isoString) {
    if (!isoString) return '';
    const now = new Date();
    const time = new Date(isoString);
    const diffSec = Math.floor((now - time) / 1000);

    if (diffSec < 60) return '지금';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}일 전`;

    return time.toLocaleDateString();
  }

  return (
    <div className="view-entry-container">
      <div className="view-entry-inner">
        <div className="ve-date-title">
          <h1 className="ve-title">
            {month}월 {day}일
            <span className="ve-weekday">({weekday})</span>
          </h1>
        </div>

        {/* ✅ 수정 버튼 */}
        <button className="ve-edit-btn" onClick={goEdit}>
          수정
        </button>

        <header className="ve-header">
          <div className="imgBox">
                      <img
            src={profileSrc}
            alt="profile"
            className="ve-profile-img"
            onError={e => {
              e.currentTarget.src = '/More/default-profile.png';
            }}
          />
          </div>
          <div className="ve-user-info">
            <div className="user-info">
              <span className="ve-username">{userName}</span>
              {entry.createdAt && (
                <span className="ve-timeago">{getTimeAgo(entry.createdAt)}</span>
              )}
            </div>
            {entry.selectedTab && (
              <span className="ve-group-badge">{entry.selectedTab}</span>
            )}
          </div>
        </header>

        <p className="ve-text">{entry.text || '내용이 없습니다.'}</p>
      </div>

      <div className="ve-content">
        {entry.images.length > 0 && (
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="ve-swiper"
          >
            {entry.images.map((img, i) => {
              const src = img.preview || (typeof img === 'string' ? img : '');
              if (!src) return null;
              return (
                <SwiperSlide key={i} className="ve-swiper-slide">
                  <img
                    className="ve-image"
                    src={src}
                    alt={`attachment-${i}`}
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      console.warn('Image failed to load:', src);
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {entry.links.map((url, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ve-link"
          >
            {url}
          </a>
        ))}
      </div>
    </div>
  );
}
