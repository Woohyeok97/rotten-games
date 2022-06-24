import React from 'react';

//CSS
import '../css/main.scss'

function Main(){
  return(
    <>
      <Visual/>
      <Jumbotron/>
    </>
  )
}


function Visual(){
  return(
    <section className="visual">
      <div className="visual-content">
        <h1>대충 표지제목</h1>
        <h2>대충설명 입니다.무광고 음악 감상, 오프라인 재생 등 다양한 혜택을 누려보세요.
        언제든 해지 가능합니다.</h2>
        <button>대충 버튼 1</button>
        <button>대충 버튼 2</button>
      </div>
    </section>
  )
}

function Jumbotron(){
  return(
    <section className="jumbotron">
      <div className="jumbotron-content">
        <h1>Spotify를 이용해야 하는 이유</h1>
        <h2>1대의 모바일 기기에서 7일 동안 무료로 Spotify Premium 멤버십을 이용해보세요. 결제 정보는 필요하지 않습니다.</h2>
      </div>
    </section>
  )
}


export default Main