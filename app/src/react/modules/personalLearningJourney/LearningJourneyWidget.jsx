import React from 'react';
import moment from 'moment-timezone';
import _ from 'underscore';

class LearningJourneyWidget extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (Object.keys(this.props.journeyModules).length === 0) {
      return <div><img src="assets/img/ajax-loader-trans.gif" style={{margin: "20px auto", display: "block"}}/></div>;
    }
    let i = 1;
    let rows = [];
    for (let key in this.props.journeyModules) {
      if (this.props.journeyModules.hasOwnProperty(key)) {
        let theModule = this.props.journeyModules[key];
        let currentModule = this.isCurrentModule(theModule) ? 'module-overview current clearfix' : 'module-overview clearfix';
        let moduleDatePassed = this.moduleHasPassedDate(theModule) ? 'rank passed-date' : 'rank';
        /*
        let notice = (() => {
          if (!this.moduleHasPassedDate(theModule)) {
            return null;
          }
          return this.hasOutstandingActivities(theModule) ? <div className="notice"><i className="fa fa-exclamation"></i></div> : <div className="notice complete"><i className="fa fa-check"></i></div>;
        })();
        */
        let moduleSlug = theModule.name ? theModule.name.replace(/\s+/g, '-').toLowerCase() : '';
        let icon = <img src={`assets/img/${moduleSlug}.png`} alt="module icon"/>;
        let content = (this.props.smallWidget) ? (
          <tr key={key} className="small-row">
            <td className="activity">
              <a href={`/#/module/${theModule.moduleNumber}`}>
                <div className={currentModule}>
                  <div className="icon clearfix">
                    {icon}
                  </div>
                  <div className="text">
                    <h5>{`Module ${theModule.moduleNumber} - ${theModule.name}`}</h5>
                    <div className="subTitle">{moment(theModule.startDate).format('MMM YYYY')} - {moment(theModule.endDate).format('MMM YYYY')}</div>
                  </div>
                </div>
              </a>
            </td>
          </tr>
        ) : (
          <tr key={key} >
            <td className="row-icon"><div className={moduleDatePassed}>{i}</div></td>
            <td className="activity">
              <div className={currentModule}>
                <a href={`/#/module/${theModule.moduleNumber}`}>{icon}</a>
                <div className="module-text">
                  <h5><a href={`/#/module/${theModule.moduleNumber}`}>Module {theModule.moduleNumber} - {theModule.name}</a></h5>
                  <h5 style={{fontSize: "16px"}}>{moment(theModule.startDate).format('MMMM YYYY')} - {moment(theModule.endDate).format('MMMM YYYY')}</h5>
                </div>
              </div>
            </td>
            <td><div className="right-arrow"><a href={`/#/module/${theModule.moduleNumber}`}><i className="fa fa-arrow-right"></i></a></div></td>
          </tr>
        );
        rows.push(content);
        i++;
      }
    }

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

  isCurrentModule(theModule) {
    var today = moment();
    var moduleStart = moment(theModule.startDate);
    var moduleEnd = moment(theModule.endDate);
    return today.isAfter(moduleStart) && today.isBefore(moduleEnd);
  }

  moduleHasPassedDate(theModule) {
    var today = moment();
    var moduleEnd = moment(theModule.endDate);
    return today.isAfter(moduleEnd);
  }

  hasOutstandingActivities(theModule) {
    _.mapObject(theModule.activities, (act, key) => {
      if (act.status !== "completed") {
        return false;
      }
    });
    return true;
  }
}

export default LearningJourneyWidget;
