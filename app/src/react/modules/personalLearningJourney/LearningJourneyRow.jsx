import React from 'react';
import moment from 'moment-timezone';

class LearningJourneyRow extends React.Component {
  constructor() {
    super();
    this.assignIcon = this.assignIcon.bind(this);
  }

  render() {
    let a = this.props.activity;
    let title = a.name;
    let type = a.type;
    let icon = this.assignIcon(type);
    let eventObj = (a.myBookedEventAndSlot) ? this.assignEvent(a.myBookedEventAndSlot) : {date: "n/a", time: "n/a", location: "n/a"};
    let status = (type !== "Project") ? this.mapStatus(a) : null;

    if (type === "Project") {
      eventObj.date = `Deadline: ${a.properties.deadline}`;
      eventObj.time = "n/a";
      eventObj.location = "Project Page";
    }

    let iconRow = (this.props.showIcon) ? <td className="row-icon"><i className={icon}></i></td> : null;

    if (type !== "Coaching") {
      var pageLink = (type === "Project") ? "project" : "activity";
      title = <a href={`/#/${pageLink}/${a.id}`}>{title}</a>;
    }

    let content = this.props.smallTable ? (
      <div className="plj-small-row">
        <p>Title: {title}</p>
        <p>Date: {eventObj.date}</p>
        <p>Location: {eventObj.location}</p>
        {status}
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

  mapStatus(activity) {
    switch (activity.status) {
      case "dates-tbc": return (<span>Dates TBC</span>);
      case "book": return (<a className="btn">BOOK</a>);
      case "booked-can-change": return (<a className="btn">CHANGE</a>);
      case "booked-cannot-change": return (<i className="fa fa-info-circle"></i>);
      case "log": return (<a className="btn">LOG</a>);
      case "missed": return (<div className="icon red"><i className="fa fa-times"></i></div>);
      case "no-attendance-marked": return null;
      case "completed": return (<div className="icon green"><i className="fa fa-check"></i></div>);
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

  assignEvent(event) {
    let date = moment(event.startDate).format('ddd Do MMM YYYY');
    let time = `${moment(event.startDate).format('HH:mm')} - ${moment(event.endDate).format('HH:mm')}`;
    let location = event.location;
    return {
      date, time, location
    };
  }

}
export default LearningJourneyRow;
