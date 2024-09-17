/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ReactPlayer from 'react-player/lazy'

//redusers
//Custom Hooks
//Common Hooks
import useSetImage from "../hooks/common/usesetimage";
//CSS
import styles from '../styles/pages/detail.module.scss'
//Layout Components
import Template from '../components/layout/template'
//Common Components
import { PlatformBox, TagBox } from '../components/assets'
import Comments from "../components/comments";
import NullComponent from "../components/nullcomponent";


function Detail() {
  const gameData = useSelector((state)=>state.gameData)
  const { id } = useParams();
  const item = gameData.find((a)=> a.title == id )

  const { 게임이미지, 이미지불러오기 } = useSetImage(item)
  const [ 현재UI, 현재UI변경 ] = useState('trailer')

  useEffect(()=>{
    이미지불러오기()
  }, [])

  return (
    <section className={ styles.detail } >
      <Header item={item} 게임이미지={게임이미지}/>
      <Tab 현재UI변경={현재UI변경} />
      <ShowUI 현재UI={현재UI} item={item} 게임이미지={게임이미지}/>
    </section>
  )
}


function Header({ item, 게임이미지 }) {
  const imageURL = encodeURI(`url(/image/${item.title}/${게임이미지.image_background})`)
  //encodeURL() 메소드를 쓰면 URL에 공백이나 특수문자가 있어도 되는건가?되긴되네
  const background = { backgroundImage : imageURL }

  return(
    <div className={ styles.header } style={ background }>
    <div className={ styles.container }>

      <div className={ styles.innerTop }>
        <PlatformBox array={ item.platform } />
        <div className={ styles.developer }>{ item.developer }</div> 
      </div>

      <div className={ styles.inner }>
        <div className={ styles.imgBox }>
          <img src={`/image/${item.title}/${게임이미지.image_main}`}/>
        </div>
        <div className={ styles.infoBox }>
          <h2>{ item.title }</h2>
          <div>장르 : { item.genre }</div>
          <TagBox array={ item.tag }/>
        </div>
      </div>

    </div>
    </div>
  )
}


function Tab({ 현재UI변경 }) {
  return(
   <div className={ styles.tab }>
     <div className={ styles.tabInputBox }>

      <input type="radio" id="trailer" className={ styles.tabInput } name="UIradio" defaultChecked="checked"
      onClick={()=>{ 현재UI변경('trailer') }} />
      <label for="trailer">트레일러</label>

      <input type="radio" id="comments" className={ styles.tabInput } name="UIradio"
      onClick={()=>{ 현재UI변경('comments') }}/>
      <label for="comments">유저코멘트</label>

      <input type="radio" id="screenShot" className={ styles.tabInput } name="UIradio"
      onClick={()=>{ 현재UI변경('screenShot') }}/>
      <label for="screenShot">스크린샷</label>

     </div>
   </div>
 )
}


function ShowUI({ 현재UI, item, 게임이미지 }) {

  const UI = {
    trailer : <Trailer item={item} 게임이미지={게임이미지}/> ,
    screenShot : <ScreenShot item={item}/> ,
    comments : <Comments item={item}/> ,
  }
  
  return(
    <Template>
      <div className={ styles.template }>
      { UI[현재UI] }
      </div>
    </Template>
  )
}



function Trailer({ item, 게임이미지 }) {

  return(
    <div className={ styles.trailer }>
      <h3>{item.title} 트레일러</h3>
      <ReactPlayer 
        className="ReactPlayer"
        url={ 게임이미지.youtube_url }
        playing={true}
        muted={true}
        controls={true}
        light={false}
        width="1280px"
        height="720px"
        />
    </div>
  )
}

function ScreenShot({ item }) {
  return(
    <div>
    <NullComponent/>
    </div>
  )
}











export default Detail

