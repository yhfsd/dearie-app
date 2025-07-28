// src/pages/FanLog/FanLogPage.jsx
// @ts-nocheck

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './FanLogPage.css';

// 이미지
import aespa01under from '../../assets/more/fanLogPage_and_themePage/aespa01under.png'

import calendar_01 from '../../assets/more/fanLogPage_and_themePage/calendar_01.png'
import calendar_02 from '../../assets/more/fanLogPage_and_themePage/calendar_02.png'
import calendar_03 from '../../assets/more/fanLogPage_and_themePage/calendar_03.png'
import calendar_04 from '../../assets/more/fanLogPage_and_themePage/calendar_04.png'
import calendar_05 from '../../assets/more/fanLogPage_and_themePage/calendar_05.png'
import calendar_06 from '../../assets/more/fanLogPage_and_themePage/calendar_06.png'
import calendar_07 from '../../assets/more/fanLogPage_and_themePage/calendar_07.png'
import calendar_08 from '../../assets/more/fanLogPage_and_themePage/calendar_08.png'
import calendar_09 from '../../assets/more/fanLogPage_and_themePage/calendar_09.png'
import calendar_10 from '../../assets/more/fanLogPage_and_themePage/calendar_10.png'

import aespa_item  from '../../assets/more/fanLogPage_and_themePage/aespa_item.png'
import aespa_item02  from '../../assets/more/fanLogPage_and_themePage/aespa_item02.png'
import titleImg from '../../assets/more/fanLogPage_and_themePage/title-img.png'
import titlePart2Img from '../../assets/more/fanLogPage_and_themePage/title-part2-img.png'

const WEEKDAYS = ['일','월','화','수','목','금','토'];
const RING_IMAGES = [
  calendar_01,
  calendar_02,
  calendar_03,
  calendar_04,
  calendar_05,
  calendar_06,
  calendar_07,
  calendar_08,
  calendar_09,
  calendar_10,
];
const sampleEntries = [
  {
    date: '08.09',
    items: [{
      id: 1,
      src: aespa_item,
      text: <>🧢 비니 구매 완료! [<span className="highlight">윈터</span>]의 착장템으로 나도 꾸며봤어요!</>
    }],
  },
  {
    date: '08.10',
    items: [{
      id: 2,
      src: aespa_item02,
      text: <>😳 깜짝! [<span className="highlight">윈터</span>]가 내 댓글에 하트를 눌렀어요!</>
    }],
  },
  { date: '08.11', items: [] },
];

