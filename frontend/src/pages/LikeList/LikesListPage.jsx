// src/pages/LikesListPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoHeart } from 'react-icons/io5';
import './LikesListPage.css';

export default function LikesListPage() {
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    // 로컬스토리지에 저장된 좋아요 데이터 불러오기
    const stored = localStorage.getItem('likes');
    try {
      setLikes(stored ? JSON.parse(stored) : []);
    } catch {
      setLikes([]);
    }
  }, []);

  // 좋아요 항목 삭제 함수
  const handleRemove = (id) => {
    const updated = likes.filter(item => item.id !== id);
    setLikes(updated);
    localStorage.setItem('likes', JSON.stringify(updated));
  };

  return (
    <div className="likes-page">
      <main className="likes-content">
        {likes.length === 0 ? (
          <p className="empty-text">좋아요한 글이 없습니다.</p>
        ) : (
          <ul className="likes-list">
            {likes.map(item => (
              <li key={item.id} className="likes-item">
                <div
                  className="item-info"
                  onClick={() => navigate(item.link || '/')}
                >
                  {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
                  <span className="item-title">{item.title}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  <IoHeart size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
