import React from 'react';
import {dispatch} from '../../../redux/store';
import {nextSlide} from '../../../redux/actions/slideActions';

export const slides = [{
  content: (
    <div className="choose-slide">
      
    </div>
  ),
  showNext: false
}, {
  content: <p>Slide 2</p>
}, {
  content: <p>Slide 3</p>
}];
