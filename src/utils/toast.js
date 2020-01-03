import * as bulmaToast from 'bulma-toast';

const show = (message, type, position = 'top-center') => {
  bulmaToast.toast({ message, type, position });
};

export default {
  info: message => show(message, 'is-info'),
  success: message => show(message, 'is-success'),
  warning: message => show(message, 'is-warning'),
  error: message => show(message, 'is-danger'),
};
