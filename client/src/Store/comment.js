import { createSlice } from "@reduxjs/toolkit";

let comments = createSlice({
    name : 'comments',
    initialState : '',
    reducers : {
      setComments(state, action){
        return action.payload
      }
    }
  })

export let { setComments } = comments.actions

export default comments.reducer;