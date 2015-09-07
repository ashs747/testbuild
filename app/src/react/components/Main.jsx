import React from 'react';

class Main extends React.Component {
  constructor() {
    super();
    this.tick = this.tick.bind(this);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  render() {
    return (
      <div>
        Hello World! <br />
        Seconds since app opened: {this.state.seconds}
      </div>
    );
  }

  tick() {
    this.setState({
      seconds: this.state.seconds + 1
    });
  }
}

export default Main;
