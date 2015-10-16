var WelcomeCarousel = React.createClass({
  render: function() {
    var items = "",
      navigation = "";

    if (this.props.items) {
      var i = 0;
      items = this.props.items.map(function(item) {
        var extraClass = (i == 0) ? "active" : "";
        i++;

        return <div key={i} className={ "item text-center " + extraClass}>
                 <img src={ "/assets/img/icons/carousel/"+item.properties.icon} alt="..." />
                 <div className="row">
                   <div className="col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2">
                     <h3>{item.name}</h3>
                     <p>{item.properties.carousel}</p>
                   </div>
                 </div>
               </div>
      }.bind(this));

      i = 0;
      navigation = this.props.items.map(function(item) {
        var className = (i == 0) ? "active" : "";
        i++;
        return <li key={i} data-target="#welcome-carousel" data-slide-to={i - 1} className={className}></li>
      });
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
});
