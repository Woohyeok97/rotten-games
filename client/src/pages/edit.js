/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";

//Custom Hooks
import useSetData from "../hooks/common/usesetdata";
import useSetImage from "../hooks/common/usesetimage";
import usePayload from "../hooks/common/usepayload";
import useRenderImg from '../hooks/edit/userenderimg'
//CSS
import styles from '../styles/pages/edit.module.scss'
//Common Components
import { DropButton } from "../components/assets";
//Layout Components
import TemplateColumn from "../components/layout/templateColumn";

function Edit(){
  const gameData = useSelector((state)=>state.gameData)
  const { id } = useParams()
  const item = gameData.find((a)=> a._id == id )
  const [imageState, setImageState] = useState(false)
  
  const { 게임데이터, 문자데이터변경, 배열데이터변경, setData } = useSetData()
  const { 게임이미지, 게임이미지변경, 이미지불러오기, modifyImageHandle} = useSetImage(item)

  useEffect(()=>{
    이미지불러오기();
    setData(item);
  },[])
  console.log(게임데이터)
  console.log(게임이미지)
  return(
    <section className={styles.Edit}>
     <TemplateColumn>

      <ModifyInfo item={item} 문자데이터변경={문자데이터변경} 배열데이터변경={배열데이터변경}
      게임데이터={게임이미지} 게임이미지변경={게임이미지변경}/>
      <ButtonWrap item={item} imageState={imageState} setImageState={setImageState}
      게임데이터={게임데이터} 게임이미지={게임이미지}/>

      { imageState ? 
      <ModifyImages item={item} 게임이미지={게임이미지} 게임이미지변경={게임이미지변경}
      modifyImageHandle={modifyImageHandle} />
       : null }
       
     </TemplateColumn>
    </section>
  )
}


function ModifyInfo({ item, 문자데이터변경, 배열데이터변경, 게임이미지, 게임이미지변경 }) {

  const gameSort = useSelector((state)=>state.gameSort)

  return(
    <form className={styles.form}>
      <h3>수정 작업중...</h3>
      <div className={styles.gameInfo}>

        <div className={styles.textBox}>
          <h4>타이틀</h4>
          <input type="text" className="textInput" name="title" defaultValue={item.title}
            onChange={(e)=>{ 문자데이터변경(e);게임이미지변경({...게임이미지, title : e.target.value}) }}/>
        </div>
        

        <div className={styles.checkBox}>
          <h4>장르</h4>
        { gameSort.장르.map((a, i)=>{ return <>
            <input type="radio" id={'genre' + i} className="checkInput" value={a} name="genre"
              defaultChecked={ item.genre === a ? true : false }
              onChange={(e)=>{ 문자데이터변경(e) }} />
            <label for={'genre' + i}>{a}</label></> }) }
        </div>

        <div className={styles.checkBox}>
          <h4>플랫폼</h4>
        { gameSort.플랫폼.map((a, i)=>{ return <>
          <input type="checkbox" id={'platform' + i} className="checkInput" value={a} name="platform"
            defaultChecked={ item.platform.includes(a) ? true : false }
            onChange={(e)=>{ 배열데이터변경(e)}} />
          <label for={'platform' + i}>{a}</label></> }) }
        </div>
        

        <div className={styles.textBox}>
          <h4>개발사</h4>
          <input type="text" className="textInput"  name="developer" defaultValue={item.developer}
            onChange={(e)=>{ 문자데이터변경(e) }}/>
        </div>
        

        <div className={styles.checkBox}>
          <h4>태그</h4>
        { gameSort.태그.map((a, i)=>{ return <>
          <input type="checkbox" id={'tag' + i} className="checkInput" value={a} name="tag" 
            defaultChecked={ item.tag.includes(a) ? true : false }
            onChange={(e)=>{ 배열데이터변경(e) }} />
          <label for={'tag' + i}>{a}</label></> }) }
        </div>
      </div>
    </form>
  )
}



function ModifyImages({ item, 게임이미지, 게임이미지변경, modifyImageHandle }) {

  const { imageURL, changeImg, } = useRenderImg(게임이미지)


  return(
    <div className={styles.imgWrap}>

      <div className={styles.textBox}>
        <h4>Trailer URL</h4>
        <input type="text" className="textInput" name="title" defaultValue={게임이미지.youtube_url}
          onChange={(e)=>{ 게임이미지변경({...게임이미지, youtube_url : e.target.value}) }}/>
      </div>

      <div className={styles.imgItem}>
        <h4>메인 이미지</h4>
        <img className="img" src={imageURL.메인이미지}/>
        <input type="file"  className="btn" name="image_main" id="메인이미지" 
          onChange={(e)=>{ changeImg(e); modifyImageHandle(e) }}/>
      </div> 

      <div className={styles.imgItem}>
        <h4>배경 이미지</h4>
        <img className="img" src={imageURL.배경이미지}/>
        <input type="file" className="btn" name="image_background" id="배경이미지"
          onChange={(e)=>{ changeImg(e); modifyImageHandle(e) }}/> 
      </div>

    </div>
  )
}

function ButtonWrap({ item, imageState, setImageState, 게임데이터, 게임이미지 }) {
  const { postInfo, payloadImg, modifyImg } = usePayload()

  // const uploadCheck = ()=>{

  // }
  


  const dataModify = ()=> {
    axios.put(`http://localhost:3001/modifyData/${item._id}`,  {게임데이터, 기존네임 : item.title})
    .then((result)=>{ 
    window.location.replace(`/edit/${item._id}`);
    payloadImg(게임이미지);
    modifyImg(item._id)
  })
    .catch((err)=>{ '에러발생했잖슴~', err })
  }

  return(
    <div className={styles.btnWrap1}>
      <DropButton id={item.title} value={imageState} set={setImageState} />

      <div className={styles.btnWrap2}>
        <button className="btn" onClick={()=>{ dataModify() }}>수정</button>
        <button className="btnRed" onClick={()=>{  }}>삭제</button>
      </div>
    </div>
  )
}


export default Edit