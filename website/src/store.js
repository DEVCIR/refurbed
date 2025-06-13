import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/products/productSlice'
import cartReducer from './features/cart/cartSlice'
import categoryReducer from './features/category/categorySlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    category: categoryReducer,
    

  }
})