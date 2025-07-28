// src/pages/Home/Artist/sections/Detail/TalkPostDetail.jsx
import React, { useState, useEffect } from 'react';
import './TalkPostDetail.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { artists } from '../../artistsData';
import html2canvas from 'html2canvas';
import { LuSend } from "react-icons/lu";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat, BsPatchCheckFill } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { PiSiren } from "react-icons/pi";
import { FaCircleArrowUp } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';

// 댓글 이미지 컴포넌트 - 절대경로 실패 시 상대경로로 fallback
const CommentImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [useAbsolutePath, setUseAbsolutePath] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // src가 변경되면 상태 초기화
    setImgSrc(src);
    setUseAbsolutePath(true);
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    if (useAbsolutePath && !hasError) {
      // 절대경로에서 에러 발생 시 상대경로로 시도
      setUseAbsolutePath(false);
      setHasError(false); // 에러 상태 리셋하여 다시 시도
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
    return (
      <div style={{
        width: '40px',
        height: '40px',
        backgroundColor: '#444',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '12px'
      }}>
        👤
      </div>
    );
  }

  return (
    <img
      src={getImageSrc()}
      alt={alt}
      onError={handleImageError}
    />
  );
};

const TalkPostDetail = () => {
  const { artistKey, profileIndex, postType, entryId = 'artist' } = useParams();
  const navigate = useNavigate();
  
  // 이미지 소스를 처리하는 헬퍼 함수
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
      }, 1000);
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
        isInitial: true // 데이터에서 온 댓글임을 표시
      }));
    }
    
    // 사용자가 작성한 댓글을 ArtistPostDetail 형식으로 변환
    const formattedUserComments = savedUserComments.map(comment => ({
      name: comment.name || comment.author || '알 수 없음',
      time: comment.time || '방금 전',
      text: comment.content || comment.text,
      liked: comment.liked || false,
      likeCount: comment.likeCount || 0,
      commentImg: comment.commentImg || "artistSection/profileImg9.png",
      id: comment.id || Date.now(),
      isInitial: false // 사용자가 작성한 댓글
    }));
    
    // 데이터의 댓글을 위로, 사용자 댓글을 아래로 배치
    const allComments = [...initialComments, ...formattedUserComments];
    setComments(allComments);
  }, [artistKey, profileIndex, postType, entryId, myName, artist]);

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
    
    const newComment = {
      name: myName,
      time: '방금 전',
      text: comment.trim(),
      liked: false,
      likeCount: 0,
      commentImg: profileImage,
      id: Date.now(),
      isInitial: false // 사용자가 작성한 댓글
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
             <div className="profileImg-box"><img src={getImageSrc(postData.profileImg)} alt="프로필" className="profile-image" /></div> 
            ) : (
              <div className="profile-no-image"></div>
            )}
            <div className="profile-details">
              <h3 className="profile-name">
                {postData.profileName}
              </h3>
              <p className="post-time">
                {postData.type === 'user' ? '방금 전' : postData.timestamp}
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
                          width: '31px',
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
              <img src={getImageSrc(postData.image)} alt="포스트 이미지" />
            </div>
          )}

          {postData.type === 'user' && postData.images && postData.images.length > 0 && (
            <div className="post-images">
              {postData.images.map((img, index) => (
                <img key={index} src={getImageSrc(img.preview || img)} alt={`포스트 이미지 ${index + 1}`} />
              ))}
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
          <IoMdHeart color="#FF4187" size={22} />
        ) : (
          <IoMdHeartEmpty size={22} />
        )
      ) : (
        likedUserPosts[entryId] ? (
          <IoMdHeart color="#FF4187" size={22} />
        ) : (
          <IoMdHeartEmpty size={22} />
        )
      )}
      <span>
        {postType === 'artist' ? likeCount : (userPostLikeCounts[entryId] || 0)}
      </span>
    </button>

    <button className="comment-btn" title="댓글 수">
      <BsChat style={{ transform: 'scaleX(-1)' }} />
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
                  <CommentImage
                    src={cmt.commentImg}
                    alt="댓글 프로필"
                  />
                  </div>
                  <div className="comment-info">
                    <div className="comment-name">
                      {cmt.name}
                    </div>
                    <div className="comment-time">{cmt.time}</div>
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
                          width: '31px',
                          height: '2px',
                          borderRadius: '10px',
                          margin: '8px auto 0',
                          background: '#fff',
                          opacity: '0.2'}}>
                      </span>    
                      {/* 데이터에서 온 댓글이거나 본인 댓글인 경우 삭제, 그 외에는 신고 */}
                      {(cmt.time === '방금 전') ? (
                        <div className='userActionBox'>
                          <button onClick={() => {
                            setDeleteTarget(idx);
                            setReportTarget(null);
                          }}>
                            <PiSiren />삭제하기
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => {
                          setShowReport(true);
                          setReportTarget(null);
                        }}>
                          <PiSiren />신고하기
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
              <div className="reportButtonBox">
                <span style={{content: '',
                          display: 'block',
                          width: '31px',
                          height: '2px',
                          borderRadius: '10px',
                          margin: '8px auto 0',
                          background: '#fff',
                          opacity: '0.2'}}>
                </span>    
                <button onClick={() => {
                  setShowReport(false);
                  setShowChooseReport(true);
                }}>
                  <PiSiren />신고하기
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