import React, { useState, useEffect } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { BsCheckLg } from 'react-icons/bs';
import CountUp from 'react-countup';
import './Challenge_calendar.css';
import Checked  from '../../assets/Challenge/Checked.png';
import noneCheck from '../../assets/Challenge/noneCheck.png'

// 모달 창 이미지
import heartalram from '../../assets/Challenge/heartalram.png'
import hearts     from '../../assets/Challenge/hearts.png'

// 애니메이션 데코
import particle1 from '../../assets/Home/pink4.png'
import particle2 from '../../assets/Home/pink7.png'
import particle3 from '../../assets/Home/note.png'
import particle4 from '../../assets/Home/pinkstar.png'
import particle5 from '../../assets/Home/purple7.png'
import particle6 from '../../assets/Home/heart.png'



const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * @param {{
 *   month: number,
 *   visibleDays: number[],
 *   initialStamps?: Record<number,'success'|'fail'>,
 *   certDate?: number,
 *   certWindow?: { startHour:number, endHour:number },
 *   isFolded: boolean,
 *   pastStampDays: number[],
 *   showCertButton: boolean,
 *   selectedArtist: string,
 *   categories?: { key:string, label:string }[],
 *   onCertSuccess?: () => void,
 *   myPoint?: number,
 *   certPoint?: number,
 *   disableToggle?: boolean,
 * }} props
 */
