// src/pages/Home/Artist/sections/TalkSection.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TalkSection.css';
import { LuSend } from "react-icons/lu";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { PiSiren } from "react-icons/pi";
import { FiEdit } from 'react-icons/fi';
import { MdModeEditOutline } from "react-icons/md";


const TalkSection = ({ artist }) => {
  const navigate = useNavigate();
  const [likesState, setLikesState] = useState({});
  const [reportingIndex, setReportingIndex] = useState(null);
  const [showChooseReport, setShowChooseReport] = useState(false);
  const [showReportDone, setShowReportDone] = useState(false);
  const [username, setUsername] = useState('순간의 윈터');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [reportTarget, setReportTarget] = useState(null);
  const [entriesByProfile, setEntriesByProfile] = useState({});

  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) setUsername(storedUsername);
  }, []);

useEffect(() => {
  if (showReportDone) {
    const timer = setTimeout(() => {
      setShowReportDone(false);
    }, 1000);
    return () => clearTimeout(timer);
  }
}, [showReportDone]);

useEffect(() => {
  if (!artist?.talkProfile) return;

  const initialState = {};
  artist.talkProfile.forEach((profile, index) => {
    const likedKey = `${artist.key}-talkPostLiked-${index}`;
    const likesKey = `${artist.key}-talkPostLikes-${index}`;
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

  useEffect(() => {
    if (!artist?.talkProfile) return;

    const loadEntries = () => {
      const newEntriesByProfile = {};
      artist.talkProfile.forEach((profile, index) => {
        const storageKey = `fanTalkEntries-${artist.key}-${index}`;
        const savedEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
        newEntriesByProfile[index] = savedEntries;
      });
      setEntriesByProfile(newEntriesByProfile);
    };

    loadEntries();

    const handleStorageChange = () => {
      loadEntries();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleStorageChange);
    };
  }, [artist]);

const handleDeleteEntry = (profileIndex, entryId) => {
  const storageKey = `fanTalkEntries-${artist.key}-${profileIndex}`;
  const savedEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const updatedEntries = savedEntries.filter(entry => entry.id !== entryId);
  localStorage.setItem(storageKey, JSON.stringify(updatedEntries));
  window.dispatchEvent(new Event('localStorageUpdate'));

  // ✅ 상태도 함께 갱신
  setEntriesByProfile(prev => ({
    ...prev,
    [profileIndex]: updatedEntries
  }));

  setDeleteTarget(null);
};

  const handleEditClick = (profileIndex, entry) => {
    const editData = {
      artistKey: artist.key,
      profileIndex,
      entryId: entry.id,
      entryData: {
        text: entry.text,
        images: entry.images || [],
        links: entry.links || []
      },
      isEditMode: true
    };
    sessionStorage.setItem('editingEntry', JSON.stringify(editData));
    setEditTarget(null);
  };

  const postsList = () => {
  const allPosts = [];

  // 사용자가 작성한 글들을 먼저 추가 (최신순)
  Object.entries(entriesByProfile).forEach(([profileIndex, entries]) => {
    // 사용자 글들을 id 기준으로 정렬 (큰 id가 위로)
    const sortedEntries = [...entries].sort((a, b) => {
      return b.id - a.id; // 내림차순 정렬 (큰 id가 위로)
    });
    
    sortedEntries.forEach(entry => {
      allPosts.push({
        type: 'user',
        profileIndex: parseInt(profileIndex),
        entry,
        timestamp: entry.timestamp || '방금 전',
      });
    });
  });

  // 그 다음 아티스트 글들 추가
  if (artist?.talkProfile) {
    artist.talkProfile.forEach((profile, index) => {
      allPosts.push({
        type: 'artist',
        profileIndex: index,
        profile,
      });
    });
  }

  return allPosts;
};

  if (!artist?.talkProfile) return null;

  const posts = postsList();


  /* 내가 쓴 글 좋아요 */
const [likedUserPosts, setLikedUserPosts] = useState(() => {
  const saved = localStorage.getItem('likedUserPosts');
  return saved ? JSON.parse(saved) : {};
});

const [userPostLikeCounts, setUserPostLikeCounts] = useState(() => {
  const saved = localStorage.getItem('userPostLikeCounts');
  return saved ? JSON.parse(saved) : {};
});

const handleUserLikeToggle = (entryId) => {
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

  return (
    <div className="talk-wrap">
      <ul className="artist-list">
        {posts.map((post, i) => {
          if (post.type === 'artist') {
            const profile = post.profile;
            const index = post.profileIndex;

            return (
              <li
                key={`artist-${index}`}
                className="artistPost"
                onClick={() => navigate(`/talkPostDetail/${artist.key}/${index}/artist/artist`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="profile-box">
                  {profile.talkProfileImg ? (
                    <div className="profileImg">
                      <img src={profile.talkProfileImg} alt={`${profile.talkProfileName} 프로필`} />
                    </div>
                  ) : (
                    <div className="profileNoImg" />
                  )}
                  <div className="profile-info">
                    <div className="profile-name">{profile.talkProfileName || '이름 없음'}</div>
                    <p className="post-time">{profile.talkPostTime}</p>
                  </div>
                  <IoIosMore
                    style={{ transform: 'rotate(-90deg)', width: 25, height: 25, opacity: 0.5, cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setReportTarget(prev => prev === `artist-${index}` ? null : `artist-${index}`);
                    }}
                  />
                </div>
                <div className="text-box" style={{ whiteSpace: 'pre-line' }}>
                  <span style={{color:'#AA7FFA', fontWeight:'700'}}>{profile.talkPostColor}</span>{profile.talkPostText || '작성된 내용이 없습니다.'}
                </div>
                <div className="img-box">
{profile.talkPostImg ? (
  <img src={`${import.meta.env.BASE_URL}${profile.talkPostImg}`} alt="게시 이미지" />
) : (
  <div className="img-placeholder" />
)}
                </div>
                <div className="icon-box">
                  {likesState[index]?.liked ? (
                    <IoMdHeart
                      style={{ fill: '#FF4187', cursor: 'pointer' }}
                      onClick={e => {
                        e.stopPropagation();
                        const newLiked = !likesState[index].liked;
                        const newLikes = newLiked ? likesState[index].likes + 1 : likesState[index].likes - 1;

                        setLikesState(prev => ({
                          ...prev,
                          [index]: { liked: newLiked, likes: newLikes }
                        }));

                        localStorage.setItem(`${artist.key}-talkPostLiked-${index}`, newLiked.toString());
                        localStorage.setItem(`${artist.key}-talkPostLikes-${index}`, newLikes.toString());
                        window.dispatchEvent(new Event('localStorageUpdate'));
                      }}
                    />
                  ) : (
                    <IoMdHeartEmpty
                      style={{ fill: '#fff', cursor: 'pointer' }}
                      onClick={e => {
                        e.stopPropagation();
                        const newLiked = !likesState[index].liked;
                        const newLikes = newLiked ? likesState[index].likes + 1 : likesState[index].likes - 1;

                        setLikesState(prev => ({
                          ...prev,
                          [index]: { liked: newLiked, likes: newLikes }
                        }));

                        localStorage.setItem(`${artist.key}-talkPostLiked-${index}`, newLiked.toString());
                        localStorage.setItem(`${artist.key}-talkPostLikes-${index}`, newLikes.toString());
                        window.dispatchEvent(new Event('localStorageUpdate'));
                      }}
                    />
                  )}
                  <BsChat style={{ color: '#fff', transform: 'scaleX(-1)' }} />
                </div>
              </li>
            );
          } else {
            const entry = post.entry;
            const profileIndex = post.profileIndex;

            return (
              <li key={`user-${entry.id}`} className="userPost" onClick={() => navigate(`/talkPostDetail/${artist.key}/${profileIndex}/user/${entry.id}`)}>
                <div className="profile-box">
                  <div className="profileImg">
                    <img
                      src={localStorage.getItem('profileImage') || `${import.meta.env.BASE_URL}artistSection/profileImg9.png`}
                      alt="내 프로필"
                    />
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">{username}</div>
                    <p className="post-time">방금 전</p>
                  </div>
                  <IoIosMore
                    style={{ transform: 'rotate(-90deg)', width: 25, height: 25, opacity: 0.5, cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditTarget(`${profileIndex}-${entry.id}`)
                    }}
                  />
                </div>
                <div
                  className="text-box"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {entry.text}
                </div>

                {entry.images && entry.images.length > 0 && (
                  <div className="img-box">
                    {entry.images.map((img, i) => (
                      <img key={i} src={img.preview} alt={`post-img-${i}`} />
                    ))}
                  </div>
                )}  
                {entry.links && entry.links.length > 0 && (
                  <div className="link-box">
                    {entry.links.map((link, i) => {
                      const normalizedLink = link.startsWith('http') ? link : `https://${link}`;
                      return (
                        <a
                          key={i}
                          href={normalizedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="postLink"
                        >
                          {link}
                        </a>
                      );
                    })}
                  </div>
                )}

                <div className="icon-box">
                <button
                  className="heart-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUserLikeToggle(entry.id);
                  }}
                >
                  {likedUserPosts[entry.id] ? (
                    <IoMdHeart style={{ fill: '#FF4187', cursor: 'pointer' }} />
                  ) : (
                    <IoMdHeartEmpty style={{ fill: '#fff', cursor: 'pointer' }} />
                  )}
                </button>
                  <BsChat style={{ color: '#fff', transform: 'scaleX(-1)' }} />
                </div>
                
                

                {editTarget === `${profileIndex}-${entry.id}` && (
                  <div className="delete-modal">
                    <div className="overlay" onClick={(e) => {e.stopPropagation(); setEditTarget(null)}}></div>
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
                        <Link to={`/talkWritingPage/${artist.key}/${profileIndex}`} className="edit-link">
                          <button onClick={(e) => {e.stopPropagation(); handleEditClick(profileIndex, entry)}}>
                            <FiEdit />
                            수정하기
                          </button>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(`${profileIndex}-${entry.id}`);
                            setEditTarget(null);
                          }}
                        >
                          <PiSiren />
                          삭제하기
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {deleteTarget === `${profileIndex}-${entry.id}` && (
                  <div className="deleteBox">
                    <div className="overlay" onClick={() => setDeleteTarget(null)}></div>
                    <div className="delete-conform-box">
                      <p>정말로 이 글을 삭제하시겠습니까?</p>
                      <div className="delete-buttons">
                        <button className="no-btn" onClick={() => setDeleteTarget(null)}>
                          취소
                        </button>
                        <button
                          className="yes-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ 추가!
                            handleDeleteEntry(profileIndex, entry.id);
                          }}
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          }
        })}
      </ul>
      
      {reportTarget && reportTarget.startsWith('artist-') && (
        <div className="report-modal">
          <div className="overlay" onClick={() => setReportTarget(null)}></div>
          <div className="reportButtonBox">
            <span style={{content: '',
                          display: 'block',
                          width: '31px',
                          height: '2px',
                          borderRadius: '10px',
                          margin: '8px auto 0',
                          background: '#fff',
                          opacity: '0.2'}}></span>
            <button onClick={() => {
              setShowChooseReport(true);
              setReportTarget(null);
            }}>
              <PiSiren /> 신고하기
            </button>
          </div>
        </div>
      )}

      {showChooseReport && (
        <div className='reportChooseBox'>
          <div className="overlay" onClick={() => setShowChooseReport(false)}></div>
          <div className="reportChoose-modal">
            <p>이 게시글을 신고하시겠습니까?</p>
            <div className="reportChoose-buttons">
              <button className="chooseNo-btn" onClick={() => setShowChooseReport(false)}>취소</button>
              <button className="chooseYes-btn" onClick={() => {
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

      <div className="talk-writing-section">
        <div className="talkWritingBox">
          <Link to={`/talkWritingPage/${artist.key}/0`}>
            <MdModeEditOutline style={{width: '25px', height:'25px'}}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TalkSection;
