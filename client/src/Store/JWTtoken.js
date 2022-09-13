import { createSlice } from "@reduxjs/toolkit";

const JWTtoken = createSlice({
    name : 'JWTtoken',
    initialState : '',
    reducers : {
        SET_TOKEN(state, action){
            return action.payload
        }
    },
})

export const { SET_TOKEN } = JWTtoken.actions
export default JWTtoken.reducer