import store from '../store.js';

export const windowResize = (width) => {
  let output = {
    type: 'WINDOW_RESIZE_ACTION',
    payload: {}
  };
  switch (true) {
    case (width > 749 && width < 1023):
      output.payload.profile = 'md';
      break;
    case (width > 1022):
      output.payload.profile = 'lg';
      break;
    default:
      output.payload.profile = 'sm';
      break;
  };
  return output;
};
