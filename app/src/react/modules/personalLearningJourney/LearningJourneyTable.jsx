import React from 'react';
import LearningJourneyRow from './LearningJourneyRow.jsx';
import _ from 'underscore';
import moment from 'moment-timezone';

class LearningJourneyTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    let rows = [];

    if (this.props.journeyModule) {
      for (let key in this.props.journeyModule.activities) {
        if (this.props.journeyModule.activities.hasOwnProperty(key)) {
          rows.push(<LearningJourneyRow showIcon={this.props.showIcon} key={key} activity={this.props.journeyModule.activities[key]} smallTable={this.props.smallTable} moduleId={this.props.journeyModule.moduleId}/>);
        }
      }
    }
    let iconRow = (this.props.showIcon) ? <th className="row-icon"></th> : null;
    let moduleSlug = this.props.journeyModule.name.replace(/\s+/g, '-').toLowerCase();
    let headerIcon = (this.props.showIcon) ? <th className="row-icon"><img src={`assets/img/${moduleSlug}.png`} alt="module icon"/></th> : null;
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
            <th colSpan="7">
              <div className="title"><a href={`/#/module/${this.props.journeyModule.moduleId}`}>{`Module ${this.props.journeyModule.moduleNumber} - ${this.props.journeyModule.name}`}</a></div>
              <div className="sub-title">{moment(this.props.journeyModule.startDate).format('MMMM YYYY')} - {moment(this.props.journeyModule.endDate).format('MMMM YYYY')}</div>
            </th>
          </tr>
          <tr className="table-headings">
            {iconRow}
            <th className="learning-activity">LEARNING ACTIVITY</th>
            <th>TYPE</th>
            <th>DATE</th>
            <th>TIME</th>
            <th></th>
            <th>DETAILS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot className="footer">
          <tr>
            <td className={this.props.showIcon ? "show-icon-footer" : ""}></td>
            <td colSpan="7"><span>VIEW LEARNING LOG ></span></td>
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
