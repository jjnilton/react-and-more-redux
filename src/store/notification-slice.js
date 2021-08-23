import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message }
    },
    resetNotification(state) {
      state.notification = null
    }
  }
})

export const { showNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice;