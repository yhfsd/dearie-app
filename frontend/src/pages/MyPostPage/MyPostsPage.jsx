// src/pages/FanLog/MyPostsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './MyPostsPage.css';

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
    // 사용자 정보
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);

    const storedImg = localStorage.getItem('profileImage');
    if (storedImg) setProfileImage(storedImg);

    const combinedEntries = [];

    // 1. fanTalkEntries-${key}-0 불러오기
    const artistKeys = ['aespa', 'riize', 'iu', 'ive', 'txt'];

    artistKeys.forEach((key) => {
      const fanTalkRaw = localStorage.getItem(`fanTalkEntries-${key}-0`);
      if (fanTalkRaw) {
        try {
          const parsed = JSON.parse(fanTalkRaw);
          parsed.forEach((entry) => {
            const date = new Date(entry.timestamp);
            combinedEntries.push({
              ...entry,
              createdAt: entry.timestamp,
              selectedTab: entry.selectedTab || `talk`,
              artistKey: key, // 🔥 여기서 키 넣어줌!
              year: date.getFullYear(),
              month: String(date.getMonth() + 1).padStart(2, '0'),
              day: String(date.getDate()).padStart(2, '0'),
            });
          });
        } catch (e) {
          console.error(`fanTalkEntries-${key}-0 파싱 오류:`, e);
        }
      }
    });


    // 2. fanLogEntry-YYYY-MM-DD 형식 데이터 모두 불러오기
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('fanLogEntry-')) {
        const [, year, month, day] = key.split('-');
        try {
          const entry = JSON.parse(localStorage.getItem(key));
          combinedEntries.push({
            ...entry,
            createdAt: entry.createdAt,
            selectedTab: entry.selectedTab || '팬로그',
            year,
            month,
            day,
          });
        } catch (e) {
          console.warn(`fanLogEntry 파싱 오류: ${key}`, e);
        }
      }
    }

    // 3. 새로운 것이 먼저 출력되도록 오름차순 정렬
    combinedEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setEntries(combinedEntries);
  }, []);

  const handleView = (entry) => {
  if (entry.selectedTab === 'talk') {
    const artistKey = entry.artistKey || 'aespa'; // ✔ 이 방식 추천
    const profileIndex = 0;
    const entryId = entry.id;

    navigate(`/talkPostDetail/${artistKey}/${profileIndex}/user/${entryId}`);
  } else {
    const { year, month, day } = entry;
    navigate(`/fan-log/view?year=${year}&month=${month}&day=${day}`);
  }
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
                key={entry.id || `${entry.year}-${entry.month}-${entry.day}`}
                className="post-item"
                onClick={() => handleView(entry)}
              >
                {/* 유저 정보 */}
                <div className="entry-header">
                  <div className="imgBox">
                    <img
                      className="entry-avatar"
                      src={profileImage || '/More/default-profile.png'}
                      alt="avatar"
                      onError={e => { e.currentTarget.src = '/More/default-profile.png'; }}
                    />
                  </div>
                  <div className="title-inner">
                    <div className="entry-user-info">
                      <span className="entry-username">{userName}</span>
                      <span className="entry-timeago">{getTimeAgo(entry.createdAt)}</span>
                    </div>
                    <div 
                    className="item-category" 
                    style={entry.selectedTab === 'talk' ? { backgroundColor: '#121212'} : {}}
                    >
                      {entry.selectedTab}
                    </div>
                  </div>
                </div>

                {/* 본문 텍스트 */}
                <div className="item-text">{entry.text}</div>

                {/* 이미지 */}
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

                {/* 링크 */}
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
