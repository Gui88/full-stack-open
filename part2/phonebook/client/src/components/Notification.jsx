const Notification = ({ message, classOfMessage }) => {
  if (message === null) {
    return null;
  }

  return <div className={classOfMessage}>{message}</div>;
};

export default Notification;
