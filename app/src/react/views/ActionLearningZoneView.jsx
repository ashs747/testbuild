import React from 'react';
import MembersModuleWidget from '../modules/members/Widget.jsx';
import userManager from 'cirrus/services/managers/userManager';
import _ from 'underscore';

class ActionLearningZoneView extends React.Component {

  constructor() {
    super();
    this.state = {
      users: []
    };
    this.getCohortFromLabelId = this.getCohortFromLabelId.bind(this);
  }

  componentWillMount() {
    let label = _.findWhere(this.props.user.labels, {context: "soj-cohort"});
    if (label) {
      this.getCohortFromLabelId(label.id);
    }
  }

  render() {
    return (
      <div className="action-learning-zone">
        <MembersModuleWidget users={this.state.users} title="Members" />
      </div>
    );
  }

  getCohortFromLabelId(id) {
    userManager.getUsersByCohort(id).then((result) => {
      this.setState({
        users: result._embedded.user
      });
    });
  }

}

export default ActionLearningZoneView;
