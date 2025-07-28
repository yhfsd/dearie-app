// src/pages/FanLog/WriteEntryPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { ImFilePicture } from "react-icons/im";
import { FiLink } from "react-icons/fi";
import './WriteEntryPage.css';
import { FaAngleDown } from "react-icons/fa6";

  const tabOptions = ['AESPA', 'TXT', 'RIIZE', 'IU', 'IVE'];

export default function WriteEntryPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const yearFull = params.get('year');
  const month = params.get('month');
  const day = params.get('day');

  const yearShort = yearFull ? yearFull.slice(-2) : '';
  const WEEKDAYS_KR = ['일','월','화','수','목','금','토'];
  const dateObj = new Date(Number(yearFull), Number(month) - 1, Number(day));
  const weekday = WEEKDAYS_KR[dateObj.getDay()] || '';


  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);
  const [showTabList, setShowTabList] = useState(false);

  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const key = `fanLogEntry-${yearFull}-${month}-${day}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const { text, images, links, selectedTab: savedTab } = JSON.parse(saved);
        setText(text || '');
        setImages(images || []);
        setLinks(links || []);
        if (savedTab && tabOptions.includes(savedTab)) setSelectedTab(savedTab);
      } catch (e) {
        console.error('Parse error', e);
      }
    }
  }, [yearFull, month, day]);

  const onSave = useCallback(() => {

    if (getTotalBase64Size(images) > MAX_IMAGE_TOTAL_SIZE) {
      alert('이미지 용량이 너무 큽니다. 줄여주세요!');
      return;
    }
    const key = `fanLogEntry-${yearFull}-${month}-${day}`;
    localStorage.setItem(key, JSON.stringify({ text, images, links, selectedTab,createdAt: new Date().toISOString(), }));
    alert('등록되었습니다!');
    navigate(-1);
  }, [yearFull, month, day, text, images, links, selectedTab, navigate]);


  useEffect(() => {
  const handler = () => onSave();
  window.addEventListener('fanLogSave', handler);
  return () => window.removeEventListener('fanLogSave', handler);
}, [onSave]);

  async function resizeImageFile(file, maxW = 1024, maxH = 1024, q = 0.9) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxW || height > maxH) {
            if (width > height) { height = Math.round(height * (maxW/width)); width = maxW; }
            else { width = Math.round(width * (maxH/height)); height = maxH; }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          res(canvas.toDataURL('image/jpeg', q));
        };
        img.onerror = rej;
        img.src = e.target.result;
      };
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  }


  
  function getTotalBase64Size(arr) {
    return arr.reduce((sum, i) => sum + (i.preview?.length || 0), 0);
  }
  const MAX_IMAGE_TOTAL_SIZE = 1_500_000;

const onSelectImage = async e => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  try {
    const resizedImages = await Promise.all(
      files.map(file => resizeImageFile(file))
    );
    setImages(prev => [...prev, ...resizedImages.map(base64 => ({ preview: base64 }))]);
    e.target.value = '';
  } catch (err) {
    alert('이미지 변환 오류');
    console.error(err);
  }
};


  const onAddLink = () => {
    const url = prompt('첨부할 URL을 입력하세요');
    if (url) setLinks(prev => [...prev, url]);
  };




  const removeImage = idx => setImages(prev => prev.filter((_, i) => i !== idx));
  const removeLink = idx => setLinks(prev => prev.filter((_, i) => i !== idx));

  

  
  return (
    <>
    <div className="write-entry-container">

      <div className="we-date-row">
        <div className="we-date">
          {yearShort}년 {month}월 {day}일<span className="we-weekday">({weekday})</span>
        </div>
        <nav className="we-tabs">
          <button
            className="we-tab-btn active"
            onClick={() => setShowTabList(show => !show)}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {selectedTab}<span className="arrow"><FaAngleDown /></span>
          </button>
          {showTabList && (
            <div className="we-tab-list">
              {tabOptions.filter(opt => opt !== selectedTab).map(opt => (
                <button
                  key={opt}
                  className="we-tab-btn"
                  onClick={() => {
                  setSelectedTab(opt);
                  setShowTabList(false);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </nav>
      </div>

      <textarea
        className="we-textarea"
        placeholder="오늘의 활동을 기록해보세요."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      {(images.length || links.length) > 0 && (
        <div className="we-preview-list">
          <div className="we-preview-items">
          {images.map((img, i) => (

              <div key={i} className="we-preview-item">
                <img className="we-preview-img" src={img.preview} alt={`attachment-${i}`} />
                <button className="we-remove-btn" onClick={() => removeImage(i)}>
                  <IoClose size={16} />
                </button>
              </div>
          ))}
          </div>
          {links.map((url, i) => (
            <div key={i} className="we-link-item">
              <a href={url} target="_blank" rel="noopener noreferrer" className="we-link-text">{url}</a>
              <button className="we-remove-btn writeLink" onClick={() => removeLink(i)}>
                <IoClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <footer className="we-toolbar">
        <button className="we-tool-btn" onClick={() => fileInputRef.current.click()}>
          <ImFilePicture size={24} />
        </button>
        <button className="we-tool-btn" onClick={onAddLink}>
          <FiLink size={24} />
        </button>
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={onSelectImage} />
      </footer>
    </div>
    </>
  );
}