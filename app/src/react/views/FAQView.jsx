import React from 'react';
import {connect} from 'react-redux';
import FAQPanel from '../modules/faqPanel/FAQPanel.jsx';
import Store from '../../redux/store';
var dispatch = Store.dispatch;
import {getFAQsAction} from '../../redux/actions/contentActions';
import _ from 'underscore';

class FAQView extends React.Component {

  constructor() {
    super();
    this.mapQuestions = this.mapQuestions.bind(this);
  }

  componentWillMount() {
    dispatch(getFAQsAction());
  }

  render() {
    let faqPanels = this.props.questions.length > 0 ? this.mapQuestions(this.props.questions) : null;
    return (
      <div className="faq">
        <div className="header">
          <div className="text">
            <h1>FAQs</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          </div>
        </div>
        {faqPanels}
      </div>
    );
  }

  //<FAQPanel title="About the Programme" questions={[]} />

  mapQuestions(questions) {
    let groupedQuestions = _.groupBy(this.props.questions, resource => resource.group);
    let columnedQuestions = this.columnQuestions(groupedQuestions);
    return columnedQuestions;
  }

  columnQuestions(questions) {
    let panels = [];
    let column1 = [];
    let column2 = [];
    let questionCounter = 0;

    let mappedQuestions = _.mapObject(questions, (val, key) => {
      let slug = key;
      let title = slug.replace("-", " ");
      panels.push(<FAQPanel key={`${key}-${val}`} title={title} questions={val} />);
    });

    for (var i in panels) {
      if (questionCounter < this.props.questions.length / 2) {
        questionCounter += panels[i].props.questions.length;
        column1.push(panels[i]);
      } else {
        column2.push(panels[i]);
      }
    }
    return (
      <div className="row">
        <div className="col-md-6">{column1}</div>
        <div className="col-md-6">{column2}</div>
      </div>
    );
  }


}

function mapFAQProps(state) {
  return {
    profile: state.width.profile,
    questions: state.content.faq ? state.content.faq : []
  };
};
var mappedFAQView = connect(mapFAQProps)(FAQView);

export default mappedFAQView;
