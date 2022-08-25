import React, { useState } from "react";

export default function useIsBlank() {
  const [blankSwitch, setBlankSwitch] = useState(false)

  const blankCheck = (데이터)=>{
    if(!데이터) return <div className="blankCheck">여기 입력 안했잖슴~~</div>
  }
  
  return{
    blankSwitch,
    setBlankSwitch,
    blankCheck,
  }
}