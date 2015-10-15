import React from 'react';

class FAQQuestion extends React.Component {

  constructor() {
    super();
    this.showAnswer = this.showAnswer.bind(this);
    this.hideAnswer = this.hideAnswer.bind(this);
    this.state = {
      showAnswer: false
    };
  }

  render() {
    let answer = this.state.showAnswer ? (
      <div className="answer">
        <p>{this.props.answer}</p>
        <div onClick={this.hideAnswer} className="arrow-container">
          <div className="arrow">
            <i className="fa fa-chevron-up"></i>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <div className="faq-question">
        <div onClick={this.showAnswer} className="title">
          <h5>{this.props.question} <i className="fa fa-chevron-right"></i></h5>
        </div>
        {answer}
      </div>
    );
  }

  showAnswer() {
    this.setState({showAnswer: true});
  }

  hideAnswer() {
    this.setState({showAnswer: false});
  }

}
FAQQuestion.defaultProps = {
  question: "",
  answer: ""
};
FAQQuestion.propTypes = {
  question: React.PropTypes.string.isRequired,
  answer: React.PropTypes.string.isRequired
};
export default FAQQuestion;
