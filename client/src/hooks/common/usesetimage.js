import React,{ useState } from "react";
import axios from "axios";

export default function useSetImage(item) {

  const [게임이미지, 게임이미지변경] = useState({
      title : '',
      parent : '',
      image_main : '',
      image_background : '',
      youtube_url : ''
    })
  
  const 이미지불러오기 = ()=>{
    axios.get(`http://localhost:3001/requireImage/${item.title}`)
    .then((result)=>{ 게임이미지변경({ ...게임이미지, ...result.data })})
    .catch((에러)=>{ console.log('에러발생!', 에러) })
  }

  const modifyImageHandle = (e)=>{
    const value = e.target.files[0]
    const name = e.target.name
    게임이미지변경({...게임이미지, [name] : value})
    }

  return {
    게임이미지,
    게임이미지변경,
    이미지불러오기,
    modifyImageHandle,
  }
}