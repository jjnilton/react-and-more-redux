import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notification-slice";
import { fetchCartData, sendCartData } from "./cart-actions";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    visible: false,
    changed: false,
    items: [
      // {
      //   id: 0,
      //   title: "Product 0",
      //   description: "Description of the Product 0",
      //   price: 4.99,
      //   quantity: 3,
      // },
    ],
  },
  reducers: {
    replaceCartItems(state, action) {
      state.items = action.payload.items
    },
    toggleVisibility(state) {
      state.visible = !state.visible;
    },
    addToCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      state.changed = true;
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      state.changed = true;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

// export const cartSliceActions = cartSlice.actions;
export const { toggleVisibility, addToCart, removeFromCart, replaceCartItems } =
  cartSlice.actions;
export default cartSlice;
