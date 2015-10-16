import React from 'react';
var $ = require('jquery');
window.jQuery = $;
require('bootstrap');

class Carousel extends React.Component {

  constructor() {
    super();
  }

  render() {
    var items = [];
    var navigation = [];

    for (var i in this.props.items) {
      let className = (i == 0) ? "active" : "";
      let item = this.props.items[i];
      items.push(
        <div key={i} className={`item text-center ${className}`}>
          <div className="icon">
            <i className={`fa fa-${item.icon}`} ></i>
          </div>
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2">
              <h3>{item.name}</h3>
              <p>{item.copy}</p>
            </div>
          </div>
        </div>
      );
      navigation.push(
        <li key={i} data-target="#welcome-carousel" data-slide-to={i} className={className}></li>
      );
    }

    return (
      <div id="welcome-carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          {items}
        </div>
        <a className="left carousel-control" href="#welcome-carousel" data-slide="prev"><img src="assets/img/back.png" /></a>
        <a className="right carousel-control" href="#welcome-carousel" data-slide="next"><img src="assets/img/next.png" /></a>
        <ol className="carousel-indicators">
          {navigation}
        </ol>
      </div>
    );
  }

}
Carousel.defaultProps = {
  items: []
};
Carousel.propTypes = {
  items: React.PropTypes.array.isRequired
};
export default Carousel;
