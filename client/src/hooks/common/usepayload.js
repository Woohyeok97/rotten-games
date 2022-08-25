import React, { useState } from "react";
import axios from "axios";


export default function usePayload() {

  const formData = new FormData();

  const postInfo = (data)=> {
    axios.post('http://localhost:3001/postInfo', data)
    .then((result)=>{  })
    .catch((err)=>{ console.log('실패!', err) })
    console.log('1')
  }
  const payloadImg = (data, parentId)=> {
    formData.append('image_main', data.image_main);
    formData.append('image_background', data.image_background);
    formData.append('parent', parentId);
    formData.append('title', data.title);
    formData.append('youtube_url', data.youtube_url);
    console.log('2')
  }
  const postImg = ()=> {
    axios.post('http://localhost:3001/postImg', formData,
    { header: { 'content-type': 'multipart/form-data' }})
    .then((result)=>{ console.log(result) })
    .catch((err)=>{ console.log('실패!', err) })
    console.log('3')
  }

  const modifyImg = (id)=>{
    axios.post(`http://localhost:3001/modifyImg/${id}`, formData,
    { header: { 'content-type': 'multipart/form-data' }})
    .then((result)=>{ console.log(result) })
    .catch((err)=>{ console.log('실패!', err) })
  }
  
  
  return{
    postInfo,
    postImg,
    payloadImg,
    modifyImg,
  }
}