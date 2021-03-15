const initialState = null;

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