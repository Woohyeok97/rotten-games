import { createSlice } from "@reduxjs/toolkit";

let comments = createSlice({
    name : 'comments',
    initialState : '',
    reducers : {
      initialComments(state, action){
        return action.payload
      },
      moreComments(state, action){
        return [...state, ...action.payload]
      },
      recommendComment(state, action){
        let index = state.findIndex((a)=> a._id == action.payload._id)
        let newArr = [...state]
        newArr[index] = action.payload
        return [...newArr]
      }
    }
  })

export let { initialComments } = comments.actions
export let { moreComments } = comments.actions
export let { recommendComment } = comments.actions

export default comments.reducer;