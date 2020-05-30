'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classification = require('./classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  id: 'name',
  label: 'Name',
  type: 'input',
  show: true,
  sample: '$2 chuck',
  align: 'left'
}, {
  id: 'year',
  label: 'Year',
  type: 'year',
  show: true,
  sample: 2015
}, {
  id: 'grape',
  label: 'Grape',
  type: 'suggest',
  options: _classification2.default.grapes,
  show: true,
  sample: 'Merlot',
  align: 'left'
}, {
  id: 'rating',
  label: 'Rating',
  type: 'rating',
  show: true,
  sample: 3
}, {
  id: 'comments',
  label: 'Comments',
  type: 'text',
  sample: 'Nice for the price'
}];