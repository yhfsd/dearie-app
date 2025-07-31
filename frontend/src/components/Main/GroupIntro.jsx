// src/components/main/GroupIntro.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './GroupIntro.css';
import { AiOutlineInstagram, AiOutlineX, AiFillTikTok } from 'react-icons/ai';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { FaYoutube } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { CiCircleMinus } from 'react-icons/ci';

export default function GroupIntro({ id, title, heroImage, social, description }) {
  const [isJoined, setIsJoined] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showJoinMsg, setShowJoinMsg] = useState(false);
  const [showUnjoinMsg, setShowUnjoinMsg] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(prev => !prev);
};


  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pickedGroups') || '[]');
      setIsJoined(stored.some(g => g.id === id));
    } catch {
      setIsJoined(false);
    }
  }, [id]);

const handleJoin = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('pickedGroups') || '[]');
    if (!stored.some(g => g.id === id)) {
      const updated = [...stored, { id, name: title }];
      localStorage.setItem('pickedGroups', JSON.stringify(updated));
    }
  } catch {
    localStorage.setItem('pickedGroups', JSON.stringify([{ id, name: title }]));
  }
  setIsJoined(true);

  // ✅ 토스트 메시지 표시
  setShowJoinMsg(true);
  setTimeout(() => setShowJoinMsg(false), 2000);
};


const handleUnjoin = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('pickedGroups') || '[]');
    const updated = stored.filter(g => g.id !== id);
    localStorage.setItem('pickedGroups', JSON.stringify(updated));
  } catch {
    localStorage.setItem('pickedGroups', '[]');
  }
  setIsJoined(false);

  // ✅ 토스트 메시지 표시
  setShowUnjoinMsg(true);
  setTimeout(() => setShowUnjoinMsg(false), 2000);
};


  // Portal components
  // Portal components
  const OverlayPortal = () => ReactDOM.createPortal(
    <div
      className="group-intro__overlay"
      style={{ zIndex: 9999, pointerEvents: 'auto' }}
      onClick={() => setIsMenuOpen(false)}
    />,
    document.body
  ); ReactDOM.createPortal(
    <div className="group-intro__overlay" onClick={() => setIsMenuOpen(false)} />,
    document.body
  );

  const MenuPortal = () => ReactDOM.createPortal(
    <div className={`group-intro__menu ${isMenuOpen ? 'open' : ''}`}>
      <button
        className="group-intro__unjoin"
        onClick={() => { handleUnjoin(); setIsMenuOpen(false); }}
      >
        <p className="title"><CiCircleMinus /> <span>탈퇴하기</span></p>
      </button>
    </div>,
    document.body
  );

  return (
    <section className="group-intro">
      <div className="group-intro__hero">
        <img 
          src={`${import.meta.env.BASE_URL}${heroImage}`}
          alt={`${title} Hero`} 
          className="group-intro__hero-img" />
      </div>
      <div className="group-intro__content">
        <h1 className="group-intro__title">{title}</h1>
        <p className="group-intro__desc">{description}</p>
        <ul className="group-intro__social">
          {social.instagram && <li><a href={social.instagram}><AiOutlineInstagram /></a></li>}
          {social.x && <li><a href={social.x}><AiOutlineX /></a></li>}
          {social.facebook && <li><a href={social.facebook}><RiFacebookCircleFill /></a></li>}
          {social.youtube && <li><a href={social.youtube}><FaYoutube /></a></li>}
          {social.tiktok && <li><a href={social.tiktok}><AiFillTikTok /></a></li>}
        </ul>
        <div className="group-intro__actions">
          {!isJoined ? (
            <button className="group-intro__join" onClick={handleJoin}>가입하기</button>
          ) : (
            <>
              <button className="group-intro__more" onClick={toggleMenu}>
                <IoMdMore size={24} />
              </button>
              {isMenuOpen && <OverlayPortal />}
              {isMenuOpen && <MenuPortal />}
            </>
          )}
        </div>
      </div>
      {showJoinMsg && (
      <div className="join-toast">가입이 완료되었습니다!</div>
      )}
      {showUnjoinMsg && (
        <div className="join-toast">가입이 취소되었습니다!</div>
      )}

    </section>
  );
}

GroupIntro.propTypes = {
  id:          PropTypes.string.isRequired,
  title:       PropTypes.string.isRequired,
  heroImage:   PropTypes.string.isRequired,
  social:      PropTypes.object,
  description: PropTypes.string,
};