export default function FanLogPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const stored = localStorage.getItem('userName');
    if (stored) setUserName(stored);
  }, []);
  const pageRef = useRef(null);
  const calendarWrapperRef = useRef(null);

  // 안내문 상태
  const [savingImage, setSavingImage] = useState(false);

  // PDF 생성 로딩 상태
  const [exporting, setExporting] = useState(false);

  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [currYear, setCurrYear] = useState(today.getFullYear());
  const [currMonth, setCurrMonth] = useState(today.getMonth() + 1);
  const [selectedDates, setSelectedDates] = useState([]);
  const toggleDate = day =>
    setSelectedDates(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  const [dateImagesByMonth, setDateImagesByMonth] = useState(() => ({
    8: {
      1: RING_IMAGES[0], 2: RING_IMAGES[1], 3: RING_IMAGES[2], 4: RING_IMAGES[3],
      5: RING_IMAGES[4], 6: RING_IMAGES[5], 7: RING_IMAGES[6], 8: RING_IMAGES[7],
      9: RING_IMAGES[8], 10: RING_IMAGES[9],
    },
  }));
const handleRingClick = useCallback(day => {
  // 클릭 직후 필요하다면 로딩 상태 처리...
  setTimeout(() => {
    setDateImagesByMonth(prev => ({
      ...prev,
      [currMonth]: {
        ...(prev[currMonth] || {}),
        [day]: RING_IMAGES[
          Math.floor(Math.random() * RING_IMAGES.length)
        ],
      },
    }));
  }, 1000);  // 1000ms = 1초 지연
}, [currMonth]);
  const onDateClick = day => {
    const y = currYear;
    const m = String(currMonth).padStart(2,'0');
    const d = String(day).padStart(2,'0');
    const key = `fanLogEntry-${y}-${m}-${d}`;
    if (localStorage.getItem(key)) {
      navigate(`/fan-log/view?year=${y}&month=${m}&day=${d}`);
    } else {
      navigate(`/fan-log/write?year=${y}&month=${m}&day=${d}`);
    }
  };
  const prevMonth = () => {
    if (currMonth === 1) {
      setCurrYear(y => y - 1);
      setCurrMonth(12);
    } else {
      setCurrMonth(m => m - 1);
    }
  };
  const nextMonth = () => {
    if (currMonth === 12) {
      setCurrYear(y => y + 1);
      setCurrMonth(1);
    } else {
      setCurrMonth(m => m + 1);
    }
  };
  const [entries] = useState(sampleEntries);
  const [bgImage] = useState(
    () => localStorage.getItem('fanLogBg') || aespa01under
  );
  useEffect(() => {
    const saved = localStorage.getItem('fanLogDateImages');
    if (saved) setDateImagesByMonth(JSON.parse(saved));
  }, []);
  useEffect(() => {
    const monthStr = String(currMonth).padStart(2, '0');
    const days = new Date(currYear, currMonth, 0).getDate();
    const updates = {};
    for (let d = 1; d <= days; d++) {
      const dayStr = String(d).padStart(2, '0');
      const key = `fanLogEntry-${currYear}-${monthStr}-${dayStr}`;
      if (localStorage.getItem(key) && !dateImagesByMonth[currMonth]?.[d]) {
        updates[d] = RING_IMAGES[Math.floor(Math.random() * RING_IMAGES.length)];
      }
    }
    if (Object.keys(updates).length) {
      setDateImagesByMonth(prev => ({
        ...prev,
        [currMonth]: {
          ...(prev[currMonth] || {}),
          ...updates,
        },
      }));
    }
  }, [currYear, currMonth, dateImagesByMonth]);

  // "사진 저장하기" 기능 (달력만 캡처)
  const handleSaveCalendarImage = async () => {
    if (!window.confirm('사진을 저장하시겠습니까?')) return;
    if (!calendarWrapperRef.current) return;
    setSavingImage(true);
    try {
      const canvas = await html2canvas(calendarWrapperRef.current, {
        useCORS: true,
        backgroundColor: '#fff'
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `fanlog-calendar-${currYear}-${String(currMonth).padStart(2, '0')}.png`;
      link.click();
    } catch (e) {
      alert('이미지 저장에 실패했습니다.');
      console.error(e);
    }
    setSavingImage(false);
  };

  // PDF 저장(원래 기능 유지)
  const handleExportPDF = async () => {
    if (!window.confirm('PDF를 생성하시겠습니까?')) return;
    if (!pageRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(pageRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(
        `fanlog-${currYear}-${String(currMonth).padStart(2, '0')}.pdf`
      );
    } catch (e) {
      console.error(e);
    }
    setExporting(false);
  };

  // 달력 계산
  const firstDay = new Date(currYear, currMonth - 1, 1).getDay();
  const daysInMonth = new Date(currYear, currMonth, 0).getDate();

  return (
    <div className="fanlog-container" ref={pageRef}>
      {/* 달력 섹션 */}
      <section className="calendar-section">
        <div className="section-title">
          <p className="title"><span>{userName || '팬'}</span> 님!</p>
          <p className="title second">오늘의 하루를&nbsp;<span>기록</span>해보세요 <img src={titleImg} alt="타이틀 이미지" className='title-img' /></p>
        </div>
        <div className="calendar-wrapper" ref={calendarWrapperRef}>
          <img src={bgImage} alt="calendar bg" className="calendar-bg" />
          <div className="calendar-overlay">
            <div className="calendar-inner">
              <div className="calendar-header">
                <button onClick={prevMonth}>
                  <GoChevronLeft size={24} color="#fff"/>
                </button>
                <span className="year-month">
                  {currYear}.{String(currMonth).padStart(2,'0')}
                </span>
                <button onClick={nextMonth}>
                  <GoChevronRight size={24} color="#fff"/>
                </button>
              </div>
              <div className="weekday-labels">
                {WEEKDAYS.map(d => <div key={d} className="weekday">{d}</div>)}
              </div>
              <div className="calendar-grid">
                {Array.from({ length:firstDay }).map((_, i) => (
                  <div key={i} className="calendar-cell empty" />
                ))}
                {Array.from({ length:daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const cellDate = new Date(currYear, currMonth - 1, day);
                  const isToday = cellDate.getTime() === todayDate.getTime();
                  const isSel   = selectedDates.includes(day);
                  const imgSrc  = dateImagesByMonth[currMonth]?.[day];
                  return (
                    <div key={day} className="calendar-cell-wrapper">
                      <div
                        className={`calendar-cell${isSel?' selected':''}${isToday?' today':''}`}
                        onClick={() => toggleDate(day)}
                      >
                        {day}
                      </div>
                      <div
                        className={`day-ring${imgSrc?' filled':''}`}
                        style={imgSrc?{backgroundImage:`url(${imgSrc})`}:{}} 
                        onClick={() => {
                          handleRingClick(day);
                          onDateClick(day);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="btn theme-btn" onClick={() => navigate('/fan-log/theme')}>
            테마 설정
          </button>
          <button className="btn save-btn" onClick={handleSaveCalendarImage} disabled={savingImage}>
            사진 저장하기
          </button>
        </div>
        {savingImage && (
          <div className="saving-image-guide">
            이미지를 저장 중입니다.<br/>잠시만 기다려주세요...
          </div>
        )}
      </section>

      {/* 타임라인 섹션 */}
      <section className="timeline-section">
        <div className="section-title-part2">
          <p className="title">잊기 아까운 순간들,</p>
          <p className="title second">이렇게 모았어요! <img src={titlePart2Img} alt="타이틀 이미지" className='title-part2-img' /></p>
        </div>
        <div className="timeline">
          {entries.map(entry => (
            <div key={entry.date} className="timeline-item">
              <div className="timeline-date">
                <div className="date-inner">
                  {entry.date}
                  <div className="circle" />
                </div>
              </div>
              <div className="timeline-cards">
  {entry.items.length ? entry.items.map((item, idx) => (
    <div
      key={item.id}
      className={`card ${idx === 1 ? 'card--second' : ''}`}
    >
      {item.src && (
        <img
          src={item.src}
          alt={`entry-${item.id}`}
          className={idx === 1 ? 'card-img--second' : 'card-img'}
        />
      )}
      {item.text && <p className="entry-text">{item.text}</p>}
    </div>
  )) : (
    <div className="empty-message">
      오늘의 팬심, 내일 이곳에 기록돼요 ✨
    </div>
  )}
</div>
            </div>
          ))}
        </div>

        {exporting && (
          <p className="exporting-text">PDF를 생성 중입니다.<br /> 
          잠시만 기다려주세요...</p>
        )}

        <div className="button-group pdf-btn-group">
          <button className="btn export-btn" onClick={handleExportPDF} disabled={exporting}>
            PDF로 저장하기
          </button>
        </div>
      </section>
    </div>
  );
}
