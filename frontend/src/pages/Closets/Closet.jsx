import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Closet.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { lectureStatusData } from './ClosetData';

const Closet = () => {
  const [lectureStatus, setLectureStatus] = useState([]);

  //swiper 초기화
  const bestSwiperRef = useRef(null); 
  const newSwiperRef = useRef(null); 
  const comSwiperRef = useRef(null);

  useEffect(() => {
    const savedActiveId = localStorage.getItem('activeId');
    let initialStatus = lectureStatusData.map(item => ({
      ...item,
      isActive: item.id.toString() === savedActiveId
    }));
    if (!savedActiveId) {
      initialStatus = initialStatus.map((item, idx) =>
        idx === 0 ? { ...item, isActive: true } : { ...item, isActive: false }
      );
      localStorage.setItem('activeId', initialStatus[0].id);
    }
    setLectureStatus(initialStatus);
  }, []);

  //active핸들러, 처음에는 all에 active를 걸고 다른 버튼을 누르면 원래 걸려있던 active가 풀린다
  const handleButtonClick = (id) => {
    setLectureStatus(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
    localStorage.setItem('activeId', id);

    // Swiper 위치 초기화
    bestSwiperRef.current?.slideTo(0);
    newSwiperRef.current?.slideTo(0);
    comSwiperRef.current?.slideTo(0);
  };

  const activeItem = lectureStatus.find(item => item.isActive);
  if (!activeItem) return null;

  return (
    <div className="Closet-wrap">
      <div className="Closet-container">
        {/* button */}
        <div className="button-container">
          <Swiper
            modules={[Mousewheel]}
            spaceBetween={10}
            slidesPerView={'auto'}
            mousewheel={{ forceToAxis: true }}
          >
            {lectureStatus.map(item => (
              <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                <button
                  onClick={() => handleButtonClick(item.id)}
                  className={item.isActive ? 'active' : ''}
                >
                  {item.group}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Best Item */}
        <div className="bestItem">
          <p>❤️Best Item</p>
          <Swiper
            onSwiper={(swiper) => (bestSwiperRef.current = swiper)}
            modules={[Mousewheel]}
            spaceBetween={16}
            slidesPerView={'auto'}
            mousewheel={{ forceToAxis: true }}
          >
            {[1, 2, 3, 4, 5, 6].map(num =>
              activeItem[`img${num}`] ? (
                <SwiperSlide key={num}>
                  <Link to={`/closet/closetDetail/${activeItem.id}/${num}`}>
                    <div className="bestItemImgBox">
                      <img src={activeItem[`img${num}`]} alt={activeItem[`text${num}`]} />
                    </div>
                    <div className="bestItemTextBox">
                      <p className="multi-line">
                        {activeItem[`title${num}`]}<br />
                        {activeItem[`text${num}`]}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        </div>

        {/* New Item */}
        <div className="newItem">
          <p>❤️New Item</p>
          <Swiper
            onSwiper={(swiper) => (newSwiperRef.current = swiper)}
            modules={[Mousewheel]}
            spaceBetween={16}
            slidesPerView={'auto'}
            mousewheel={{ forceToAxis: true }}
          >
            {[1001, 1002, 1003, 1004, 1005, 1006].map(num =>
              activeItem[`img${num}`] ? (
                <SwiperSlide key={num}>
                  <a href={activeItem[`itemLink${num}`]} target="_blank" rel="noopener noreferrer">
                    <div className="newItemImgBox">
                      <img src={activeItem[`img${num}`]} alt={activeItem[`text${num}`]} />
                    </div>
                    <div className="newItemTextBox">
                      <p className="multi-line">{activeItem[`text${num}`]}</p>
                    </div>
                  </a>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        </div>

        {/* Commercial */}
        <div className="commercial">
          <p>❤️Commercial</p>
          <Swiper
            onSwiper={(swiper) => (comSwiperRef.current = swiper)}
            modules={[Mousewheel]}
            spaceBetween={16}
            slidesPerView={'auto'}
            mousewheel={{ forceToAxis: true }}
          >
            {[2001, 2002, 2003].map(num =>
              activeItem[`img${num}`] ? (
                <SwiperSlide key={num}>
                  <a href={activeItem[`itemLink${num}`]} target="_blank" rel="noopener noreferrer">
                    <div className="commercialImgBox">
                      <img src={activeItem[`img${num}`]} alt={activeItem[`text${num}`]} />
                    </div>
                                      <div className="commercialTextBox">
                    <p className="multi-line">{activeItem[`text${num}`]}</p>
                  </div>
                  </a>

                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Closet;
