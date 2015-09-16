import React from 'react';
import moment from 'moment-timezone';

class PLJTableRow extends React.Component {
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
    let status = this.assignStatus(a.activityUsers[0].status);
    let date, time, location = "n/a";

    if (a.activityUsers[0].event) {
      let eventObj = this.assignEvent(a.activityUsers[0].event);
      date = eventObj.date;
      time = eventObj.time;
      location = eventObj.location;
    }

    if (type === "project") {
      date = `Deadline: ${a.properties.deadline}`;
      time = "n/a";
      location = "Project Page";
    }

    return (
      <tr>
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
      case 'workshop':
        return 'fa fa-users';
      case 'webinar':
        return 'fa fa-laptop';
      case 'project':
        return 'fa fa-star';
      case 'coaching':
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
        return <button className="btn">Book</button>;
      case 'booked':
        return <button className="btn">Change</button>;
      case 'completed':
        return <button className="btn">Rate + Log</button>;
      case 'rated':
        return <i className="fa fa-check-circle"></i>;
      case 'missed':
        return <i className="fa fa-times-circle"></i>;
      default:
        return null;
    }
  }

  assignEvent(event) {
    let date = moment(event.dates[0].dateFrom).format('ddd Do MMM YYYY');
    let time = `${moment(event.dates[0].dateFrom).format('HH:mm')}-${moment(event.dates[0].dateTo).format('HH:mm')}`;
    let location = event.location;
    return {
      date, time, location
    }
  }

}

export default PLJTableRow;
