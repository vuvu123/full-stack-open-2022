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

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(hideNotification()), Number(`${seconds}000`))
  }
}

export default notificationSlice.reducer
