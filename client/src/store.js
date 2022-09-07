import { configureStore, createSlice } from '@reduxjs/toolkit'

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

let gameSort = createSlice({
  name : 'gameSort',
  initialState : {
    장르 : ['스포츠', 'FPS', '액션', '시뮬레이션'],
    플랫폼 : ['Windows', 'PS4', 'PS5', 'XBOX', 'SWITCH'],
    태그 : ['1인칭', '3인칭', 'RPG', '생존', '협동', '멀티', '턴제', '오픈월드', '현대', '스토리',
    '캐주얼', '힐링',],
  }
})

let commnets = createSlice({
  name : 'comments',
  initialState : '',
  reducers : {
    setComments(state, action){
      return action.payload
    }
  }
})


//state를 다 만들었으니 이제 등록을 해야한다. 그럴때 쓰는 함수가 configureStore() 함수다.
//createState()로 state를 만든후, export default configureStore()안 객체속 reducer : {} 가 있다.
//reducer : {} 안에 '작명 : createState만든거.reducer' 를 집어 넣으면 된다.
//그럼 이제 <Provider store={store}>가 감싸고 있는 모든컴포넌트에서 여기서만든 state를 사용할수있다.
export default configureStore({
  reducer: { 
    gameData : gameData.reducer,
    gameSort : gameSort.reducer,
    comments : commnets.reducer,
  }
})

//state 수정함수 export 하기 다른곳에서도 사용할수있게 변수에 저장하여 export한다.
export let { setGameData } = gameData.actions
export let { setComments } = commnets.actions