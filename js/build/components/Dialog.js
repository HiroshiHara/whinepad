'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
  }

  _createClass(Dialog, [{
    key: 'componentWillUnmount',


    // When Dialog was closed, remove gray style.
    value: function componentWillUnmount() {
      document.body.classList.remove('DialogModalOpen');
    }

    // When open Dialog on modal, add gray style to body.

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.modal) {
        document.body.classList.add('DialogModalOpen');
      }
      // When user keydown 'Esc', close Dialog.
      document.onkeydown = function (e) {
        if (e.keyCode === 27) {
          _this2.props.onAction('dismiss');
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)({
            'Dialog': true,
            'DialogModal': this.props.modal
          }),
          onClick: this.props.onAction.bind(this, 'dismiss') },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)({
              'DialogModalWrap': this.props.modal
            }) },
          _react2.default.createElement(
            'div',
            { className: 'DialogModalContainer',
              onClick: function onClick(e) {
                return e.stopPropagation();
              } },
            _react2.default.createElement(
              'div',
              { className: 'DialogHeader' },
              this.props.header
            ),
            _react2.default.createElement(
              'div',
              { className: 'DialogBody' },
              this.props.children
            ),
            _react2.default.createElement(
              'div',
              { className: 'DialogFooter' },
              this.props.hasCancel ? _react2.default.createElement(
                'span',
                {
                  className: 'DialogDismiss',
                  onClick: this.props.onAction.bind(this, 'dismiss') },
                'Cancel'
              ) : null,
              _react2.default.createElement(
                _Button2.default,
                { onClick: this.props.onAction.bind(this, this.props.hasCancel ? 'confirm' : 'dismiss') },
                this.props.confirmLabel
              )
            )
          )
        )
      );
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.defaultProps = {
  confirmLabel: 'OK',
  modal: false,
  onAction: function onAction() {},
  hasCancel: true };
exports.default = Dialog;