/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import styles from '../styles/components/comments.module.scss'
import Template from "./layout/template";
import NullComponent from "./nullcomponent";


import { setComments } from '../Store'

function Comments({ item }){
  const dispatch = useDispatch()
  const comments = useSelector((state)=>state.comments)

  useEffect(()=>{
    axios.get(`http://localhost:3001/loadComment/${item._id}`)
    .then((result)=>{ dispatch(setComments(result.data)) })
    .catch((에러)=>{ console.log('에러발생! 에러발생!!', 에러) })
  },[])



  return(
    <div className={ styles.comments }>
      
      <div className={ styles.header }>
        <div className={ styles.inner }>
          <h3>{item.title} 유저코멘트 </h3>
          <div className={ styles.commentsInputBox }>
            <input type="radio" id="추천순" className={ styles.commentsInput } name="추천순&최신순"
            defaultChecked="checked"/>
            <label for="추천순">추천순</label>

            <input type="radio" id="최신순" className={ styles.commentsInput } name="추천순&최신순"/>
            <label for="최신순">최신순</label>
          </div>
        </div>  
      </div>
     
      <div className={ styles.userComments }>
        <ul>
        { comments.length ? comments.map((a, i)=>{ return <CommentBox item={a}/> }) 
        : <NullComponent/> }
        </ul>
      </div>
      
      <CommentWrite item={item}/>

    </div>
  )
}


function CommentBox({ item }) {

  const 추천하기 = ()=>{
    axios.get(`http://localhost:3001/recommend/${item._id}`)
    .then((result)=>{ console.log('추천!') })
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
          <li className={ styles.recommend }>{ item.recommend } 추천 ☻</li>
        </ul>
        <p className={ styles.comment }>{ item.content }</p>
      </div>

      <div className={ styles.btnBox }>
        <div className={ styles.btnWrap }>
          <button className="btn" onClick={()=>{ 추천하기() }}>추천</button>
          <button className="btnRed">삭제</button>
        </div>
        <span className="btnSmall">신고</span>
      </div>
      
    </li>
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

export default Comments