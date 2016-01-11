import moduleService from '../../services/ajax/rest/module';

export default {
  getlearningModulesByUser(userId, programId) {
    if (!userId || !programId) {
      throw new Error(
        `Invalid arguments: getlearningModulesByUser() requires a userId, and programId, ${arguments} given`
      );
    }
    var params = {
      embed: 'programme,activities.activityUsers.event.dates',
      query: [{
        field: 'activities.activityUsers.user',
        type: 'eq',
        value: userId
      }, {
        field: 'programme',
        type: 'eq',
        value: programId
      }]
    };
    return moduleService.get(params);
  }
};