export default function Challenge_calendar({
  month,
  visibleDays,
  initialStamps = {},
  certDate,
  certWindow = { startHour: 0, endHour: 1 },
  isFolded=true,
  pastStampDays = [],
  showCertButton = true,
  selectedArtist = '',
  categories = [],
  onCertSuccess = () => {},
  myPoint = 0,
  certPoint = 1000,
  captureRef,
  daysIcon,
  disableToggle = false,
}) {
  // 초기 스탬프 병합
  const mergedStamps = {
    ...initialStamps,
    ...Object.fromEntries(pastStampDays.map(d => [d, 'success']))
  };

  const [stamps, setStamps] = useState(() => {
    const key = `challenge-stamps-${month}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : mergedStamps;
  });
  const [now, setNow] = useState(new Date());
  const [folded, setFolded] = useState(isFolded);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [oldPoint, setOldPoint] = useState(0);
  const [newPoint, setNewPoint] = useState(0);

  // 인증 가능 여부
  const { startHour, endHour } = certWindow;
  const h = now.getHours();
  const inCertWindow =
    startHour < endHour
      ? h >= startHour && h < endHour
      : h >= startHour || h < endHour;

  // 스탬프 저장  로컬에 저장하는거 비활성화!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // useEffect(() => {
  //   localStorage.setItem(
  //     `challenge-stamps-${month}`,
  //     JSON.stringify(stamps)
  //   );
  // }, [stamps, month]);

  // 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // 달력 접힘, 펼침 동기화
  useEffect(() => {
  setFolded(isFolded);
}, [isFolded]);

useEffect(() => {
  if (showConfirmModal) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'; // 🔐 요거 추가!
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };
}, [showConfirmModal]);



  // 자동 실패 처리
  useEffect(() => {
    if (
      certDate != null &&
      now.getHours() >= certWindow.endHour &&
      stamps[certDate] == null
    ) {
      setStamps(prev => ({ ...prev, [certDate]: 'fail' }));
    }
  }, [now, certWindow.endHour, stamps, certDate]);

  function handleCertClick() {
    if (!inCertWindow || stamps[certDate] === 'success') return;
    setShowConfirmModal(true);
    setChecked(false);
  }

  function onConfirmModal() {
    // 1) 스탬프 처리
    setStamps(prev => ({ ...prev, [certDate]: 'success' }));
    // 2) 포인트 애니메이션 준비
    setOldPoint(myPoint);
    setNewPoint(myPoint + certPoint);
    // 3) 모달 전환
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    // 4) 부모 콜백
    onCertSuccess();
  }

  function onCancel() {
    setShowConfirmModal(false);
  }

  // 아티스트 메시지 (기존 그대로)
  const currentCat = categories.find(c => c.key === selectedArtist) || {};
  const message = currentCat.label || selectedArtist;

  // 달력 셀 구성 (기존 그대로)
  const year = now.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  const expanded = [...Array(firstDayIndex).fill(null), ...allDays];
  const firstVisIdx = new Date(year, month - 1, visibleDays[0]).getDay();
  const foldedArr = [...Array(firstVisIdx).fill(null), ...visibleDays];
  const cellsToRender = folded ? foldedArr : expanded;

  // 버튼 상태 결정 (기존 로직 유지)
  let status;
  if (!inCertWindow) {
    status = 'fail';
  } else if (stamps[certDate] === 'success') {
    status = 'done';
  } else if (stamps[certDate] === 'fail') {
    status = 'fail';
  } else {
    status = 'active';
  }
  const label =
    status === 'done'
      ? '인증완료 🤲 내일 또 도전해주세요!'
      : status === 'active'
        ? '인증하기'
        : '지금은 인증 시간이 아니에요😥';
  const disabledBtn = status !== 'active';

  return (
    <div className="Challenge_calendar">
      {/* 인증 버튼 */}
      {showCertButton && (
        <button
          className={`Challenge_cert-button Challenge_cert-button--${status}`}
          onClick={handleCertClick}
          disabled={disabledBtn}
        >
          {label}
        </button>
      )}

      {/* 기존 캘린더 렌더링 */}
      {/* 캡쳐 범위 */}
      <div ref={captureRef}>
        <div className="Challenge_calendar-header">
          <div className="rewardiconBox">
            <h3>달달한 리워드</h3>
            <div className="iconBox">
              <img src={daysIcon} alt="리워드" />
            </div>
          </div>
          {!disableToggle && (
          <button
            className="Challenge_toggle-button"
            onClick={() => setFolded(prev => !prev)}
          >
            {folded ? <GoChevronDown /> : <GoChevronUp />}
          </button>
          )}

        </div>
        <div className={`Challenge_calendarBox${!folded ? ' no-bg' : ''}`}>
          {!folded && <div className="Challenge_month-label">{month}월</div>}
          <div className="Challenge_weekdays">
            {weekdays.map(d => (
              <div key={d} className="Challenge_weekday">{d}</div>
            ))}
          </div>
          <div className="Challenge_dates">
            {cellsToRender.map((day, idx) => (
<div
  key={idx}
  className={`Challenge_date-cell${day == null ? ' empty' : ''}`}
  style={{
    backgroundColor:
      stamps[day] == null && day === certDate ? '' : 'white',
  }}
>
  {day != null && (
    <>
      <div className="Challenge_date-header">
        {stamps[day] !== 'success' && (
          <span
            className="Challenge_day-number small"
            style={{
              color:
                stamps[day] === 'fail'
                  ? '#cccccc'
                  : stamps[day] == null && day === certDate
                  ? '#ff4187'
                  : stamps[day] == null
                  ? '#000000'
                  : 'transparent',
            }}
          >
            {day}
          </span>
        )}
      </div>
      <div className="Challenge_stamp-wrapper">
        {stamps[day] === 'success' && (
          <div className="Challenge_stamp Challenge_stamp-success">
            <img src={Checked} alt="성공" />
          </div>
        )}
        {stamps[day] === 'fail' && (
          <div className="Challenge_stamp Challenge_stamp-fail">
            <img src={noneCheck} alt="실패" />
          </div>
        )}
        {stamps[day] == null && day === certDate && (
          <div className="Challenge_stamp Challenge_stamp-today">
            <img src={noneCheck} alt="오늘" />
          </div>
        )}
        {stamps[day] == null && day !== certDate && (
          <div className="Challenge_stamp Challenge_stamp-future">
            <img src={noneCheck} alt="미래" />
          </div>
        )}
      </div>
    </>
  )}
</div>

            ))}
          </div>
        </div>
      </div>



      {/* 인증 확인 모달 */}
      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>지금 시간은{' '}{now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})}{' '} <img src={heartalram} alt='알람 아이콘' className='calendarIcons' /></p>
            <p>이른 아침부터 최고예요 <img src={hearts} alt='하트 아이콘' className='calendarIcons' /><br />
            Dearie가 응원해요!</p>
            <label className="modal-checkbox">
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                className="modal-checkbox-input"
              />
              <span className="modal-checkbox-icon">
                {checked && <BsCheckLg />}
              </span>
              오늘의 인증을 &nbsp;<span className="who">{message}</span>에게 보냅니다
            </label>
            <div className="modal-buttons">
              <button onClick={onCancel}>취소</button>
              <button onClick={onConfirmModal} disabled={!checked}>인증하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 인증 성공 모달 (카운트업) */}
      {showSuccessModal && (
        <div className="modal-backdrop">
          <div className="modal success-modal">
            <div className="particle-container">
              {[particle1, particle2, particle3, particle4, particle5, particle6].map((src, i) => (
              <img key={i} src={src} className={`particle particle-${i}`} alt="effect" />))}
            </div>
            <h2>인증 성공! 1000냥 적립되었어요! 🎉</h2>
            <div className="point-up-layout">
              <div className="old-point">{oldPoint.toLocaleString()} 냥</div>
              <div className="arrow">→</div>
              <div className="new-point">
                <CountUp
                  start={oldPoint}
                  end={newPoint}
                  duration={1}
                  separator="," 
                  suffix=" 냥"
                />
              </div>
            </div>
            <button onClick={() => setShowSuccessModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
