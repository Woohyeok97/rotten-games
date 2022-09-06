/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
// CSS
import styles from '../styles/pages/login.module.scss';
//Common Components
import NullComponent from '../components/nullcomponent';


function Login(){
  return(
    <section className={ styles.login }>
      <LoginForm/>
      <OAuth/>
    </section>
  )
}



function LoginForm() {
  
  const [user, setUser] = useState({
    아이디 : '',
    비밀번호 : '',
  })
  console.log(user)

  const submitUser = ()=>{
    axios.post('http://localhost:3001/login', user)
    .then((result)=>{ console.log(result) })
    .catch((에러)=>{ console.log('에러발생했잖슴~', 에러) })
  }
  
  return(
    <div className={ styles.loginForm }>
      <form>
        <h2>이메일 주소로 로그인하세요</h2>
        <input className={ styles.input } type='text' placeholder="이메일"
        onChange={(e)=>{ setUser({...user, 아이디 : e.target.value }) }}/>
        <input className={ styles.input } type="text" placeholder="비밀번호"
        onChange={(e)=>{ setUser({...user, 비밀번호 : e.target.value }) }}/>
      </form>

      <button className={ styles.btn } onClick={()=>{ submitUser() }}>로그인</button>

    </div>
    
  )
}

function OAuth() {
  return(
    <div>
      <h3>소셜 계정으로 로그인</h3>
      <NullComponent/>
    </div>
  )
}


export default Login