import React from 'react';

class ProjectStep extends React.Component {

  constructor() {
    super();
    this.toggleContent = this.toggleContent.bind(this);
    this.state = {
      showContent: false
    };
  }

  render() {
    let content;
    if (this.state.showContent) {
      let columns = this.props.image ? (
        <div className="double-column">
          <div className="col-sm-8">
            {this.props.content}
          </div>
          <div className="col-sm-4">
            <img src={this.props.image} />
          </div>
        </div>
      ) : (
        <div className="col-sm-12 single-column">
          {this.props.content}
        </div>
      );
      content = (
        <div className="content clearfix">
          {columns}
        </div>
      );
    }
    let icon = this.state.showContent ? "chevron-up" : "chevron-down";
    return (
      <div className="project-step clearfix">
        <div className="step-header clearfix" onClick={this.toggleContent}>
          <div className="title col-xs-11">
            <h2>{this.props.title}</h2>
          </div>
          <div className="icon col-xs-1" >
            <i className={`fa fa-${icon}`} ></i>
          </div>
        </div>
        {content}
      </div>
    );
  }

  toggleContent() {
    this.setState({showContent: !this.state.showContent});
  }

}
ProjectStep.defaultProps = {
  title: "",
  content: ""
};
ProjectStep.propTypes = {
  title: React.PropTypes.string,
  content: React.PropTypes.string,
};
export default ProjectStep;
