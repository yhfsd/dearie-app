// 홈 섹션 하단, 더보기 섹션 하단에 사용할 푸터입니다.

import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
    <footer className='footfoot'>
        <div className="txtBox">
            <div className="top">
                <h4>&copy;Ezen Entertainment Crop.</h4>
                <h4>이용약관&ensp; · &ensp;개인정보처리방침&ensp; · &ensp;청소년보호정책&ensp; · &ensp;쿠키정책</h4>
            </div>
            <div className="bottom">
                <p>(주)이젠엔터테인먼트<br />
                서울 서초구 서초대로77길 41 대동2빌딩 9층<br />
                대표이사: 임자영<br />
                사업자등록번호: 123-45-67890<br />
                문의전화: 1234-5678<br />
                이메일: support@ezen.com<br />
                </p>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer