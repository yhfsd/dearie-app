// src/pages/LikesList/LikesListPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {artists} from '../Home/Artist/artistsData.js';
import { IoChevronBack } from 'react-icons/io5';
import { IoMdHeart } from "react-icons/io";
import { BsChat, BsPatchCheckFill } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import './LikesListPage.css';

export default function LikesListPage() {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    // localStorage에서 모든 좋아요한 게시물 찾기
    const getAllLikedPosts = () => {
      const posts = [];
      
      // localStorage의 모든 키를 확인
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // -postLiked- 패턴의 키를 찾음
        if (key && key.includes('-postLiked-')) {
          const isLiked = localStorage.getItem(key) === 'true';
          
          if (isLiked) {
            // 키에서 아티스트 정보와 포스트 인덱스 추출
            const parts = key.split('-postLiked-');
            const artistKey = parts[0];
            const postIndex = parts[1];
            
            // 좋아요한 시간 가져오기 (새로운 키 패턴)
            const timestampKey = `${artistKey}-likedTime-${postIndex}`;
            const timestamp = parseInt(localStorage.getItem(timestampKey), 10) || 0;
            
            posts.push({
              id: key,
              artistKey,
              postIndex: parseInt(postIndex, 10),
              timestamp
            });
          }
        }
      }
      
      // 좋아요한 시간 순으로 정렬 (최신순)
      return posts.sort((a, b) => b.timestamp - a.timestamp);
    };

    setLikedPosts(getAllLikedPosts());
  }, []);

  // 좋아요 해제 함수 (이 페이지에서는 해제만 가능)
  const toggleLike = (artistKey, postIndex) => {
    const likedKey = `${artistKey}-postLiked-${postIndex}`;
    const likesKey = `${artistKey}-postLikes-${postIndex}`;
    const timestampKey = `${artistKey}-likedTime-${postIndex}`;
    
    const currentLikes = parseInt(localStorage.getItem(likesKey), 10) || 0;
    const newLikes = Math.max(0, currentLikes - 1);
    
    // localStorage에서 좋아요 정보 삭제
    localStorage.setItem(likedKey, 'false');
    localStorage.setItem(likesKey, newLikes.toString());
    localStorage.removeItem(timestampKey); // 타임스탬프도 삭제
    
    // 목록에서 해당 게시물 제거
    setLikedPosts(prev => prev.filter(post => 
      !(post.artistKey === artistKey && post.postIndex === postIndex)
    ));
  };

  // 공유 함수
  const handleShare = (e, artistKey, postIndex) => {
    e.preventDefault();
    const url = `${window.location.origin}/artistPostDetail/${artistKey}/post/${postIndex}`;
    
    if (navigator.share) {
      navigator.share({
        title: '좋아요한 게시물',
        text: '이 게시물을 확인해보세요!',
        url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다!');
    }
  };

  return (
    <div className="likes-page">
      <div className="likes-content">
        {likedPosts.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">좋아요한 글이 없습니다.</p>
          </div>
        ) : (
          <div className="likes-wrap">
            <ul className="likes-list">
              {likedPosts.map((post, index) => {
                const artist = artists.find(a => a.key === post.artistKey);
                const profile = artist?.profiles?.[post.postIndex];
                const profileName = profile?.profileName || '작성자';
                const postText = profile?.postText || '내용 없음';
                const postImg = profile?.postImg
                const profileImg = profile?.profileImg
                const postTime = profile?.postTime

                  return (
                    <li key={`${post.artistKey}-${post.postIndex}-${index}`} className="liked-post">
                      <div className="liked-post-inner">
                        <Link 
                          to={`/artistPostDetail/${post.artistKey}/post/${post.postIndex}`} 
                          className="post-link"
                        >
                          <div className="profile-box">
                            <div className="profileImg">
                              <img src={`${import.meta.env.BASE_URL}${profileImg}`} alt="profileImg" />
                            </div>
                          <div className="profile-info">
                            <div className="profile-name">
                              {profileName}<BsPatchCheckFill style={{ color: '#FF4187' }} />
                            </div>
                            <div className="post-time">
                              {postTime}
                            </div>
                            </div>
                          </div>

                          <div className="text-box">
                            {postText.split('\n').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>

                          <div className="img-Box">
                            <img src={`${import.meta.env.BASE_URL}${postImg}`} alt="postImg" />
                          </div>

                          <div className="icon-box">
                            <IoMdHeart
                              style={{ fill: '#FF4187', cursor: 'pointer' }}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleLike(post.artistKey, post.postIndex);
                              }}
                            />
                            <BsChat style={{transform: 'scaleX(-1)' }} />
                            <LuSend
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => handleShare(e, post.artistKey, post.postIndex)}
                            />
                          </div>
                        </Link>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// 다른 페이지에서 사용할 유틸리티 함수들
export const likeUtils = {
  // 좋아요 추가 시 타임스탬프 저장
  saveLikeTimestamp: (artistKey, postIndex) => {
    const timestampKey = `${artistKey}-likedTime-${postIndex}`;
    localStorage.setItem(timestampKey, Date.now().toString());
  },

  // 좋아요 제거 시 타임스탬프 삭제
  removeLikeTimestamp: (artistKey, postIndex) => {
    const timestampKey = `${artistKey}-likedTime-${postIndex}`;
    localStorage.removeItem(timestampKey);
  }
};