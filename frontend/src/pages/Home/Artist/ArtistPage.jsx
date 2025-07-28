// src/pages/Artist/ArtistPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArtistIntro from "../../../components/ArtistIntro/ArtistIntro";
import { artists } from './artistsData';
import './ArtistPage.css';

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const artist = artists.find(a => a.key === id);
  if (!artist) {
    return <div className="artist-page__notfound">아티스트를 찾을 수 없습니다.</div>;
  }

  const handleSkip = () => {
    const group =  artist.titleName || artist.key;
    navigate(
      '/main?group=' + encodeURIComponent(group) +
      '&artist=' + encodeURIComponent(id)
    );
  };
  const { key, ...artistProps } = artist; 

  return (
    <div className="artist-page">
      <ArtistIntro
      key={key}
        {...artistProps}
        onSkip={handleSkip}
      />
    </div>
  );
}
