import React from 'react';
import moment from 'moment-timezone';

class LearningJourneyRow extends React.Component {
  constructor() {
    super();
    this.assignIcon = this.assignIcon.bind(this);
    this.assignStatus = this.assignStatus.bind(this);
  }

  render() {
    let a = this.props.activity;
    let title = a.name;
    let type = a.type;
    let icon = this.assignIcon(type);
    let eventObj = (a.myBookedEventAndSlot) ? this.assignEvent(a.myBookedEventAndSlot) : {date: "n/a", time: "n/a", location: ""};
    let status = this.mapStatus(a.status);

    if (type === "Project") {
      eventObj.date = `Deadline: ${a.properties.deadline}`;
      eventObj.time = "n/a";
      eventObj.location = "Project Page";
    }

    let iconRow = (this.props.showIcon) ? <td className="row-icon"><i className={icon}></i></td> : null;

    let content = this.props.smallTable ? (
      <div className="plj-small-row">
        <p>{title}</p>
        <p>{eventObj.date}</p>
        <p>{eventObj.location}</p>
      </div>
    ) : (
      <tr className="plj-table-row">
        {iconRow}
        <td className="activity">{title}</td>
        <td>{type}</td>
        <td>{eventObj.date}</td>
        <td>{eventObj.time}</td>
        <td className="location">{eventObj.location}</td>
        <td className="status">{status}</td>
      </tr>
    );

    return content;
  }

  mapStatus(status) {
    console.log(status);
    switch (status) {
      case "completed": return (<i className="fa fa-check"></i>);
      case "rated-coaching": return (<a className="btn">LOG</a>);
      default: return null;
    }
  }

  assignIcon(type) {
    switch (type) {
      case 'Workshop':
        return 'fa fa-users';
      case 'Webinar':
        return 'fa fa-laptop';
      case 'Project':
        return 'fa fa-star';
      case 'Coaching':
        return 'fa fa-comments-o';
      default:
        return 'fa fa-users';
    }
  }

  assignStatus(activityUser, eventObj) {
    switch (activityUser.status) {
      case 'closed':
        return null;
      case 'open':
        return <a className="btn btn-primary btn-block">Book</a>;
      case 'booked':

        return this.isAllowedToChange(activityUser, eventObj) ? <a className="btn btn-primary btn-block">Change</a> : null;
      case 'completed':
        return <a className="btn btn-primary btn-block">Rate + Log</a>;
      case 'rated':
        return <i className="fa fa-check-circle"></i>;
      case 'missed':
        return <i className="fa fa-times-circle"></i>;
      default:
        return null;
    }
  }

  assignEvent(event) {
    let date = moment(event.startDate).format('ddd Do MMM YYYY');
    let time = `${moment(event.startDate).format('HH:mm')} - ${moment(event.endDate).format('HH:mm')}`;
    let location = event.location;
    return {
      date, time, location
    };
  }

  isAllowedToChange(activityUser, eventObj) {
    var today = moment();

    if (activityUser.properties && activityUser.properties.modifier === 'undefined') {
      return true;
    }
    if (today.isAfter(eventObj.dates[0].dateFrom)) {
      return false;
    }
    let modifier = activityUser.properties.modifier;
    let cutOffDate = (() => {
      switch (modifier.direction) {
        case 'add' :
          return eventObj.dates[0].dateFrom.add(modifier.amount, modifier.duration);
        case 'subtract' :
          return eventObj.dates[0].dateFrom.subtract(modifier.amount, modifier.duration);
        default :
          return eventObj.dates[0].dateFrom.add(modifier.amount, modifier.duration);
      }
    })();
    return today.isBefore(cutOffDate.startOf('day'));
  }

}
export default LearningJourneyRow;
