import learningJourneyManager from '../learningJourneyManager';
import {expect, sinon} from '../../../../testing/utils';

const moduleService = learningJourneyManager.__GetDependency__('moduleService');
// mocks

describe('learningJourneyManager', () => {

  beforeEach(function() {
    sinon.stub(moduleService, "get");
  });

  afterEach(function() {
    moduleService.get.restore();
  });

  describe('getLearningModulesByUser', () => {
    it(' passes through correct query parameters', () => {
      let expected = {
        embed: 'programme,activities.activityUsers.event.dates',
        query: [{
          field: 'activities.activityUsers.user',
          type: 'eq',
          value: 1
        }, {
          field: 'programme',
          type: 'eq',
          value: 1
        }]
      };
      learningJourneyManager.getlearningModulesByUser(1, 1);
      expect(moduleService.get.getCall(0).args[0]).to.have.all.keys(expected);
    });

    it('missing any argument should throw an Error', () => {
      function testNoArgs() {
        learningJourneyManager.getlearningModulesByUser();
      }

      function testOneArg() {
        learningJourneyManager.getlearningModulesByUser('one');
      }

      function testTwoArgs() {
        learningJourneyManager.getlearningModulesByUser(null, 'two');
      }

      expect(testNoArgs).to.throw(Error);
      expect(testOneArg).to.throw(Error);
      expect(testTwoArgs).to.throw(Error);
    });
  });

});
