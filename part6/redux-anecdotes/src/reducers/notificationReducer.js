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

let timeoutID = null

export const setNotification = (message, seconds) => {
  return async dispatch => {
    if (timeoutID) clearTimeout(timeoutID)
    
    dispatch(showNotification(message))
    timeoutID = setTimeout(() => dispatch(hideNotification()), seconds * 1000)
  }
}

export default notificationSlice.reducer
