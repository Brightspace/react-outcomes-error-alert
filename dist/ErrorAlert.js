'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ErrorStore = require('./ErrorStore.js');

var _ErrorStore2 = _interopRequireDefault(_ErrorStore);

var _Constants = require('./Constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorAlert = function (_React$Component) {
	_inherits(ErrorAlert, _React$Component);

	function ErrorAlert() {
		_classCallCheck(this, ErrorAlert);

		var _this = _possibleConstructorReturn(this, (ErrorAlert.__proto__ || Object.getPrototypeOf(ErrorAlert)).call(this));

		_this.state = _ErrorStore2.default.getErrorState();
		_this._onChange = _this._onChange.bind(_this);
		return _this;
	}

	_createClass(ErrorAlert, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			_ErrorStore2.default.addChangeListener(this._onChange);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_ErrorStore2.default.removeChangeListener(this._onChange);
		}
	}, {
		key: '_onChange',
		value: function _onChange() {
			this.setState(_ErrorStore2.default.getErrorState());
		}
	}, {
		key: '_buildSpinner',
		value: function _buildSpinner() {
			return _react2.default.createElement(
				'div',
				{ className: 'spinner-bg' },
				_react2.default.createElement('div', { className: 'slice1' }),
				_react2.default.createElement('div', { className: 'slice2' }),
				_react2.default.createElement('div', { className: 'slice3' }),
				_react2.default.createElement('div', { className: 'slice4' }),
				_react2.default.createElement('div', { className: 'slice5' })
			);
		}
	}, {
		key: 'render',
		value: function render() {

			if (!this.state.errorHasHappened) {
				return null;
			}

			if (this.state.errorType === _Constants.ErrorTypes.FATAL_ERROR) {
				return _react2.default.createElement(
					'div',
					{ className: 'fatal-error' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'b',
							null,
							'Oops!'
						),
						' We\'re having trouble connecting you. You might want to ',
						_react2.default.createElement(
							'a',
							{ className: 'refresh-link', onClick: this.props.refresh },
							'refresh the page'
						),
						', or try again later.'
					)
				);
			}

			return _react2.default.createElement(
				'div',
				{ className: 'conn-error' },
				_react2.default.createElement(
					'div',
					null,
					this._buildSpinner(),
					_react2.default.createElement(
						'span',
						{ className: 'server-error-text' },
						_react2.default.createElement(
							'b',
							null,
							'Oops!'
						),
						' We\'re having trouble connecting you. We\'ll keep trying while this page is open, or you can try again later'
					)
				)
			);
		}
	}]);

	return ErrorAlert;
}(_react2.default.Component);

ErrorAlert.propTypes = {
	refresh: _react2.default.PropTypes.func.isRequired
};

exports.default = ErrorAlert;