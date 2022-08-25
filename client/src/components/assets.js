/* eslint-disable */
import React from "react";
import styles from '../styles/components/assets.module.scss'

//드롭다운 버튼
export function DropButton({ id, set, value }) {
  return (
    <div className={styles.dropButton}>
      <input id={ id } className={styles.state} type="checkbox"/>
      <label for={ id } className={styles.label} onClick={()=>{ set(!value) }}>
        <span className={styles.title}>이미지 보기</span>
        <span className={styles.icon}> ▽ </span>
      </label>
    </div>
  )
}

//큰박스
export function PlatformBox({ array }) {
  return(
    <div className={ styles.platformBox }>
      { array.map((a, i)=>{ return <div className={ styles.item }>
        <span>⎈</span><div>{ a }</div></div> }) }
    </div>
  )
}

export function PlatformSmallBox({ array }) {
  return(
    <div className={ styles.platformSmallBox }>
      { array.map((a, i)=>{ return <div className={ styles.item }>{ a }</div> }) }
    </div>
  )
}


export function TagBox({ array }) {
  return(
    <div className={ styles.tagBox }>
      { array.map((a, i)=>{ return <div className={ styles.item }>#{ a }</div> }) }
    </div>
  )
}

