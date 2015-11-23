import store from '../store.js';

export const nextSlide = (slideID) => {
  let payload = {slideID};
  return {
    type: 'SLIDE_NEXT_SLIDE',
    payload
  };
};

export const prevSlide = (slideID) => {
  let payload = {slideID};
  return {
    type: 'SLIDE_PREV_SLIDE',
    payload
  };
};
