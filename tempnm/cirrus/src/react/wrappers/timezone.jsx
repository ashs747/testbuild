import React from 'react';
import config from '../../configs/appConfig';
var eventEmitter = require('../../events/emitter');

eventEmitter.on('timezoneChange', function(timezone) {
  config.timezone = timezone;
});

export default {
  wrap(Component) {
    return class Wrapper extends React.Component {
      constructor() {
        super();
        this.onTimezoneChange = this.onTimezoneChange.bind(this);
        this.getWrappedComponent = this.getWrappedComponent.bind(this);
      }

      componentWillMount() {
        eventEmitter.on('timezoneChange', this.onTimezoneChange);
      }

      render() {
        return <Component ref="comp" {...this.props} {...this.state} />;
      }
      wrappedComponent() {
        return this.refs.wrapped;
      };
      componentWillUnmount() {
        eventEmitter.removeListener('timezoneChange', this.onTimezoneChange);
      }

      onTimezoneChange() {
        this.forceUpdate();
      }

      getWrappedComponent() {
        return this.refs['comp'];
      }
    };
  },

  current(moment) {
    return moment.tz(config.timezone);
  }
};
