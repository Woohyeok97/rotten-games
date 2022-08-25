/* eslint-disable */
import React from 'react';

//CSS
import styles from '../styles/pages/main.module.scss'

function Main(){
  return(
    <section className={styles.main}>
      <Visual/>
      <Jumbotron/>
    </section>
  )
}


function Visual(){
  return(
    <div className={styles.visual}>
      <div className={styles.visualContent}>
        <h1>대충 표지입니다.</h1>
        <h3>대충설명 입니다.무광고 음악 감상, 오프라인 재생 등 다양한 혜택을 누려보세요.
        언제든 해지 가능합니다.</h3>
        <div className={styles.btnWrap}>
          <button className="btn">대충 버튼 1</button>
          <button className="btn">대충 버튼 2</button>
        </div>
      </div>
    </div>
  )
}

function Jumbotron(){
  return(
    <div className={styles.jumbotron}>
      <div className={styles.jumbotronContent}>
        <h1>Spotify를 이용해야 하는 이유</h1>
        <h2>1대의 모바일 기기에서 7일 동안 무료로 Spotify Premium 멤버십을 이용해보세요. 결제 정보는 필요하지 않습니다.</h2>
      </div>
    </div>
  )
}


export default Main