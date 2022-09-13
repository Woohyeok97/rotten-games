import { configureStore } from "@reduxjs/toolkit";

//states
import gameData from "./gamedata";
import gameSort from "./gamesort";
import comments from "./comment";
import JWTtoken from "./JWTtoken";



//state를 다 만들었으니 이제 등록을 해야한다. 그럴때 쓰는 함수가 configureStore() 함수다.
//createState()로 state를 만든후, export default configureStore()안 객체속 reducer : {} 가 있다.
//reducer : {} 안에 '작명 : createState만든거.reducer' 를 집어 넣으면 된다.
//그럼 이제 <Provider store={store}>가 감싸고 있는 모든컴포넌트에서 여기서만든 state를 사용할수있다.
export default configureStore({
    reducer : {
        gameData : gameData,
        gameSort : gameSort,
        comments : comments,
        JWTtoken : JWTtoken,
    }
})