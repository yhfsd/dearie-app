// src/pages/Home/Artist/ArtistSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ArtistSection.css';
import { likeUtils } from '../../../LikeList/LikesListPage'

import { LuSend } from "react-icons/lu";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat, BsPatchCheckFill } from "react-icons/bs";

const ArtistSection = ({ artist }) => {
  const [likesState, setLikesState] = useState({}); // 각 게시물의 좋아요 상태 저장

  useEffect(() => {
    if (!artist?.profiles) return;

    const initialState = {};
    artist.profiles.forEach((profile, index) => {
      const likedKey = `${artist.key}-postLiked-${index}`;
      const likesKey = `${artist.key}-postLikes-${index}`;
      const storedLiked = localStorage.getItem(likedKey) === 'true';
      const storedLikes = parseInt(localStorage.getItem(likesKey), 10);

      const defaultLikes = parseInt(profile.postLikes ?? '0', 10);

      initialState[index] = {
        liked: storedLiked,
        likes: isNaN(storedLikes) ? defaultLikes : storedLikes,
      };
    });

    setLikesState(initialState);
  }, [artist]);

  const toggleLike = (e, index) => {
    e.preventDefault(); // 링크 이동 방지

    setLikesState(prev => {
      const current = prev[index] || { liked: false, likes: 0 };
      const newLiked = !current.liked;
      const newLikes = newLiked ? current.likes + 1 : current.likes - 1;

      // localStorage 업데이트
      localStorage.setItem(`${artist.key}-postLiked-${index}`, newLiked.toString());
      localStorage.setItem(`${artist.key}-postLikes-${index}`, newLikes.toString());

      // 타임스탬프 관리
      if (newLiked) {
        likeUtils.saveLikeTimestamp(artist.key, index);
      } else {
        likeUtils.removeLikeTimestamp(artist.key, index);
      }

      return {
        ...prev,
        [index]: {
          liked: newLiked,
          likes: newLikes,
        }
      };
    });
  };

  if (!artist?.profiles) return null;

  return (
    <div className="artist-wrap">
      <ul className="artist-list">
        {artist.profiles.map((profile, index) => (
          <li key={index} className="artistPost">
            <Link to={`/artistPostDetail/${artist.key}/post/${index}`} className="post-link">
              <div className="profile-box">
                {profile.profileImg ? (
                  <div className="profileImg">
                    <img 
                    src={`${import.meta.env.BASE_URL}${profile.profileImg}`} 
                    alt={`${profile.profileName}의 프로필`} />
                  </div>
                ) : (
                  <div className="profileNoImg">No Image</div>
                )}
                <div className="profile-info">
                  <div className="profile-name">
                    {profile.profileName || '이름 없음'}
                    <BsPatchCheckFill style={{ color: '#FF4187' }} />
                  </div>
                  <p className="post-time">{profile.postTime}</p>
                </div>
              </div>

              <div className="text-box" style={{ whiteSpace: 'pre-line' }}>
                {profile.postText || '작성된 내용이 없습니다.'}
              </div>

              <div className="img-box">
                {profile.postImg ? (
                  <img src={`${import.meta.env.BASE_URL}${profile.postImg}`} alt="게시 이미지" />
                ) : (
                  <div className="img-placeholder"></div>
                )}
              </div>

              <div className="icon-box">
                {likesState[index]?.liked ? (
                  <IoMdHeart
                    style={{ fill: '#FF4187', cursor: 'pointer' }}
                    onClick={(e) => toggleLike(e, index)}
                  />
                ) : (
                  <IoMdHeartEmpty
                    style={{ fill: '#fff', cursor: 'pointer' }}
                    onClick={(e) => toggleLike(e, index)}
                  />
                )}
                <BsChat style={{ color: '#fff', transform: 'scaleX(-1)' }} />
                <LuSend
                  style={{ color: '#fff', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    const url = `${window.location.origin}/artistPostDetail/${artist.key}/post/${index}`;
                    if (navigator.share) {
                      navigator.share({
                        title: `${artist.name}의 게시물`,
                        text: '이 게시물을 확인해보세요!',
                        url,
                      }).catch(console.error);
                    } 
                    else {
                      navigator.clipboard.writeText(url);
                      alert('링크가 복사되었습니다!');
                    }
                  }}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistSection;