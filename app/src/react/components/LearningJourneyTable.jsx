import React from 'react';

class LearningJourneyTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    
    var rows = [1, 2, 3, 4, 5].map(a => {
      return (<tr>
          <td className="row-icon"><i className="fa fa-users"></i></td>
          <td className="activity">Workshop Title 2nd line if needed</td>
          <td>Workshop</td>
          <td>Mon 4th oct 2015</td>
          <td>08:00-16:30</td>
          <td className="location">City Name ></td>
          <td><a className="btn btn-grey btn-primary btn-block btn-sm">Book</a></td>
        </tr>);
    });
    return (
      <div className="learning-journey-module">
        <table border-spacing="separate" className="table">
          <thead>
            <tr className="heading">
              <th className="row-icon"><i className="fa fa-lightbulb-o"></i></th>
              <th colSpan="6">
                <div className="title">{this.props.journeyModule.name}</div>
                <div className="sub-title">{this.props.journeyModule.startDate.format('MMMM YYYY')} - {this.props.journeyModule.endDate.format('MMMM YYYY')}</div>
              </th>
            </tr>
            <tr className="table-headings">
              <th className="row-icon"></th>
              <th>LEARNING ACTIVITY</th>
              <th>TYPE</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>LOCATION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {rows}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td colSpan="6">VIEW LEARNING LOG <i className="fa fa-chevron-right"></i></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

module.exports = LearningJourneyTable;
