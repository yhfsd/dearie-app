import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lectureStatusData } from './ClosetData';
import './ClosetDetail.css';
import { IoIosLink } from "react-icons/io";
import { IoHeartOutline,IoHeartSharp} from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

export default function ClosetDetail() {
  const { teamId, itemId } = useParams();

  // 해당 아이템 정보 가져오기
  const team = lectureStatusData.find(item => item.id === parseInt(teamId));
  const img = team?.[`img${itemId}`];
  const text = team?.[`text${itemId}`];
  const group = team?.['group'];
  const price = team?.[`price${itemId}`];
  const review = team?.[`review${itemId}`];
  const reviewText = team?.[`reviewText${itemId}`];
  const itemLink = team?.[`itemLink${itemId}`];

  // 찜 여부 상태
  const [opacity, setOpacity] = useState(0);

  // 초기 로드시 localStorage에 이미 찜했는지 확인
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = existing.some(
      item => item.teamId === parseInt(teamId) && item.itemId === parseInt(itemId)
    );
    if (isFavorite) {
      setOpacity(1);
    }
  }, [teamId, itemId]);

  // 하트 클릭 시 추가/제거
  const handleClick = () => {
    if (!team || !img) return;

    const favoriteItem = {
      teamId: parseInt(teamId),
      itemId: parseInt(itemId),
      text,
      group
    };

    const existing = JSON.parse(localStorage.getItem('favorites')) || [];

    const isAlreadyFavorite = existing.some(
      item => item.teamId === favoriteItem.teamId && item.itemId === favoriteItem.itemId
    );

    if (!isAlreadyFavorite) {
      // 추가
      existing.push(favoriteItem);
      localStorage.setItem('favorites', JSON.stringify(existing));
      setOpacity(1);
    } else {
      // 제거
      const updated = existing.filter(
        item => !(item.teamId === favoriteItem.teamId && item.itemId === favoriteItem.itemId)
      );
      localStorage.setItem('favorites', JSON.stringify(updated));
      setOpacity(0);
    }
  };

  // 잘못된 접근 처리
  if (!team || !img) {
    return <p>잘못된 접근입니다. 경로가 잘못되었거나 데이터가 없습니다.</p>;
  }

  return (
    <div className="wrap">
      <div className="closetDetail-container">
        <div className="closetDetail-topBox">
          <div className="closetDetail-titleBox">
            <p className='group'>{group}</p>
            <p className='text'>{text}</p>
            <div className='price'>
              {price}
              <div className="heart">
                <IoHeartOutline style={{ opacity: 1, position: 'relative', zIndex: 2 }} onClick={handleClick} />
                <IoHeartSharp style={{ opacity, display: opacity === 0 ? 'none' : 'block' }} onClick={handleClick} />
              </div>
            </div>
          </div>
          <div className="closetDetail-imgBox">
            <img src={img} alt='메인이미지' />
            <a href={itemLink} target="_blank" rel="noopener noreferrer"><IoIosLink /></a>
          </div>
        </div>
        <div className="closetDetail-reviewBox">
          <p className="review">✨ review</p>
          <Swiper
            modules={[Mousewheel]}
            spaceBetween={10}
            slidesPerView={'auto'}
            mousewheel={{ forceToAxis: true }}
            className="review-swiper"
          >
            {review?.map((img, index) => (
              <SwiperSlide key={index} style={{ width: 'auto' }}>
                <div className="reviewImgBox">
                  <img src={img} alt="review" />
                </div>
                <div className="reviewTextBox">
                  <p>{reviewText?.[index]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
