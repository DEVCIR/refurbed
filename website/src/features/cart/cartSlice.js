import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartData: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartData = action.payload
    },
  }
})

export const { setCart } = cartSlice.actions
export default cartSlice.reducer