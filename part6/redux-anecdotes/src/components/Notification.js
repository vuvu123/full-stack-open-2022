import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotifications = connect(mapStateToProps)(Notification)
export default connectedNotifications