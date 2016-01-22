/* eslint-disable */
import Store from './redux/store';
var Request = function() {
  function get(url, token) {
    return makeRequest('GET', url, null, token);
  }
  
  function put(url, params, token) {
    return makeRequest('PUT', url, params, token);
  }

  function post(url, params, token) {
    return makeRequest('POST', url, params, token);
  }

  function del(url, token) {
    return makeRequest('DELETE', url, null, token);
  }

  function makeRequest(method, url, params, token) {

    token = token || (Store ? Store.getState().auth.access_token : null);

    return new Promise(function(resolve, reject) {
      var xhr = (function() { 
        if (window.XMLHttpRequest) {
          // Chrome, Firefox, IE7+, Opera, Safari
          return new XMLHttpRequest(); 
        } 
        // IE6
        try { 
          // The latest stable version. It has the best security, performance, 
          // reliability, and W3C conformance. Ships with Vista, and available 
          // with other OS's via downloads and updates. 
          return new ActiveXObject('MSXML2.XMLHTTP.6.0');
        } catch (e) { 
          try { 
            // The fallback.
            return new ActiveXObject('MSXML2.XMLHTTP.3.0');
          } catch (e) { 
            alert('This browser is not AJAX enabled.'); 
            return null;
          } 
        } 
      })();

      xhr.open(method, url);

      var strParams;

      if (params) {
        strParams = JSON.stringify(params);
        xhr.setRequestHeader('Content-type', 'application/json');
      }

      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      xhr.onload = function(e) {
        if (xhr.readyState == 4 && xhr.status === 200) {
          if (xhr.responseText) {
            let jsonOut = JSON.parse(xhr.responseText) || xhr.responseText;
            resolve(jsonOut);
          } else {
            resolve(xhr);
          }
        } else {
          reject(Error('XMLHttpRequest failed; error code:' + xhr.statusText));
        }
      },
      xhr.onerror = reject;
      xhr.send(strParams);
    });
  };

  return {
    get,
    post,
    put,
    del,
    request: makeRequest
  };
};

export default Request;
/* eslint-enable */