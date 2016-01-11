import request from '../../request';

export default class {
  constructor(serviceName) {
    var urlify = serviceName.replace(/([A-Z])/, '-$1').toLowerCase();
    this.name = urlify;
  }

  get(idOrParams, ParamsForId) {
    return this.request('get', idOrParams, ParamsForId);
  }

  put(idOrParams, ParamsForId) {
    return this.request('put', idOrParams, ParamsForId);
  }

  post(params) {
    return this.request('post', params);
  }

  patch(idOrParams, ParamsForId) {
    return this.request('patch', idOrParams, ParamsForId);
  }

  del(id) {
    return this.request('del', id);
  }

  request(method, idOrParams, ParamsForId) {
    var id = null;
    var params = null;

    if (Number.isInteger(idOrParams)) {
      id = idOrParams;

      params = (ParamsForId) ? ParamsForId : null;
    } else {
      if (typeof idOrParams === 'object' && idOrParams.id) {
        id = idOrParams.id;
      }

      params = (idOrParams) ? idOrParams : null;
    }

    if (!id) {
      return request[method](`/${this.name}`, params).end();
    }
    return request[method](`/${this.name}/${id}`, params).end();
  }
}
