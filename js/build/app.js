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
var localdata = localStorage.getItem('data');
var data = void 0;
if (localdata) {
  data = JSON.parse(localdata);
} else {
  // localStrageに保存されているデータがない場合、サンプルデータを読み込む
  data = [{}];
  _schema2.default.forEach(function (item) {
    data[0][item.id] = item.sample;
  });
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