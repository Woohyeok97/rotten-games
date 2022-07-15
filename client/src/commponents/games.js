/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";

//CSS
import '../css/games.scss'

function Games() {
  useEffect(()=>{
    axios.get(`http://localhost:3001/requireImage/${id}`)
    .then((결과)=>{ 이미지변경(결과.data) })
    .catch((에러)=>{ console.log(에러, '게임이미지 불러오기 실패..') })
  },[])

  let {id} = useParams()
  const gameData = useSelector((state)=>state.gameData)
  const 여기서쓸데이터 = gameData.find((a)=> a.title == id )
  const [이미지, 이미지변경] = useState('')

  console.log(이미지)

  const backgroundStyle = {
    backgroundImage : `url(/image/${여기서쓸데이터.title}/${이미지.image_background})`,
  }
  
  return (
    <section className="games">
      <div className="games-main" style={ backgroundStyle }>
        <article>
          <h1>{여기서쓸데이터.title}</h1>
          <div>개발사 : {여기서쓸데이터.developer}</div>
          <ul>
            { 여기서쓸데이터.platform.map((a, i)=>{ return <li>{a}</li> }) }
          </ul>
          <ul>
            { 여기서쓸데이터.tag.map((a, i)=>{ return <li>{a}</li> }) }
          </ul>
        </article>
      </div>
      <div className="games-user-comment">

      </div>
      <div className="games-info">

      </div>
    </section>
  )
}

export default Games

