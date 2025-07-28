// src/components/TypeScript/SongPlayerPanel.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import CustomAudioPlayer from './CustomAudioPlayer';
import './SongPlayerPanel.css';
import type { Song } from './emusics';

interface Props {
  song: Song;
  onClose: () => void;
}

export default function SongPlayerPanel({ song, onClose }: Props) {
  const overlay = (
    <div className="song-player-panel">
      {/* 반투명 배경 */}
      <div className="panel-overlay" onClick={onClose} />

      {/* 실제 콘텐츠 */}
        <div className="main-box-inner">
                    <div className="Main-content">
                  <div className="panel-content">
        <div className="imgBox">
          <img src={song.img} alt={song.title} className="slide-cover" />
        </div>
        <div className="slide-info">
          <div className="slide-title">{song.title}</div>
          <div className="slide-artist">{song.groupName}</div>
        </div>

        <CustomAudioPlayer
          src={song.src}
          coverImg={song.img}
          title={song.title}
          artist={song.groupName}
          isActive={true}
        />


      </div>
        </div>
        </div>
                <button className="panel-close-btn" onClick={onClose}>
          닫기
        </button>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}
