// the nginx elastic beanstalk servers alias one of these env JS files depenending
// on the APPLICATION_ENV passed through to them (which set in the AWS EB console).
// that's how we sitch config dependent on the environment
window.env = "staging";
