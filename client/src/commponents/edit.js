/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

//CSS
import '../css/edit.scss'

function Edit (){
  return(
    <section className="edit">
      <div className="game-data-list">
        <DataCard/>
      </div>
    </section>
  )
}

function DataCard() {
  const gameData = useSelector((state)=>state.gameData)
  const gameSort = useSelector((state)=>state.gameSort)

  return gameData.map((a, i)=>{
    const [수정, 수정변경] = useState(false)
    const [이미지, 이미지변경] = useState('')
    const [imageCheck, setImageCheck] = useState(false)

    const [메인이미지, 메인이미지변경] = useState('')
    const [배경이미지, 배경이미지변경] = useState('')
    const [스크린샷, 스크린샷변경] = useState('')

    useEffect(()=>{
      메인이미지변경(`/image/${a.title}/${이미지.image_main}`);
      배경이미지변경(`/image/${a.title}/${이미지.image_background}`);
      스크린샷변경('/image/너굴맨.jpeg')
    },[이미지])

    const 이미지요청 = (title)=>{
      axios.get(`http://localhost:3001/requireImage/${title}`)
      .then((result)=>{ 이미지변경(result.data); 메인이미지변경(`/image/${a.title}/${이미지.image_main}`) })
      .catch((에러)=>{ console.log(에러) })
    }
    const renderImg = (e, imgFun)=>{
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function(e) {
        imgFun(e.target.result)
      }
    }

    const putData = ()=>{
      if( window.confirm('데이터를 수정 하시겠습니까?') ){
        alert('오케이!')
        수정변경(!수정)
      } else {
        alert('취소링~')
      }
    }
    const deleteData = ()=>{
      if( window.confirm('데이터를 삭제 하시겠습니까?') ){
        alert('오케이!')
      } else {
        alert('취소링~')
      }
    }
    
    return ( 
      !수정 ? 
      <div className="data-card">
        <div className="game-data">
          <div className="game-info">
            <h3>{a.title}</h3>
            <p>장르 : {a.genre}</p>
            <p>플랫폼 : {a.platform}</p>
            <p>개발사 : {a.developer}</p>
            <p>태그 : {a.tag}</p>
          </div>
        </div>

        <button className="btn image-btn" 
          onClick={()=>{ 이미지요청(a.title); setImageCheck(!imageCheck); }}>이미지 정보</button>
        { true === imageCheck &&
        <div className="game-images-container">
          <div className="game-images-wrap">
            <div className="game-images-item">
              <h4>메인 이미지</h4>
              <img src={메인이미지}/>
            </div> 
            <div className="game-images-item">
              <h4>배경 이미지</h4>
              <img src={배경이미지}/>
            </div>
            <div className="game-images-item">
              <h4>스크린샷 1</h4>
              <img src={스크린샷}/>
            </div>
          </div>
        </div> }

        <div className="btn-wrap">
          <button className="btn-small-blue" onClick={()=>{ 수정변경(!수정) }}>수정</button>
          <button className="btn-small-red" onClick={()=>{ deleteData() }}>삭제</button>
        </div> 
      </div> 

      : 
          
      //수정
      <div className="data-card">
        <form className="game-data">
          <h3>수정 작업중..</h3>
          <div className="game-info">
            <input type="text" className="info-text" value={a.title} onChange={()=>{}}/>
            <div className="info-checkbox">
              { gameSort.장르.map((a, i)=>{
                return <><input type="radio" id={'genre' + i} name="genre" className="check-input"/>
                <label for={'genre' + i}>{a}</label></>
              }) }
            </div>
            <div className="info-checkbox">
              { gameSort.플랫폼.map((a, i)=>{
                return <><input type="checkbox" id={'platform' + i} className="check-input"/>
                <label for={'platform' + i}>{a}</label></>
              }) }
            </div>
            <input type="text" className="info-text" value={`${a.developer}`}/>
            <div className="info-checkbox">
              { gameSort.태그.map((a, i)=>{
                return <><input type="checkbox" id={'tag' + i} className="check-input"/>
                <label for={'tag' + i}>{a}</label></>
              }) }
            </div>
            
            
          </div>
        </form>

        <button className="btn image-btn" 
          onClick={()=>{ 이미지요청(a.title); setImageCheck(!imageCheck); }}>이미지 정보</button>
        { true === imageCheck &&
        <div className="game-images-container">
          <div className="game-images-wrap">
            <div className="game-images-item">
              <h4>메인 이미지</h4>
              <img src={메인이미지}/>
              <input type="file" placeholder="이미지변경" className="btn"
                onChange={(e)=>{ renderImg(e, 메인이미지변경) }}/>
            </div> 
            <div className="game-images-item">
              <h4>배경 이미지</h4>
              <img src={배경이미지}/>
              <input type="file" placeholder="이미지변경" className="btn"
                onChange={(e)=>{ renderImg(e, 배경이미지변경) }}/>
            </div>
            <div className="game-images-item">
              <h4>스크린샷 1</h4>
              <img src={스크린샷}/>
              <input type="file" placeholder="이미지변경" className="btn"
                onChange={(e)=>{ renderImg(e, 스크린샷변경) }}/>
              <button className="btn" onClick={()=>{}}>이미지 삭제</button>
            </div>
          </div>
        </div> }

        <div className="btn-wrap">
          <button className="btn-small-blue" onClick={()=>{ putData() }}>수정</button>
          <button className="btn-small-red" onClick={()=>{ deleteData() }}>삭제</button>
        </div> 
      </div>
    )
  })
}

export default Edit