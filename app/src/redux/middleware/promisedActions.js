/* Promise-handling-middleware */
function isPromise(obj) {
  return (obj && (obj instanceof Promise || typeof(obj.then) === 'function'));
};

function promiseMiddleware() {
  return next => action => {
    if (action && !action.payload || !isPromise(action.payload)) {
      return next(action);
    }

    try {
      next({
        ...action,
        status: 'PENDING'
      });

      return action.payload.then((value) => {
        next({
          ...action,
          payload: value,
          status: 'RESOLVED'
        });
      }, (err) => {
        next({
          ...action,
          payload: err,
          error: true,
          status: 'REJECTED'
        });
      });
    } catch (e) {
      alert(e);
    }
  };
}

export default promiseMiddleware;