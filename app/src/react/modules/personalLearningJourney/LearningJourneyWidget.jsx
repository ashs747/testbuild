import React from 'react';
import moment from 'moment-timezone';
import _ from 'underscore';

class LearningJourneyWidget extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (Object.keys(this.props.journeyModules).length === 0) {
      return <div />;
    }
    let i = 1;
    let rows = _.mapObject(this.props.journeyModules, (module, key) => {
      let currentModule = this.isCurrentModule(module) ? 'module-overview current clearfix' : 'module-overview clearfix';
      let moduleDatePassed = this.moduleHasPassedDate(module) ? 'rank passed-date' : 'rank';
      let notice = (() => {
        if (!this.moduleHasPassedDate(module)) {
          return null;
        }
        return this.hasOutstandingActivities(module) ? <div className="notice"><i className="fa fa-exclamation"></i></div> : <div className="notice complete"><i className="fa fa-check"></i></div>;
      })();
      let content = (this.props.smallWidget) ? (
        <tr key={key} className="small-row">
          <td className="activity">
            <a href={`/#/module/${module.id}`}>
              <div className={currentModule}>
                <div className="icon clearfix">
                  <i className="fa fa-cogs"></i>
                </div>
                <div className="text">
                  <h5>{`Module ${module.id} - ${module.name}`}</h5>
                  <div className="subTitle">{moment(module.startDate).format('MMM YYYY')} - {moment(module.endDate).format('MMM YYYY')}</div>
                </div>
                {notice}
              </div>
            </a>
          </td>
        </tr>
      ) : (
        <tr key={key} >
          <td className="row-icon"><div className={moduleDatePassed}>{i}</div></td>
          <td className="activity">
            <div className={currentModule}>
              {notice}
              <i className="fa fa-cogs"></i>
              <div className="module-text">
                <h5><b>Module {module.id} - {module.name}</b></h5>
                <h5 style={{fontSize: "16px"}}>{moment(module.startDate).format('MMMM YYYY')} - {moment(module.endDate).format('MMMM YYYY')}</h5>
              </div>
            </div>
          </td>
          <td><div className="right-arrow"><a href={`/#/module/${module.id}`}><i className="fa fa-arrow-right"></i></a></div></td>
        </tr>
      );
      i++;
      return content;
    });
    return (
      <div className="learning-journey-module widget">
        <table border-spacing="separate" className="table">
            {rows}
        </table>
      </div>
    );
  }

  isCurrentModule(module) {
    var today = moment();
    var moduleStart = moment(module.startDate);
    var moduleEnd = moment(module.endDate);
    return today.isAfter(moduleStart) && today.isBefore(moduleEnd);
  }

  moduleHasPassedDate(module) {
    var today = moment();
    var moduleEnd = moment(module.endDate);
    return today.isAfter(moduleEnd);
  }

  hasOutstandingActivities(module) {
    _.mapObject(module.activities, (act, key) => {
      if (act.status != "completed") {
        return false;
      }
    });
    return true;
  }
}

export default LearningJourneyWidget;
