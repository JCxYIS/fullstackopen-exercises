import { useDispatch, useSelector } from 'react-redux'
import { hideNotif } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {  
    return (
      <div>
        <div id="notif" style={style}>
          {notification}
        </div>
      </div>
    )
  }
  return null
}

export default Notification