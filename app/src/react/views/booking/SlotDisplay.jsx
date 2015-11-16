import React from 'react';
import {userSelectedSlot} from '../../../redux/actions/learningJourneyActions';
import {nextSlide} from '../../../redux/actions/slideActions';
import _ from 'underscore';

class SlotDisplay extends React.Component {

  constructor() {
    super();
    this.mapFacilitatorObjs = this.mapFacilitatorObjs.bind(this);
  }

  render() {
    if (!this.props.selectedDate) {
      return <div />;
    }
    let reducedEventObjs = this.reduceEventDates(this.props.events, this.props.selectedDate);
    let mappedFacilitatorObjs = this.mapFacilitatorObjs(reducedEventObjs);
    return (
      <div className="facilitator-slots">
        {mappedFacilitatorObjs}
      </div>
    );
  }

  reduceEventDates(events, selectedDate) {
    let reducedEventDates = [];
    for (var i in events) {
      if (events[i].eventDate.format('MMMM Do YYYY') === this.props.selectedDate) {
        reducedEventDates.push(events[i]);
      }
    }
    return reducedEventDates;
  }

  mapFacilitatorObjs(events) {
    let mappedEvents = events.map((event, i) => {
      let availableSlots = event.slots.filter(slot => slot.user === null);
      if (availableSlots.length > 0) {
        let reducedSlots = this.reduceSlots(availableSlots);
        let mappedSlots = this.mapSlots(reducedSlots, event.facilitator);
        return (
          <div key={i} className="facilitator-block">
            <div className="block-header">
              <h5>{`Coach: ${event.facilitator.forename} ${event.facilitator.surname}`}</h5>
            </div>
            <table>
              <thead>
                <tr>
                  <th>START</th>
                  <th>END</th>
                  <th>DETAILS</th>
                  <th></th>
                </tr>
              </thead>
              {mappedSlots}
            </table>
          </div>
        );
      }
    });
    return mappedEvents;
  }

  mapSlots(slots, facilitator) {
    let mappedSlots = slots.map((slot, i) => {
      let className = "slot";
      if (i % 2 !== 0) {
        className += " odd";
      }
      return (
        <tr key={slot.id} className={className}>
          <td>{slot.startDate.format('HH:mm')}</td>
          <td>{slot.endDate.format('HH:mm')}</td>
          <td>{slot.location}</td>
          <td><a className="btn" onClick={this.clickedBook.bind(this, slot, facilitator)}>BOOK</a></td>
        </tr>
      );
    });
    return (
      <tbody className="slot-body">
        {mappedSlots}
      </tbody>
    );
  }

  reduceSlots(slots) {
    let reducedSlots = [];
    slots.forEach((slot) => {
      if (!_.find(reducedSlots, (reducedSlot) => {
        return reducedSlot.startDate.format('HH:mm') === slot.startDate.format('HH:mm') && reducedSlot.endDate.format('HH:mm') === slot.endDate.format('HH:mm');
      })) {
        reducedSlots.push(slot);
      }
    });
    return reducedSlots;
  }

  clickedBook(slot, facilitator, e) {
    e.preventDefault();
    this.props.dispatch(userSelectedSlot(slot, facilitator));
    this.props.dispatch(nextSlide('booking'));
  }
}

export default SlotDisplay;
