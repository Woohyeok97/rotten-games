/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios';

//컴포넌트
import Layout from './components/layout/layout';
import Main from './pages/main'
import Finder from './pages/finder'
import Detail from './pages/detail';
import Login from './pages/login';
import Upload from './pages/upload';
import DataList from './pages/data_list';
import Edit from './pages/edit';
import ManagersPage from './pages/managerspage'
//CSS
import './styles/common.scss';

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
  <Layout>
  { gameData ?
    <Routes>
      <Route path='/' element={ <Main/> }/> 
      <Route path='/finder' element={ <Finder/> }/>
      <Route path='/detail/:id' element={ <Detail/> }/>
      <Route path='/datalist/' element={ <DataList/> }/>
      <Route path='/edit/:id/' element={ <Edit/> }/>
      <Route path='/login' element={ <Login/> }/>
      <Route path='/upload' element={ <Upload/> }/>
      <Route path='/managerspage' element={ <ManagersPage/> }/>
    </Routes> 
      : null }
  </Layout>
  </div>  
  )
}

export default App;
