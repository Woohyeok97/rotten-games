import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

//CSS
import '../css/games.scss'

function Games() {
  let {id} = useParams()
  const gameData = useSelector((state)=>state.gameData)
  const 여기서쓸데이터 = gameData.find((a)=> a.title == id )

  const backgroundStyle = {
    backgroundImage : `url(/image/${여기서쓸데이터.image_main})`,
  
    backgroundSize: 'cover',
    maxWidth: '100vw',
  }
  
  return (
    <section className="games" style={ backgroundStyle }>
        <h2>저는 games 페이지 입니다.</h2>
        <h3>이미지 제목 : {여기서쓸데이터.image_main}</h3>
        <h3>이미지경로 : `url(/image/{여기서쓸데이터.image_main})`</h3>
        <h3> 타이틀 : {여기서쓸데이터.title}</h3>
        <h3> 장르 : {여기서쓸데이터.genre}</h3>
        <h3> 개발사 : {여기서쓸데이터.developer}</h3>
        <h3> 플렛폼 : {여기서쓸데이터.platform}</h3>
    </section>
  )
}

export default Games