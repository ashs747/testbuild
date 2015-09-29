import {feedStubBasic} from './feedState-stubs';
import {feedReducer} from '../feedReducer';
import {expect} from 'cirrus/testing/utils';

var exampleState = feedStubBasic;

describe("The Feed-Reducer - Message Board State Handler", () => {
  it("Changes a post to Allow-Editable when handling a FEED_ALLOW_EDIT action", () => {
    let allowEditAction = {
      type: 'FEED_ALLOW_EDIT',
      payload: {
        feedID: 'programmeFeed1',
        editing: true,
        id: '0'
      }
    };

    let finalState = feedReducer(exampleState, allowEditAction);
    expect(finalState.Feeds.programmeFeed1.messages[0].editing).to.equal(true);
  });

  it("Changes a comment to Allow-Editable when handling a FEED_ALLOW_EDIT action", () => {
    let allowEditAction = {
      type: 'FEED_ALLOW_EDIT',
      payload: {
        feedID: 'programmeFeed1',
        editing: true,
        id: '22'
      }
    };

    let finalState = feedReducer(exampleState, allowEditAction);
    expect(finalState.Feeds.programmeFeed1.messages[0].comments[0].editing).to.equal(true);
  });

  it('Removes a comment from the list after a successful Delete call', () => {
    let deletePostObjectAction = {
      type: 'FEED_DELETE_MESSAGE',

    };
  });
});

