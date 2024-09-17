import React from "react";
import { useNavigate } from "react-router";

import styles from '../../styles/layout/managerspagemenu.module.scss'

function ManagersPageMenu() {
  const navigate = useNavigate()

  return(
    <div className={ styles.menu }>
      <div className={ styles.logoBox }>
        <div className={ styles.content }>
          <h3>데이터 관리중..</h3>
        </div>
      </div>
      
      <div className={ styles.menuBar }>
        <input id='data_list' type="radio" name="menu" defaultChecked="checked"
        onClick={()=>{ navigate('/datalist') }}/>
        <label for='data_list'>☻ 게임 컨텐츠 관리</label>

        <input id='upload_data' type="radio" name="menu" onClick={()=>{ navigate('/upload') }}/>
        <label for='upload_data'>☻ 게임 컨텐츠 업로드</label>

      </div>
    </div>
  )
}

export default ManagersPageMenu