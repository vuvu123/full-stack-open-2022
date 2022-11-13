import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
    hideNotification() {
      return null
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
