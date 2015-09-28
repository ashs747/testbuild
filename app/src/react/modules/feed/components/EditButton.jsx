import React from 'react';

export default class EditButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    let iconClass = this.props.type;

    return (
    <a href="#" className={iconClass + '-icon'} onClick={this.props.clickAction}> </a>
    )

  }


}
