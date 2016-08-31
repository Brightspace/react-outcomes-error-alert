'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Constants = require('./Constants.js');

var _AppDispatcher = require('./AppDispatcher.js');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	handleServerTimeout: function handleServerTimeout(err) {
		_AppDispatcher2.default.handleMappingsBackgroundAction({
			actionType: _Constants.Actions.REQUEST_TIMEDOUT,
			error: err
		});
	},
	handleServerError: function handleServerError(err) {
		_AppDispatcher2.default.handleMappingsBackgroundAction({
			actionType: _Constants.Actions.REQUEST_FAILED,
			error: err
		});
	},
	hideErrorAlert: function hideErrorAlert() {
		_AppDispatcher2.default.handleMappingsBackgroundAction({
			actionType: _Constants.Actions.REQUEST_SUCCEEDED
		});
	}
};