// src/pages/Home/Artist/sections/Detail/TalkPostDetail.jsx
import React, { useState, useEffect } from 'react';
import './TalkPostDetail.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { artists } from '../../artistsData';

import { LuSend } from "react-icons/lu";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat, BsPatchCheckFill } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { PiSiren } from "react-icons/pi";
import { FaCircleArrowUp } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 사용자 ID 생성 또는 가져오기 함수
const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// 시간 차이를 계산하여 표시 형식을 결정하는 함수 (통일된 시간 포맷팅)
const getTimeDisplay = (timestamp) => {
  if (!timestamp) return '방금 전';
  
  const now = new Date();
  const commentTime = new Date(timestamp);
  const diffMs = now - commentTime;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return '방금 전';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    // 일주일이 넘으면 연도, 달, 일, 시간으로 표시
    const year = commentTime.getFullYear();
    const month = String(commentTime.getMonth() + 1).padStart(2, '0');
    const day = String(commentTime.getDate()).padStart(2, '0');
    const hours = String(commentTime.getHours()).padStart(2, '0');
    const minutes = String(commentTime.getMinutes()).padStart(2, '0');
    
    // 올해와 같은 년도면 월.일. 시간으로, 다른 년도면 년.월.일. 시간으로 표시
    if (year === now.getFullYear()) {
      return `${month}.${day}. ${hours}:${minutes}`;
    } else {
      return `${year}.${month}.${day}. ${hours}:${minutes}`;
    }
  }
};

// 공통 이미지 컴포넌트 - 절대경로 실패 시 상대경로로 fallback
const SafeImage = ({ src, alt, className, style, defaultIcon = '👤' }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [useAbsolutePath, setUseAbsolutePath] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0); // 강제 리렌더링용

  useEffect(() => {
    // src가 변경되면 상태 초기화 및 강제 리렌더링
    setImgSrc(src);
    setUseAbsolutePath(true);
    setHasError(false);
    setKey(prev => prev + 1); // key 변경으로 img 태그 강제 리마운트
  }, [src]);

  const handleImageError = () => {
    if (useAbsolutePath && !hasError) {
      // 절대경로에서 에러 발생 시 상대경로로 시도
      setUseAbsolutePath(false);
      setHasError(false); // 에러 상태 리셋하여 다시 시도
      setKey(prev => prev + 1); // 강제 리렌더링
    } else {
      // 상대경로에서도 에러 발생 시 완전히 실패
      setHasError(true);
    }
  };

  const getImageSrc = () => {
    if (hasError) return null;
    
    // 이미 완전한 URL인 경우 (data:, http:, https:)
    if (imgSrc?.startsWith('data:') || imgSrc?.startsWith('http')) {
      return imgSrc;
    }
    
    if (useAbsolutePath) {
      // 절대경로 시도
      return `${import.meta.env.BASE_URL}${imgSrc?.replace(/^\//, '')}`;
    } else {
      // 상대경로 시도
      return imgSrc?.replace(/^\//, '');
    }
  };

  if (hasError) {
    // 모든 경로에서 실패 시 기본 아이콘 표시
    const defaultStyle = {
      backgroundColor: '#444',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      fontSize: '12px',
      ...style
    };

    return (
      <div className={className} style={defaultStyle}>
        {defaultIcon}
      </div>
    );
  }

  const imageSrc = getImageSrc();
  if (!imageSrc) {
    return (
      <div className={className} style={{
        backgroundColor: '#444',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '12px',
        ...style
      }}>
        {defaultIcon}
      </div>
    );
  }

  return (
    <img
      key={key} // 강제 리마운트를 위한 key
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleImageError}
    />
  );
};

// 댓글 이미지 컴포넌트 (기존 호환성을 위해 유지)
const CommentImage = ({ src, alt }) => {
  return <SafeImage src={src} alt={alt} style={{
  }} />;
};

