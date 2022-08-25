/* eslint-disable */
import React, { useState } from "react";
import styles from '../styles/pages/managerspage.module.scss'



function ManagersPage() {

  const [템플릿, 템플릿변경] = useState('data_list')

  return(
    <section className={ styles.managerspage }>
      <Menu 템플릿변경={템플릿변경}/>
      <TaskTemplate 템플릿={템플릿}/>
    </section>
  )
}


function Menu({ 템플릿변경 }) {
  return(
    <div className={ styles.menu }>
      <div className={ styles.logoBox }>
        <div className={ styles.content }>
          <h3>관리자 페이지</h3>
          <p>고나우 관리자님 환영합니다!</p>
        </div>
      </div>
      
      <div className={ styles.menuBar }>
        <input id='1' type="radio" name="menu" defaultChecked="checked"
        onClick={()=>{ 템플릿변경('data_list') }}/>
        <label for='1'>☻ 게임 컨텐츠 관리</label>

        <input id='2' type="radio" name="menu" onClick={()=>{ 템플릿변경('upload') }}/>
        <label for='2'>☻ 게임 컨텐츠 업로드</label>

        <input id='3' type="radio" name="menu" onClick={()=>{ 템플릿변경('member') }}/>
        <label for='3'>☻ 회원 관리</label>
      </div>
    </div>
  )
}

function TaskTemplate({ 템플릿 }) {
  const template = {
    data_list : '나는 리스트',
    upload : '나는 업로드',
    member : 'ㅏ느 회원관리'
  }

  return(
    <div className={ styles.taskTemplate }>
      <div className={ styles.inner }>
      { template[템플릿] }
      </div>
    </div>
  )
}



export default ManagersPage