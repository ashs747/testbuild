import BaseRestRequest from './BaseRestRequest';

export default new class extends BaseRestRequest {
  constructor() {
    super('content-type-data');
  }
}();
