const success = (message, setter) => {
  setter({ message, type: 'success' });
  setTimeout(() => {
    setter(null);
  }, 5000);
};

const failure = (message, setter) => {
  setter({ message, type: 'error' });
  setTimeout(() => {
    setter(null);
  }, 5000);
};

export default {
  success: success,
  failure: failure,
};
