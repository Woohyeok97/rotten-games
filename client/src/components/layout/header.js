import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'


//CSS
import styles from '../../styles/layout/header.module.scss'

function Header() {

  let navigate = useNavigate()
  const JWTtoken = useSelector((state)=>state.JWTtoken)

  return(
    <header className={ styles.header }>
      <div className={ styles.logo } onClick={()=>{ navigate('/') }}>
        <img id={ styles.logoImg } src="/logo.png"/>
      </div>

      <div className={ styles.content }>
        <ul>
          <li className={ styles.menu } onClick={()=>{ navigate('/datalist') }} style={{ color:'salmon' }}>데이터관리</li>
          <li id={ styles.separator }></li>
          <li className={ styles.menu } onClick={()=>{ navigate('/finder') }}>모든게임</li>
          <li id={ styles.separator }></li>
          <li className={ styles.menu } onClick={()=>{ navigate('/signup') }}>가입하기</li>
          { JWTtoken 
          ? <li className={ styles.menu } onClick={()=>{ navigate('/mypage') }}>마이페이지</li> 
          : <li className={ styles.menu } onClick={()=>{ navigate('/login') }}>로그인</li> }
        </ul>
      </div>
    </header>
  )
}

export default Header