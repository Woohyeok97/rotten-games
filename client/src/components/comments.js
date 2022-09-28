/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";


//CSS
import styles from '../styles/components/comments.module.scss'
//Common Components
import NullComponent from "./nullcomponent";


function Comments({ item }){

  const [코멘트개수, 코멘트개수변경] = useState('')
  const [코멘트, 코멘트변경] = useState([])

  useEffect(()=>{
    코멘트개수구하기()
    commentFirstLoad()
  },[])


  function 코멘트개수구하기() {
    axios.get(`http://localhost:3001/total/${item._id}`)
    .then((result)=>{ 코멘트개수변경(result.data.length) })
    .catch((에러)=>{ console.log('에러발생! 에러발생!!', 에러) })
  }

  function commentFirstLoad() {
    axios.get(`http://localhost:3001/firstload/${item._id}`)
    .then((result)=>{ 코멘트변경([...코멘트, ...result.data]) })
    .catch((에러)=>{ console.log('에러발생! 에러발생!!', 에러) })
  }

  function commentMoreLoad() {
    axios.get(`http://localhost:3001/moreload/${item._id}`)
    .then((result)=>{ 코멘트변경([...코멘트, ...result.data]) })
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
          { 코멘트.length 
          ? 코멘트.map((a, i)=> <CommentBox item={a} 코멘트={코멘트} 코멘트변경={코멘트변경}/> )
          : <NullComponent/> }
        </ul>

        { 코멘트개수 != 코멘트.length
        ? <button className={ styles.더보기버튼 } onClick={()=>{ commentMoreLoad() }}>더보기</button>
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


function CommentBox({ item, 코멘트, 코멘트변경 }) {

  const 추천하기 = ()=>{
    let newArr = [...코멘트]
    let index = newArr.findIndex((a)=> a._id == item._id)
    newArr[index].recommend++
    코멘트변경(newArr)
  }

  const commentrequest = ()=>{
    axios.put(`http://localhost:3001/recommend/${item._id}`)
    .then((result)=>{  })
    .catch((에러)=>{ console.log('에러발생! 에러발생!!', 에러) })
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
        <button className={ styles.recommendBtn } onClick={()=>{ 추천하기(); commentrequest() }}>☻{ item.recommend }</button>

      </div>

      <div className={ styles.btnBox }>
        <span className="btnSmall">신고</span>
      </div>  
    </li>
  )
}


export default Comments