/* eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

//Common Components
import Navigater from '../components/navigater';
//CSS
import styles from '../styles/pages/finder.module.scss';
//Layout Components
import Template from '../components/layout/template';



function Finder() {
  const gameData = useSelector((state)=>state.gameData)
  const [hereData, setHereData] = useState([...gameData])
  
  return(
    <section className={styles.finder}>
      <Navigater hereData={hereData} setHereData={setHereData} />
      <div className={ styles.inner }>
      { hereData.map((a, i)=>{ return <DataCard 데이터={a}/> }) }
      </div>
    </section>
  )
}



function DataCard({ 데이터 }) {
  let navigate = useNavigate();

  return (
    <div className={styles.card} onClick={()=>{ navigate(`/detail/${데이터.title}`) }}>
      <img src={ `/image/${데이터.title}/${데이터.image_main}` }/>
      <div className={styles.cardInfo}>
        <p>{ 데이터.title }</p>
      </div>
    </div>
    )
}
    


export default Finder