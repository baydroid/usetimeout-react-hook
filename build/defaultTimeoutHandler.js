/**
 * defaultTimeoutHandler implements the TimeoutHandler interface with the usual timer
 * functions available in browsers and in React Native, i.e. `setTimeout` and `clearTimeout`.
 */
export var defaultTimeoutHandler = {
    setTimeout: function (fn, timeout) { return window.setTimeout(fn, timeout); },
    clearTimeout: function (timeout) { window.clearTimeout(timeout); },
};
