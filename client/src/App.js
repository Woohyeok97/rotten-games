/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios';

//컴포넌트
import Layout from './components/layout/layout';
import ManagersPageLayout from './components/layout/managerspagelayout';

//pages
import Main from './pages/main'
import Finder from './pages/finder'
import Detail from './pages/detail';
import Login from './pages/login';
import Upload from './pages/upload';
import DataList from './pages/data_list';
import Edit from './pages/edit';
import MyPage from './pages/mypage';
import SignUp from './pages/signup';
import NullComponent from './components/nullcomponent';
//CSS
import './styles/common.scss';
//Redux State 변경함수
import { setGameData } from "./Store/gamedata.js"



function App() {

//useEffect 함수
useEffect(()=>{
  axios.get('http://localhost:3001/requireGameData')
  .then((결과)=>{ dispatech(setGameData(결과.data.game)) })
  .catch(()=>{ console.log('실패!') }) 
},[])

let dispatech = useDispatch()
const gameData = useSelector((state)=>state.gameData)
const JWTtoken = useSelector((state)=>state.JWTtoken)




return (
  <div className="Root">

  { gameData ?
    <Routes>
      <Route path='/' element={ <Layout> <Main/> </Layout> }/> 
      <Route path='/finder' element={ <Layout> <Finder/> </Layout> }/>
      <Route path='/detail/:id' element={ <Layout> <Detail/> </Layout> }/>
      <Route path='/datalist' element={ <ManagersPageLayout><DataList/></ManagersPageLayout> }/>
      <Route path='/edit/:id' element={ <ManagersPageLayout><Edit/></ManagersPageLayout> }/>
      <Route path='/login' element={ <Layout> <Login/> </Layout> }/>
      <Route path='/signup' element={ <Layout> <SignUp/> </Layout> }/>
      <Route path='/mypage' element={ JWTtoken ? <Layout> <MyPage/> </Layout> : <Layout> <NullComponent/> </Layout> } />
      <Route path='/upload' element={ <ManagersPageLayout><Upload/></ManagersPageLayout>}/>
    </Routes>
      : null }
      
  </div>  
  )
}

export default App;
