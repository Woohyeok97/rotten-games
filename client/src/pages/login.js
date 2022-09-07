/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';

// CSS
import styles from '../styles/pages/login.module.scss'
//Common Components
import NullComponent from '../components/nullcomponent';


function Login(){
  return(
    <section className="login">
      <LoginForm/>
      <OAuth/>
    </section>
  )
}


function LoginForm() {

  const [user, setUser] = useState({
    아이디 : '',
    비밀번호 : ''
  })

  const userLogin = ()=> {
    axios.post('http://localhost:3001/login', user, { withCredentials : true })
    .then((result)=>{ console.log(result) })
    .catch((에러)=>{ console.log('에러발생', 에러) })
  }

  return(
    <div className={ styles.loginForm }>
      <h3>이메일로 로그인하세요!</h3>
      <form>
        <input type="text" onChange={(e)=>{ setUser({...user, 아이디 : e.target.value}) }} placeholder="이메일"/>
        <input type="text" onChange={(e)=>{ setUser({...user, 비밀번호 : e.target.value}) }} placeholder="비밀번호"/>
      </form>
      <button onClick={()=>{ userLogin() }}>로그인</button>
    </div>
  )
}



function OAuth() {
  return(
    <div className={ styles.OAuth }>
      <h3>소셜 계정으로 로그인</h3>
      <NullComponent/>
    </div>
  )
}




export default Login