import React, { useRef, useState, useEffect } from 'react';
import './CustomAudioPlayer.css';
import { IoIosPlayCircle } from 'react-icons/io';
import { IoPauseCircle } from 'react-icons/io5';
import { FaBackward } from "react-icons/fa6";
import { FaForward } from "react-icons/fa6";

interface Props {
  src: string;
  coverImg: string;
  title: string;
  artist: string;
  isActive: boolean;
}

export default function CustomAudioPlayer({
  src, isActive,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

   // 슬라이드가 비활성 상태가 되면, 재생 중이던 오디오만 pause 처리
  useEffect(() => {
    const a = audioRef.current!;
    if (!isActive && playing) {
      a.pause();
      setPlaying(false);
    }
  }, [isActive, playing]);

  // 메타데이터 로드 & 진행 시간 추적
  useEffect(() => {
    const a = audioRef.current!;
    const onLoaded = () => setDuration(a.duration);
    const onTime = () => setCurrentTime(a.currentTime);
    a.addEventListener('loadedmetadata', onLoaded);
    a.addEventListener('timeupdate', onTime);
    return () => {
      a.removeEventListener('loadedmetadata', onLoaded);
      a.removeEventListener('timeupdate', onTime);
    };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current!;
    if (playing) a.pause();
    else a.play();
    setPlaying(!playing);
  };

  const seekRelative = (delta: number) => {
    const a = audioRef.current!;
    let t = a.currentTime + delta;
    if (t < 0) t = 0;
    if (t > a.duration) t = a.duration;
    a.currentTime = t;
    setCurrentTime(t);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const t = pct * duration;
    audioRef.current!.currentTime = t;
    setCurrentTime(t);
  };

  const fmt = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="custom-player">
      <audio ref={audioRef} src={src} preload="metadata" loop />

      {/* 슬라이더 + 타임라인 */}
      <div className="progress-container" onClick={seek}>
        <div
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <div className="time-display">
        <span className="time current">{fmt(currentTime)}</span>
        <span className="time total">{fmt(duration)}</span>
      </div>

      {/* 컨트롤 버튼들 */}
      <div className="controls">
        <button
          className="ctrl-btn"
          onClick={() => seekRelative(-10)}
          aria-label="10초 되감기"
        >
          <FaBackward />
        </button>
        <button
          className="play-btn"
          onClick={togglePlay}
          aria-label={playing ? '일시정지' : '재생'}
        >
          {playing ? <IoPauseCircle /> : <IoIosPlayCircle />}
        </button>
        <button
          className="ctrl-btn"
          onClick={() => seekRelative(10)}
          aria-label="10초 빨리감기"
        >
          <FaForward />
        </button>
      </div>
    </div>
  );
}
