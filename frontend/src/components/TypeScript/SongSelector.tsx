// src/components/TypeScript/SongSelector.tsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SongSelector.css';
import { Song } from './emusics';
import CustomAudioPlayer from './CustomAudioPlayer';
// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper modules
import { Navigation, Pagination } from 'swiper/modules';
// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SongSelectorProps {
  emotion: string;
  songs: Song[];
  onClose: () => void;
  onSelect: (song: Song) => void;
}

export default function SongSelector({ emotion, songs, onClose, onSelect }: SongSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // 초기 슬라이드 설정
  useEffect(() => {
    if (songs.length > 0) setActiveIndex(0);
  }, [songs]);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const overlay = (
    <div className="song-selector-overlay" onClick={onClose}>
      <div className="song-selector" onClick={e => e.stopPropagation()}>
        <div className="song-selector-inner">
          <div className="titleBox">
            <p className="text">키워드에 대한 음악 추천중 ···</p>
            <p className="text">듣고 싶은 음악을 골라보세요</p>
          </div>

          <Swiper
            initialSlide={0}
            slidesPerView="auto"
            centeredSlides
            spaceBetween={24}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
            className="song-swiper"
          >
            {songs.map((song, idx) => (
              <SwiperSlide key={idx} className="song-slide">
                <div className="slider-box">
                  <div className="imgBox">
                    <img
                      src={song.img}
                      alt={song.title}
                      className="slide-cover"
                    />
                  </div>
                  <div className="slide-info">
                    <div className="slide-title">{song.title}</div>
                    <div className="slide-artist">{song.groupName}</div>
                  </div>

                  {/* active 슬라이드에만 커스텀 플레이어 표시 */}
                  <div className="player-wrapper">
                    <CustomAudioPlayer
                      src={song.src}
                      coverImg={song.img}
                      title={song.title}
                      artist={song.groupName}
                      isActive={activeIndex === idx}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="bottom-btnBox">
          {/* onSelect만 호출, 모달 닫기는 부모에서 처리 */}
          <button
            className='select-btn'
            onClick={() => onSelect(songs[activeIndex])}
          >
            선택 완료
          </button>
          <button className="close-btn" onClick={onClose}>
            선택하지 않고 넘어갈게요
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}
