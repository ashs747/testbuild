import bookingService from '../../services/ajax/rpc/bookingSlots';
import activityUserService from '../../services/ajax/rest/activityUser';
import eventService from '../../services/ajax/rest/event';

export default {
  getSlots(query = []) {

    if (query.length == 0) {
      return bookingService.get();
    }
    return bookingService.get({
      query: query
    });
  },

  createBooking(userId, activityId, bookingObject, facilitator = null) {

    var params = {
      embed: 'activity,facilitator',
      query: [{
        field: 'user',
        type: 'eq',
        value: userId
      }, {
        field: 'activity',
        type: 'eq',
        value: activityId
      }]
    };
    return activityUserService.get(params)
      .then(activityUser => {

        var event = {
          name: activityUser.activity.name,
          description: activityUser.activity.descripition,
          location: bookingObject.location,
          activityUser: {
            id: activityUser.id,
            status: "booked"
          },
          dates: [
            {
              dateFrom: bookingObject.dateFrom,
              dateTo: bookingObject.dateTo
            }
          ],
          attendees: [
            {
              user: userId,
              status: 'confirmed',
              type: 'guest'
            },
            {
              user: facilitator,
              status: 'confirmed',
              type: 'owner'
            }]
        };

        return eventService.post(event);

      });

  },

  deleteBooking(userId, activityId, eventId) {
    var params = {
      query: [{
        field: 'user',
        type: 'eq',
        value: userId
      }, {
        field: 'activity',
        type: 'eq',
        value: activityId
      }]
    };
    return activityUserService.get(params)
      .then(activityUser => {
        var params = {
          event: null,
          status: 'open'
        };
        return activityUserService.patch(activityUser.id, params)
          .then(() => {
            return eventService.del(eventId);
          });
      });
  }
};
