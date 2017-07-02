export default store => next => action => {
    if (action.constructor === Array) {
        action.map(action => store.dispatch(action));
    } else {
        return next(action);
    }
};