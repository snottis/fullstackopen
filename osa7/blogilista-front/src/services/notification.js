import {useDispatch} from 'react-redux';
import {setNotification} from '../reducers/notificationReducer';





const success = (message) => {
  const dispatch = useDispatch();
  dispatch(setNotification(message, 'success', 5));
};

const failure = (message) => {
  const dispatch = useDispatch();
  dispatch(setNotification(message, 'error', 5));
};

export default {
  success: success,
  failure: failure,
};
