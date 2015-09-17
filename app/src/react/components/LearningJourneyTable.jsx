import React from 'react';
import LearningJourneyRow from './LearningJourneyRow.jsx';

class LearningJourneyTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    let rows = null;
    if (this.props.journeyModule) {
      rows = this.props.journeyModule.activities.map((a, i) => {
        return <LearningJourneyRow key={i} activity={a} />;
      });
    }
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
              <th className="learning-activity">LEARNING ACTIVITY</th>
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

export default LearningJourneyTable;