const TalkPostDetail = () => {
  const { artistKey, profileIndex, postType, entryId = 'artist' } = useParams();
  const navigate = useNavigate();
  const currentUserId = getUserId(); // 현재 사용자 ID
  
  // 이미지 소스를 처리하는 헬퍼 함수 (SafeImage로 대체될 예정)
  const getImageSrc = (imagePath) => {
    if (!imagePath) return null;
    
    // base64 데이터 URL인 경우 그대로 반환
    if (imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // HTTP/HTTPS URL인 경우 그대로 반환
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // 상대 경로인 경우 BASE_URL과 결합
    return `${import.meta.env.BASE_URL}${imagePath.replace(/^\//, '')}`;
  };
  
  const [artist, setArtist] = useState(null);
  const [postData, setPostData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const cleanPath = (path) => path.replace(/^\/+/, '');
  
  // ArtistPostDetail에서 가져온 상태들
  const [showReportDone, setShowReportDone] = useState(false);
  const [showChooseReport, setShowChooseReport] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [reportTarget, setReportTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [username, setUsername] = useState('순간의 윈터');
  

  const [likedUserPosts, setLikedUserPosts] = useState(() => {
    const saved = localStorage.getItem('likedUserPosts');
    return saved ? JSON.parse(saved) : {};
  });

  const [userPostLikeCounts, setUserPostLikeCounts] = useState(() => {
    const saved = localStorage.getItem('userPostLikeCounts');
    return saved ? JSON.parse(saved) : {};
  });

  // 사용자명 초기화
  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const myName = username;

  // 사용자 ID를 기준으로 내 댓글을 업데이트하는 함수
  const updateMyComments = (commentsList, currentName, currentProfileImage, userId) => {
    return commentsList.map(comment => {
      // 사용자 ID가 일치하는 댓글만 업데이트
      if (comment.userId === userId) {
        return {
          ...comment,
          name: currentName,
          commentImg: currentProfileImage
        };
      }
      return comment;
    });
  };

  // 기존 댓글에 타임스탬프가 없는 경우 추가하는 함수
  const migrateCommentsToTimestamp = (commentsList) => {
    return commentsList.map(comment => {
      if (!comment.timestamp) {
        // 기존 댓글은 현재 시간을 기준으로 타임스탬프 추가
        return {
          ...comment,
          timestamp: Date.now()
        };
      }
      return comment;
    });
  };

  const handleUserLikeToggle = () => {
    setLikedUserPosts(prevLiked => {
      const isLiked = !prevLiked[entryId];
      const updatedLiked = { ...prevLiked, [entryId]: isLiked };

      setUserPostLikeCounts(prevCounts => {
        const currentCount = prevCounts[entryId] ?? 0;
        const newCount = isLiked ? currentCount + 1 : Math.max(currentCount - 1, 0);
        const updatedCounts = { ...prevCounts, [entryId]: newCount };
        localStorage.setItem('userPostLikeCounts', JSON.stringify(updatedCounts));
        return updatedCounts;
      });

      localStorage.setItem('likedUserPosts', JSON.stringify(updatedLiked));
      return updatedLiked;
    });
  };

  // 신고창 1초 뒤에 꺼짐 
  useEffect(() => {
    if (showReportDone) {
      const timer = setTimeout(() => {
        setShowReportDone(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showReportDone]);

  useEffect(() => {
    const foundArtist = artists.find(a => a.key === artistKey);
    if (foundArtist) {
      setArtist(foundArtist);

      if (postType === 'artist') {
        const profile = foundArtist.talkProfile[parseInt(profileIndex)];
        if (profile) {
          setPostData({
            type: 'artist',
            profile,
            profileName: profile.talkProfileName,
            profileImg: profile.talkProfileImg,
            profileTalkColor:profile.talkPostColor,
            content: profile.talkPostText,
            image: profile.talkPostImg,
            timestamp: profile.talkPostTime,
            links: []
          });

          const likedKey = `${artistKey}-talkPostLiked-${profileIndex}`;
          const likesKey = `${artistKey}-talkPostLikes-${profileIndex}`;
          setIsLiked(localStorage.getItem(likedKey) === 'true');
          setLikeCount(parseInt(localStorage.getItem(likesKey)) || parseInt(profile.talkPostLikes) || 0);
        }
      } else if (postType === 'user') {
        const storageKey = `fanTalkEntries-${artistKey}-${profileIndex}`;
        const savedEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const entry = savedEntries.find(e => e.id === parseInt(entryId));

        if (entry) {
          setPostData({
            type: 'user',
            profileName: localStorage.getItem('userName') || '순간의 윈터',
            profileImg: localStorage.getItem('profileImage') || 'artistSection/profileImg9.png',
            content: entry.text,
            images: entry.images || [],
            links: entry.links || [],
            timestamp: entry.timestamp,
            editedAt: entry.editedAt
          });

          setLikeCount(0);
          setIsLiked(false);
        }
      }
    }
  }, [artistKey, profileIndex, postType, entryId]);

  useEffect(() => {
    const commentsKey = `comments-${artistKey}-${profileIndex}-${postType}-${entryId}`;
    const savedUserComments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    const currentName = localStorage.getItem('userName') || '순간의 윈터';
    const currentProfileImage = localStorage.getItem('profileImage') || 'artistSection/profileImg9.png';
    
    // 데이터에서 초기 댓글 가져오기
    let initialComments = [];
    if (postType === 'artist' && artist?.talkProfile?.[parseInt(profileIndex)]?.talkComment) {
      initialComments = artist.talkProfile[parseInt(profileIndex)].talkComment.map((comment, index) => ({
        name: comment.talkName,
        time: comment.talkTime,
        text: comment.talkText,
        liked: false,
        likeCount: 0,
        commentImg: comment.talkCommentImg,
        id: `initial-${index}`,
        isInitial: true, // 데이터에서 온 댓글임을 표시
        timestamp: Date.now() // 초기 댓글도 타임스탬프 추가
      }));
    }
    
    // 사용자가 작성한 댓글을 ArtistPostDetail 형식으로 변환하고 최신 정보로 업데이트
    const formattedUserComments = savedUserComments.map(comment => ({
      name: comment.name || comment.author || '알 수 없음',
      time: comment.time || '방금 전',
      text: comment.content || comment.text,
      liked: comment.liked || false,
      likeCount: comment.likeCount || 0,
      commentImg: comment.commentImg || "artistSection/profileImg9.png",
      id: comment.id || Date.now(),
      isInitial: false, // 사용자가 작성한 댓글
      userId: comment.userId || null, // 사용자 ID 추가
      timestamp: comment.timestamp || Date.now() // 타임스탬프 추가
    }));

    // 기존 댓글에 타임스탬프가 없는 경우 추가
    let migratedComments = migrateCommentsToTimestamp(formattedUserComments);
    
    // 사용자 댓글 중 내 댓글들을 현재 정보로 업데이트
    const updatedUserComments = updateMyComments(migratedComments, currentName, currentProfileImage, currentUserId);
    
    // 변경사항이 있으면 localStorage에 저장
    if (JSON.stringify(updatedUserComments) !== JSON.stringify(formattedUserComments)) {
      localStorage.setItem(commentsKey, JSON.stringify(updatedUserComments));
    }
    
    // 데이터의 댓글을 위로, 사용자 댓글을 아래로 배치
    const allComments = [...initialComments, ...updatedUserComments];
    setComments(allComments);
  }, [artistKey, profileIndex, postType, entryId, myName, artist, currentUserId]);

  // localStorage 변경 감지하여 실시간 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      const currentName = localStorage.getItem('userName') || '순간의 윈터';
      const currentProfileImage = localStorage.getItem('profileImage') || 'artistSection/profileImg9.png';
      
      setComments(prevComments => {
        const updatedComments = updateMyComments(prevComments, currentName, currentProfileImage, currentUserId);
        
        // 변경사항이 있으면 localStorage에도 저장 (사용자 댓글만)
        if (JSON.stringify(updatedComments) !== JSON.stringify(prevComments)) {
          const userComments = updatedComments.filter(c => !c.isInitial);
          const commentsKey = `comments-${artistKey}-${profileIndex}-${postType}-${entryId}`;
          localStorage.setItem(commentsKey, JSON.stringify(userComments));
        }
        
        return updatedComments;
      });
    };

    // storage 이벤트 리스너 (다른 탭에서 변경 시)
    window.addEventListener('storage', handleStorageChange);
    
    // 같은 탭에서 변경 감지를 위한 interval (더 자주 확인)
    const interval = setInterval(() => {
      const currentName = localStorage.getItem('userName') || '순간의 윈터';
      const currentProfileImage = localStorage.getItem('profileImage') || 'artistSection/profileImg9.png';
      
      setComments(prevComments => {
        const updatedComments = updateMyComments(prevComments, currentName, currentProfileImage, currentUserId);
        
        if (JSON.stringify(updatedComments) !== JSON.stringify(prevComments)) {
          const userComments = updatedComments.filter(c => !c.isInitial);
          const commentsKey = `comments-${artistKey}-${profileIndex}-${postType}-${entryId}`;
          localStorage.setItem(commentsKey, JSON.stringify(userComments));
          return updatedComments;
        }
        
        return prevComments;
      });
    }, 500); // 0.5초마다 확인

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [artistKey, profileIndex, postType, entryId, currentUserId]);

  // 실시간 시간 업데이트를 위한 useEffect 추가
  useEffect(() => {
    const timeUpdateInterval = setInterval(() => {
      // 컴포넌트가 마운트된 상태에서만 강제 리렌더링
      setComments(prevComments => [...prevComments]);
    }, 60000); // 1분마다 업데이트

    return () => clearInterval(timeUpdateInterval);
  }, []);

  const toggleLike = () => {
    if (postType === 'artist') {
      const newLiked = !isLiked;
      const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;

      setIsLiked(newLiked);
      setLikeCount(newLikeCount);

      const likedKey = `${artistKey}-talkPostLiked-${profileIndex}`;
      const likesKey = `${artistKey}-talkPostLikes-${profileIndex}`;
      localStorage.setItem(likedKey, newLiked.toString());
      localStorage.setItem(likesKey, newLikeCount.toString());
      window.dispatchEvent(new Event('localStorageUpdate'));
    }
  };

  // ArtistPostDetail의 댓글 추가 함수
  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const profileImage = localStorage.getItem('profileImage') || 'artistSection/profileImg9.png';
    const currentName = localStorage.getItem('userName') || '순간의 윈터';
    
    const newComment = {
      name: currentName,
      text: comment.trim(),
      liked: false,
      likeCount: 0,
      commentImg: profileImage,
      id: Date.now(),
      isInitial: false, // 사용자가 작성한 댓글
      userId: currentUserId, // 사용자 ID 추가
      timestamp: Date.now() // 타임스탬프 추가
    };

    // 기존 사용자 댓글에만 새 댓글 추가 (데이터 댓글은 그대로 유지)
    const userComments = comments.filter(c => !c.isInitial);
    const updatedUserComments = [...userComments, newComment];
    
    // 데이터 댓글 + 사용자 댓글 순서로 다시 정렬
    const initialComments = comments.filter(c => c.isInitial);
    const allComments = [...initialComments, ...updatedUserComments];
    
    setComments(allComments);
    setComment('');

    // localStorage에는 사용자 댓글만 저장
    const commentsKey = `comments-${artistKey}-${profileIndex}-${postType}-${entryId}`;
    localStorage.setItem(commentsKey, JSON.stringify(updatedUserComments));
  };

  // 댓글 좋아요 토글
  const handleToggleCommentLike = (idx) => {
    const updated = [...comments];
    const cmt = updated[idx];
    
    // 데이터에서 온 댓글은 좋아요 기능 비활성화하고 싶다면 여기서 체크
    // if (cmt.isInitial) return;
    
    if (cmt.liked) {
      cmt.liked = false;
      cmt.likeCount = (cmt.likeCount || 1) - 1;
    } else {
      cmt.liked = true;
      cmt.likeCount = (cmt.likeCount || 0) + 1;
    }
    setComments(updated);
    
    // localStorage에는 사용자 댓글만 저장
    const userComments = updated.filter(c => !c.isInitial);
    const commentsKey = `comments-${artistKey}-${profileIndex}-${postType}-${entryId}`;
    localStorage.setItem(commentsKey, JSON.stringify(userComments));
  };

  // 댓글 삭제
  const handleDeleteComment = (idx) => {
    const updated = [...comments];
    const commentToDelete = updated[idx];
    
    // 데이터에서 온 댓글은 삭제 불가
    if (commentToDelete.isInitial) {
      alert('기본 댓글은 삭제할 수 없습니다.');
      return;
    }
    
    updated.splice(idx, 1);
    setComments(updated);
    
    // localStorage에는 사용자 댓글만 저장
    const userComments = updated.filter(c => !c.isInitial);
    const commentsKey = `comments-${artistKey}-${profileIndex}-${postType}-${entryId}`;
    localStorage.setItem(commentsKey, JSON.stringify(userComments));
    setReportTarget(null);
    setDeleteTarget(null);
  };

  // 게시물 수정 함수
  const handleEditPost = () => {
    if (postType === 'user') {
      const storageKey = `fanTalkEntries-${artistKey}-${profileIndex}`;
      const savedEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const entry = savedEntries.find(e => e.id === parseInt(entryId));
      
      if (entry) {
        const editData = {
          artistKey: artistKey,
          profileIndex: parseInt(profileIndex),
          entryId: parseInt(entryId),
          entryData: {
            text: entry.text,
            images: entry.images || [],
            links: entry.links || []
          },
          isEditMode: true
        };
        
        console.log('수정 데이터 저장:', editData); // 디버깅용
        sessionStorage.setItem('editingEntry', JSON.stringify(editData));
        
        // 수정 페이지로 이동
        navigate(`/talkWritingPage/${artistKey}/${profileIndex}`);
      }
    }
    setEditTarget(null);
  };

  // 게시물 삭제 함수
  const handleDeletePost = () => {
    if (postType === 'user') {
      const storageKey = `fanTalkEntries-${artistKey}-${profileIndex}`;
      const savedEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updatedEntries = savedEntries.filter(entry => entry.id !== parseInt(entryId));
      localStorage.setItem(storageKey, JSON.stringify(updatedEntries));
      window.dispatchEvent(new Event('localStorageUpdate'));
      navigate(-1); // 이전 페이지로 돌아가기
    }
    setDeleteTarget(null);
  };

  if (!artist || !postData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="talk-post-detail-container">
      <div className="talk-detail-content">
        <div className="profile-section">
          <div className="profile-info">
            {postData.profileImg ? (
             <div className="profileImg-box">
               <SafeImage 
                 src={postData.profileImg} 
                 alt="프로필" 
                 className="profile-image" 
               />
             </div> 
            ) : (
              <div className="profile-no-image"></div>
            )}
            <div className="profile-details">
              <h3 className="profile-name">
                {postData.profileName}
              </h3>
              <p className="post-time">
                {postData.type === 'user' ? getTimeDisplay(postData.timestamp) : postData.timestamp}
              </p>
            </div>
            <IoIosMore 
              style={{ transform: 'rotate(-90deg)', width: 25, height: 25, opacity: 0.5, cursor: 'pointer' }} 
              onClick={() => {
                if (postType === 'user') {
                  setEditTarget(true);
                } else {
                  setShowReport(true);
                }
              }} 
            />
            {editTarget && postType === 'user' && (
              <div className="delete-modal">
                <div className="overlay" onClick={() => setEditTarget(null)}></div>
                <div className="reportButtonBox">
                  <span style={{content: '',
                          display: 'block',
                          width: '20%',
                          height: '2px',
                          borderRadius: '10px',
                          margin: '8px auto 0',
                          background: '#fff',
                          opacity: '0.2'}}>
                  </span>    
                  <div className="userActionBox">
                    <button onClick={handleEditPost}>
                      <FiEdit />
                      수정하기
                    </button>
                    <button onClick={() => {
                      setDeleteTarget(true);
                      setEditTarget(null);
                    }}>
                      <PiSiren />
                      삭제하기
                    </button>
                  </div>
                </div>
              </div>
            )}
            {deleteTarget && (
              <div className='deleteBox'>
                <div className="overlay" onClick={() => setDeleteTarget(null)}></div>
                <div className="delete-conform-box">
                  <p>정말로 이 글을 삭제하시겠습니까?</p>
                  <div className="delete-buttons">
                    <button className="no-btn" onClick={() => setDeleteTarget(null)}>취소</button>
                    <button className="yes-btn" onClick={handleDeletePost}>확인</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="post-content">
          {postData.type === 'artist' && postData.image && (
            <div className="post-image">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-active'
                }}
                spaceBetween={0}
                slidesPerView={1}
              >
                <SwiperSlide>
                  <SafeImage src={postData.image} alt="포스트 이미지" />
                </SwiperSlide>
              </Swiper>
            </div>
          )}

          {postData.type === 'user' && postData.images && postData.images.length > 0 && (
            <div className="post-images">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-active'
                }}
                spaceBetween={0}
                slidesPerView={1}
              >
                {postData.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <SafeImage 
                      src={img.preview || img} 
                      alt={`포스트 이미지 ${index + 1}`} 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <p className="content-text" style={{ whiteSpace: 'pre-line' }}>
            <span style={{color:'#AA7FFA', fontWeight:'700'}}>{postData.profileTalkColor}</span>{postData.content}
          </p>
          
          {postData.links?.length > 0 && (
            <div className="post-links">
              {postData.links.map((link, index) => {
                const normalizedLink = link.startsWith('http') ? link : `https://${link}`;
                return (
                  <a
                   key={index}
                    href={normalizedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-link"
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          )}
        </div>

          <div className="post-actions">
            <div className="action-buttons">
              <button className='heart-btn' onClick={postType === 'artist' ? toggleLike : handleUserLikeToggle}>
                {postType === 'artist' ? (
                  isLiked ? (
                    <IoMdHeart color="#FF4187" size={23} />
                  ) : (
                    <IoMdHeartEmpty size={23} />
                  )
                ) : (
                  likedUserPosts[entryId] ? (
                    <IoMdHeart color="#FF4187" size={23} />
                  ) : (
                    <IoMdHeartEmpty size={23} />
                  )
                )}
                <span>
                  {postType === 'artist' ? likeCount : (userPostLikeCounts[entryId] || 0)}
                </span>
              </button>

              <button className="comment-btn" title="댓글 수">
                <BsChat style={{ transform: 'scaleX(-1)', width:'19px', height:'19px'}} />
                <span>{comments.length}</span>
              </button>
            </div>
          </div>

          <div className="whiteLine"></div>

        <div className="comments-section">
            <div className="comments-header">
              <p>댓글 {comments.length}개</p>
            </div>

          <div className="comments-list">
            {comments.map((cmt, idx) => (
              <div key={cmt.id || idx} className="comment-item">
                <div className="comment-profile">
                  <div className="comment-img">
                    <SafeImage
                      src={cmt.commentImg}
                      alt="댓글 프로필"
                    />
                  </div>
                  <div className="comment-info">
                    <div className="comment-name">
                      {cmt.name}
                    </div>
                    <div className="comment-time">{getTimeDisplay(cmt.timestamp)}</div>
                  </div>
                  <IoIosMore
                    style={{ transform: 'rotate(-90deg)', cursor: 'pointer', color: '#fff', height:'22px', width:'22px', opacity:'0.5'}}
                    onClick={() => setReportTarget(idx)}
                  />
                </div>

                <div className="comment-text">{cmt.text}</div>
                <div className="comment-icon">
                  {cmt.liked ? (
                    <IoMdHeart 
                      style={{ color: '#FF4187', cursor: 'pointer', width: '14px', height: '14px', opacity: '0.7' }} 
                      onClick={() => handleToggleCommentLike(idx)} 
                    />
                  ) : (
                    <IoMdHeartEmpty 
                      style={{ color: '#fff', cursor: 'pointer', width: '14px', height: '14px', opacity: '0.7' }} 
                      onClick={() => handleToggleCommentLike(idx)} 
                    />
                  )}
                  <p style={{ opacity: '0.7'}}>{cmt.likeCount || 0}</p>
                  <BsChat style={{ color: '#fff', transform: 'scaleX(-1)', opacity: '0.4' , width: '12px', height: '12px' }} />
                  <p style={{ opacity: '0.4'}}>0</p>
                </div>

                <div className="white-line"></div>

                {reportTarget === idx && (
                  <div className="delete-modal">
                    <div className="overlay" onClick={() => setReportTarget(null)}></div>
                    <div className="reportButtonBox">
                      <span style={{content: '',
                          display: 'block',
                          width: '20%',
                          height: '2px',
                          borderRadius: '10px',
                          margin: '8px auto 0',
                          background: '#fff',
                          opacity: '0.2'}}>
                      </span>    
                      {/* 사용자 ID가 일치하는 경우 삭제, 그 외에는 신고 */}
                      {cmt.userId === currentUserId ? (
                        <div className='userActionBox'>
                          <button onClick={() => {
                            setDeleteTarget(idx);
                            setReportTarget(null);
                          }}>
                            <PiSiren />삭제하기
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setReportTarget(null);  // 먼저 현재 모달을 닫고
                            setShowChooseReport(true);  // 신고 확인 모달을 열기
                          }}
                        >
                          <PiSiren /> 신고하기
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {deleteTarget === idx && (
                  <div className='deleteBox'>
                    <div className="overlay" onClick={() => setDeleteTarget(null)}></div>
                    <div className="delete-conform-box">
                      <p>정말로 댓글을 삭제하시겠습니까?</p>
                      <div className="delete-buttons">
                        <button className="no-btn" onClick={() => setDeleteTarget(null)}>취소</button>
                        <button className="yes-btn" onClick={() => {
                          handleDeleteComment(deleteTarget);
                          setDeleteTarget(null);
                        }}>확인</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showReport && (
            <div className='report-modal'>
              <div className="overlay" onClick={() => setShowReport(false)}></div>
              <div className="report-Button-Box">
                <span style={{content: '',
                          display: 'block',
                          width: '20%',
                          height: '2px',
                          borderRadius: '10px',
                          margin: '8px auto 0',
                          background: '#fff',
                          opacity: '0.2'}}>
                </span>    
                <button
                  onClick={() => {
                            setShowReport(false);  // 먼저 현재 모달을 닫고
                            setShowChooseReport(true);  // 신고 확인 모달을 열기
                  }}
                >
                  <PiSiren /> 신고하기
                </button>
              </div>
            </div>
          )}

          {showChooseReport && (
          <div className='reportBox'>
            <div className="overlay" onClick={() => setShowChooseReport(false)}></div>
            <div className="report-modal">
              <p>이 게시글을 신고하시겠습니까?</p>
              <div className="report-buttons">
                <button className="no-btn" onClick={() => setShowChooseReport(false)}>취소</button>
                <button className="yes-btn" onClick={() => {
                  setShowChooseReport(false);
                  setShowReportDone(true);
                }}>확인</button>
              </div>
            </div>
          </div>
        )}

          {showReportDone && (
            <div className="reportedBox">신고되었습니다.</div>
          )}

          <div className="comment-input-section">
            <div className="comment-input-wrapper">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 입력해주세요"
                className="comment-input"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                className="send-comment-btn"
                disabled={!comment.trim()}
                title="댓글 보내기"
              >
                <FaCircleArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkPostDetail;