//Redux를 이용하여 Access Token 을 저장
import { createSlice } from '@reduxjs/toolkit'

export const TOKEN_TIME_OUT = 600 * 1000;

export const tokenSlice = createSlice({
    name : 'authToken',
    initialState : {
        authenticated : false, // 현재 로그인 여부를 확인
        accessToken : null, // 액세스토큰이 저장될곳
        exprieTime : null // 액세스토큰의 만료시간
        //authenticated : 진짜임을 증명하다.
    },
    reducers : {
        //tokenSlice 에 액세스토큰을 저장시킬 함수(reducer)
        SET_TOKEN : (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload
            state.exprieTime = new Date().getTime() + TOKEN_TIME_OUT
        },
        //tokenSlice 내에 액세스토큰을 포함해 전부 초기화 시키는 함수(reducer)
        DELETE_TOKEN : (state) => {
            state.authenticated = false
            state.accessToken = null
            state.exprieTime = null
        },
    }
})

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions

export default tokenSlice.reducer

//밑에 있는게 내가 알고있는 기본방식

// export default configureStore({
//     reducer : {
//         tokenSlice : tokenSlice.reducer
//     }
// })