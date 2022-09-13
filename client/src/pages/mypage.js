import axios from "axios";
import React, { useEffect, useState } from "react";



function MyPage() {

  const [userData, setUserData] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/myInfo' ,{ withCredentials : true })
    //아니 url 옆에 저게 뭔지는 모르겠는데 저게없으면 요청.cookies 가 안됨;;
    .then((result)=>{ 
      console.log('님 정보가 이거죠?', result.data);
      setUserData(...userData, result.data)
      if(!result.data) return console.log('토큰인증실패여')
    })
    .catch((에러)=>{ console.log('에러발생했잖슴!', 에러) })
  },[])


  return(
    <section>
      <h1>안녕하세요 저는 마이페이지 입니다</h1>
      <p>유저의 아이디 : {userData.id}</p>
      <p>유저의 비번 : {userData.id}</p>
    </section>
  )
}

export default MyPage;