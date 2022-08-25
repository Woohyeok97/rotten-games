import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useSetData() {
  
  const [게임데이터, 게임데이터변경] = useState({
    title : '' ,
    genre : '',
    platform : '',
    developer : '',
    tag : '',
  })

  const setData = (item)=>{
    게임데이터변경({...게임데이터, ...item})
  }

  const 문자데이터변경 = (e)=>{
    const { name, value } = e.target
    게임데이터변경({ ...게임데이터, [name] : value})
  }
 
  const 배열데이터변경 = (e)=>{
    const { name, value } = e.target
    const 선택여부 = e.target.checked
    let newArr = [...게임데이터[name]]

    if(선택여부){
      newArr.push(value)
    } else {
      newArr = newArr.filter((i)=> i !== value)
    }
    게임데이터변경({ ...게임데이터, [name] : newArr })
  }


// const [게임이미지, 게임이미지변경] = useState({
//     title : '',
//     parent : '',
//     image_main : '',
//     image_background : '',
//     youtube_url : ''
//   })

//   const 이미지불러오기 = ()=>{
//     axios.get(`http://localhost:3001/requireImage/${item.title}`)
//     .then((result)=>{게임이미지변경({
//       ...게임이미지, ...result.data
//     })})
//     .catch((에러)=>{ console.log('에러발생!', 에러) })
//   }

//   const modifyImageHandle = (e)=>{
//     const value = e.target.files[0]
//     const name = e.target.name
//     게임이미지변경({...게임이미지, [name] : value})
//   }

  return {
    게임데이터,
    게임데이터변경,
    문자데이터변경,
    배열데이터변경,
    setData,
  }
}