'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FormInput = require('./components/FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Button = require('./components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Suggest = require('./components/Suggest');

var _Suggest2 = _interopRequireDefault(_Suggest);

var _Rating = require('./components/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  'div',
  { style: { padding: '20px' } },
  _react2.default.createElement(
    'h1',
    { style: { padding: '7px', marginBottom: '15px' } },
    'Test for Compoments'
  ),
  _react2.default.createElement(
    'div',
    { className: 'container', style: { padding: '10px', marginBottom: '32px', border: 'solid' } },
    _react2.default.createElement(
      'h2',
      null,
      '\u25A0Logo'
    ),
    _react2.default.createElement(
      'div',
      { style: { display: 'inline-block', background: 'purple' } },
      _react2.default.createElement(
        'div',
        null,
        '\u30FBJust Only print Logo image.',
        _react2.default.createElement(_Logo2.default, null)
      )
    )
  ),
  _react2.default.createElement(
    'div',
    { className: 'container', style: { padding: '10px', marginBottom: '32px', border: 'solid' } },
    _react2.default.createElement(
      'h2',
      null,
      '\u25A0Button'
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBApply onClick-attribute Button.',
      _react2.default.createElement(
        _Button2.default,
        { onClick: function onClick() {
            return alert('Clicked!');
          } },
        'Button'
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBApply href-attribute Button.',
      _react2.default.createElement(
        _Button2.default,
        { href: 'http://reactjs.com' },
        'Button'
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBApply className-attribute Button.',
      _react2.default.createElement(
        _Button2.default,
        { className: 'custom' },
        'Button'
      )
    )
  ),
  _react2.default.createElement(
    'div',
    { className: 'container', style: { padding: '10px', marginBottom: '32px', border: 'solid' } },
    _react2.default.createElement(
      'h2',
      null,
      '\u25A0Suggest'
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBPrint datalist element.',
      _react2.default.createElement(_Suggest2.default, { options: ['eenie', 'meenie', 'miney', 'mo'] })
    )
  ),
  _react2.default.createElement(
    'div',
    { className: 'container', style: { padding: '10px', marginBottom: '32px', border: 'solid' } },
    _react2.default.createElement(
      'h2',
      null,
      '\u25A0Rating'
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBNone default value.',
      _react2.default.createElement(_Rating2.default, null)
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBdefault value is 4.',
      _react2.default.createElement(_Rating2.default, { defaultValue: 4 })
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBMax value is 11.',
      _react2.default.createElement(_Rating2.default, { max: 11 })
    ),
    _react2.default.createElement(
      'div',
      null,
      '\u30FBRead only.',
      _react2.default.createElement(_Rating2.default, { readonly: true, defaultValue: 3 })
    )
  ),
  _react2.default.createElement(
    'div',
    { className: 'container', style: { padding: '10px', marginBottom: '32px', border: 'solid' } },
    _react2.default.createElement(
      'h2',
      null,
      '\u25A0FormInput'
    ),
    _react2.default.createElement(
      'table',
      null,
      _react2.default.createElement(
        'tbody',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            'A simple input field.'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_FormInput2.default, { type: 'input' })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            'Set default value.'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_FormInput2.default, { type: 'input', defaultValue: 'This is defalutvalue.' })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            'Input field for year.'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_FormInput2.default, { type: 'year' })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            'Input field for Rating.'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_FormInput2.default, { type: 'rating', defaultValue: 4 })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            'Input field for Suggest.'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_FormInput2.default, {
              type: 'suggest',
              options: ['red', 'blue', 'green'],
              defaultValue: 'green'
            })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            'A simple textarea'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_FormInput2.default, { type: 'text' })
          )
        )
      )
    )
  )
), document.getElementById('pad'));