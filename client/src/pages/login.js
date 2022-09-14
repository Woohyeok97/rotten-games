/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

// CSS
import styles from '../styles/pages/login.module.scss'
//Common Components
import NullComponent from '../components/nullcomponent';
//redux
import { SET_TOKEN } from '../Store/JWTtoken';

function Login(){
  return(
    <section className="login">
      <LoginForm/>
      <OAuth/>
    </section>
  )
}


function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const JWTtoken = useSelector((state)=>state.JWTtoken)

  const [user, setUser] = useState({
    아이디 : '',
    비밀번호 : ''
  })

  const userLogin = ()=> {
    axios.post('http://localhost:3001/login', user, { withCredentials : true }) //이게 뭔지 모르겠지만..
    .then((result)=>{ console.log(result); dispatch(SET_TOKEN(result.data.accessToken));})
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