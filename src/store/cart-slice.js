import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notification-slice";

const API_URL = process.env.REACT_APP_REDUX_CART_FB_URL;

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

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "sending...",
        message: "fetching card data.",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        API_URL
      );
      
      if (!response.ok) {
        throw new Error("Could not fetch cart items.");
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await sendRequest();
      dispatch(replaceCartItems({items: data || []}))
      dispatch(
        showNotification({
          status: "success",
          title: "success!",
          message: "fetched card data successfully.",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "error!",
          message: "fetching card data failed.",
        })
      ); 
    }
  }
};

export const sendCartData = (cartItems) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "sending...",
        message: "sending card data.",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        API_URL,
        {
          method: "PUT",
          body: JSON.stringify(cartItems),
        }
      );

      if (!response.ok) {
        throw new Error("Some error...");
      }
    };

    await sendRequest().catch((error) => {
      dispatch(
        showNotification({
          status: "error",
          title: "error!",
          message: "sent card data failed.",
        })
      );
    });

    dispatch(
      showNotification({
        status: "success",
        title: "success!",
        message: "sent card data successfully.",
      })
    );
  };
};

// export const cartSliceActions = cartSlice.actions;
export const { toggleVisibility, addToCart, removeFromCart, replaceCartItems } =
  cartSlice.actions;
export default cartSlice;
