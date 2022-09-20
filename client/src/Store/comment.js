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
      }
    }
  })

export let { initialComments } = comments.actions
export let { moreComments } = comments.actions

export default comments.reducer;