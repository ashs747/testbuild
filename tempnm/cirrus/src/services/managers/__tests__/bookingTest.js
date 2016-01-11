import bookingManager from '../booking';
import {expect, sinon} from '../../../../testing/utils';

const activityUserService = bookingManager.__GetDependency__('activityUserService');
const eventService = bookingManager.__GetDependency__('eventService');
const bookingService = bookingManager.__GetDependency__('bookingService');
// mocks

describe('bookingManager', () => {

  beforeEach(function() {

    sinon.stub(activityUserService, "get").returns(Promise.resolve({
      "activity": {'name': "testActivity", 'description': "testDescription"}
    }));
    sinon.stub(activityUserService, "patch").returns(Promise.resolve({
      success: true
    }));
    sinon.stub(eventService, "post").returns(Promise.resolve({
      "activity": {'name': "testActivity", 'description': "testDescription"}
    }));
    sinon.stub(eventService, "del").returns(Promise.resolve({
      success: true
    }));
    sinon.stub(bookingService, "get");
  });

  afterEach(function() {
    activityUserService.get.restore();
    activityUserService.patch.restore();
    eventService.post.restore();
    bookingService.get.restore();
    eventService.del.restore();
  });

  describe('getSlots', () => {
    it(' passes through correct query parameters', () => {
      let obj = {data: 'nooooooo'};
      let expected = {query: {data: 'nooooooo'}};
      bookingManager.getSlots(obj);
      expect(bookingService.get.getCall(0).args[0]).to.have.all.keys(expected);
    });

    it(' passes through nothing if query is empty', () => {
      let expected = undefined;
      bookingManager.getSlots();
      expect(bookingService.get.getCall(0).args[0]).equals(expected);
    });

  });

  describe('createBooking', () => {
    it('builds an event object to pass through to service', (done) => {

      let expected = {
        name: 'testActivity',
        description: 'testDescription',
        location: 'Telephone',
        activityUser: {
          id: 1,
          status: "booked"
        },
        dates: [
          {
            dateFrom: '2015-08-24T08:00:00+0000',
            dateTo: '2015-08-24T08:00:00+0000'
          }
        ],
        attendees: [
          {
            user: 1,
            status: 'confirmed',
            type: 'guest'
          },
          {
            user: 2,
            status: 'confirmed',
            type: 'owner'
          }]
      };

      bookingManager.createBooking(2, 1, {
        dateFrom: '2015-08-24T08:00:00+0000',
        dateTo: '2015-08-24T08:00:00+0000',
        location: 'Telephone'
      }, 2).then(() => {
        expect(eventService.post.getCall(0).args[0]).to.have.all.keys(expected);
      })
        .then(done)
        .catch(done);

      expect(bookingManager.createBooking);
    });
  });

  describe('deleteBooking', () => {
    it('it updates activty user record before deletion', (done) => {

      let params = {
        event: null,
        status: 'open'
      };

      bookingManager.deleteBooking(2, 1, 2).then(() => {
        expect(activityUserService.patch.getCall(0).args[1]).to.have.all.keys(params);
      })
        .then(done)
        .catch(done);
    });

    it('it updates activty user record before deletion', (done) => {

      let params = {
        event: null,
        status: 'open'
      };

      bookingManager.deleteBooking(2, 1, 2).then(() => {
        expect(eventService.del.getCall(0).args[0]).equals(2);
      })
        .then(done)
        .catch(done);
    });
  });
});
