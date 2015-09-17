import React from 'react';
import moment from 'moment-timezone';

class LearningJourneyWidget extends React.Component {
  constructor() {
    super();
  }

  render() {
    let rows = this.props.journeyModules.map((module, i) => {
      let currentModule = this.isCurrentModule(module)? 'module-overview current' : 'module-overview';
      let moduleDatePassed = this.moduleHasPassedDate(module)? 'rank passed-date' : 'rank';
      let notice = this.hasOutstandingActivities(module)? <div className="notice"><i className="fa fa-exclamation"></i></div> : <div className="notice complete"><i className="fa fa-check"></i></div>;
      return (
        <tr key={i} >
          <td className="row-icon"><div className={moduleDatePassed}>{i + 1}</div></td>
          <td className="activity">
            <div className={currentModule}>
              {notice}
              <i className="fa fa-users"></i>
              <div className="title"><strong>{module.name}</strong></div>
              <div className="subTitle">{module.startDate.format('MMMM YYYY')} - {module.endDate.format('MMMM YYYY')}</div>
            </div>
          </td>
          <td><div className="right-arrow"><a ><i className="fa fa-arrow-right"></i></a></div></td>
        </tr>
      );
    });
    return (
      <div className="learning-journey-module widget">
        <table border-spacing="separate" className="table">
          <tbody>
              {rows}
          </tbody>
        </table>
      </div>
    );
  }

  isCurrentModule(module) {
    var today = moment();
    var moduleStart = module.startDate;
    var moduleEnd = module.endDate;
    return today.isAfter(moduleStart) && today.isBefore(moduleEnd);
  }

  moduleHasPassedDate(module) {
    var today = moment();
    var moduleEnd = module.endDate;
    return today.isAfter(moduleEnd);
  }

  hasOutstandingActivities(module) {
      let status = false;
      var activities = module.activities;
      activities.forEach(activity => {
        var activityUser = activity.activityUsers[0];
        if(activityUser.status !='rated') {
          status = true;
          return false;
        }
      });
      return status;
  }
}

export default LearningJourneyWidget;
