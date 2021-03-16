const initialState = null;
let lastTimeout = null;

export const setNotification = (message, time) => {
    return async dispatch => {
        clearTimeout(lastTimeout)
        dispatch(notify(message))
        lastTimeout = setTimeout(() => {
            dispatch(clearNotify())
        }, time*1000)
    }
}

export const notify = (message) => {
    return {type: 'NOTIFY', data: message}
}

export const clearNotify = () => {
    return {type: 'CLEAR'}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NOTIFY':
        return action.data
      case 'CLEAR':
        return null
      default:
        return state
    }
  }
  
  export default reducer