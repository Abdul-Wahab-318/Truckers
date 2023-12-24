import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value : {
      _id : null ,
      email : '' ,
      isLoggedIn : false 
    }
  },
  reducers: {

    login: (state , action) => {
      state.value = { ...action.payload , isLoggedIn : true }
    },

    logout: (state) => {
      state .value = {
        name : '' ,
        email : '' ,
        isLoggedIn : false 
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { login, logout  } = userSlice.actions
export default userSlice.reducer