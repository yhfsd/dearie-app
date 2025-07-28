// src/pages/Home/Artist/sections/ToSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ToSection.css';
import { Link } from 'react-router-dom';


export default function ToSection({ artist }) {
  return (
    <div className="to-section">
      {artist.penletter.map((img,idx, ) => (
        <Link to={`/penletter/${artist.key}/${idx}`} key={`${artist.key}-${idx}`}>
          <div className="penletter-box" key={idx}>
            <div className="imgBox">
              <img 
              src={`${import.meta.env.BASE_URL}${img}`} 
              alt={`penletter-${idx}`}/>
            </div>
            <div className="nickname">
              <div className="iconBox">
                <img 
                src={`${import.meta.env.BASE_URL}${artist.penletterIcon[idx]}`}
                alt={`penletter-icon-${idx}`} 
                />
              </div>
              <span className="name">{artist.userName[idx]}</span>
            </div>
          </div>
        </Link>

        
      ))}
    </div>
  );
}

ToSection.propTypes = {
  artist: PropTypes.shape({
    key:        PropTypes.string.isRequired,
    titleName:  PropTypes.string.isRequired,
  }).isRequired,
};
