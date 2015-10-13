import {windowResize} from '../widthActions';
import {expect} from 'cirrus/testing/utils';

describe("Width Actions", () => {
  it("should pass a payload containing 'profile: sm' if width is less than 750", () => {
    let actionPayload = windowResize(100);
    expect(actionPayload.payload.profile).to.equal('sm');
  });

  it("should pass a payload containing 'profile: md' if width is between 750 and 1022", () => {
    let actionPayload = windowResize(1000);
    expect(actionPayload.payload.profile).to.equal('md');
  });

  it("should pass a payload containing 'profile: lg' if width is greater than 1022", () => {
    let actionPayload = windowResize(1023);
    expect(actionPayload.payload.profile).to.equal('lg');
  });
});
