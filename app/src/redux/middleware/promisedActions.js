/* Promise-handling-middleware */
function isPromise(obj) {
  return (obj instanceof Promise);
}

export default function promiseMiddleware() {
  return next => action => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    next({
      ...action,
      status: 'PENDING'
    });

    return action.payload.then(value => {
      next({
        ...action,
        payload: value,
        status: 'RESOLVED'
      });
    })
    .catch((err) => {
      next({
        ...action,
        payload: err,
        error: true,
        status: 'REJECTED'
      });
    });
  };
}

