// src/pages/Home/Artist/sections/Detail/NoticeDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { GoShareAndroid } from 'react-icons/go';
import logo from "../../../../../assets/Header/Header-logo.png";
import "../../../../../components/Header.css";
import "./NoticeDetail.css";
import { GoCalendar }     from 'react-icons/go';
import { PiSpeakerHigh } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import ApplicationMainImg from "../../../../../assets/Notices/application-main.png";
import riizeinside from "../../../../../assets/Notices/riize-inside.png";
import iuinside from "../../../../../assets/Notices/iu-inside.png";
import aespainside    from "../../../../../assets/Notices/aespa-inside.png";
import txtinside    from "../../../../../assets/Notices/txt-inside.png";
import iveinside    from "../../../../../assets/Notices/ive-inside.png";
import { RxCheck } from "react-icons/rx";
import { GoTriangleDown } from "react-icons/go";

// 아티스트별 공지 데이터 매핑
const artistNotices = {
  riize: {
    application: {
      title: '덕심일지 공모전(8월)',
      mainTitle: '제작 방법',
      mainImg: ApplicationMainImg,
      insideImg: riizeinside,
      endTime: '08.24 22:00 종료',
    },










    rules: {
      title: '[RIIZE] 팬 커뮤니티 통합 규정 안내',
      body: (
        <>
        <p>
            안녕하세요.<br/>
RIIZE(라이즈) 팬 커뮤니티 담당자입니다.<br/>
<br/>
RIIZE(라이즈) 팬 커뮤니티 통합 규정 안내 드립니다.<br/>
<br/>
[규칙]<br/>
-1인 1계정을 원칙으로 하며, 타인의 명의로 가입하거나 도용, 허위<br/>
 정보로 가입한 사실이 확인될 경우 해당 회원은 영구 활동 중지<br/>
 처리됩니다.<br/>
<br/>
[게시판 사용 규칙]<br/>
- 무의미한 댓글, 도배성 댓글 금지<br/>
- 분란을 일으키는 댓글/게시물 금지<br/>
- 홍보성, 상업성, 음란성, 도배성 글 금지<br/>
- 욕설, 은어, 음란, 비하적 발언 등 작성 시 무통보 삭제<br/>
- 개인 신상 정보 언급 및 노출 금지<br/>
<br/>
모든 규정은 추후 수정 및 변경될 수 있으니 수시로 확인 부탁드립니다.<br/>
위 규정에 어긋나는 게시글 및 댓글은 무통보 삭제 처리되며,<br/>
사유에 따라 규정 위반 회원은 활동 중지 또는 강퇴 처리될 수 있는 점<br/>양해 바랍니다.
        </p>
        </>
      ),
    },
  },





  iu: {
    application: {
      title: '덕심일지 공모전(8월)',
      mainTitle: '제작 방법',
      mainImg: ApplicationMainImg,
      insideImg: iuinside,
      endTime: '08.24 18:00 종료',
    },





    rules: {
      title: '[IU] 팬 커뮤니티 통합 규정 안내',
      body: <p>
        안녕하세요.<br/>
IU(아이유) 팬 커뮤니티 담당자입니다.<br/>
<br/>
IU(아이유) 팬 커뮤니티 통합 규정 안내 드립니다.<br/>
<br/>
[규칙]<br/>
-1인 1계정을 원칙으로 하며, 타인의 명의로 가입하거나 도용, 허위<br/>
 정보로 가입한 사실이 확인될 경우 해당 회원은 영구 활동 중지<br/>
 처리됩니다.<br/>
<br/>
[게시판 사용 규칙]<br/>
- 무의미한 댓글, 도배성 댓글 금지<br/>
- 분란을 일으키는 댓글/게시물 금지<br/>
- 홍보성, 상업성, 음란성, 도배성 글 금지<br/>
- 욕설, 은어, 음란, 비하적 발언 등 작성 시 무통보 삭제<br/>
- 개인 신상 정보 언급 및 노출 금지<br/>
<br/>
모든 규정은 추후 수정 및 변경될 수 있으니 수시로 확인 부탁드립니다.<br/>
위 규정에 어긋나는 게시글 및 댓글은 무통보 삭제 처리되며,<br/>
사유에 따라 규정 위반 회원은 활동 중지 또는 강퇴 처리될 수 있는 점<br/>양해 바랍니다.
      </p>,
    },
  },








  txt: {
    application: {
      title: '덕심일지 공모전(8월)',
      mainTitle: '제작 방법',
      mainImg: ApplicationMainImg,
      insideImg: txtinside,
      endTime: '08.24 20:00 종료',
    },








    rules: {
      title: '[TXT] 팬 커뮤니티 통합 규정 안내',
      body: <p>
        안녕하세요.<br/>
<br/>
<br/>
TXT(투모로우바투게더) 팬 커뮤니티 통합 규정 안내 드립니다.<br/>
<br/>
[규칙]<br/>
-1인 1계정을 원칙으로 하며, 타인의 명의로 가입하거나 도용, 허위<br/>
 정보로 가입한 사실이 확인될 경우 해당 회원은 영구 활동 중지<br/>
 처리됩니다.<br/>
<br/>
[게시판 사용 규칙]<br/>
- 무의미한 댓글, 도배성 댓글 금지<br/>
- 분란을 일으키는 댓글/게시물 금지<br/>
- 홍보성, 상업성, 음란성, 도배성 글 금지<br/>
- 욕설, 은어, 음란, 비하적 발언 등 작성 시 무통보 삭제<br/>
- 개인 신상 정보 언급 및 노출 금지<br/>
<br/>
모든 규정은 추후 수정 및 변경될 수 있으니 수시로 확인 부탁드립니다.<br/>
위 규정에 어긋나는 게시글 및 댓글은 무통보 삭제 처리되며,<br/>
사유에 따라 규정 위반 회원은 활동 중지 또는 강퇴 처리될 수 있는 점<br/>양해 바랍니다.
      </p>,
    },
  },








  aespa: {
    application: {
      title: '덕심일지 공모전(8월)',
      mainTitle: '제작 방법',
      mainImg: ApplicationMainImg,
      insideImg: aespainside,
      endTime: '08.24 19:00 종료',
    },
    rules: {
      title: '[ASEPA] 팬 커뮤니티 통합 규정 안내',
      body: <p>
        안녕하세요.<br/>
에스파(AESPA) 팬 커뮤니티 담당자입니다.<br/>
<br/>
에스파(AESPA) 팬 커뮤니티 통합 규정 안내 드립니다.<br/>
<br/>
[규칙]<br/>
-1인 1계정을 원칙으로 하며, 타인의 명의로 가입하거나 도용, 허위<br/>
 정보로 가입한 사실이 확인될 경우 해당 회원은 영구 활동 중지<br/>
 처리됩니다.<br/>
<br/>
[게시판 사용 규칙]<br/>
- 무의미한 댓글, 도배성 댓글 금지<br/>
- 분란을 일으키는 댓글/게시물 금지<br/>
- 홍보성, 상업성, 음란성, 도배성 글 금지<br/>
- 욕설, 은어, 음란, 비하적 발언 등 작성 시 무통보 삭제<br/>
- 개인 신상 정보 언급 및 노출 금지<br/>
<br/>
모든 규정은 추후 수정 및 변경될 수 있으니 수시로 확인 부탁드립니다.<br/>
위 규정에 어긋나는 게시글 및 댓글은 무통보 삭제 처리되며,<br/>
사유에 따라 규정 위반 회원은 활동 중지 또는 강퇴 처리될 수 있는 점<br/>양해 바랍니다.
      </p>,
    },
  },








  ive: {
    application: {
      title: '덕심일지 공모전(8월)',
      mainTitle: '제작 방법',
      mainImg: ApplicationMainImg,
      insideImg: iveinside,
      endTime: '08.24 21:00 종료',
    },








    rules: {
      title: '[IVE] 팬 커뮤니티 통합 규정 안내',
      body: <p>
        안녕하세요.<br/>
IVE(아이브) 팬 커뮤니티 담당자입니다.<br/>
<br/>
IVE(아이브) 팬 커뮤니티 통합 규정 안내 드립니다.<br/>
<br/>
[규칙]<br/>
-1인 1계정을 원칙으로 하며, 타인의 명의로 가입하거나 도용, 허위<br/>
 정보로 가입한 사실이 확인될 경우 해당 회원은 영구 활동 중지<br/>
 처리됩니다.<br/>
<br/>
[게시판 사용 규칙]<br/>
- 무의미한 댓글, 도배성 댓글 금지<br/>
- 분란을 일으키는 댓글/게시물 금지<br/>
- 홍보성, 상업성, 음란성, 도배성 글 금지<br/>
- 욕설, 은어, 음란, 비하적 발언 등 작성 시 무통보 삭제<br/>
- 개인 신상 정보 언급 및 노출 금지<br/>
<br/>
모든 규정은 추후 수정 및 변경될 수 있으니 수시로 확인 부탁드립니다.<br/>
위 규정에 어긋나는 게시글 및 댓글은 무통보 삭제 처리되며,<br/>
사유에 따라 규정 위반 회원은 활동 중지 또는 강퇴 처리될 수 있는 점<br/>양해 바랍니다.
      </p>,
    },
  },
};

