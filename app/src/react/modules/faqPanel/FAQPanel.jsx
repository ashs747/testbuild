import React from 'react';
import FAQQuestion from './FAQQuestion.jsx';

class FAQPanel extends React.Component {

  constructor() {
    super();
  }

  render() {
    let questions = this.props.questions.length > 0 ? this.mapQuestions(this.props.questions) : null;
    return (
      <div className="faq-panel">
        <div className="panel-header">
          <h4><i className="fa fa-question-circle"></i>{this.props.title}</h4>
        </div>
        <div className="panel-questions">
          {questions}
        </div>
      </div>
    );
  }

  mapQuestions(questions) {
    let mappedQuestions = questions.map((question, i) =>
      <FAQQuestion key={question.title} question={`Question ${i + 1} ${question.title}`} answer={question.answer} />
    );
    return mappedQuestions;
  }

}
FAQPanel.defaultProps = {
  title: "",
  questions: []
};
FAQPanel.propTypes = {
  title: React.PropTypes.string.isRequired,
  questions: React.PropTypes.array.isRequired
};
export default FAQPanel;
