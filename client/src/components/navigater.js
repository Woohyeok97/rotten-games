import React, { useState } from "react";
import { useSelector } from "react-redux";

//CSS
import styles from '../styles/components/navigater.module.scss'
//Layout components
import HeaderTemplate from "./layout/headerTemplate";

function Navigater({ hereData, setHereData }) {
  const gameSort = useSelector((state)=> state.gameSort)
  const gameData = useSelector((state)=> state.gameData)

  const [현재장르, 현재장르변경] = useState('모든게임')

  const hereData바꾸기 = (sort)=>{
    console.log(hereData)
    let newArr = [...gameData]
    newArr = newArr.filter((a)=> a.genre === sort )
    setHereData(newArr)
  }

  return(
    <HeaderTemplate>
      <div className={styles.filter}>

        <MiniDrop state={현재장르} id={'genre'}>
          <li><label for={'genre'}
          onClick={()=>{ 현재장르변경('모든게임'); setHereData([...gameData])  }}>모든게임</label></li>
          { gameSort.장르.map((a, i)=>{ return <li><label for={'genre'}
          onClick={()=>{ 현재장르변경(a); hereData바꾸기(a);  }}>{a}</label></li> }) }
        </MiniDrop>
        
      </div>
      

    </HeaderTemplate>
  )
}

function MiniDrop(props) {
  
  return(
    <div className={styles.dropContainer}>

      <input id={props.id} className={styles.state} type="checkbox"/>
      <label for={props.id} className={styles.label}>
        <span >{ props.state }</span>
        <span className={styles.icon}> ▽ </span>
      </label>

      <div className={styles.dropContent}>
        <ul> {props.children} </ul>
      </div>
    </div>
  )
}


export default Navigater