export default function NoticeDetail() {
  const { artistKey, slug } = useParams();
  const notice = artistNotices[artistKey]?.[slug] || {
    title: '공지 없음',
    body: <p>등록된 공지가 없습니다.</p>,
  };

  const handleShare = async () => {
    const shareData = {
      title: notice.title,
      text: notice.title,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn('공유 취소됨 또는 실패:', err);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch {
        alert('링크 복사에 실패했습니다.');
      }
    } else {
      alert('공유를 지원하지 않는 환경입니다.');
    }
  };

  return (
    <>
      <header className="header" style={{ backgroundColor: '#121212', color: '#fff' }}>
        <div className="header-section left">
          <button className="header-link back-button" onClick={() => window.history.back()}>
            <FiChevronLeft size={24} color="#fff" />
          </button>
        </div>
        <div className="header-section center">
          {slug === 'rules' ? (
            <img src={logo} alt="Logo" className="header-logo" />
          ) : (
            <span className="title" style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>
              {notice.endTime}
            </span>
          )}
        </div>
        <div className="header-section right">
          <button className="header-link" onClick={handleShare}>
            <GoShareAndroid size={24} color="#fff" />
          </button>
        </div>
      </header>


<div className="notice-detail">
  <h1 className="notice-detail__title">
    {slug === 'application' ? (
      <PiSpeakerHigh style={{ fontSize: 19, color: '#FF4187', paddingTop: 2 }} />
    ) : (
      <GoCalendar style={{ fontSize: 19, color: '#FF4187', paddingTop: 2 }} />
    )}
    <span
      className={`title ${
        slug === 'application'
          ? 'bodyBox--application'
          : 'bodyBox--rules'
      }`}
    >
      {notice.title}
    </span>
  </h1>

<div className="notice-detail__body">
  <div className={`bodyBox ${
      slug === 'application' ? 'bodyBox--application' : 'bodyBox--rules'
    }`}
  >
    <div className="firstBox">

        <div className="mainTitleBox">
          {notice.mainTitle && (
        <>
          <FiEdit size={14} style={{ marginRight: 5, color:'rgba(255,255,255,0.7'}} />
          <span className="mainTitle">{notice.mainTitle}</span>
        </>
      )}
        </div>


        <div className="imgBox">
          {notice.mainImg && (
        <div className="notice-detail__main-img">
          <img src={notice.mainImg} alt={notice.title} />
        </div>
      )}
      <div className="textBox">
        <p className="text">소개접수가이드</p>
      </div>
        </div>


<div className="imgBox-inside">

      <div className="insideBox-inner">
          <div className="inside-textBox">
    <p className="title"><span>1</span>달력 테마</p>
    <p className="text">· 작업 사이즈:(W) 393 * (H) 852 PX</p>
    <p className="text">· 품질: 고화질</p>
    <p className="text">· 제출 형식: JPG or PNG</p>
  </div>


  {notice.insideImg && (
    <div className="inside-imgBox">
      <img 
        src={notice.insideImg} 
        alt="Inside 설명 이미지" 
        className="inside-img" 
      />
    </div>
  )}
      </div>
</div>
    </div>
    <div className="secondBox">
        <div className="titleBox">
            <p className="title"><RxCheck style={{fontSize:'22px', padding:'0px 0px 2px 0px', marginRight:'0px'}}/>꼭 읽어주세요!</p>
        </div>
        <div className="textBox">
            <p className="text">· 소재 미접수 시 이벤트 진행이 어렵습니다.</p>
            <p className="text">· 개인/단체의 로고 및 계정/QR 삽입은 불가합니다.</p>
            <p className="text">· 가이드 기준 미준수 시, 별도 통보 없이 반려될 수 있습니다.</p>
            <p className="text">· 저작권  책임은 접수자에게 있으며, 타인의 창작물 사용 시<br/><span className="opacity0">· </span>반드시 사전 동의를 받아주세요.</p>
            <p className="text">· 제출된 소재는 마켓팅 및 홍보 목적으로 활용될 수 있습니다.</p>
        </div>


        <div className="urlBox">
            <div className="title">
                <GoTriangleDown />
                <GoTriangleDown />
                <GoTriangleDown />
                <p className="main-title">소재 제출하기</p>
                <GoTriangleDown />
                <GoTriangleDown />
                <GoTriangleDown />
            </div>
            <div className="from-link">
                <a
      href="https://forms.gle/AWyH9gyjgRnwUgr68"
      target="_blank"
      rel="noopener noreferrer"
      className="form-link__anchor"
    >
        <span>https://forms.gle/AWyH9gyjgRnwUgr68</span>
    </a>
            </div>
        </div>
    </div>

    {notice.body}
  </div>
</div>
</div>
    </>
  );
}
