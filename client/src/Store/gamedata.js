import { createSlice } from '@reduxjs/toolkit'

//state 생성하기
//createSlice 는 useState처럼 state를 만들어주는 함수다
//변수를 하나 만들고 createSlice() 함수안에 객체를 만들고 안에 name 과 initialState 를 만든다.
//name 은 state 의 이름이고 initialState 에는 state 값을 넣는다.
//reducers : {} 는 state변경함수다. 작명함수(state){reture 수정내용}으로 작성한다.

let gameData = createSlice({
  name : 'gameData',
  initialState : '',
  reducers : {
    setGameData(state, action){
      return action.payload
    }
  }
})

//state 수정함수 export 하기 다른곳에서도 사용할수있게 변수에 저장하여 export한다.
export const { setGameData } = gameData.actions

export default gameData.reducer;
