import {feedStubBasic} from './feedState-stubs';
import {FeedReducer} from '../feedReducer';
import {expect} from 'cirrus/testing/utils';

var exampleState = feedStubBasic;


describe("The Feed-Reducer - Message Board State Handler", () => {
  it("Changes a post to Allow-Editable when handling a FEED_ALLOW_EDIT action", () => {
    let allowEditAction = {
      type: 'FEED_ALLOW_EDIT',
      payload: {
        feedID: 'programmeFeed1',
        editing: true,
        guid: '0'
      }
    }
    let finalState = FeedReducer(exampleState, allowEditAction);
    expect(finalState.Feeds.programmeFeed1.messages[0].editing).to.equal(true);

  });

  it("Changes a comment to Allow-Editable when handling a FEED_ALLOW_EDIT action", () => {
    let allowEditAction = {
      type: 'FEED_ALLOW_EDIT',
      payload: {
        feedID: 'programmeFeed1',
        editing: true,
        guid: '22'
      }
    }

    let finalState = FeedReducer(exampleState, allowEditAction);
    expect(finalState.Feeds.programmeFeed1.messages[0].comments[0].editing).to.equal(true);
  });
});

