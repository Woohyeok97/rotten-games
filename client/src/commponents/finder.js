/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
//컴포넌트
import Dropdown from './dropdown';
//CSS
import '../css/finder.scss';


function Finder(){
  return(
    <>
      <임시/>
    </>
  )
}

function 임시() {
  
  //redux 써보기
  const gameData = useSelector((state)=>state.gameData)
  const [finderData, setFinderData] = useState([...gameData])

  const 장르 = ['액션', 'FPS', '스포츠', '시뮬레이션'];
  const [현재장르, 현재장르변경] = useState('모든게임')

  const 정렬 = ['이름 순', '최신 순', '평가 높은 순', '평가 낮은 순']
  const [현재정렬, 현재정렬변경] = useState('이름 순')

  const changGenre = (genre)=> {
    let newArr = [...gameData]
    newArr = newArr.filter((a)=> a.genre === genre )
    setFinderData(newArr)
  }
  const changeLineup = ()=> {

  }

return(
  <section className="finder">
    <div className="finder-container">
    <h1>둘러보기</h1>
      <div className="finder-navbar">

        <div className="genre-filter-box">
          <Dropdown value={현재장르} id={'genre'}>
            <ul>
              <li onClick={()=>{ setFinderData([...gameData]); 현재장르변경('모든게임')} }>
                <label for='dropdowngenre'>모든 게임</label></li>
              { 장르.map((a, i)=>{ return <li onClick={()=>{ changGenre(a) }}>
              <label onClick={()=>{현재장르변경(a)}} for='dropdowngenre'>{a}</label></li> })}
            </ul> 
          </Dropdown>              
        </div>

        <div className="line-up-box">
          <Dropdown value={현재정렬} id={'정렬'}>
            <ul>
            { 정렬.map((a, i)=>{ return <li><label onClick={()=>{현재정렬변경(a)}} 
              for={'dropdown' + '정렬'}>{a}</label></li> }) }
            </ul> 
          </Dropdown>
          <div className="search-box">
            <span>🔍</span>
            <input className="search-bar" type="text" placeholder="찾는게 안나와"/>
          </div>
        </div>
      </div>

      <div className="finder-card-box">
      { finderData.map((a, i)=>{ return <Card 데이터={a}/> }) }
      </div>
      
    </div>
  </section>
)
}
    

function Card(props) {

  let navigate = useNavigate()

  return(
    <div className="finder-card-item" onClick={()=>{ navigate(`/games/${props.데이터.title}`) }}>
      <img src={`/image/${props.데이터.title}/${props.데이터.image_main}`}/>
      <div className="card-info">
        <p>{props.데이터.title}</p>
        <p>유저평점 : ★★★★☆</p>
      </div>
    </div>
  )
}


export default Finder