import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//state 생성하기
//createSlice 는 useState처럼 state를 만들어주는 함수다
//변수를 하나 만들고 createSlice() 함수안에 객체를 만들고 안에 name 과 initialState 를 만든다.
//name 은 state 의 이름이고 initialState 에는 state 값을 넣는다.
//reducers : {} 는 state변경함수다. 작명함수(state){reture 수정내용}으로 작성한다.

axios.get('http://localhost:3001/requireGameData')
.then((결과)=>{ setGameData(결과.data.game) })
.catch(()=>{ console.log('실패!') }) 

let gameData = createSlice({
  name : 'gameData',
  initialState : null,
  reducers : {
    setGameData(state, action){
      return action.payload
    }
  }
})

let user = createSlice({
  name : 'user', //state이름
  initialState : '안녕하세용~~!' ,//state값
})
let 임시 = createSlice({
  name : '임시',
  initialState : ['0번째', '1번째']
})

//state를 다 만들었으니 이제 등록을 해야한다. 그럴때 쓰는 함수가 configureStore() 함수다.
//createState()로 state를 만든후, export default configureStore()안 객체속 reducer : {} 가 있다.
//reducer : {} 안에 '작명 : createState만든거.reducer' 를 집어 넣으면 된다.
//그럼 이제 <Provider store={store}>가 감싸고 있는 모든컴포넌트에서 여기서만든 state를 사용할수있다.
export default configureStore({
  reducer: { 
    gameData : gameData.reducer,
    user : user.reducer,
    임시 : 임시.reducer,
  }
})

//state 수정함수 export 하기 다른곳에서도 사용할수있게 변수에 저장하여 export한다.
export let { setGameData } = gameData.actions