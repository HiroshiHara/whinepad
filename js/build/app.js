'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Whinepad = require('./components/Whinepad');

var _Whinepad2 = _interopRequireDefault(_Whinepad);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 表データ読み込み
var data = JSON.parse(localStorage.getItem('data'));

// localStrageに保存されているデータがない場合、サンプルデータを読み込む
if (!data) {
  data = {};
  _schema2.default.forEach(function (item) {
    data[item.id] = item.sample;
  });
  data = [data];
}

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    'div',
    { className: 'app-header' },
    _react2.default.createElement(_Logo2.default, null),
    ' Whinepad'
  ),
  _react2.default.createElement(_Whinepad2.default, { schema: _schema2.default, initialData: data })
), document.getElementById('pad'));