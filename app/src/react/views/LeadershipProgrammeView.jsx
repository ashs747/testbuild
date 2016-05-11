import React from 'react';
import Video from '../components/Video.jsx';
import Carousel from '../components/Carousel.jsx';
import LearningJourneyWidget from '../modules/personalLearningJourney/LearningJourneyWidget.jsx';
import moment from 'moment-timezone';
import {connect} from 'react-redux';

import {programmeContent} from '../../content.js';

class LeadershipProgrammeView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="leadership-programme">
        <div className="intro">
          <div className="inner">
            <h1>{programmeContent.tile1.header}</h1>
            <p>{programmeContent.tile1.content}</p>
          </div>
        </div>
        <div className="our-values">
          <div className="inner">
            <h1>{programmeContent.tile2.header}</h1>
            <p>{programmeContent.tile2.content}</p>
          </div>
        </div>
        <div className="value-carousel">
          <div className="inner">
            <Carousel context="values" items={programmeContent.carousel1} defineWidthClass="programme-width" />
          </div>
        </div>
        <div className="double-column clearfix">
          <div className="col-sm-6 left-column">
            <div className="inner">
              <div className="circle">
                <p><i className={`fa fa-${programmeContent.tile3.icon}`}></i></p>
              </div>
              <h3>{programmeContent.tile3.header}</h3>
              <p>{programmeContent.tile3.content}</p>
            </div>
          </div>
          <div className="col-sm-6 right-column">
            <div className="inner">
              <div className="circle">
                <p><i className={`fa fa-${programmeContent.tile4.icon}`}></i></p>
              </div>
              <h3>{programmeContent.tile4.header}</h3>
              <p>{programmeContent.tile4.content}</p>
            </div>
          </div>
        </div>
        <div className="qualities">
          <div className="inner">
            <h1>{programmeContent.tile5.header}</h1>
            <p>{programmeContent.tile5.content}</p>
          </div>
        </div>
        <div className="title-carousel">
          <div className="inner">
            <Carousel context="title" items={programmeContent.carousel2} defineWidthClass="programme-width"/>
          </div>
        </div>
        <div className="blended-learning">
          <div className="inner">
            <h1>{programmeContent.tile6.header}</h1>
            <p>{programmeContent.tile6.content}</p>
          </div>
        </div>
        <div className="delivery-grid clearfix">
          <div className="col-sm-6 workshop">
            <div className="box-inner">
              <div className="icon">
                <i className={`fa fa-${programmeContent.tile7.icon}`}></i>
              </div>
              <div className="text">
                <h5>{programmeContent.tile7.header}</h5>
                <p>{programmeContent.tile7.content}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 coaching">
            <div className="box-inner">
              <div className="icon">
                <i className={`fa fa-${programmeContent.tile8.icon}`}></i>
              </div>
              <div className="text">
                <h5>{programmeContent.tile8.header}</h5>
                <p>{programmeContent.tile8.content}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 webinar">
            <div className="box-inner">
              <div className="icon">
                <i className={`fa fa-${programmeContent.tile9.icon}`}></i>
              </div>
              <div className="text">
                <h5>{programmeContent.tile9.header}</h5>
                <p>{programmeContent.tile9.content}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 development">
            <div className="box-inner">
              <div className="icon">
                <i className={`fa fa-${programmeContent.tile10.icon}`}></i>
              </div>
              <div className="text">
                <h5>{programmeContent.tile10.header}</h5>
                <p>{programmeContent.tile10.content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="roadmap">
          <div className="inner">
            <h1>{programmeContent.tile11.header}</h1>
            <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          </div>
        </div>
        <div className="message-from">
          <div className="inner">
            <h1>{programmeContent.tile12.header}</h1>
            <Video url={programmeContent.tile12.videoUrl} />
          </div>
        </div>
      </div>
    );
  }
}

function mapProgrammeViewProps(state) {
  return {
    profile: state.width.profile,
    modules: state.learningJourney
  };
};
var mappedView = connect(mapProgrammeViewProps)(LeadershipProgrammeView);

export default mappedView;
