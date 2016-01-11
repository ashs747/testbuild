import request from '../../request';
export default new class {
  get(params) {
    return request.get('booking/get-slots-by-event', params);
  }
}();
