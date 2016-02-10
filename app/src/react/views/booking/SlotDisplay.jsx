import React from 'react';
import {userSelectedSlot} from '../../../redux/actions/bookingActions';
import {nextSlide} from '../../../redux/actions/slideActions';
import _ from 'underscore';
import moment from 'moment-timezone';
import Tooltip from '../../modules/tooltip/Wrapper.jsx';

class SlotDisplay extends React.Component {

  constructor() {
    super();
    this.state = {
      mobileEventId: null,
      slot: null
    };
    this.mapFacilitatorObjs = this.mapFacilitatorObjs.bind(this);
    this.mapMobileSelects = this.mapMobileSelects.bind(this);
    this.onFacilitatorChange = this.onFacilitatorChange.bind(this);
    this.slotSelected = this.slotSelected.bind(this);
    this.clickedMobileBook = this.clickedMobileBook.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDate !== nextProps.selectedDate) {
      this.setState({
        mobileEventId: null,
        slot: null
      });
    }
  }

  render() {
    if (!this.props.selectedDate || this.props.selectedDate === 0) {
      return <div />;
    }
    let reducedEventObjs = this.reduceEventDates(this.props.events, this.props.selectedDate);
    if (this.props.width === "sm") {
      let mobileJSX = this.mapMobileSelects(reducedEventObjs);
      let mobileBook = (this.state.slot && this.state.slot !== 0) ? (
        <a className="btn confirm-btn" onClick={this.clickedMobileBook}>CONFIRM</a>
      ) : null;
      return (
        <div className="mobile-selects">
          <h3>Select a coach and time</h3>
          <p>Your timezone is set to <strong>GMT</strong>. <a href="/#/profile">Edit <i className="fa fa-right-chevron"></i></a></p>
          {mobileJSX}
          {mobileBook}
        </div>
      );
    } else {
      let mappedFacilitatorObjs = this.mapFacilitatorObjs(reducedEventObjs);
      return (
        <div>
          <h3>Choose a time</h3>
          <p>Your timezone is set to <strong>GMT</strong>. <a href="/#/profile">Edit <i className="fa fa-right-chevron"></i></a></p>
          <div className="facilitator-slots">
            {mappedFacilitatorObjs}
          </div>
        </div>
      );
    }
  }

  /*
    findSlotById Takes a list of events, and creates a new array of based off unique event.eventDates
  */
  reduceEventDates(events, selectedDate) {
    let reducedEventDates = [];
    for (var i in events) {
      if (moment(events[i].eventDate).format('MMMM Do YYYY') === this.props.selectedDate) {
        reducedEventDates.push(events[i]);
      }
    }
    return reducedEventDates;
  }

  /*
    Maps a desktop/tablet view of the facilitator widgets displaying slots
  */
  mapFacilitatorObjs(events) {
    let mappedEvents = events.map((event, i) => {
      let reducedSlots = this.reduceSlots(event.slots);
      let mappedSlots = this.mapSlots(reducedSlots, event.facilitator, event.tooltipTitle, event.tooltipBody);
      let name = (event.facilitator) ? `${event.facilitator.forename} ${event.facilitator.surname}` : "NO FACILITATOR ASSIGNED";
      return (
        <div key={i} className="facilitator-block">
          <div className="block-header">
            <h5>{`Coach: ${name}`}</h5>
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

  /*
    Similar to reduceEventDates, creates an array of slots for an event with only 1 row per slot (taking out duplicates)
    Will only show a row if a slot is bookable
  */
  reduceSlots(slots) {
    let reducedSlots = [];
    slots.forEach((slot) => {
      if (!_.find(reducedSlots, (reducedSlot) => {
        return moment(reducedSlot.startDate).format('HH:mm') === moment(slot.startDate).format('HH:mm') && moment(reducedSlot.endDate).format('HH:mm') === moment(slot.endDate).format('HH:mm');
      })) {
        reducedSlots.push(slot);
      }
    });
    return reducedSlots;
  }

  /*
    Called by mapFacilitatorObjs, and returns a mapped list of slots as table rows to be displayed
    in the desktop sized  facilitator widgets
  */
  mapSlots(slots, facilitator, tooltipTitle, tooltipBody) {
    let mappedSlots = slots.map((slot, i) => {
      let className = "slot";
      if (i % 2 !== 0) {
        className += " odd";
      }
      let button = (facilitator) ? <a className="btn" onClick={this.clickedBook.bind(this, slot, facilitator)}>BOOK</a> : <a className="btn" style={{cursor: "not-allowed"}}><s>BOOK</s></a>
      var details = <p>Details TBC</p>;
      if (tooltipTitle) {
        details = <p>{tooltipTitle}</p>;
        if (tooltipBody) {
          details = <Tooltip trigger={details} content={tooltipBody} />
        }
      }
      return (
        <tr key={slot.id} className={className}>
          <td>{moment(slot.startDate).format('HH:mm')}</td>
          <td>{moment(slot.endDate).format('HH:mm')}</td>
          <td>{details}</td>
          <td>{button}</td>
        </tr>
      );
    });
    return (
      <tbody className="slot-body">
        {mappedSlots}
      </tbody>
    );
  }

  /*
    Used for the mobile layout, this will return 2 select items, 1 for facilitaor and the other for the slot
  */
  mapMobileSelects(eventObjs) {
    let facilitatorOptions = eventObjs.map(event => {
      let facilitatorName = `${event.facilitator.forename} ${event.facilitator.surname}`;
      return <option key={event.id} value={event.id}>{facilitatorName}</option>;
    });
    let facilitatorSelect = (
      <select className="form-control" onChange={this.onFacilitatorChange}>
        <option value={0}>- Please Select -</option>
        {facilitatorOptions}
      </select>
    );
    let slotSelect;
    if (this.state.mobileEventId) {
      slotSelect = this.mapSelectSlots(this.state.mobileEventId, eventObjs);
    }
    return (
      <div>
        {facilitatorSelect}
        {slotSelect}
      </div>
    );
  }

  /*
    Called by mapMobileSelects, itterates over an events slots, return a list of options for the select items
  */
  mapSelectSlots(eventID, eventObjs) {
    let event = this.findEventById(eventObjs, eventID);
    if (!event) {
      return null;
    }
    let reducedSlots = this.reduceSlots(event.slots);
    let slots = reducedSlots.map(slot => {
      return (
        <option key={slot.id} value={slot.id}>
          {`${moment(slot.startDate).format('HH:mm')} - ${moment(slot.endDate).format('HH:mm')}`}
        </option>
      );
    });
    let slotSelection = (
      <select className="form-control" onChange={this.slotSelected}>
        <option value={0}>- Select a slot -</option>
        {slots}
      </select>
    );
    return slotSelection;
  }

  /*
    Called when the CONFIRM button is clicked on mobile, calls the clickedBook action dispatch method
    but just formats the variables before passing them as arguments.
  */
  clickedMobileBook() {
    let event = this.findEventById(this.props.events, this.state.mobileEventId);
    let slot;
    for (var i in event.slots) {
      if (event.slots[i].id === parseInt(this.state.slot, 10)) {
        slot = event.slots[i];
      }
    }
    this.clickedBook(slot, event.facilitator);
  }

  /*
    Dispatches the action that the user has selected a slot, used to progress the slideshow
    and store the booked information for the confirmation slide
  */
  clickedBook(slot, facilitator, e) {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch(userSelectedSlot(slot, facilitator));
    this.props.dispatch(nextSlide('booking'));
  }

  /*
    Helper function used to get an event by its ID from a list of events
  */
  findEventById(eventObjs, eventID) {
    for (var i in eventObjs) {
      if (eventObjs[i].id === parseInt(eventID, 10)) {
        return eventObjs[i];
      }
    }
  }

  /*
    Event fired when the facilitator select is changed. Sets the new values into local component state
  */
  onFacilitatorChange(e) {
    this.setState({mobileEventId: e.target.value, slot: null});
  }

  /*
    Event fired when the slot select is changed. Sets the new value into local component state
  */
  slotSelected(e) {
    this.setState({slot: e.target.value});
  }
}

export default SlotDisplay;
