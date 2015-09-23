import React from 'react';
import MembersModuleWidget from '../modules/members/Widget.jsx';
import userManager from 'cirrus/services/managers/userManager';
import _ from 'underscore';

class ActionLearningZone extends React.Component {

  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    this.getCohortFromUserId(this.props.currentUser);
  }

  render() {
    return (
      <div className="action-learning-zone">
        <MembersModuleWidget users={this.state.users} title="Members" />
      </div>
    );
  }

  getCohortFromUserId(id) {
    userManager.getUserById(id).then((user) => {
      let label = _.findWhere(user.labels, {context: "soj-cohort"});
      if (label) {
        userManager.getUsersByCohort(label.id).then((result) => {
          this.setState({
            users: result._embedded.user
          });
        });
      }
    });
  }

}

export default ActionLearningZone;
