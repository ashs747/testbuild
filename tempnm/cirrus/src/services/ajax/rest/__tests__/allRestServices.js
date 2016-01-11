import utils from '../../../../testing/utils';
import BaseRestRequest from '../BaseRestRequest';

import activity from '../activity';
import activityEvent from '../activityEvent';
import activityFacilitator from '../activityFacilitator';
import activityUser from '../activityUser';
import application from '../application';
import award from '../award';
import contentTypeData from '../contentTypeData';
import eeUserMap from '../eeUserMap';
import event from '../event';
import eventAttendee from '../eventAttendee';
import eventDate from '../eventDate';
import feedback from '../feedback';
import feedbackTemplate from '../feedbackTemplate';
import feedbackTemplateQuestion from '../feedbackTemplateQuestion';
import file from '../file';
import label from '../label';
import log from '../log';
import message from '../message';
import module from '../module';
import organisation from '../organisation';
import permission from '../permission';
import property from '../property';
import role from '../role';
import survey from '../survey';
import surveyAnswer from '../surveyAnswer';
import surveyAutoSave from '../surveyAutoSave';
import surveyContext from '../surveyContext';
import surveyTemplate from '../surveyTemplate';
import surveyTemplateQuestion from '../surveyTemplateQuestion';
import surveyTemplateVersion from '../surveyTemplateVersion';
import surveyTest from '../surveyTest';
import surveyTestUser from '../surveyTestUser';
import surveyUser from '../surveyUser';
import todo from '../todo';
import user from '../user';
import version from '../version';

var services = [
  activity, activityEvent, activityFacilitator, activityFacilitator,
  activityUser, application, award, contentTypeData, eeUserMap, event,
  eventAttendee, eventDate, feedback, feedbackTemplate, feedbackTemplateQuestion,
  file, label, log, message, module, organisation, permission, property, role, survey,
  surveyAnswer, surveyAutoSave, surveyContext, surveyTemplate,
  surveyTemplateQuestion, surveyTemplateVersion, surveyTest, surveyTestUser,
  surveyUser, todo, user, version
];

describe('All REST services', function() {
  services.forEach(function(service, index) {
    it(`Service (@ index ${index}) has a required .name property set`, function() {
      utils.expect(service.name).to.not.be.empty;
      utils.expect(service.name).to.be.a('string');
    });

    it(`${service.name} service extends BaseRestRequest class`, function() {
      utils.expect(service).to.be.an.instanceof(BaseRestRequest);
    });
  });
});
