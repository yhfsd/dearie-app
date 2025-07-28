// TosectionDetail.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import html2canvas from 'html2canvas';
import { artists } from '../../artistsData';
import './TosectionDetail.css';

import { GoShareAndroid } from 'react-icons/go';
import { PiSiren } from 'react-icons/pi';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { IoIosMore } from 'react-icons/io';
import { BsChevronDoubleDown } from 'react-icons/bs';

const TosectionDetail = () => {
  const { artistKey, index } = useParams();
  const artist = artists.find(a => a.key === artistKey);
  const initialIndex = parseInt(index, 10) || 0;

  // 좋아요 관리
  const [likedMap, setLikedMap] = useState(() => {
    const saved = localStorage.getItem('dearie-liked-map');
    return saved ? JSON.parse(saved) : {};
  });
  const toggleLike = (key, i) => {
    const mapKey = `${key}_${i}`;
    const updated = { ...likedMap };
    if (updated[mapKey]) delete updated[mapKey];
    else updated[mapKey] = true;
    setLikedMap(updated);
    localStorage.setItem('dearie-liked-map', JSON.stringify(updated));
  };

  // 옵션·신고·토스트
  const [showOptions, setShowOptions] = useState(null);
  const [showReportModalIndex, setShowReportModalIndex] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Swiper ref & “다음” 힌트 토글
  const swiperRef = useRef(null);
  const [showNextIcon, setShowNextIcon] = useState(true);
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;
    const update = () => setShowNextIcon(!swiper.isEnd);
    swiper.on('slideChange', update);
    update();
  }, []);

  if (!artist || !artist.penletter) return <div>데이터가 없습니다.</div>;

  const fakeDates = artist.penletter.map((_, i) => `${Math.floor(i/2)+1}일 전`);

  const handleShare = async i => {
    const imgEl = document.querySelectorAll('.penletter-mainImg > img')[i];
    if (!imgEl) return;
    const canvas = await html2canvas(imgEl, { useCORS: true, backgroundColor: null });
    const dataUrl = canvas.toDataURL('image/png');
    const isMobile = /iPhone|Android/.test(navigator.userAgent);
    if (isMobile && navigator.canShare) {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'penletter.png', { type: 'image/png' });
      await navigator.share({ title: '팬레터', files: [file] });
    } else {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'penletter.png';
      link.click();
    }
  };

  return (
    <div className="detail-wrapper">
      <Swiper
        ref={swiperRef}
        direction="vertical"
        slidesPerView={1}
        mousewheel
        initialSlide={initialIndex}
        modules={[Mousewheel]}
        style={{ height: '100vh' }}
        autoHeight
      >
        {artist.penletter.map((src, i) => {
          const liked = !!likedMap[`${artistKey}_${i}`];
          const baseCnt = Number(artist.penletterLike?.[i] || 0);
          const likeCnt = liked ? baseCnt + 1 : baseCnt;

          return (
            <SwiperSlide key={i}>
              <section className="penletter-detail">
                <div className="penletter-inner">
                  <div className="penletter-mainImg">
                    <img src={`${import.meta.env.BASE_URL}${artist.penletter[i]}`} alt={`penletter-${i}`} />
                  </div>
                  <button
                    className="penletter-more"
                    onClick={e => { e.stopPropagation(); setShowOptions(i); }}
                  >
                    <IoIosMore />
                  </button>
                  <div className="penletter-icon-name-date">
                    <div className="imgBox">
                      <img src={`${import.meta.env.BASE_URL}${artist.penletter[i]}`} alt={`penletter-${i}`} />

                    </div>
                    <div className="penletter-name-date">
                      <span className="penletter-name">{artist.userName[i]}</span>
                      <span className="penletter-date">{fakeDates[i]}</span>
                    </div>
                  </div>
                  <div className="penletter-share-like">
                    <button
                      className={`penletter-like ${liked ? 'liked' : ''}`}
                      onClick={() => toggleLike(artistKey, i)}
                    >
                      {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
                    </button>
                    <span className="penletter-like-count">{likeCnt}</span>
                    <button className="penletter-share" onClick={() => handleShare(i)}>
                      <GoShareAndroid />
                    </button>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 다음 힌트 아이콘 */}
      {showNextIcon && (
        <div className="nextIcon">
          <BsChevronDoubleDown />
        </div>
      )}

      {/* 마지막 슬라이드 문구 */}
      {!showNextIcon && (
        <div className="lastSlideText">
          마지막 슬라이드입니다.
        </div>
      )}

      {/* 옵션 메뉴 */}
      {showOptions !== null && (
        <>
          <div className="penletter-options-backdrop" onClick={() => setShowOptions(null)} />
          <div className="penletter-options">
            <button
              className="penletter-report"
              onClick={() => {
                setShowOptions(null);
                setShowReportModalIndex(showOptions);
              }}
            >
              <PiSiren /> 신고하기
            </button>
          </div>
        </>
      )}

      {/* 신고 모달 */}
      {showReportModalIndex !== null && (
        <div
          className="penletter-modal-backdrop"
          onClick={() => setShowReportModalIndex(null)}
        >
          <div className="penletter-modal" onClick={e => e.stopPropagation()}>
            <div className="penletter-modal-window">
              <div className="penletter-modal-inner">
                <p>이 게시글을 신고하시겠습니까?</p>
                <div className="penletter-modal-buttons">
                  <button onClick={() => setShowReportModalIndex(null)}>취소</button>
                  <button onClick={() => {
                    setShowReportModalIndex(null);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                  }}>확인</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {showToast && <div className="penletter-toast">신고되었습니다.</div>}
    </div>
  );
};

export default TosectionDetail;
