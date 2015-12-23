import React from 'react';
import LearningJourneyRow from './LearningJourneyRow.jsx';
import _ from 'underscore';
import moment from 'moment-timezone';

class LearningJourneyTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    let rows = null;
    if (this.props.journeyModule) {
      rows = _.mapObject(this.props.journeyModule.activities, (activity, key) => {
        return <LearningJourneyRow key={key} activity={activity} smallTable={this.props.smallTable} moduleId={this.props.journeyModule.id}/>;
      });
    }
    let iconRow = (this.props.showIcon) ? <th className="row-icon"></th> : null;
    let headerIcon = (this.props.showIcon) ? <th className="row-icon"><i className="fa fa-lightbulb-o"></i></th> : null;
    let content = this.props.smallTable ? (
      <div className="table">
        <div className="heading">
          <div className="title">{this.props.journeyModule.name}</div>
          <div className="sub-title">{moment(this.props.journeyModule.startDate).format('MMMM YYYY')} - {moment(this.props.journeyModule.endDate).format('MMMM YYYY')}</div>
        </div>
        {rows}
        <div className="footer">
          <span>VIEW LEARNING LOG <i className="fa fa-chevron-right"></i></span>
        </div>
      </div>
    ) : (
      <table border-spacing="separate" className="table">
        <thead>
          <tr className="heading">
            {headerIcon}
            <th colSpan="6">
              <div className="title">{this.props.journeyModule.name}</div>
              <div className="sub-title">{moment(this.props.journeyModule.startDate).format('MMMM YYYY')} - {moment(this.props.journeyModule.endDate).format('MMMM YYYY')}</div>
            </th>
          </tr>
          <tr className="table-headings">
            {iconRow}
            <th className="learning-activity">LEARNING ACTIVITY</th>
            <th>TYPE</th>
            <th>DATE</th>
            <th>TIME</th>
            <th>DETAILS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot className="footer">
          <tr>
            <td></td>
            <td colSpan="6">VIEW LEARNING LOG <i className="fa fa-chevron-right"></i></td>
          </tr>
        </tfoot>
      </table>
    );
    return (
      <div className="learning-journey-module">
        {content}
      </div>
    );
  }
}

export default LearningJourneyTable;
