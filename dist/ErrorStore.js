'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _AppDispatcher = require('./AppDispatcher.js');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constants = require('./Constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var errorType = '';
var errorHasHappened = false;

var ERROR_EVENT = 'errorEvent';

var ErrorStore = function (_EventEmitter) {
	_inherits(ErrorStore, _EventEmitter);

	function ErrorStore() {
		_classCallCheck(this, ErrorStore);

		return _possibleConstructorReturn(this, (ErrorStore.__proto__ || Object.getPrototypeOf(ErrorStore)).apply(this, arguments));
	}

	_createClass(ErrorStore, [{
		key: 'getErrorState',
		value: function getErrorState() {
			return {
				errorType: errorType,
				errorHasHappened: errorHasHappened
			};
		}
	}, {
		key: 'isErrorAlertVisible',
		value: function isErrorAlertVisible() {
			return errorHasHappened;
		}
	}, {
		key: 'emitError',
		value: function emitError() {
			this.emit(ERROR_EVENT);
		}
	}, {
		key: 'addChangeListener',
		value: function addChangeListener(callback) {
			this.on(ERROR_EVENT, callback);
		}
	}, {
		key: 'removeChangeListener',
		value: function removeChangeListener(callback) {
			this.removeListener(ERROR_EVENT, callback);
		}
	}]);

	return ErrorStore;
}(_events.EventEmitter);

var _errorStore = new ErrorStore();
exports.default = _errorStore;


ErrorStore.dispatchToken = _AppDispatcher2.default.register(function (payload) {
	var action = payload.action;

	switch (action.actionType) {

		case _Constants.Actions.REQUEST_TIMEDOUT:
			errorHasHappened = true;
			errorType = _Constants.ErrorTypes.CONN_ERROR;
			_errorStore.emitError();
			break;

		case _Constants.Actions.REQUEST_FAILED:
			errorHasHappened = true;
			errorType = _Constants.ErrorTypes.FATAL_ERROR;
			_errorStore.emitError();
			break;

		case _Constants.Actions.REQUEST_SUCCEEDED:
			if (errorHasHappened) {
				errorHasHappened = false;
				errorType = '';
				_errorStore.emitError();
			}
			break;
	}

	return true; // No errors. Needed by promise in Dispatcher.
});