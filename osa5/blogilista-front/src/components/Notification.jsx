import propTypes from 'prop-types';


const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: propTypes.object
};

export default Notification;
