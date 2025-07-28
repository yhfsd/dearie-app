// src/pages/Home/Artist/sections/Detail/TalkWritingPage.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './TalkWritingPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { ImFilePicture } from 'react-icons/im';
import { FiLink } from 'react-icons/fi';

export default function TalkWritingPage() {
  const { artistKey, postId } = useParams();
  const profileIndex = Number(postId);

  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const fileInputRef = useRef(null);

  // 시간 포맷팅 함수
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const targetTime = new Date(timestamp);
    const diffMs = now - targetTime;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return '방금 전';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      // 일주일이 넘으면 연도, 달, 일, 시간으로 표시
      const year = targetTime.getFullYear();
      const month = String(targetTime.getMonth() + 1).padStart(2, '0');
      const day = String(targetTime.getDate()).padStart(2, '0');
      const hours = String(targetTime.getHours()).padStart(2, '0');
      const minutes = String(targetTime.getMinutes()).padStart(2, '0');
      
      return `${year}.${month}.${day}. ${hours}:${minutes}`;
    }
  };

  // 수정 모드 데이터 로드
  useEffect(() => {
    const editData = sessionStorage.getItem('editingEntry');
    if (editData) {
      try {
        const parsedData = JSON.parse(editData);
        if (parsedData.isEditMode && 
            parsedData.artistKey === artistKey && 
            parsedData.profileIndex === profileIndex) {
          
          setText(parsedData.entryData.text || '');
          setImages(parsedData.entryData.images || []);
          setLinks(parsedData.entryData.links || []);
          setIsEditMode(true);
          setEditingEntryId(parsedData.entryId);
          
          // 사용한 데이터는 삭제
          sessionStorage.removeItem('editingEntry');
        }
      } catch (error) {
        console.error('수정 데이터 로드 중 오류:', error);
      }
    }
  }, [artistKey, profileIndex]);

  // 이미지 리사이즈 함수 (최대 1024px)
  async function resizeImageFile(file, maxW = 1024, maxH = 1024, quality = 0.9) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxW || height > maxH) {
            if (width > height) {
              height = Math.round(height * (maxW / width));
              width = maxW;
            } else {
              width = Math.round(width * (maxH / height));
              height = maxH;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  
  function getTotalBase64Size(arr) {
    return arr.reduce((sum, i) => sum + (i.preview?.length || 0), 0);
  }
  const MAX_IMAGE_TOTAL_SIZE = 1_500_000;

  // 이미지 선택 시
  const onSelectImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await resizeImageFile(file);
      setImages(prev => [...prev, { preview: base64 }]);
    } catch (error) {
      alert('이미지 변환 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  // 링크 추가
  const onAddLink = () => {
    const url = prompt('첨부할 URL을 입력하세요');
    if (url) {
      setLinks(prev => [...prev, url]);
    }
  };

  // 저장 버튼 클릭
const onSave = useCallback(() => {
  if (getTotalBase64Size(images) > MAX_IMAGE_TOTAL_SIZE) {
    alert('이미지 용량이 너무 큽니다. 줄여주세요!');
    return;
  }

  if (!text.trim() && images.length === 0 && links.length === 0) {
    alert('내용을 입력하거나 이미지를 추가해주세요.');
    return;
  }

  const localKey = `fanTalkEntries-${artistKey}-${profileIndex}`;
  const prevEntries = JSON.parse(localStorage.getItem(localKey) || '[]');
  const currentTime = new Date();

  if (isEditMode && editingEntryId) {
    // 수정 모드: 기존 글 업데이트
    const updatedEntries = prevEntries.map(entry => {
      if (entry.id === editingEntryId) {
        return {
          ...entry,
          text,
          images,
          links,
          editedAt: currentTime.toISOString(),
          editedAtFormatted: formatRelativeTime(currentTime)
        };
      }
      return entry;
    });
    localStorage.setItem(localKey, JSON.stringify(updatedEntries));
    alert('수정되었습니다!');
  } else {
    // 새 글 작성 모드
    const newEntry = {
      id: Date.now(),
      text,
      images,
      links,
      timestamp: currentTime.toISOString(),
      timestampFormatted: formatRelativeTime(currentTime)
    };
    const updatedEntries = [...prevEntries, newEntry];
    localStorage.setItem(localKey, JSON.stringify(updatedEntries));
    alert('등록되었습니다!');
  }

  window.dispatchEvent(new Event('localStorageUpdate'));
  localStorage.setItem('lastActiveTab', 'talk');
  navigate(-1);

}, [text, images, links, isEditMode, editingEntryId, artistKey, profileIndex, navigate]);

  return (
    <div className="talkWritingPage-Wrap">
      <header className="talk-header">
        <button className="talk-save-btn" onClick={onSave}>
          {isEditMode ? '수정' : '등록'}
        </button>
      </header>

      <textarea
        className="talk-textarea"
        placeholder="DEARIE에 남겨보세요."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      {(images.length > 0 || links.length > 0) && (
        <div className="talk-preview-list">
          <div className="talk-photo">
            {images.map((img, i) => (
              <div key={i} className="talk-preview-item">
                <img className="talk-preview-img" src={img.preview} alt={`attachment-${i}`} />
                <button
                  className="talk-remove-btn"
                  onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                >
                  <IoClose size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="talk-link">
            {links.map((url, i) => (
              <div key={i} className="talk-link-item">
                <a href={url} target="_blank" rel="noopener noreferrer" className="talk-link-text">{url}</a>
                <button
                  className="talk-remove-btn"
                  onClick={() => setLinks(prev => prev.filter((_, idx) => idx !== i))}
                >
                  <IoClose size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="talk-toolbar">
        <button className="talk-tool-btn" onClick={() => fileInputRef.current.click()}>
          <ImFilePicture size={24} />
        </button>
        <button className="talk-tool-btn" onClick={onAddLink}>
          <FiLink size={24} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onSelectImage}
        />
      </footer>
    </div>
  );
}