import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';
import { MdCancel } from "react-icons/md";
import { mainImgs } from './ClosetImg';
import { IoHeartOutline,IoHeartSharp} from "react-icons/io5";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // 이미지를 가져오는 함수
  const getItemImage = (teamId, itemId) => {
    // teamId에 따라 이미지 키 생성
    let imageKey;
    if (teamId === 1) {
        imageKey = `allImg${itemId}`;
    } else if (teamId === 2) {
      imageKey = `aespaImg${itemId}`;
    } else if (teamId === 3) {
      imageKey = `TXTImg${itemId}`;
    } else if (teamId === 4) {
      imageKey = `RIIZEImg${itemId}`;
    } else if (teamId === 5) {
      imageKey = `IUImg${itemId}`;
    } else if (teamId === 6) {
      imageKey = `IVEImg${itemId}`;
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
                  <IoHeartSharp style={{color: "#FF4187"}}/><IoHeartOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}