// src/pages/FanLog/MyPostsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
// Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './MyPostsPage.css';

// 시간 경과 표시 헬퍼
function getTimeAgo(isoString) {
  if (!isoString) return '';
  const now = new Date();
  const time = new Date(isoString);
  const diffSec = Math.floor((now - time) / 1000);
  if (diffSec < 60) return '방금';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}일 전`;
  return time.toLocaleDateString();
}

export default function MyPostsPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [userName, setUserName] = useState('익명');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // 전역 사용자 정보 불러오기
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
    const storedImg = localStorage.getItem('profileImage');
    if (storedImg) setProfileImage(storedImg);

    // fanLogEntry- 접두어로 저장된 모든 항목 불러오기
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('fanLogEntry-')) {
        const [, year, month, day] = key.split('-');
        try {
          const entry = JSON.parse(localStorage.getItem(key));
          items.push({ year, month, day, ...entry });
        } catch {
          console.warn(`Invalid entry for key ${key}`);
        }
      }
    }
    // 생성일(createdAt) 기준 내림차순 정렬
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setEntries(items);
  }, []);

  const handleView = entry => {
    const { year, month, day } = entry;
    navigate(`/fan-log/view?year=${year}&month=${month}&day=${day}`);
  };

  return (
    <div className="my-posts-page">
      <main className="my-posts-content">
        {entries.length === 0 ? (
          <p className="empty-text">작성된 글이 없습니다.</p>
        ) : (
          <ul className="posts-list">
            {entries.map(entry => (
              <li
                key={`${entry.year}-${entry.month}-${entry.day}`}
                className="post-item"
                onClick={() => handleView(entry)}
              >
                {/* 유저 정보 */}
                <div className="entry-header">
                  <img
                    className="entry-avatar"
                    src={profileImage || '/More/default-profile.png'}
                    alt="avatar"
                    onError={e => { e.currentTarget.src = '/More/default-profile.png'; }}
                  />
                  <div className="title-inner">
                                      <div className="entry-user-info">
                    <span className="entry-username">{userName}</span>
                    <span className="entry-timeago">{getTimeAgo(entry.createdAt)}</span>
                  </div>
                  <div className="item-category">{entry.selectedTab}</div>
                  </div>
                </div>
                
                {/* 본문 텍스트 */}
                <div className="item-text">{entry.text}</div>

                {/* 이미지 렌더링 (Swiper 적용) */}
                {entry.images?.length > 0 && (
                  entry.images.length > 1 ? (
                    <Swiper
                      spaceBetween={12}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                      className="item-images-swiper"
                    >
                      {entry.images.map((img, idx) => {
                        const src = img.preview || (typeof img === 'string' ? img : '');
                        return src ? (
                          <SwiperSlide key={idx} className="item-images-slide">
                            <img
                              className="item-image"
                              src={src}
                              alt={`slide-${idx}`}
                              onError={e => { e.currentTarget.style.display = 'none'; }}
                            />
                          </SwiperSlide>
                        ) : null;
                      })}
                    </Swiper>
                  ) : (
                    <div className="item-images">
                      <img
                        className="item-image"
                        src={
                          entry.images[0].preview ||
                          (typeof entry.images[0] === 'string' ? entry.images[0] : '')
                        }
                        alt="single-img"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )
                )}

                {/* 링크 렌더링 */}
                {entry.links?.length > 0 && (
                  <div className="item-links">
                    {entry.links.map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="item-link"
                      >
                        {url}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}