// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useNotifications } from "../../contexts/NotificationContext";
import { Link, useNavigate } from "react-router-dom";
import "./More.css";
import { FaCamera, FaPlus } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { PiCoatHanger } from 'react-icons/pi';
import { LuSquarePen } from "react-icons/lu";
import { LuFolderHeart } from "react-icons/lu";
import { PiHeartbeat } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import api from '../../api';

const More = () => {
  const navigate = useNavigate();
  const { clearReadFlags } = useNotifications();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const handleGroupPickClick = (group) => {
  setSelectedGroup(group);
  setConfirmModalOpen(true); // 모달 오픈
  };

  const handleConfirmJoin = () => {
  if (selectedGroup) {
    setPickedGroups([...pickedGroups, selectedGroup]);
  }
  setSelectedGroup(null);
  setConfirmModalOpen(false);
  };



  // --- 이름 / 레벨 / 경험치 ---
  const [name, setName] = useState("순간의 윈터");
  const [editing, setEditing] = useState(false);
  const [level, setLevel] = useState(5);
  const [exp, setExp] = useState(0);
  const maxExp = 1000;
  const [expGiven, setExpGiven] = useState(false);

  // --- 프로필 이미지 / 즐겨찾기 ---
  const [imageUrl, setImageUrl] = useState(null);
  const [pickedGroups, setPickedGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSections, setOpenSections] = useState([]);

  const allGroups = [
    { id: "aespa", name: "AESPA" },
    { id: "riize", name: "RIIZE" },
    { id: "txt", name: "TXT" },
    { id: "ive", name: "아이브" },
    { id: "iu", name: "아이유" },
  ];

  // ----- 초기 로컬스토리지에서 불러오기 -----
  useEffect(() => {
    // 이름
    const savedName = localStorage.getItem("userName");
    if (savedName) setName(savedName);

    // 프로필 이미지
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setImageUrl(savedImage);

    // 즐겨찾기
    const savedPicks = localStorage.getItem("pickedGroups");
    if (savedPicks) {
      try {
        setPickedGroups(JSON.parse(savedPicks));
      } catch {''}
    }
  }, []);

  // ----- 이름 변경 시 저장 -----
  useEffect(() => {
    localStorage.setItem("userName", name);
  }, [name]);

  // ----- EXP 자동 지급 -----
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn && !expGiven) {
      handleExpGain();
      setExpGiven(true);
    }
  }, [expGiven]);

  // ----- 이미지 변경 시 저장 ----
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem("profileImage", imageUrl);
    }
  }, [imageUrl]);


  async function compressImage(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        quality
      );
    };
    img.src = URL.createObjectURL(file);
  });
}
const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    // 압축된 dataURL을 얻어서 저장
    const compressedDataUrl = await compressImage(file, 800, 0.6);
    setImageUrl(compressedDataUrl);
  } catch (err) {
    console.error("이미지 압축 실패:", err);
    // 최후의 수단으로 원본을 저장할 수도 있습니다
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
  }
};

  // ----- 즐겨찾기 변경 시 저장 -----
  useEffect(() => {
    localStorage.setItem("pickedGroups", JSON.stringify(pickedGroups));
    window.dispatchEvent(new Event('pickedGroupsChanged'));
  }, [pickedGroups]);

  const handleExpGain = () => {
    let newExp = exp + 300;
    let newLevel = level;
    if (newExp >= maxExp) {
      newExp -= maxExp;
      newLevel += 1;
    }
    setExp(newExp);
    setLevel(newLevel);
  };


