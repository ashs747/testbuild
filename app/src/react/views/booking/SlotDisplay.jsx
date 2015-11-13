import React from 'react';

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
      let mappedSlots = this.mapSlots(event.slots);
      return (
        <div className="facilitator-block">
          <div className="block-header">
            <h5>{`${event.facilitator.forename} ${event.facilitator.surname}`}</h5>
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

  mapSlots(slots) {
    let mappedSlots = slots.map((slot, i) => {
      let className = "slot";
      if (i % 2 === 0) {
        className += " even";
      }
      return (
        <tr key={slot.id} className={className}>
          <td>{slot.startDate}</td>
          <td>{slot.endDate}</td>
          <td>{slot.location}</td>
          <td><a className="btn" onClick={this.clickedBook.bind(this, slot.id)}>BOOK</a></td>
        </tr>
      );
    });
    return (
      <tbody className="slot-body">
        {mappedSlots}
      </tbody>
    );
  }

  clickedBook(e, slotID) {
    console.log(slotID);
  }
}

export default SlotDisplay;
