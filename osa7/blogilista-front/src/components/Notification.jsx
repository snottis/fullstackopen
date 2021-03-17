import propTypes from 'prop-types';
import {useSelector} from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: propTypes.object
};

export default Notification;
