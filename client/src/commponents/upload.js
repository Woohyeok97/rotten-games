/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'

//CSS
import '../css/upload.scss'

function Upload() {
  return(
    <section className="upload">
        <h1>관리자 권한 으로 데이터를 추가합니다.</h1>
      <AddGame/>
  </section>
  )
}

function AddGame() {

  //게임데이터 & 게임데이터 변경함수
  const [게임데이터, 게임데이터변경] = useState({
    title : '',
    genre : '',
    platform : [],
    developer : '',
    tag : [],
  })
  const { title, genre, platform, developer, tag } = 게임데이터;

  //게임데이터 채우기
  const 게임데이터변경함수 = (e, 데이터종류)=>{
    const { name, value } = e.target;
    const 선택여부 = e.target.checked;
    
    if(!Array.isArray(데이터종류)) {
      게임데이터변경({ ...게임데이터, [name] : value })
    }
    else if(Array.isArray(데이터종류)) {
      let newArr = [...데이터종류]

      if(선택여부) {
        newArr.push(value)
      } else if(!선택여부) {
        newArr = newArr.filter((i)=> i !== value )
      }
      게임데이터변경({ ...게임데이터, [name] : newArr })
    }
  }
  

  const 장르 = ['스포츠', 'FPS', '액션', '시뮬레이션']
  const 플랫폼 = ['Windows', 'PS4', 'PS5', 'XBOX', 'SWITCH']
  const 태그 = ['1인칭', '3인칭', 'RPG', '생존', '협동', '멀티', '턴제', '오픈월드', '현대', '스토리',
              '캐주얼', '힐링',]

  //빈칸확인하기
  const [blankCheck, setBlankCheck] = useState(false)
  const 빈칸을입력하세요 = (데이터) =>{
    if(!데이터) return <p style={{ color:'red' }}>입력해주세용</p> 
  }

  //formData에 담을 데이터만들기
  // const [gameImage, setGameImage] = useState('')
  // const uploadImageHandle = (e)=>{
  //   setGameImage(e.target.files[0])
  // }

  const [gameImage, setGameImage] = useState({
    main : '',
    background : '',
    images : '',
    youtube_url : '아직없음',
  })
  const uploadImageHandle = (e, 이미지종류)=>{
    const value = e.target.files[0]
    setGameImage({...gameImage, [이미지종류] : value})
  }

  //데이터 업로드 버튼 이벤트함수
  const postData = ()=>{
    if(window.confirm('게임데이터를 업로드 할까요?')) {
      setBlankCheck(true)
      if(!(title && genre && platform.length && developer && tag.length && gameImage)) {
        alert('빈칸을 입력해주세용!')
      }else {
        const formData = new FormData();
        
        axios.post('http://localhost:3001/addgame', 게임데이터)
        .then((result)=>{ console.log(result)

          formData.append('main_img', gameImage.main);
          formData.append('background_img', gameImage.background);
          formData.append('parentId', result.data.insertedId )
          formData.append('title', 게임데이터.title)
          formData.append('youtube_url', gameImage.youtube_url)

          axios.post('http://localhost:3001/imageUpload', formData,
          { header: { 'content-type': 'multipart/form-data' }})
          .then((result)=>{ console.log(result) })
          .catch()})
        .catch(err =>{ console.log('실패!', err) })

        alert('업로드 완료!')
        //왜 replace 를 사용하면 이미지 저장도 안되고 이미지콜렉션도 저장이 안될까...
        // window.location.replace('/upload')
        }
    }else {
      alert('취소!')
    }
  }

  return(
    <div className="upload-form-box"> 
      <form className="upload-form">
        <div className="upload-form-item game-title-box">
          <h4>게임 타이틀</h4>
          <input type="text" name="title" className="upload-text-input"
            onChange={(e)=>{ 게임데이터변경함수(e, title) }}/>
          { blankCheck ? 빈칸을입력하세요(title) : null }
        </div>

        <div className="upload-form-item game-image-box">
          <h4>게임 사진 : 메인 이미지</h4>
          <input name="main_img" type="file" 
            onChange={(e)=>{uploadImageHandle(e, 'main')}}/>
          { blankCheck ? 빈칸을입력하세요(gameImage) : null }
        </div>

        <div className="upload-form-item game-image-box">
          <h4>게임 사진 : 배경 이미지</h4>
          <input name="background_img" type="file" 
            onChange={(e)=>{uploadImageHandle(e, 'background')}}/>
          { blankCheck ? 빈칸을입력하세요(gameImage) : null }
        </div>

        <div className="upload-form-item game-genre-box">
          <h4>장르 선택</h4>
          <div className="check-box">
          { 장르.map((a, i)=>{
          return  <><input type="radio" id={"radio" + i} className="upload-check-input" name="genre" value={a} 
                  onClick={(e)=>{ 게임데이터변경함수(e, genre) }}/><label for={"radio" + i}>{a}</label></>
          }) }
          { blankCheck ? 빈칸을입력하세요(genre) : null }
          </div>
        </div>

        <div className="upload-form-item game-platform-box">
          <h4>플랫폼</h4>
          <div className="check-box">
          { 플랫폼.map((a, i)=>{
          return  <><input type="checkbox" id={"platform" + i} className="upload-check-input" name="platform" value={a}
                    onChange={(e)=>{ 게임데이터변경함수(e, platform) }}/><label for={"platform" + i}>{a}</label></>
            }) }
          { blankCheck ? 빈칸을입력하세요(platform.length) : null }
          </div>
        </div>

        <div className="upload-form-item game-developer-box">
          <h4>개발사</h4>
          <input type="text" placeholder="개발사" name="developer" className="upload-text-input"
            onChange={(e)=>{ 게임데이터변경함수(e, developer) }}/>
          { blankCheck ? 빈칸을입력하세요(developer) : null }
        </div>
        
        <div className="upload-form-item game-tag-box">
          <h4>태그</h4>
          <div className="tag-check-box">
          { 태그.map((a, i)=>{
          return  <><input type="checkbox" id={"tag" + i} className="upload-check-input" name="tag" value={a}
                    onChange={(e)=>{ 게임데이터변경함수(e, tag) }}/><label for={"tag" + i}>{a}</label></>
          }) }
          { blankCheck ? 빈칸을입력하세요(tag.length) : null }
          </div>
        </div>

        {/* <input type="date" placeholder="출시일"/> */}
        
      </form>
      <button className="upload-btn" onClick={()=>{ postData() }}>데이터베이스에 전송</button>
      <button onClick={()=>{ axios.delete('http://localhost:3001/delall').then(()=>{ console.log('삭제완료') }) }}>
        데이터전체삭제
      </button>
    </div>
  )
}



export default Upload
