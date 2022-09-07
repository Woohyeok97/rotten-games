import { createSlice } from "@reduxjs/toolkit";

let gameSort = createSlice({
    name : 'gameSort',
    initialState : {
      장르 : ['스포츠', 'FPS', '액션', '시뮬레이션'],
      플랫폼 : ['Windows', 'PS4', 'PS5', 'XBOX', 'SWITCH'],
      태그 : ['1인칭', '3인칭', 'RPG', '생존', '협동', '멀티', '턴제', '오픈월드', '현대', '스토리',
      '캐주얼', '힐링',],
    }
  })

  export default gameSort.reducer;