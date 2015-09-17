import React from 'react';

class LearningJourneyRow extends React.Component {
  constructor() {
    super();
    this.assignIcon = this.assignIcon.bind(this);
    this.assignStatus = this.assignStatus.bind(this);
  }

  render() {
    let a = this.props.activity;
    let title = a.name;
    let type = a.properties.type;
    let icon = this.assignIcon(a.properties.type);
    let activityUser = a.activityUsers[0];
    let status = this.assignStatus(activityUser.status);
    let date, time, location = "n/a";

    if (activityUser.event) {
      let eventObj = this.assignEvent(activityUser.event);
      date = eventObj.date;
      time = eventObj.time;
      location = eventObj.location;
    }

    if (type === "Project") {
      date = `Deadline: ${a.properties.deadline}`;
      time = "n/a";
      location = "Project Page";
    }

    return (
      <tr className="plj-table-row">
        <td className="row-icon"><i className={icon}></i></td>
        <td className="activity">{title}</td>
        <td>{type}</td>
        <td>{date}</td>
        <td>{time}</td>
        <td className="location">{location}</td>
        <td className="status">{status}</td>
      </tr>
    );
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

  assignStatus(status) {
    switch (status) {
      case 'closed':
        return null;
      case 'open':
        return <a className="btn btn-primary btn-block btn-grey">Book</a>;
      case 'booked':
        return <a className="btn btn-primary btn-block btn-grey">Change</a>;
      case 'completed':
        return <a className="btn btn-primary btn-block btn-grey">Rate + Log</a>;
      case 'rated':
        return <i className="fa fa-check-circle"></i>;
      case 'missed':
        return <i className="fa fa-times-circle"></i>;
      default:
        return null;
    }
  }

  assignEvent(event) {
    let date = event.dates[0].dateFrom.format('ddd Do MMM YYYY');
    let time = `${event.dates[0].dateFrom.format('HH:mm')}-${event.dates[0].dateTo.format('HH:mm')}`;
    let location = event.location;
    return {
      date, time, location
    };
  }

}

export default LearningJourneyRow;
