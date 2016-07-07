import React from 'react';
import moment from 'moment-timezone';
import Tooltip from '../tooltip/Wrapper.jsx';
import config from '../../../localConfig';

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
    let status = (type !== "Project") ? this.mapStatus(activity, this.props.moduleNumber) : null;

    let date = (event) ? moment(event.startDate).format('ddd Do MMM YYYY') : null;
    let time = (event) ? `${moment(event.startDate).format('HH:mm')} - ${moment(event.endDate).format('HH:mm')}` : null;
    let location;
    let ical;

    let iconRow = (this.props.showIcon) ? <td className="row-icon"><i className={icon}></i></td> : null;

    if (type !== "Coaching") {
      var pageLink = (type === "Project") ? "project" : "activity";
      title = <a href={`/#/${pageLink}/${activity.id}`}>{title}</a>;
    }

    if (event) {
      if (event.tooltipTitle && event.tooltipBody) {
        location = <Tooltip trigger={<p>{event.tooltipTitle}</p>} content={<div dangerouslySetInnerHTML={{__html: event.tooltipBody}} />}/>;
      }
      if (config.api && this.props.accessToken) {
        ical = <a href={`${config.api.url}api/plj/booking/ical/${event.id}?access_token=${this.props.accessToken}`} className="btn ical-button"><i className="fa fa-calendar-plus-o"></i></a>;
      }
      if (type === "Project") {
        location = <p><a href={`/#/project/${activity.id}`}>Project Page</a></p>;
      }
    }

    if (!this.props.smallTable) {
      date = (date) ? date : "n/a";
      time = (time) ? time : "n/a";
      location = (location) ? location : "n/a";
    }

    if (type === "Wall") {
      date = <p>Deadline:<br/>{moment(activity.deadline).format('Do MMM YYYY')}</p>;
      time = "N/A"
    }

    let content = this.props.smallTable ? (
      <div className="plj-small-row clearfix">
        <p>{title}</p>
        <p>{type}{date ? ` - ${date}` : null}</p>
        <p>{time}</p>
        <div className="col-xs-6"><p>{location}</p></div>
        <div className="col-xs-6">{status}</div>
      </div>
    ) : (
      <tr className="plj-table-row">
        {iconRow}
        <td className="activity">{title}</td>
        <td className="type">{type}</td>
        <td className="date">{date}</td>
        <td className="time">{time}</td>
        <td className="ical">{ical}</td>
        <td className="location">{location}</td>
        <td className="status">{status}</td>
      </tr>
    );

    return content;
  }

  mapStatus(activity, moduleNumber) {
    switch (activity.status) {
      case "dates-tbc": return (<p>Dates TBC</p>);
      case "book": return (<a className="btn" href={`/#/booking/${moduleNumber}/${activity.id}`}>BOOK</a>);
      case "booked-can-change": return (<a className="btn" href={`/#/booking/${moduleNumber}/${activity.id}`}>CHANGE</a>);
      case "booked-cannot-change": return (
        <Tooltip
          trigger={<i className="fa fa-info-circle"></i>}
          content={<p>If you need to amend this booking, please contact support by clicking <a href={this.props.supportUrl} target="_blank">here</a>.</p>}
        />
      );
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
