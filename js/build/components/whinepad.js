'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Excel = require('./Excel');

var _Excel2 = _interopRequireDefault(_Excel);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _CRUDStore = require('../flux/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _CRUDActions = require('../flux/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Whinepad = function (_Component) {
  _inherits(Whinepad, _Component);

  function Whinepad() {
    _classCallCheck(this, Whinepad);

    var _this = _possibleConstructorReturn(this, (Whinepad.__proto__ || Object.getPrototypeOf(Whinepad)).call(this));

    _this.state = {
      addnew: false,
      count: _CRUDStore2.default.getCount()
    };
    _CRUDStore2.default.addListener('change', function () {
      _this.setState({
        count: _CRUDStore2.default.getCount()
      });
    });
    return _this;
  }

  /**
   * Optimize rendering component.
   * It would be update when changed count for records.
   * @param {Object} newProps
   * @param {Object} newState
   */


  _createClass(Whinepad, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(newProps, newState) {
      return newState.addnew !== this.state.addnew || newState.count !== this.state.count;
    }

    /**
     * 追加ダイアログを表示させるフラグを立てるメソッド。
     */

  }, {
    key: '_addNewDialog',
    value: function _addNewDialog() {
      this.setState({
        addnew: true
      });
    }

    /**
     * 追加ダイアログのonActionプロパティにセットされる関数。
     * @param {string} action
     */

  }, {
    key: '_addNew',
    value: function _addNew(action) {
      if (action === 'dismiss') {
        this.setState({
          addnew: false
        });
        return;
      }
      if (action === 'confirm') {
        _CRUDActions2.default.create(this.refs.form.getData());
      }
      this.setState({
        addnew: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Whinepad' },
        _react2.default.createElement(
          'div',
          { className: 'WhinepadToolbar' },
          _react2.default.createElement(
            'div',
            { className: 'WhinepadToolbarAdd' },
            _react2.default.createElement(
              _Button2.default,
              {
                onClick: this._addNewDialog.bind(this),
                className: 'WhinepadtoolbarAddButton'
              },
              '+ ADD'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'WhinepadToolbarSearch' },
            _react2.default.createElement('input', {
              placeholder: 'Search by ' + this.state.count + ' entries...',
              onChange: _CRUDActions2.default.search.bind(_CRUDActions2.default),
              onFocus: _CRUDActions2.default.startSearching.bind(_CRUDActions2.default)
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'WhinepadDatagrid' },
          _react2.default.createElement(_Excel2.default, null)
        ),
        this.state.addnew ? _react2.default.createElement(
          _Dialog2.default,
          {
            modal: true,
            header: 'ADD ITEM',
            confirmLabel: 'ADD',
            onAction: this._addNew.bind(this)
          },
          _react2.default.createElement(_Form2.default, { ref: 'form' })
        ) : null
      );
    }
  }]);

  return Whinepad;
}(_react.Component);

exports.default = Whinepad;