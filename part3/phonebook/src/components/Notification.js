const Notification = ({ message, type='error' }) => {
    if (message === null) {
      return null
    }
    
    if(!message)
        return;

    return (
        <div className={type}>
        {message}
        </div>
    )
  }

  export default Notification