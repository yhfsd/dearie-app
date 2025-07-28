import React from 'react';
import PropTypes from 'prop-types';
import './ArtistIntro.css';
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineX } from "react-icons/ai";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

export default function ArtistIntro({ name, videoUrl, social = {}, description, onSkip }) {
  return (
    <section className="artist-intro">
      {/* 비디오 히어로 영역 */}
      <div className="artist-intro__video">
        <video
          src={`${import.meta.env.BASE_URL}${videoUrl}`}
          autoPlay
          muted
          loop
          playsInline
          className="artist-intro__video-player"
        />
      </div>

      <div className="artist-intro-inner">
              {/* 아티스트 이름 */}
      <div className="artist-intro-inner-responsive">
        <h1
          className="artist-intro__name"
          dangerouslySetInnerHTML={{ __html: name }}
        />

        {/* SNS 링크 */}
        <ul className="artist-intro__social">
          {social.instagram && (
            <li>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <AiOutlineInstagram />
              </a>
            </li>
          )}
          {social.x && (
            <li>
              <a href={social.x} target="_blank" rel="noopener noreferrer">
                <AiOutlineX />
              </a>
            </li>
          )}
          {social.facebook && (
            <li>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <RiFacebookCircleFill />
              </a>
            </li>
          )}
          {social.youtube && (
            <li>
              <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </li>
          )}
          {social.tiktok && (
            <li>
              <a href={social.tiktok} target="_blank" rel="noopener noreferrer">
                <FaTiktok style={{fontSize: "20px"}}/>
              </a>
            </li>
          )}
        </ul>
      </div>


      {/* 설명 텍스트 */}
      <p className="artist-intro__description">{description}</p>

      {/* SKIP 버튼 */}
        <div className="skip-button">
                <button className="artist-intro__skip" onClick={onSkip}>
        SKIP
      </button>
        </div>
      </div>
    </section>
  );
}

ArtistIntro.propTypes = {
  name: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  poster: PropTypes.string,
  social: PropTypes.shape({
    instagram: PropTypes.string,
    x: PropTypes.string,
    facebook: PropTypes.string,
    youtube: PropTypes.string,
    tiktok: PropTypes.string,
  }),
  description: PropTypes.string,
  onSkip: PropTypes.func.isRequired,
};
