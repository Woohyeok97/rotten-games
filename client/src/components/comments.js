/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";



//프론트에서 sockcet을 사용하기 위해 io 모듈을 import

//CSS
import styles from '../styles/components/comments.module.scss'
import NullComponent from "./nullcomponent";

import { initialComments } from '../Store/comment'
import { moreComments } from '../Store/comment'
import { recommendComment } from '../Store/comment'



function Comments({ item }){

  const dispatch = useDispatch()
  const comments = useSelector((state)=>state.comments) //요놈은 array 가 맞습니다.
  const [게시물총개수, 게시물총개수변경] = useState('')

  useEffect(()=>{
    axios.get(`http://localhost:3001/total/${item._id}`)
    .then((result)=>{ 게시물총개수변경(result.data.length) })
    .catch((에러)=>{ console.log('에러발생! 에러발생!!', 에러) })

    axios.get(`http://localhost:3001/firstload/${item._id}`)
    .then((result)=>{ dispatch(initialComments(result.data)) })
    .catch((에러)=>{ console.log('에러발생! 에러발생!!', 에러) })

  },[])

  const 코멘트더보기 = ()=>{
    axios.get(`http://localhost:3001/moreload/${item._id}`)
    .then((result)=>{ dispatch( moreComments(result.data) ) })
    .catch((에러)=>{ console.log('에러발생! 에러발생!!', 에러) })
  }
  

 

  
  
  return(
    <div className={ styles.comments }>
    
      <div className={ styles.header }>
          <h3>{item.title} 유저코멘트 </h3>
          <CommentWrite item={item}/>
      </div>
     

      <div className={ styles.userComments }>

        <div className={ styles.commentsInputBox }>
          <input type="radio" id="추천순" className={ styles.commentsInput } name="추천순&최신순"
          defaultChecked="checked"/>
          <label for="추천순">추천순</label>
          <input type="radio" id="최신순" className={ styles.commentsInput } name="추천순&최신순"/>
          <label for="최신순">최신순</label>
        </div>

        <ul>
          { comments.length 
          ? comments.map((a, i)=> <CommentBox item={a}/> ) 
          : <NullComponent/> }
        </ul>

        { 게시물총개수 != comments.length
        ? <button className={ styles.더보기버튼 } onClick={()=>{ 코멘트더보기() }}>더보기</button>
        : null }
      </div>

    </div>
  )
}


function CommentWrite({ item }) {
  const [코멘트, 코멘트변경] = useState({
    parent : item._id,
    content : '',
  })

  const postComment = ()=>{
    axios.post(`http://localhost:3001/commentUpload`, 코멘트)
    .then((result)=>{ window.location.replace(`/detail/${item.title}`); })
    //나중에는 작성한 코멘트가 바로 프론트에 출력되게 해보자
    .catch((에러)=>{ console.log('에러발생했잖슴~', 에러) })
  }

  return (
    <div className={ styles.commentWrite }>
      <form className={ styles.textareaBox }>
        <div className={ styles.userName }>고나우</div>
        {/* textarea 높이조절은 js 구현하자~ */}
        <textarea className={ styles.textarea } type="text" spellcheck="false" 
        placeholder={`${item.title}에 대한 당신의 한줄평은?`}
        onChange={(e)=>{ 코멘트변경({ ...코멘트, content : e.target.value }) }}/>
      </form>
  
      <button className={ styles.btn } onClick={()=>{ postComment() }}>등록</button>
    </div>
  )
}


function CommentBox({ item }) {

  const dispatch = useDispatch()

  const 추천하기 = ()=>{
    axios.get(`http://localhost:3001/recommend/${item._id}`)
    .then((result)=>{ dispatch(recommendComment(result.data)) })
    .catch((에러)=>{ console.log('추천하기 실패~!', 에러) })
  }
  
  return(

    <li className={ styles.inner }>
      <div className={ styles.commentBox }>
        <ul className={ styles.userInfo }>
          <li className={ styles.name }>{ item.userName }</li>          
          <li className={ styles.separator }></li>
          <li className={ styles.date }>{ item.date }</li>
          <li className={ styles.separator }></li>
          <li className={ styles.score }>⭐️⭐️⭐️⭐️⭐️</li>
        </ul>

        <p className={ styles.comment }>{ item.content }</p>
        <button className={ styles.recommendBtn } onClick={()=>{ 추천하기() }}>
          <span>☻</span>
          <span>{ item.recommend }</span>
        </button>

      </div>

      <div className={ styles.btnBox }>
        <div className={ styles.btnWrap }>
          <button className="btn">추천</button>
          <button className="btnRed">삭제</button>
        </div>
        <span className="btnSmall">신고</span>
        
      </div>
      
    </li>
  )
}


export default Comments