import React from 'react';
import BaseFormController from './FormControl';
class StarRating extends BaseFormController {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();
    this.setState({value: this.props.value});
  }

  render() {
    var stars = [1, 2, 3, 4, 5];
    var buttons = stars.map(i => {
      var className = parseInt(this.state.value) >= parseInt(i) ? 'star active' : 'star';
      return <input key={i} type="button" className={className} onClick={this.handleClick} value={i} />;
    });

    return (
      <div className={'class'} {...this.props}>
        <div className="star-rating">
          {buttons}
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.value != this.state.value && nextProps.value != undefined) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleClick(event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;

    if (target.value == this.state.value) {
      return;
    }

    this.setState({
      value: parseInt(target.value)
    });

    this.touched = true;
    this.onChange(event);
  }
}
StarRating.defaultProps = {value: 0};
export default StarRating;
