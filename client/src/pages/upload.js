/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'

//Common Hooks
import useSetData from '../hooks/common/usesetdata';
import useSetImage from '../hooks/common/usesetimage'
import useIsBlank from '../hooks/common/useisblank'
import usePayload from '../hooks/common/usepayload';
//CSS
import styles from '../styles/pages/upload.module.scss'
//Layout Components
import TemplateColumn from '../components/layout/templateColumn';

function Upload() {

  return(
    <section className={styles.upload}>
      <AddData/>
    </section>
  )
}


function AddData() {

  const gameSort = useSelector((state)=>state.gameSort)
  const { 게임데이터, 문자데이터변경, 배열데이터변경 } = useSetData('');
  const { 게임이미지, 게임이미지변경, modifyImageHandle } = useSetImage()

  const { title, genre, platform, developer, tag } = 게임데이터;
  const { blankSwitch, setBlankSwitch, blankCheck } = useIsBlank()
  const { postImg, payloadImg } = usePayload()

  const postData = ()=>{
    axios.post('http://localhost:3001/postInfo', 게임데이터)
    .then((result)=>{ 
      payloadImg(게임이미지, result.data.insertedId);
      postImg();
    }).catch((에러)=>{ console.log('에러발생!', 에러) })}

  const uploadCheck = ()=>{
    if(title && genre && platform.length && developer && tag.length && 게임이미지.image_main && 게임이미지.image_background) {
      postData();
      alert('게임데이터 업로드 완료!');
    } else { alert('아~ 빈칸 있잖슴~'); setBlankSwitch(!blankSwitch) }
  }

  useEffect(()=>{
    console.log(게임데이터)
  },[게임데이터])
  useEffect(()=>{
    console.log(게임이미지)
  },[게임이미지])

  return(
    <TemplateColumn>
      <form className={styles.form}>
        <h3>데이터 업로드중...</h3>

        <div className={styles.textBox}>
          <h4>타이틀</h4>
          <input type="text" name="title" className="textInput" 
          onChange={(e)=>{ 문자데이터변경(e);게임이미지변경({ ...게임이미지,title : e.target.value }) }}/>
          { blankSwitch ? blankCheck(게임데이터.title) : null }
        </div>

        
        <div className="upload-form-item game-image-box"> 
          <h4>메인 이미지</h4>
          <input name="image_main" type="file" onChange={(e)=>{ modifyImageHandle(e) }}/>
          { blankSwitch ? blankCheck(게임이미지.image_main) : null } 
        </div>

        
        <div className="upload-form-item game-image-box">
          <h4>배경 이미지</h4>
          <input name="image_background" type="file" onChange={(e)=>{ modifyImageHandle(e) }}/>
          { blankSwitch ? blankCheck(게임이미지.image_background) : null } 
        </div>

        
        <div>
          <h4>장르</h4>
          <div className={styles.checkBox}>
          { gameSort.장르.map((a, i)=>{ return <>
          <input type="radio" id={ a } className="checkInput" name="genre" value={a} 
            onClick={(e)=>{ 문자데이터변경(e) }}/>
          <label for={ a }>{ a }</label></> }) }

          { blankSwitch ? blankCheck(게임데이터.genre) : null }
          </div>
        </div>


        <div>
          <h4>플랫폼</h4>
          <div className={styles.checkBox}>
          { gameSort.플랫폼.map((a, i)=>{ return <>
          <input type="checkbox" id={ a } className="checkInput" name="platform" value={a}
            onChange={(e)=>{ 배열데이터변경(e) }}/>
          <label for={ a }>{ a }</label></> }) }
          
          { blankSwitch ? blankCheck(게임데이터.platform.length) : null }
          </div>
        </div>

        
        <div className={styles.textBox}>
          <h4>개발사</h4>
          <input type="text" placeholder="개발사" name="developer" className="textInput"
            onChange={(e)=>{ 문자데이터변경(e) }}/>
          { blankSwitch ? blankCheck(게임데이터.developer) : null }
        </div>
        

        <div>
          <h4>태그</h4>
          <div className={styles.checkBox}>
            { gameSort.태그.map((a, i)=>{ return <>
            <input type="checkbox" id={ a } className="checkInput" name="tag" value={a}
              onChange={(e)=>{ 배열데이터변경(e) }}/>
            <label for={ a }>{ a }</label></> }) }

            { blankSwitch ? blankCheck(게임데이터.tag.length) : null }
          </div>
        </div>

      </form>

      <div className={styles.btnWrap}> 
        <button className="btn" onClick={()=>{ uploadCheck() }}>데이터베이스에 전송</button>
        <button className="btn" onClick={()=>{ axios.delete('http://localhost:3001/delall').then(()=>{ console.log('삭제완료') }) }}>
          데이터전체삭제
        </button>
      </div>
     
    </TemplateColumn>
  )
}


export default Upload
