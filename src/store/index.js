import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    visible: false,
    items: [
      {
        id: 0,
        title: "Product 0",
        description: "Description of the Product 0",
        price: 4.99,
        quantity: 3,
      },
    ],
  },
  reducers: {
    toggleVisibility(state) {
      state.visible = !state.visible;
    },
    changeQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (action.payload.type === "add") {
        state.items[itemIndex].quantity =
          state.items[itemIndex].quantity + action.payload.value;
      } else if (action.payload.type === "sub") {
        if (state.items[itemIndex].quantity < 2) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          state.items[itemIndex].quantity =
            state.items[itemIndex].quantity - action.payload.value;
        }
      }
    },
    addToCart(state, action) {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex < 0) {
        state.items = [...state.items, {...action.payload, quantity: 1}]
      } else {
        state.items[itemIndex].quantity += 1;
      }
    }
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const { toggleVisibility, changeQuantity, addToCart } = cartSlice.actions;
export default store;
