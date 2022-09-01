/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import CSSTransition from 'react-transition-group/CSSTransition';

//Custom Hooks
import useSetImage from "../hooks/common/usesetimage";
//CSS
import styles from '../styles/pages/data_list.module.scss'
//Common Components
import Navigater from "../components/navigater";
import { DropButton, PlatformSmallBox, TagBox } from "../components/assets";
//Layout Components
import TemplateColumn from "../components/layout/templateColumn";




function DataList() {
  const gameData = useSelector((state)=>state.gameData)
  const [hereData, setHereData] = useState([...gameData])
  
  return(
    <section className="data_list">
      <Navigater hereData={hereData} setHereData={setHereData} />
      { hereData.map((a, i)=>{ return <DataCard item={a}/> }) }
    </section>
  )
}



function DataCard({ item }) {
  const [imageState, setImageState] = useState(false)
  const navigate = useNavigate()

  return ( 
    <TemplateColumn>
    <div className={styles.gameInfo}>
      <div className={styles.gameImg}>
        <img className="img" src={`/image/${item.title}/${item.image_main}`}/>
      </div>

      <ul>
        <h3>{item.title}</h3>
        <li>장르 : {item.genre}</li>
        <li><PlatformSmallBox array={item.platform} /></li>
        <li>개발사 : {item.developer}</li>
        <li><TagBox array={item.tag} /></li>
      </ul>
    </div>
    

    <div className={styles.btnWrap}>
      <DropButton id={item.title} value={imageState} set={setImageState} />
      <button className="btn" onClick={()=>{ navigate(`/edit/${item._id}`) }}>수정</button>
    </div>

    { imageState ? <Images item={item} imageState={imageState}/> : null }  

    </TemplateColumn>
    )
}


function Images({ item, imageState }) {
  const { 게임이미지, 이미지불러오기 } = useSetImage(item)
  
  
  useEffect(()=>{
    이미지불러오기()
  },[imageState])

  return (
    <div className={styles.imgWrap}>
      <div className={styles.imgItem}>
        <h4>메인 이미지</h4>
        <img className="img" src={`/image/${item.title}/${게임이미지.image_main}`}/>
      </div> 

      <div className={styles.imgItem}>
        <h4>배경 이미지</h4>
        <img className="img" src={`/image/${item.title}/${게임이미지.image_main}`}/>
      </div>

      <div className={styles.imgItem}>
        <h4>스크린샷 1</h4>
        <img className="img" src={`/image/너굴맨.jpeg`}/>
      </div>

    </div>
  )
}


export default DataList