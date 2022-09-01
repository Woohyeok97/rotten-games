import React from "react";
import { useNavigate } from 'react-router-dom'

//CSS
import styles from '../../styles/layout/header.module.scss'


function Header() {

  let navigate = useNavigate()

  return(
    <header className={styles.header}>
      <div className={styles.logo} onClick={()=>{ navigate('/') }}>
        <img id={styles.logoImg} src="/logo.png"/>
      </div>

      <div className={styles.content}>
        <ul>
          <li onClick={()=>{ navigate('/datalist') }} style={{ color:'salmon' }}>관리자 페이지</li>
          <li id={styles.separator}></li>
          <li onClick={()=>{ navigate('/finder') }}>모든게임</li>
          <li id={styles.separator}></li>
          <li >가입하기</li>
          <li onClick={()=>{ navigate('/login') }}>로그인</li>
        </ul>
      </div>
    </header>
  )
}

export default Header