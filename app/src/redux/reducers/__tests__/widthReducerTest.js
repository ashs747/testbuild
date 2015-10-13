import {reducer} from '../widthReducer';
import {expect} from 'cirrus/testing/utils';

var exampleState = {};

describe("Width Reducer", () => {
  it("should set the profile to lg is passed through", () => {
    let windowResizeAction = {
      type: 'WINDOW_RESIZE_ACTION',
      payload: {
        profile: "lg"
      }
    };

    let finalState = reducer(exampleState, windowResizeAction);
    expect(finalState.profile).to.equal('lg');
  });
});
