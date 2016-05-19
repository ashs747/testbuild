import React from 'react';

class HomePageTwoUpPanel extends React.Component {
  render() {
    var widgetClasses = "col-sm-6 grid-panel";

    if (this.props.backgroundClass) {
      widgetClasses = widgetClasses + " " + this.props.backgroundClass;
    }

    if (this.props.centerVertical) {
      widgetClasses = widgetClasses + " programme";
    }

    var topContent,
      bottomContent,
      button,textContent;

    if (this.props.buttonText && this.props.buttonLink) {
      button =  (<div className={this.props.buttonClass}>
          <h6><b><a href={this.props.buttonLink}>{this.props.buttonText}</a></b></h6>
        </div>);
    }


    bottomContent = this.props.children;

    if (this.props.bodyText) {
      textContent = (<p className="semi-bold">{this.props.bodyText}</p>);
    }

    return (<div className={widgetClasses}>
      <div className="inner">
        {this.props.topImage}
        <h4><b>{this.props.titleText}</b></h4>
        {textContent}
        {button}
        {bottomContent}
      </div>
    </div>);
  }
};

export default HomePageTwoUpPanel;

