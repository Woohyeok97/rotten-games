import React from "react";
import { useNavigate } from "react-router";

import styles from '../../styles/layout/managerspagemenu.module.scss'

function ManagersPageMenu() {
  const navigate = useNavigate()

  return(
    <div className={ styles.menu }>
      <div className={ styles.logoBox }>
        <div className={ styles.content }>
          <h3>관리자 페이지</h3>
          <p>고나우 관리자님 환영합니다!!!</p>
        </div>
      </div>
      
      <div className={ styles.menuBar }>
        <input id='1' type="radio" name="menu" defaultChecked="checked"
        onClick={()=>{ navigate('/datalist') }}/>
        <label for='1'>☻ 게임 컨텐츠 관리</label>

        <input id='2' type="radio" name="menu" onClick={()=>{ navigate('/upload') }}/>
        <label for='2'>☻ 게임 컨텐츠 업로드</label>

        <input id='3' type="radio" name="menu" onClick={()=>{  }}/>
        <label for='3'>☻ 회원 관리</label>
      </div>
    </div>
  )
}

export default ManagersPageMenu