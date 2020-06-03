'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// if component has not state, you declare just only arrow-function.
var Actions = function Actions(props) {
  return _react2.default.createElement(
    'div',
    { className: 'Actions' },
    _react2.default.createElement(
      'span',
      {
        tabIndex: '0',
        className: 'ActionsInfo',
        title: 'Info',
        onClick: props.onAction.bind(null, 'info')
      },
      '\u2139'
    ),
    _react2.default.createElement(
      'span',
      {
        tabIndex: '0',
        className: 'ActionsEdit',
        title: 'Edit',
        onClick: props.onAction.bind(null, 'edit')
      },
      '\u2710'
    ),
    _react2.default.createElement(
      'span',
      {
        tabIndex: '0',
        className: 'ActionsDelete',
        title: 'Delete',
        onClick: props.onAction.bind(null, 'delete')
      },
      'x'
    )
  );
};

Actions.propTypes = {
  onAction: _propTypes2.default.func
};

Actions.defaultProps = {
  onAction: function onAction() {}
};

exports.default = Actions;