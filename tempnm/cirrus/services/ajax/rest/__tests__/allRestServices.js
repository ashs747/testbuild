'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../../testing/utils');

var _testingUtils2 = _interopRequireDefault(_testingUtils);

var _BaseRestRequest = require('../BaseRestRequest');

var _BaseRestRequest2 = _interopRequireDefault(_BaseRestRequest);

var _activity = require('../activity');

var _activity2 = _interopRequireDefault(_activity);

var _activityEvent = require('../activityEvent');

var _activityEvent2 = _interopRequireDefault(_activityEvent);

var _activityFacilitator = require('../activityFacilitator');

var _activityFacilitator2 = _interopRequireDefault(_activityFacilitator);

var _activityUser = require('../activityUser');

var _activityUser2 = _interopRequireDefault(_activityUser);

var _application = require('../application');

var _application2 = _interopRequireDefault(_application);

var _award = require('../award');

var _award2 = _interopRequireDefault(_award);

var _contentTypeData = require('../contentTypeData');

var _contentTypeData2 = _interopRequireDefault(_contentTypeData);

var _eeUserMap = require('../eeUserMap');

var _eeUserMap2 = _interopRequireDefault(_eeUserMap);

var _event = require('../event');

var _event2 = _interopRequireDefault(_event);

var _eventAttendee = require('../eventAttendee');

var _eventAttendee2 = _interopRequireDefault(_eventAttendee);

var _eventDate = require('../eventDate');

var _eventDate2 = _interopRequireDefault(_eventDate);

var _feedback = require('../feedback');

var _feedback2 = _interopRequireDefault(_feedback);

var _feedbackTemplate = require('../feedbackTemplate');

var _feedbackTemplate2 = _interopRequireDefault(_feedbackTemplate);

var _feedbackTemplateQuestion = require('../feedbackTemplateQuestion');

var _feedbackTemplateQuestion2 = _interopRequireDefault(_feedbackTemplateQuestion);

var _file = require('../file');

var _file2 = _interopRequireDefault(_file);

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

var _message = require('../message');

var _message2 = _interopRequireDefault(_message);

var _module2 = require('../module');

var _module3 = _interopRequireDefault(_module2);

var _organisation = require('../organisation');

var _organisation2 = _interopRequireDefault(_organisation);

var _permission = require('../permission');

var _permission2 = _interopRequireDefault(_permission);

var _property = require('../property');

var _property2 = _interopRequireDefault(_property);

var _role = require('../role');

var _role2 = _interopRequireDefault(_role);

var _survey = require('../survey');

var _survey2 = _interopRequireDefault(_survey);

var _surveyAnswer = require('../surveyAnswer');

var _surveyAnswer2 = _interopRequireDefault(_surveyAnswer);

var _surveyAutoSave = require('../surveyAutoSave');

var _surveyAutoSave2 = _interopRequireDefault(_surveyAutoSave);

var _surveyContext = require('../surveyContext');

var _surveyContext2 = _interopRequireDefault(_surveyContext);

var _surveyTemplate = require('../surveyTemplate');

var _surveyTemplate2 = _interopRequireDefault(_surveyTemplate);

var _surveyTemplateQuestion = require('../surveyTemplateQuestion');

var _surveyTemplateQuestion2 = _interopRequireDefault(_surveyTemplateQuestion);

var _surveyTemplateVersion = require('../surveyTemplateVersion');

var _surveyTemplateVersion2 = _interopRequireDefault(_surveyTemplateVersion);

var _surveyTest = require('../surveyTest');

var _surveyTest2 = _interopRequireDefault(_surveyTest);

var _surveyTestUser = require('../surveyTestUser');

var _surveyTestUser2 = _interopRequireDefault(_surveyTestUser);

var _surveyUser = require('../surveyUser');

var _surveyUser2 = _interopRequireDefault(_surveyUser);

var _todo = require('../todo');

var _todo2 = _interopRequireDefault(_todo);

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

var _version = require('../version');

var _version2 = _interopRequireDefault(_version);

var services = [_activity2['default'], _activityEvent2['default'], _activityFacilitator2['default'], _activityFacilitator2['default'], _activityUser2['default'], _application2['default'], _award2['default'], _contentTypeData2['default'], _eeUserMap2['default'], _event2['default'], _eventAttendee2['default'], _eventDate2['default'], _feedback2['default'], _feedbackTemplate2['default'], _feedbackTemplateQuestion2['default'], _file2['default'], _label2['default'], _log2['default'], _message2['default'], _module3['default'], _organisation2['default'], _permission2['default'], _property2['default'], _role2['default'], _survey2['default'], _surveyAnswer2['default'], _surveyAutoSave2['default'], _surveyContext2['default'], _surveyTemplate2['default'], _surveyTemplateQuestion2['default'], _surveyTemplateVersion2['default'], _surveyTest2['default'], _surveyTestUser2['default'], _surveyUser2['default'], _todo2['default'], _user2['default'], _version2['default']];

describe('All REST services', function () {
  services.forEach(function (service, index) {
    it('Service (@ index ' + index + ') has a required .name property set', function () {
      _testingUtils2['default'].expect(service.name).to.not.be.empty;
      _testingUtils2['default'].expect(service.name).to.be.a('string');
    });

    it(service.name + ' service extends BaseRestRequest class', function () {
      _testingUtils2['default'].expect(service).to.be.an['instanceof'](_BaseRestRequest2['default']);
    });
  });
});