// const handleGroupPick = (group) => {
//   const exists = pickedGroups.some((g) => g.id === group.id);
//   if (exists) {
//     // 가입 취소는 현재 없음
//     return;
//   } else {
//     const confirmed = window.confirm(`정말 ${group.name}에 가입하시겠습니까?`);
//     if (confirmed) {
//       setPickedGroups([...pickedGroups, group]);
//     }
//   }
// };


  const handleRemovePick = (groupId) => {
    setPickedGroups(pickedGroups.filter((g) => g.id !== groupId));
  };

  const isGroupPicked = (groupId) =>
    pickedGroups.some((g) => g.id === groupId);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // 로그아웃 (확인창 + 로컬스토리지 초기화)
  const handleLogout = () => {
    const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");
    if (!confirmed) return;
    clearReadFlags();

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("pickedGroups");
    localStorage.removeItem("fanLogEntries");
    localStorage.removeItem("fanLogDateImages");
    localStorage.removeItem("fanLogBg");
    localStorage.removeItem("chatData");
    localStorage.removeItem('favorites');
    localStorage.removeItem('activeId');
    localStorage.removeItem('lastPath');
    localStorage.removeItem('likedUserPosts');
    localStorage.removeItem('userPostLikeCounts');


// [방용민_수정]ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    localStorage.removeItem('userId');
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('-comments-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('-postLikes-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('-postLiked-')) {
        localStorage.removeItem(key);
      }
    });



    Object.keys(localStorage).forEach((key) => {
      if (key.includes('comments-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('-talkPostLiked-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('-talkPostLikes-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('fanTalkEntries-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('-likedTime-')) {
        localStorage.removeItem(key);
      }
    });
    // [방용민_수정]ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith("fanLogEntry-")) {
      localStorage.removeItem(key);
    }
  });
  //    - 달력 링 이미지, 테마 배경도 삭제
  localStorage.removeItem("fanLogDateImages");
  localStorage.removeItem("fanLogBg");


  
  Object.keys(localStorage).forEach(key => {
      if (key.startsWith("challenge-stamps-")) {
        localStorage.removeItem(key);
      }
    });
      // ── [추가] 랭킹 관련 key 일괄 삭제
    localStorage.removeItem('fandomMap');
    localStorage.removeItem('bottomNavCategories');
    localStorage.removeItem('selectedArtist');
    localStorage.removeItem('navOpen');
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="more">
      {/* 사용자 정보 */}
      <div className="user-detail">
        <div className="profile-pic">
          <label htmlFor="profile-upload">
            <img 
              src={imageUrl || `${import.meta.env.BASE_URL}More/default-profile.png`}
              alt="profile" />
            {!imageUrl && (
              <div className="camera">
                <p className="camera-icon">
                  <FaCamera />
                </p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="user-info">
          <div className="name">
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setEditing(false)}
                autoFocus
              />
            ) : (
              <h2
                onClick={() => setEditing(true)}
                className={name.trim() === "" ? "name-placeholder" : ""}
              >
                {name.trim() === "" ? "이름 없음 (클릭해서 수정)" : name}
              </h2>
            )}
            <span className="level">Lv.{level}</span>
          </div>
          <div className="exp-bar">
            <div
              className="exp-fill"
              style={{ width: `${(exp / maxExp) * 100}%` }}
            />
          </div>
          <p className="exp-text">
            {exp} / {maxExp} EXP
          </p>
        </div>
      </div>

      {/* My Pick함 */}
      <div className="pick-section">
        <h3 className="pick-title">My Pick함</h3>
        <div className="pick-list">
          <div className="pick-list-imgBox">
                        <img 
              src={`${import.meta.env.BASE_URL}More/pickUp-input.png`}
              alt="profile" />
          </div>
          <div
            className={`pick-list-inside ${
              pickedGroups.length > 0 ? "has-picks" : "no-picks"
            }`}
          >
            <button
              className="pick-card"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="pick-circle plus">
                <FaPlus />
              </div>
              <p>Pick</p>
            </button>
            {pickedGroups.map((group) => (
              <div 
              key={group.id} 
              className="pick-card"
              style={{ cursor: "pointer"}}
              onClick={() => {
                navigate(`/main?group=${group.id.toUpperCase()}&artist=${group.id}`);
              }}
              >
                <div className="pick-circle">
                  <img src={`/groups/${group.id}.png`} alt={group.name} />
                </div>
                <p>{group.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pick 모달 */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target === e.currentTarget && setIsModalOpen(false)
          }
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="titleBox">
              <h3 className="pick-title">My Pick함</h3>
            </div>
            <div
              className={`pick-list-inside ${
                pickedGroups.length > 0 ? "has-picks" : "no-picks"
              }`}
            >
              {pickedGroups.map((group) => (
                <div key={group.id} className="pick-card">
                  <div className="pick-circle">
                    <p className="cancel-img">
                      <img src={`/groups/${group.id}.png`} alt={group.name} />
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemovePick(group.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
<ul className="modal-group-list">
  {allGroups.map((group) => {
    const picked = isGroupPicked(group.id);
    
    // 가입한 그룹은 숨기기
    if (picked) return null;

    return (
      <li key={group.id}>
        <div className="group-item">
          <p className="img">
            <img 
              src={`${import.meta.env.BASE_URL}groups/${group.id}.png`}
              alt={group.name} />
          </p>
          <span>{group.name}</span>
          <button
            className="group-action-btn join"
            onClick={(e) => {
              e.stopPropagation();
              handleGroupPickClick(group); // ✅ 모달 여는 함수
            }}
          >
            가입하기
          </button>

        </div>
      </li>
    );
  })}
</ul>

          </div>
        </div>
      )}

      {/* 메뉴 그리드 */}
      <div className="menu-grid">
        <Link to="/postlist" className="menu-item">
          <div className="icon">
            <LuSquarePen
              style={{ fontSize: "29px", color: "#FF4187" }}
            />
          </div>
          <p>내가 쓴 글</p>
        </Link>
        <Link to="/likelist" className="menu-item">
          <div className="icon">
            <LuFolderHeart style={{ fontSize: "30px", color: "#FF4187" }} />
          </div>
          <p>좋아요 목록</p>
        </Link>
        <Link to="/fan-log" className="menu-item">
          <div className="icon">
            <PiHeartbeat style={{ fontSize: "33px", color: "#FF4187" }} />
          </div>
          <p>덕심일지</p>
        </Link>
      </div>

      {/* 아코디언 섹션 */}
      <div className="accordion-section">
        <div className="accordion-item">
          <div
            className="accordion-title first"
            onClick={() => toggleSection("notice")}
          >
            <span>공지사항</span>
            <div className="downIcon">
              <GoChevronDown
                className={`chevron ${
                  openSections.includes("notice") ? "rotated" : ""
                }`}
              />
            </div>
          </div>
          <AnimatePresence mode="wait">
            {openSections.includes("notice") && (
              <motion.div
                layout
                key="notice"
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 300, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="accordion-content"
                style={{ overflow: "hidden" }}
              >
                <p>❤❤✨ Dearie의 회원이 된 것을 축하드립니다! ✨❤❤</p>
                <p>📢 웹페이지 개설 기념 이벤트 행사를 진행할 예정입니다.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="divider" />

        <div className="accordion-item">
          <div
            className="accordion-title"
            onClick={() => toggleSection("warning")}
          >
            <span>유의사항</span>
            <div className="downIcon">
              <GoChevronDown
                className={`chevron ${
                  openSections.includes("warning") ? "rotated" : ""
                }`}
              />
            </div>
          </div>
          <AnimatePresence mode="wait">
            {openSections.includes("warning") && (
              <motion.div
                layout
                key="warning"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="accordion-content"
                style={{ overflow: "hidden" }}
              >
                <ul className="warning-list">
                  <li>
                    <p>서로를 존중하는 팬덤 문화를 지켜주세요.</p>
                    <br />
                    <p>
                      특정 멤버나 팬에 대한 비방, 조롱, 싸움은 경고 없이 삭제 및 제재될 수 있습니다.
                    </p>
                  </li>
                  <li>
                    <p>허위 정보, 루머 유포는 엄격히 금지됩니다.</p>
                    <br />
                    <p>
                      아티스트와 관련된 사실 확인되지 않은 정보 공유는 삼가주세요.
                    </p>
                  </li>
                  <li>
                    <p>음란물, 광고, 도배 행위는 즉시 이용 정지 조치됩니다.</p>
                  </li>
                  <li>
                    <p>
                      게시판에 등록되는 이미지/글은 저작권을 침해하지 않아야 합니다.
                    </p>
                    <br />
                    <p>공식 이미지, 영상 등은 출처를 꼭 명시해주세요.</p>
                  </li>
                  <li>
                    <p>신고 기능은 올바른 이용을 위한 도구입니다.</p>
                    <br />
                    <p>악의적인 신고는 오히려 제재 대상이 될 수 있습니다.</p>
                  </li>
                  <li>
                    <p>아티스트를 사칭하거나 팬을 속이는 행위는 엄격히 금지됩니다.</p>
                  </li>
                  <li>
                    <p>
                      위 유의사항을 위반할 경우, 경고 없이 게시물 삭제 또는 이용 제한이 적용될 수 있습니다.
                    </p>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 로그아웃 */}
      <div className="logout-section">
        <button onClick={handleLogout} className="logout-btn">
          로그아웃
        </button>
      </div>
      {confirmModalOpen && (
  <div className="confirm-modal">
    <div className="confirm-modal-content modal">
      <p>
        <span>{selectedGroup?.name}</span>에 가입하시겠습니까?
      </p>
      <div className="modal-buttons">
        <button onClick={() => setConfirmModalOpen(false)}>취소</button>
        <button onClick={handleConfirmJoin}>가입하기</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default More;
