import React from 'react';
import {userSelectedSlot} from '../../../redux/actions/learningJourneyActions';
import {nextSlide} from '../../../redux/actions/slideActions';

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
      if (events[i].date === this.props.selectedDate) {
        reducedEventDates.push(events[i]);
      }
    }
    return reducedEventDates;
  }

  mapFacilitatorObjs(events) {
    let mappedEvents = events.map((event, i) => {
      let mappedSlots = this.mapSlots(event.slots, event.facilitator);
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
    });
    return mappedEvents;
  }

  mapSlots(slots, facilitator) {
    console.log(slots);
    let mappedSlots = slots.map((slot, i) => {
      let className = "slot";
      if (i % 2 !== 0) {
        className += " odd";
      }
      return (
        <tr key={slot.id} className={className}>
          <td>{slot.startDate}</td>
          <td>{slot.endDate}</td>
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

  clickedBook(slot, facilitator, e) {
    e.preventDefault();
    this.props.dispatch(userSelectedSlot(slot, facilitator));
    this.props.dispatch(nextSlide('booking'));
  }
}

export default SlotDisplay;
