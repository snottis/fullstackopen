const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return <div class={notification.type}>{notification.message}</div>;
};

export default Notification;
