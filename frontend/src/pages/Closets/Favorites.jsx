import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';
import { MdCancel } from "react-icons/md";
import { mainImgs } from './ClosetImg';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // 이미지를 가져오는 함수
  const getItemImage = (teamId, itemId) => {
    // teamId에 따라 이미지 키 생성
    let imageKey;
    if (teamId === 1) {
      // All 그룹의 경우 aespa 또는 ive 이미지 사용
      imageKey = `aespaReviewImg${itemId}_1`;
      // aespa 이미지가 없으면 ive 이미지 시도
      if (!mainImgs[imageKey]) {
        imageKey = `IVEReviewImg${itemId}_1`;
      }
      // 그것도 없으면 all 이미지 사용
      if (!mainImgs[imageKey]) {
        imageKey = `allReviewImg${itemId}_1`;
      }
    } else if (teamId === 2) {
      imageKey = `IUReviewImg${itemId}_1`;
    } else if (teamId === 3) {
      imageKey = `TXTReviewImg${itemId}_1`;
    } else if (teamId === 4) {
      imageKey = `aespaReviewImg${itemId}_1`;
    } else if (teamId === 5) {
      imageKey = `IVEReviewImg${itemId}_1`;
    } else if (teamId === 6) {
      imageKey = `RIIZEReviewImg${itemId}_1`;
    }

    return mainImgs[imageKey] || mainImgs['allReviewImg1_1']; // 기본 이미지
  };

  // 처음 마운트 시 localStorage에서 불러오기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  // 삭제 핸들러
  const handleDelete = (teamId, itemId) => {
    const updated = favorites.filter(
      (item) => !(item.teamId === teamId && item.itemId === itemId)
    );
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return <p className='noItem'>찜한 아이템이 없습니다.</p>;
  }

  return (
    <div className="favorites-wrap">
      <div className="favorites-container">
        <ul>
          {favorites.map((item, index) => (
            <li key={index}>
              <div className="favorites-buttonBox">
                <Link to={`/closet/closetDetail/${item.teamId}/${item.itemId}`}>
                  <div className="favorites-imgBox">
                    <img
                      src={getItemImage(item.teamId, item.itemId)}
                      alt={`Team ${item.teamId} Item ${item.itemId}`}
                    />
                  </div>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(item.teamId, item.itemId)}>
                  <IoMdHeart style={{color: "#FF4187"}}/><IoMdHeartEmpty />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}