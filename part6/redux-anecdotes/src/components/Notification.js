import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification ===  null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    fontSize: 24,
    backgroundColor: 'yellow',
    fontColor: 'red'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification