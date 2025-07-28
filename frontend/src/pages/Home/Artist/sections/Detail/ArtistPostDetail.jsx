import React, { useState, useEffect } from 'react';
import './ArtistPostDetail.css';
import { useParams } from 'react-router-dom';
import { artists } from '../../artistsData';
import html2canvas from 'html2canvas';

import { LuSend } from "react-icons/lu";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat, BsPatchCheckFill } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { PiSiren } from "react-icons/pi";
import { FaCircleArrowUp } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";

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

const ArtistPostDetail = () => {
  const { id, postId } = useParams();
  const index = parseInt(postId, 10);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [postLikeCount, setPostLikeCount] = useState(0);
  const [postLikeClicked, setPostLikeClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showReportDone, setShowReportDone] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [downloadAlert, setDownloadAlert] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [username, setUsername] = useState('순간의 윈터');

  //가수 이름 뒤에 인증마크 붙이는 배열
  const artistSectionNames = ['NINGNING', 'WINTER', 'KARINA', 'GISELLE','WONBIN','SUNGCHAN,','SOHEE', 'EUNSEOK','ANTON','SHOTARO','IU','YEONJUN','SOOBIN','TAEHYUN','BEOMGYU','Leeseo','Rei','Gaeul','Liz','Wonyoung','Yujin','HUENINGKAI'];

  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const myName = username;

  if (isNaN(index)) {
    return <div className="postDetailWrap">잘못된 게시물입니다.</div>;
  }

  const artist = artists.find(a => a.key === id);
  const profile = artist?.profiles?.[index];

  if (!artist || !profile) {
    return <div className="postDetailWrap">게시물을 찾을 수 없습니다.</div>;
  }

  const likesKey = `${id}-postLikes-${postId}`;
  const likedKey = `${id}-postLiked-${postId}`;

  useEffect(() => {
    const savedComments = localStorage.getItem(`${id}-comments-${postId}`);
    if (savedComments) {
      const parsed = JSON.parse(savedComments);
      setComments(parsed);
      setCommentCount(parsed.length);
    } else if (profile.comment) {
      setComments(profile.comment);
      setCommentCount(profile.comment.length);
    }

    const savedLikes = localStorage.getItem(likesKey);
    const savedHasLiked = localStorage.getItem(likedKey);
    const baseLikes = parseInt(profile.postLikes ?? 0, 10);

    if (savedLikes === null) {
      setPostLikeCount(baseLikes);
      localStorage.setItem(likesKey, baseLikes.toString());
      setPostLikeClicked(false);
      localStorage.setItem(likedKey, 'false');
    } else {
      setPostLikeCount(parseInt(savedLikes, 10));
      setPostLikeClicked(savedHasLiked === 'true');
    }
  }, [id, postId, profile.comment, profile.postLikes, likesKey, likedKey]);

  const handlePostLike = () => {
    let updatedCount = postLikeCount;
    let likedState = postLikeClicked;

    if (likedState) {
      updatedCount -= 1;
      likedState = false;
    } else {
      updatedCount += 1;
      likedState = true;
    }

    setPostLikeCount(updatedCount);
    setPostLikeClicked(likedState);
    localStorage.setItem(likesKey, updatedCount.toString());
    localStorage.setItem(likedKey, likedState.toString());
  };

  const handleDownload = () => {
    setDownloadAlert(false);
    setTimeout(async () => {
      const element = document.getElementById('postDetail-wrap');
      if (!element) return;

      const canvas = await html2canvas(element);
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'my-screenshot.png';
      link.click();
    }, 150);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const profileImage = localStorage.getItem('profileImage') || 'artistSection/profileImg9.png';
  
    const newCmt = {
      name: myName,
      time: '방금 전',
      text: newComment,
      liked: false,
      likeCount: 0,
      commentImg: profileImage
    };
    const updated = [...comments, newCmt];
    setComments(updated);
    setNewComment('');
    setCommentCount(updated.length);
    localStorage.setItem(`${id}-comments-${postId}`, JSON.stringify(updated));
  };

  const handleToggleCommentLike = (idx) => {
    const updated = [...comments];
    const cmt = updated[idx];
    if (cmt.liked) {
      cmt.liked = false;
      cmt.likeCount = (cmt.likeCount || 1) - 1;
    } else {
      cmt.liked = true;
      cmt.likeCount = (cmt.likeCount || 0) + 1;
    }
    setComments(updated);
    localStorage.setItem(`${id}-comments-${postId}`, JSON.stringify(updated));
  };

  const handleDeleteComment = (idx) => {
    const updated = [...comments];
    updated.splice(idx, 1);
    setComments(updated);
    setCommentCount(updated.length);
    localStorage.setItem(`${id}-comments-${postId}`, JSON.stringify(updated));
    setReportTarget(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddComment();
  };

  useEffect(() => {
    if (showReportDone) {
      const timer = setTimeout(() => {
        setShowReportDone(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showReportDone]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '아티스트 게시물',
        text: '이 글을 공유해요!',
        url: window.location.href,
      })
        .then(() => console.log('공유 성공'))
        .catch((error) => console.log('공유 실패', error));
    } else {
      alert('이 브라우저에서는 공유 기능이 지원되지 않습니다.');
    }
  };

  return (
    <div className="postDetail-wrap">
      <div className="postBox" id='postDetail-wrap'>
        <div className="profile-box">
          {profile.profileImg ? (
            <div className="profileImg">
              <img 
              src={`${import.meta.env.BASE_URL}${profile.profileImg.replace(/^\//, '')}`}
              alt={`${profile.profileName} 프로필`} />

            </div>
          ) : (
            <div className="profileNoImg">No Image</div>
          )}
          <div className="profile-info">
            <div className="profile-name">
              {profile.profileName || '이름 없음'} <BsPatchCheckFill style={{ color: '#FF4187' }} />
            </div>
            <p className="post-time">{profile.postTime}</p>
          </div>
          <IoIosMore style={{ transform: 'rotate(-90deg)' }} onClick={() => setDownloadAlert(true)} />
          {downloadAlert && (
            <div className='downloadBox'>
              <div className="overlay" onClick={() => setDownloadAlert(false)}></div>
              <div className="download-modal">
                <span></span>
                <button className="downloadBtn" onClick={handleDownload}>
                  <MdSaveAlt />저장하기
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="img-box">
          {profile.postImg ? (
            <img 
              src={`${import.meta.env.BASE_URL}${profile.postImg.replace(/^\//, '')}`}
              alt="post-img" />
          ) : (
            <div className="img-placeholder"></div>
          )}
        </div>

        <div className="text-box" style={{ whiteSpace: 'pre-line' }}>
          {profile.postText || '작성된 내용이 없습니다.'}
        </div>

        <div className="icon-box">
          {postLikeClicked ? (
            <IoMdHeart style={{ fill: '#FF4187', cursor: 'pointer' }} onClick={handlePostLike} />
          ) : (
            <IoMdHeartEmpty style={{ fill: '#fff', cursor: 'pointer' }} onClick={handlePostLike} />
          )}
          {postLikeCount.toLocaleString()}
          <BsChat style={{ color: '#fff', transform: 'scaleX(-1)' }} />{commentCount}
          <LuSend style={{ color: '#fff' }} onClick={handleShare} />
        </div>

        <div className="whiteLine"></div>

        <div className="comment-list">
          <p>댓글 {commentCount}</p>
          {comments.map((cmt, idx) => (
            <div key={idx} className="comment-box">
              <div className="comment-profile">
                <div className="commentImg-box">
                  <CommentImage 
                    src={cmt.commentImg}
                    alt="댓글 프로필" 
                  />
                </div>
                <div className="comment-info">
                  <div className="comment-name">{cmt.name}{artistSectionNames.includes(cmt.name) && <BsPatchCheckFill style={{ color: '#FF4187', marginLeft: 4 }}/>}</div>
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
                  <IoMdHeart style={{ color: '#FF4187', cursor: 'pointer',width: '14px', height: '14px'}} onClick={() => handleToggleCommentLike(idx)} />
                ) : (
                  <IoMdHeartEmpty style={{ color: '#fff', cursor: 'pointer',width: '14px', height: '14px' }} onClick={() => handleToggleCommentLike(idx)} />
                )}
                <p>{cmt.likeCount || 0}</p>
                <BsChat style={{ color: '#fff', transform: 'scaleX(-1)', opacity: '0.4' }} /><p style={{opacity:'0.4'}}>0</p>
              </div>

              {reportTarget === idx && (
                <div className="report-alert">
                  <div className="overlay" onClick={() => setReportTarget(null)}></div>
                  <div className="reportButtonBox">
                    <span></span>
                    {cmt.time === '방금 전' ? (
                      <div className='deletBox'>
                        <button onClick={() => {
                          setDeleteTarget(idx);
                          setReportTarget(null);
                        }}><PiSiren />삭제하기</button>
                      </div>
                    ) : (
                      <button onClick={() => {
                        setShowReport(true);
                        setReportTarget(null);
                      }}><PiSiren />신고하기</button>
                    )}
                  </div>
                </div>
              )}

              {deleteTarget === idx && (
                <div className='deleteBox'>
                  <div className="overlay" onClick={() => setDeleteTarget(null)}></div>
                  <div className="delete-modal">
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
          <div className='reportBox'>
            <div className="overlay" onClick={() => setShowReport(null)}></div>
            <div className="report-modal">
              <p>이 게시글을 신고하시겠습니까?</p>
              <div className="report-buttons">
                <button className="no-btn" onClick={() => setShowReport(null)}>취소</button>
                <button className="yes-btn" onClick={() => {
                  setShowReport(null);
                  setShowReportDone(true);
                }}>확인</button>
              </div>
            </div>
          </div>
        )}

        {showReportDone && (
          <div className="reportedBox">신고되었습니다.</div>
        )}
      </div>

      <div className="comment-input-box">
        <div className="input-box">
          <input
            id='inputComment'
            type="text"
            placeholder="댓글을 입력해주세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FaCircleArrowUp onClick={handleAddComment} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};

export default ArtistPostDetail;