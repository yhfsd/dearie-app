import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import allSchedules from './CalendarData';
import { FiChevronLeft, FiList } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { GoCheck } from "react-icons/go";
import { LuPartyPopper } from "react-icons/lu";
import { TbMicrophone } from "react-icons/tb";
import { LuMusic4 } from "react-icons/lu";
import { PiCalendarHeart } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";

function ReactCalendar() {
  const categories = ['전체', '축하', '방송', '발매', '행사', '기타'];
  const categoriesIcons = [
    <FiList style={{ color: '#000' }} />,
    <LuPartyPopper style={{ color: '#7ADBD9' }} />,
    <TbMicrophone style={{ color: '#FFB500' }} />,
    <LuMusic4 style={{ color: '#FF7B87' }} />,
    <PiCalendarHeart style={{ color: '#815ED9' }} />,
    <IoIosMore style={{ color: '#6BCC5F' }} />
  ];

  const [selectedCategories, setSelectedCategories] = useState(categories); // 전체 포함 초기값
  const [tempSelectedCategories, setTempSelectedCategories] = useState(categories);
  const [categoryVisible, setCategoryVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [selectedGroup, setSelectedGroup] = useState('AESPA');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const groups = ['AESPA','TXT'];
  const categoryColors = {
    축하: '#7ADBD9',
    방송: '#FFB500',
    발매: '#FF7B87',
    행사: '#815ED9',
    기타: '#6BCC5F',
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const selectedGroupSchedules = allSchedules[selectedGroup] || {};
  const selectedDateKey = formatDate(selectedDate);
  const detailedSchedules = selectedGroupSchedules[selectedDateKey] || [];

  const filteredSchedules =
    selectedCategories.includes('전체') || selectedCategories.length === 0
      ? detailedSchedules
      : detailedSchedules.filter(s => selectedCategories.includes(s.category));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setActiveStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setActiveStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate);
  };

  const handleSelectGroup = (groupName) => {
    setSelectedGroup(groupName);
    setDropdownOpen(false);
  };

  // ✅ 카테고리 토글 로직 (임시 상태)
  const toggleCategory = (category) => {
    let updated = [...tempSelectedCategories];

    if (category === '전체') {
      if (tempSelectedCategories.length === categories.length) {
        updated = [];
      } else {
        updated = [...categories];
      }
    } else {
      if (updated.includes(category)) {
        updated = updated.filter(c => c !== category);
      } else {
        updated.push(category);
      }

      const others = categories.filter(c => c !== '전체');
      if (others.every(c => updated.includes(c))) {
        updated = [...categories];
      } else {
        updated = updated.filter(c => c !== '전체');
      }
    }

    setTempSelectedCategories(updated);
  };

  const handleCategoryApply = () => {
    setSelectedCategories(tempSelectedCategories);
    setCategoryVisible(false);
  };

  const handleCategoryOpen = () => {
    setTempSelectedCategories(selectedCategories);
    setCategoryVisible(true);
  };

  return (
    <div className="calendar-wrap">
      {/* 배경 어둡게 하는 overlay */}
      {categoryVisible && (
        <div className="overlay" onClick={() => setCategoryVisible(false)}/>
      )}

      {/* 카테고리 패널 */}
      <div className={`category ${categoryVisible ? 'show' : ''}`}>
        <div className="categoryInner">
          <div className="cancelBox">
            <IoClose onClick={() => setCategoryVisible(false)} />
          </div>
          <p className="categorySelect">스케쥴 선택</p>
          <ul>
            {categories.map((cat, idx) => (
              <li key={cat} className={`category-button ${tempSelectedCategories.includes(cat) ? 'active' : ''}`}>
                {categoriesIcons[idx]}<span>{cat}</span>
                <button onClick={() => toggleCategory(cat)}><GoCheck /></button>
              </li>
            ))}
          </ul>
          <button className="categoryCheck" onClick={handleCategoryApply}>설정 완료</button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="titleBox" ref={dropdownRef}>
          <div className="titleBoxInner">
            <div className="groupButtonBox">
              <button className="groupButton" onClick={() => setDropdownOpen(prev => !prev)}>
                <FiChevronLeft /> {selectedGroup}
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  {groups.map((group) => (
                    <li key={group} onClick={() => handleSelectGroup(group)}>{group}</li>
                  ))}
                </ul>
              )}
            </div>의
          </div>
          <p>스케쥴을 확인해보세요</p>
        </div>

        <div className="calendarBox">
          <div className="calendarButtonBox">
            <button className="scheduleButton" onClick={handleCategoryOpen}>
              카테고리 <FiChevronLeft />
            </button>
            <button className="todayButton" onClick={handleTodayClick}>
              오늘
            </button>
          </div>

          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={handleActiveStartDateChange}
            calendarType="gregory" // 요일 시작을 일요일로 설정
            minDetail="month" // 위에 있는 날짜 버튼 무효화
            formatDay={(locale, date) => date.getDate()}
            formatMonthYear={(locale, date) =>
              `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
            }
            tileContent={({ date }) => {
              const key = formatDate(date);
              let schedules = selectedGroupSchedules[key] || [];

              if (!selectedCategories.includes('전체')) {
                schedules = schedules.filter(s => selectedCategories.includes(s.category));
              }

              if (schedules.length > 0) {
                return (
                  <div className="schedule-dots">
                    {schedules.map((s, idx) => (
                      <div
                        key={idx}
                        className="schedule-dot"
                        style={{ backgroundColor: categoryColors[s.category] }}
                      />
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />

          <div className="schedule-detail-box">
            <h3>{selectedDate.toLocaleDateString('ko-KR', {
              day: 'numeric',
              weekday: 'short',
            })}</h3>
            {filteredSchedules.length === 0 ? (
              <p className="noSchedule">등록된 일정이 없습니다.</p>
            ) : (
              <ul>
                <AnimatePresence>
                {filteredSchedules.map((item, idx) => (
                  <motion.li
                    key={`${selectedDate.toISOString()}-${item.name}-${idx}`}
                    className="schedule-detail-item"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                      <div className="titleBox">
                        <p className="schedule-category">{item.icon}{item.category}</p>
                        <p className="schedule-name">{item.name}</p>
                        <p className="schedule-time">{item.time}</p>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactCalendar;
