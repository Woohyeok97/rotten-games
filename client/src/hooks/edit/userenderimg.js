import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useRenderImg(obj) {
  const [imageURL, setImageURL] = useState({
    메인이미지 : `/image/${obj.title}/${obj.image_main}`,
    배경이미지 : `/image/${obj.title}/${obj.image_background}`,
    스크린샷 : `/image/너굴맨.jpeg`,
  })

  const changeImg = (e)=>{
    let reader = new FileReader();
    let id = e.target.id
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function(e) {
      setImageURL({...imageURL, [id] : e.target.result })
    }
  }

  return {
    imageURL,
    changeImg,
  }
}
