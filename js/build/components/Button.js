'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/*
  classnames library
  You can get classnames library by 'npm install --save-dev classnames'.
  It have only classNames([className]...) method.
  This method return multiple classNames.
  More detail @see https://www.npmjs.com/package/classnames
*/


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// functional component
// functional component is only return DOM elements.
// It has not state.
// argument 'props' has all properties from Caller.
function Button(props) {
  var cssclasses = (0, _classnames2.default)('Button', props.className);
  if (props.href) {
    return _react2.default.createElement('a', _extends({}, props, { className: cssclasses }));
  } else {
    return _react2.default.createElement('button', _extends({}, props, { className: cssclasses }));
  }
}

Button.propTypes = {
  href: _propTypes2.default.string
};

exports.default = Button;