// src/pages/sections/HighlightSection.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HighlightSection.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { GoCalendar }     from 'react-icons/go';
import { PiSpeakerHigh } from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineX } from "react-icons/ai";
import { artists } from '../artistsData'; // artists 데이터 import 필요
import 'swiper/css';

export default function HighlightSection({ artist, onTabChange }) {

  const handleArtistTab = () => {
    onTabChange('artist');
  }

  const handleShow = (index) => {
    navigate(`/penletter/${artist.key}/${index}`);
  };

  const handleTalkClick = () => {
    onTabChange('talk');
  };
  const handleTalkDetailClick1 = () => {
    navigate(`/talkPostDetail/${artist.key}/1/artist/artist`);
  };
  const handleTalkDetailClick2 = () => {
    navigate(`/talkPostDetail/${artist.key}/3/artist/artist`);
  };

  const navigate = useNavigate();

  const handleToTabClick = () => {
    onTabChange('to');
  };

  // 좋아요 카운트
  const [likeCount1, setLikeCount1] = useState(0);
  const [likeCount2, setLikeCount2] = useState(0);

  // 댓글 카운트 상태 추가
  const [commentCount1, setCommentCount1] = useState(0);
  const [commentCount2, setCommentCount2] = useState(0);

  // 댓글 수를 계산하는 함수
  const getCommentCount = (profileIndex) => {
    // localStorage에서 사용자가 작성한 댓글 가져오기
    const commentsKey = `comments-${artist.key}-${profileIndex}-artist-artist`;
    const userComments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    
    // artists 데이터에서 초기 댓글 가져오기
    const foundArtist = artists.find(a => a.key === artist.key);
    const initialCommentsCount = foundArtist?.talkProfile?.[profileIndex]?.talkComment?.length || 0;
    
    return userComments.length + initialCommentsCount;
  };

  useEffect(() => {
    // 좋아요 수 로드
    const savedLike1 = localStorage.getItem(`${artist.key}-talkPostLikes-1`) || artist?.talkProfile?.[1]?.talkPostLikes;
    const savedLike2 = localStorage.getItem(`${artist.key}-talkPostLikes-3`) || artist?.talkProfile?.[3]?.talkPostLikes;

    if (savedLike1 !== null) {
      setLikeCount1(parseInt(savedLike1, 10));
    }
    if (savedLike2 !== null) {
      setLikeCount2(parseInt(savedLike2, 10));
    }

    // 댓글 수 로드
    setCommentCount1(getCommentCount(1));
    setCommentCount2(getCommentCount(3));
  }, [artist.key]);

  // localStorage 변경 감지하여 댓글 수 실시간 업데이트
  useEffect(() => {
    const updateCommentCounts = () => {
      setCommentCount1(getCommentCount(1));
      setCommentCount2(getCommentCount(3));
    };

    // storage 이벤트 리스너 (다른 탭에서 변경 시)
    window.addEventListener('storage', updateCommentCounts);
    
    // 같은 탭에서 변경 감지를 위한 interval
    const interval = setInterval(updateCommentCounts, 1000);

    // localStorageUpdate 커스텀 이벤트 리스너 (같은 탭에서 즉시 업데이트)
    window.addEventListener('localStorageUpdate', updateCommentCounts);

    return () => {
      window.removeEventListener('storage', updateCommentCounts);
      window.removeEventListener('localStorageUpdate', updateCommentCounts);
      clearInterval(interval);
    };
  }, [artist.key]);

  return (
    <div className="highlight-section">
      <div className="highlight-section__content">
        <div className="noticeSection">
          <div className="noticeTitle">
            <h3 className='title'>Notice</h3>
          </div>
          <div className="noticeBox">
              <Link to={`/notice/${artist.key}/application`} className='link-notice'>
                <p className="noticeIcon"><PiSpeakerHigh style={{fontSize:'19px', color:'#FF4187',paddingTop:'2px' }}/></p>
                {artist.NoticeSection01 && (
                  <p className="highlight-section__desc">{artist.NoticeSection01}</p>
                  )}
                <p className="rightBox">
                  <FaChevronRight style={{width:'7px', color:'#d1d1d1'}}/>
                </p>
              </Link>
              <Link to={`/notice/${artist.key}/rules`} className='link-notice'>
                <p className="noticeIcon"><GoCalendar style={{fontSize:'18px', color:'#FF4187',paddingTop:'3px' }}/></p>
                {artist.NoticeSection02 && (
                  <p className="highlight-section__desc">{artist.NoticeSection02}</p>
                  )}
                <p className="rightBox">
                  <FaChevronRight style={{width:'7px', color:'#d1d1d1'}}/>
                </p>
              </Link>
          </div>
        </div>
        <div className="Hightlight-artistSection">
          <div className="artistSection-title">
            <h3 className="title">Artist</h3>
            {Array.isArray(artist.highlightArtists) && (
            <Swiper
              className="highlight-gallery-swiper"
              spaceBetween={8}
              slidesPerView="auto"
              freeMode={true}
            >
              {artist.highlightArtists.map((src, idx) => (
                <SwiperSlide key={idx} className="highlight-slide">
                  <Link to={`/artistPostDetail/${artist.key}/post/${idx}`}>
                    <img
                      src={src}
                      alt={`${artist.titleName} Highlight ${idx + 1}`}
                      className="highlight-slide__img"
                    />
                  </Link>
                </SwiperSlide>
              ))}

              <SwiperSlide key="more" className="highlight-slide box-only-slide">
                <div 
                  className="box-only" 
                  onClick={handleArtistTab}
                  style={{cursor:'pointer'}}
                  />
              </SwiperSlide>
            </Swiper>
            )}
          </div>
        </div>

        <div className="Xsection">
          <div className="Xsection-title">
            <h2 className="title">
              {artist.titleName} (<AiOutlineX />)
            </h2>
          </div>

          {Array.isArray(artist.Xartist) && (
            <Swiper
              className="Xsection-gallery-swiper"
              spaceBetween={10}
              slidesPerView="auto"
              freeMode={true}
            >
              {artist.Xartist.map(({ src, url }, idx) => (
                <SwiperSlide key={idx} className="Xsection-slide">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="Xsection-slide__link"
                  >
                    <img
                      src={src}
                      alt={`${artist.titleName} Highlight ${idx + 1}`}
                      className="Xsection-slide__img"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="talkSection">
          <div className="talkSection-title">
            <h2 className="title">Talk</h2>
          </div>
          <div className="talkBoxFam">
            <div className="talkBoxes">
              <div className="talkBox first" onClick={handleTalkDetailClick1}>
                <div className="circleBox">
                  <img src={artist.highlightTalkBoxCircle01}
                    alt={`${artist.titleName} circle`}
                    className="circleBox-img" />
                </div>
                <div className="textBox">
                  <p className="name">{artist.highlightTalkBoxName01}</p>
                  <div className="text">
                    <p className="span">{artist.highlightTalkBoxTitleSpan}</p>
                    <p className="line">{artist.highlightTalkBoxTitle01}</p>
                  </div>
                  <p className="like">좋아요 {likeCount1} · 댓글 {commentCount1}</p>
                </div>
                <div className="mainImgBox">
                  <img src={artist.highlightTalkBoxMainImg01}
                    alt={`${artist.titleName} circle`}
                    className="circleBox-img" />
                </div>
              </div>
              <div className="talkBox second" onClick={handleTalkDetailClick2}>
                <div className="circleBox">
                  <img src={artist.highlightTalkBoxCircle02}
                    alt={`${artist.titleName} circle`}
                    className="circleBox-img" />
                </div>
                <div className="textBox">
                  <p className="name">{artist.highlightTalkBoxName02}</p>
                  <p className="line">{artist.highlightTalkBoxTitle02}</p>
                  <p className="like">좋아요 {likeCount2} · 댓글 {commentCount2}</p>
                </div>
                <div className="mainImgBox">
                  <img src={artist.highlightTalkBoxMainImg02}
                    alt={`${artist.titleName} circle`}
                    className="circleBox-img" />
                </div>
              </div>
              <div className="textBox-more">
                <button 
                  className="textBox-title"
                  onClick={handleTalkClick}
                  style={{cursor:'pointer'}}
                >
                  더보기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="toGroupSection">
          <div className="toGroupSection-inner">
            <h2 className="title">To. {artist.titleName}</h2>
          </div>
          <div className="toGroupSection-Box">
            <div className="toGroupSection-Box-inner">
              <div className="toGroupSection-imgBox">
                <div className="imgBox"
                  onClick={() => handleShow(0)}
                  style={{cursor:'pointer'}}
                  >
                  <img src={artist.hightlightTo01}
                    alt={`${artist.titleName} hightlightTo`}
                    className="toGroupSectionBox-img" />
                </div>
                <div className="imgBox"
                  onClick={() => handleShow(1)}
                  style={{cursor:'pointer'}}
                >
                  <img src={artist.hightlightTo02}
                    alt={`${artist.titleName} hightlightTo`}
                    className="toGroupSectionBox-img" 
                  />
                </div>
              </div>
              <div className="toGroupBox-more">
                <button 
                  className="toGroupBox-title"
                  onClick={handleToTabClick}
                >
                  더보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HighlightSection.propTypes = {
  artist: PropTypes.shape({
    key:         PropTypes.string.isRequired,
    titleName:   PropTypes.string.isRequired,
    heroImage:   PropTypes.string.isRequired,
    description: PropTypes.string,
    social:      PropTypes.object,
  }).isRequired,
};