const initialState = null;
let lastTimeout = null;

export const setNotification = (message, type, time) => {
    return async dispatch => {
        clearTimeout(lastTimeout);
        dispatch(notify(message, type));
        lastTimeout = setTimeout(() => {
            dispatch(clearNotify());
        }, time*1000);
    };
};

export const setError = (message) => {
    return setNotification(message, 'error', 5);
};

export const setSuccess = (message) => {
    return setNotification(message, 'success', 5);
};

export const notify = (message, type) => {
    return {type: 'NOTIFY', data: {message, type}};
};

export const clearNotify = () => {
    return {type: 'CLEAR'};
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NOTIFY':
        return action.data;
      case 'CLEAR':
        return null;
      default:
        return state;
    }
  };
  
  export default reducer;