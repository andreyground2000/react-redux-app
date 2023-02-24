import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existed = state.items.find(item => item.id === newItem.id);
      
      state.totalQuantity++;
      if (!existed) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      } else {
        existed.quantity++;
        existed.totalPrice = existed.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existed = state.items.find(item => item.id === id);

      state.totalQuantity--;
      if (existed.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existed.quantity--;
        existed.totalPrice -= existed.price;
      }
    },
    setFetchedCartData(state, action) {
      if (!action.payload) {
        return;
      }
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity;
    }
  }
})

export const cartActions = cartSlice.actions;