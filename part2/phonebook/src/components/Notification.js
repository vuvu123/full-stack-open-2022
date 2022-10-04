const Notification = ({ message }) => {
  let messageClass = 'message-green'
  if (message === null) return null

  if (message.includes('remove') || message.includes('delete')) {
    messageClass = 'message-red'
  }

  if (message.includes('Add') || message.includes('Update')) {
    messageClass = 'message-green'
  }

  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}

export default Notification