/* eslint-disable */
import React from 'react';

//CSS
import styles from '../styles/pages/main.module.scss'

function Main(){
  return(
    <section className={styles.main}>
      <Visual/>
    </section>
  )
}


function Visual(){
  return(
    <div className={styles.visual}>
      <div className={styles.visualContent}>
        <h1>대충 표지입니다.</h1>
      </div>
    </div>
  )
}



export default Main