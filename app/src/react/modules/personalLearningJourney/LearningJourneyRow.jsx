import React from 'react';
import moment from 'moment-timezone';
import Tooltip from '../tooltip/Wrapper.jsx';
import Markdown from 'react-remarkable';

class LearningJourneyRow extends React.Component {
  constructor() {
    super();
    this.assignIcon = this.assignIcon.bind(this);
  }

  render() {
    let activity = this.props.activity;
    let title = activity.name;
    let type = activity.type;
    let event = activity.myBookedEventAndSlot;
    let icon = this.assignIcon(type);
    let status = (type !== "Project") ? this.mapStatus(activity, this.props.moduleId) : null;

    let date = (event) ? moment(event.startDate).format('ddd Do MMM YYYY') : "n/a";
    let time = (event) ? `${moment(event.startDate).format('HH:mm')} - ${moment(event.endDate).format('HH:mm')}` : "n/a";
    let location = "n/a";

    let iconRow = (this.props.showIcon) ? <td className="row-icon"><i className={icon}></i></td> : null;

    if (type !== "Coaching") {
      var pageLink = (type === "Project") ? "project" : "activity";
      title = <a href={`/#/${pageLink}/${activity.id}`}>{title}</a>;
    }

    if (event) {
      if (event.tooltipTitle && event.tooltipBody) {
        let trigger = (type === "Workshop") ? <p>{event.tooltipTitle}</p> : <p>View Details</p>;
        location = <Tooltip trigger={trigger} content={<Markdown source={event.tooltipBody} />} />;
      }
      if (type === "Project") {
        location = <p><a href={`/#/project/${activity.id}`}>Project Page</a></p>;
      }
    }

    let content = this.props.smallTable ? (
      <div className="plj-small-row">
        <p>Title: {title}</p>
        <p>Date: {date}</p>
        <p>Location: {location}</p>
        {status}
      </div>
    ) : (
      <tr className="plj-table-row">
        {iconRow}
        <td className="activity">{title}</td>
        <td className="type">{type}</td>
        <td className="date">{date}</td>
        <td className="time">{time}</td>
        <td className="ical"><a className="btn ical-button"><i className="fa fa-calendar-plus-o"></i></a></td>
        <td className="location">{location}</td>
        <td className="status">{status}</td>
      </tr>
    );

    return content;
  }

  mapStatus(activity, moduleId) {
    switch (activity.status) {
      case "dates-tbc": return (<p>Dates TBC</p>);
      case "book": return (<a className="btn" href={`/#/booking/${moduleId}/${activity.id}`}>BOOK</a>);
      case "booked-can-change": return (<a className="btn" href={`/#/booking/${moduleId}/${activity.id}`}>CHANGE</a>);
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

}
export default LearningJourneyRow;
