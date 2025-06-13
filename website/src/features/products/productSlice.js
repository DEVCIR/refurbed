import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProducts: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.allProducts = action.payload
    },
  }
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer