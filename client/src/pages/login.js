/* eslint-disable */
import React from 'react';

// CSS
import '../styles/pages/login.scss';

function Login(){
  return(
    <section className="login">
      <div>로고자리</div>
      <EmailForm/>
    </section>
  )
}

function EmailForm() {
  return(
    <div className="form-box">
      <form className="email-form">
        <h3>이메일 주소로 로그인 하세요</h3>
        <div className="email-input-box">
          <input type="email" placeholder="이메일"/>
        </div>   
      </form>
      <button className="form-button">다음</button>
      <p>Rotten Games 가 처음이신가요?</p>
    </div>
  )
}

function PasswordForm() {
  return(
    <form>
      <h3>비밀번호를 입력하세요</h3>
    </form>
  )
}

export default Login