'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flux = require('flux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppDispatcher = function (_Dispatcher) {
	_inherits(AppDispatcher, _Dispatcher);

	function AppDispatcher() {
		_classCallCheck(this, AppDispatcher);

		return _possibleConstructorReturn(this, (AppDispatcher.__proto__ || Object.getPrototypeOf(AppDispatcher)).apply(this, arguments));
	}

	_createClass(AppDispatcher, [{
		key: 'handleMappingsViewAction',
		value: function handleMappingsViewAction(action) {
			this.dispatch({
				source: 'MAPPINGS_VIEW_ACTION',
				action: action
			});
		}
	}, {
		key: 'handleMappingsBackgroundAction',
		value: function handleMappingsBackgroundAction(action) {
			this.dispatch({
				source: 'MAPPINGS_BACKGROUND_ACTION',
				action: action
			});
		}
	}]);

	return AppDispatcher;
}(_flux.Dispatcher);

var _AppDispatcher = new AppDispatcher();

exports.default = _AppDispatcher;