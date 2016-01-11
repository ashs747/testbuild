import userService from '../ajax/rest/user';

export default {

  getUserById(userId) {
    if (!userId) {
      throw new Error(
        `Invalid arguments: getUserById() requires a userId, ${arguments} given`
      );
    }
    return userService.get(userId, {
      embed: "labels"
    });
  },

  getUsersByCohort(labelId) {
    if (!labelId) {
      throw new Error(
        `Invalid arguments: getUsersByCohort() requires a labelId, ${arguments} given`
      );
    }
    return userService.get({
      embed: "labels,files",
      query: [{
        field: "labels.id",
        type: "eq",
        value: labelId
      }]
    });
  },
};
