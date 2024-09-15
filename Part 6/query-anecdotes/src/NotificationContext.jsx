import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const createNotification = (state , action) => {
  switch(action.type) {
    case "VOTE" :
      return `you voted '${action.payload}'`
    case "CREATE":
      return `you created '${action.payload}'`
    case "CLEAR" : 
      return ''
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification , notificationDispatch] = useReducer(createNotification, "Hello")

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}



export default NotificationContext