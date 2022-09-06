import { createSlice } from '@reduxjs/toolkit'

export const gameData = createSlice({
    name : 'gameData',
    initialState : '',
    reducers : {
      setGameData(state, action){
        return action.payload
      }
    }
  })