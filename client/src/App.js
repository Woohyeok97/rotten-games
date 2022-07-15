/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios';

//컴포넌트
import Main from './commponents/main'
import Finder from './commponents/finder'
import Games from './commponents/games';
import Login from './commponents/login';
import Upload from './commponents/upload';
import Edit from './commponents/edit';

//CSS
import './css/common.scss';

//Redux State 변경함수
import { setGameData } from "./store.js"


function App() {

//useEffect 함수
useEffect(()=>{
  axios.get('http://localhost:3001/requireGameData')
  .then((결과)=>{ dispatech(setGameData(결과.data.game)) })
  .catch(()=>{ console.log('실패!') }) 
},[])

let dispatech = useDispatch()
const gameData = useSelector((state)=>state.gameData)

    return (
      <div className="Root">
        <Navbar/>
        { gameData ?
        <Routes>
          <Route path='/' element={ <Main/> }/> 
          <Route path='/finder' element={ <Finder/> }/>
          <Route path='/games/:id' element={ <Games/> }/>
          <Route path='/edit/' element={ <Edit/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/upload' element={ <Upload/> }/>
        </Routes> 
        : null }
      </div>
    );
}

function Navbar() {

  let navigate = useNavigate()

  return(
      <header className="navbar">
        <div className="logo" onClick={()=>{ navigate('/') }}>
          <img id="logo-image" src="/logo.png"/>
        </div>
        <div className="navbar-container">
          <ul>
            <li onClick={()=>{ navigate('/edit') }}>데이터 수정 & 삭제</li>
            <li onClick={()=>{ navigate('/upload') }}>데이터 업로드</li>
            <li id="separator"></li>
            <li onClick={()=>{ navigate('/finder') }}>모든게임</li>
            <li id="separator"></li>
            <li >가입하기</li>
            <li onClick={()=>{ navigate('/login') }}>로그인</li>
          </ul>
        </div>
      </header>
  )
}


export default App;
