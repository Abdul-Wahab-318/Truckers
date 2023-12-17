import { configureStore } from '@reduxjs/toolkit'
import seller from '../slices/sellerSlice'
export default configureStore({
  reducer: {
    seller
  },
})