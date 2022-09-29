/* eslint-disable */
import React, { useState } from 'react';

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
  return(
    <div className={ styles.loginForm }>
      <h3>이메일로 로그인하세요!</h3>
      <NullComponent/>
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