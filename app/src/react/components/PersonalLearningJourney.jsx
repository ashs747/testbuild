import React from 'react';

export default class extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {

    var rows = [1,2,3,4,5].map(a => {
      return  ( <tr>
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
        <table  border-spacing="separate" className="table">
          <thead>
            <tr className="heading">
              <th className="rank"></th>
              <th colSpan="6">
                <div className="title">Module 1 - Leading through change</div>
                <div className="sub-title">August 2015 - September 2015</div>
              </th>
            </tr>
            <tr className="table-headings">
              <th className="rank"></th>
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
        </table>
      </div>
    );
  }
}
