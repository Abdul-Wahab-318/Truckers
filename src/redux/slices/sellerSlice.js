import { createSlice } from '@reduxjs/toolkit'

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    value : {
      id : null ,
      name : '' ,
      email : '' ,
      token : '' ,
      isLoggedIn : false 
    }
  },
  reducers: {

    login: (state , action) => {
      state.value = action.payload
    },

    logout: (state) => {
      state .value = {
        name : '' ,
        email : '' ,
        token : '' ,
        isLoggedIn : false 
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { login, logout  } = sellerSlice.actions
export default sellerSlice.reducer