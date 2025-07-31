import React, { useState } from 'react';
import './LoginPage.css';
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { Link } from 'react-router-dom';






const LoginPage = ({ setIsLoggedIn }) => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPwChecked, setShowPwChecked] = useState(false);

  const handleNext = () => {
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // alert('올바른 이메일 형식을 입력해주세요.');
      // return;
    }

    setStep('password');
  };

  const handleLogin = () => {
    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (password.length < 3) {
      alert('비밀번호는 3자 이상 입력해주세요.');
      return;
    }

    console.log('이메일:', email, '비밀번호:', password);

    // 로그인 성공 처리
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleShowPwChecked = () => {
    setShowPwChecked(prev => !prev);
  };

  return (
    <div className="login-page">
      {step === 'email' && (
        <div className="step-container fade-in">
          <div className="mainTitle">
            <h2 className='title'>안녕하세요 :)</h2>
            <div className="secondTitle">
              <span className="brand">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/Login/Login-logo.png`}  
                  alt="Dearie_Logo" />
              </span>
              <p className="secondtext">입니다.</p>
            </div>
            <p className='text'>회원 서비스 이용을 위해 로그인 해주세요.</p>
          </div>

          <input
            type="email"
            placeholder="텍스트나 숫자를 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="next-btn" onClick={handleNext}>
            <p className="text">다음</p>
          </button>

          <div className="forgot-email">이메일을 잊었나요?</div>
          <div className="divider">
            <p className="divider-text">또는</p>
          </div>

          <div className="social-icons">
            <Link className="social naver" to={'https://nid.naver.com/user2/join/agree?lang=ko_KR&realname=N'} target="_blank"><p className="icon"><SiNaver /></p></Link>
            <Link 
            className="social kakao"
            to={'https://accounts.kakao.com/weblogin/create_account/?continue=https%3A%2F%2Fcs.kakao.com%2Fhelps%3Fcategory%3D168%26service%3D52&lang=ko&showHeader=false#selectVerifyMethod'}
            target='_blank'
            >
              <p className="icon"><RiKakaoTalkFill /></p>
            </Link>
            <Link className="social facebook"
            to={'https://www.facebook.com/r.php?entry_point=login'}
            target='_blank'
            ><p className="icon"><FaFacebookF /></p></Link>
            <Link className="social google"
            to={'https://accounts.google.com/lifecycle/steps/signup/name?continue=https://myaccount.google.com?utm_source%3Daccount-marketing-page%26utm_medium%3Dcreate-account-button&dsh=S386507393:1753776049722842&flowEntry=SignUp&flowName=GlifWebSignIn&TL=ALgCv6wsKIoG_-zNUk2uabQ7ABDhrfdKrYu6bdJZ5JJXKeMNmOfX4YcW3baa5rdj'}
            target='_blank'
            ><p className="icon"><FcGoogle /></p></Link>
            <Link className="social apple"
            to={'https://account.apple.com/account#'}
            target='_blank'
            ><p className="icon"><FaApple /></p></Link>
          </div>

          <div className="signup">
            <p className="text">신규 사용자이신가요?</p>
            <span className="link">회원가입하기</span>
          </div>
        </div>
      )}

      {step === 'password' && (
        <div className="step-container fade-in">
          <div className="back-container">
            <button className="back-btn" onClick={() => setStep('email')}><FiChevronLeft /></button>
            <h2 className="back-title">비밀번호를 입력해주세요</h2>

            <div className="password-wrapper">
              <input
                type={isShowPwChecked ? 'text' : 'password'}
                placeholder="3자리 이상 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={handleShowPwChecked}
                aria-label="비밀번호 보기 토글"
              >
                {isShowPwChecked ? <PiEye /> : <PiEyeSlash style={{ color: '#7A7979' }} />}
              </button>
            </div>

            <button className="next-btn" onClick={handleLogin}>
              <p className="text">로그인</p>
            </button>
            <div className="forgot-email">비밀번호를 잊었나요?</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;