'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Excel = require('./Excel');

var _Excel2 = _interopRequireDefault(_Excel);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Whinepad = function (_Component) {
  _inherits(Whinepad, _Component);

  function Whinepad(props) {
    _classCallCheck(this, Whinepad);

    var _this = _possibleConstructorReturn(this, (Whinepad.__proto__ || Object.getPrototypeOf(Whinepad)).call(this, props));

    _this.state = {
      data: props.initialData,
      addnew: false
    };
    _this._preSearchData = null;
    return _this;
  }

  /**
   * 追加ダイアログを表示させるフラグを立てるメソッド。
   */


  _createClass(Whinepad, [{
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
      var data = Array.from(this.state.data);
      data.unshift(this.refs.form.getData());
      this.setState({
        addnew: false,
        data: data
      });
      this._commitToStrage(data);
    }

    /**
     * 表データに更新があったときコールされる。
     * ストレージ保存メソッドをコールする。
     * @param {Array} data
     */

  }, {
    key: '_onExcelDataChange',
    value: function _onExcelDataChange(data) {
      this.setState({
        data: data
      });
      this._commitToStrage(data);
    }

    /**
     * LocalStrageに表データをJSON形式で保存する。
     * @param {Array} data
     */

  }, {
    key: '_commitToStrage',
    value: function _commitToStrage(data) {
      localStorage.setItem('data', JSON.stringify(data));
    }

    /**
     * 検索窓にonFocusをしたときにコールされる。
     * _preSearchDataプロパティに現在の表データを保存する。
     */

  }, {
    key: '_startSearching',
    value: function _startSearching() {
      this._preSearchData = this.state.data;
    }

    /**
     * 検索窓からonBlurしたときにコールされる。
     * dataプロパティの中身を_preSearchData(検索前の表データ)でもとに戻す。
     */

  }, {
    key: '_doneSearching',
    value: function _doneSearching() {
      this.setState({
        data: this._preSearchData
      });
    }

    /**
     * 検索窓でonChangeしたときにコールされる。
     * 1. 検索窓がブランクなら、表データを_preSearchDataでもとに戻す。
     * 2. schemaからitem.idの配列を生成。
     * 3. _preSearchDataの各行の各カラムに対し、検索文字が含まれるものを検索。
     * 4. 検索結果で構成された表データをdataにセット。
     * @param {Object} e event
     */

  }, {
    key: '_search',
    value: function _search(e) {
      var needle = e.target.value.toLowerCase();
      // 1. 検索窓がブランクなら、表データを_preSerchDataでもとに戻す。
      if (!needle) {
        this.setState({
          data: this._preSearchData
        });
        return;
      }
      // 2. schemaからitem.idの配列を生成。
      var fields = this.props.schema.map(function (item) {
        return item.id;
      });
      // 3. _preSearchDataの各行の各カラムに対し、検索文字が含まれるものを検索。
      var searchdata = this._preSearchData.filter(function (row) {
        for (var f = 0; f < fields.length; f++) {
          if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
            return true;
          }
        }
        return false;
      });
      // 4. 検索結果で構成された表データをdataにセット。
      this.setState({
        data: searchdata
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
              placeholder: 'SEARCH...',
              onChange: this._search.bind(this),
              onFocus: this._startSearching.bind(this),
              onBlur: this._doneSearching.bind(this)
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'WhinepadDatagrid' },
          _react2.default.createElement(_Excel2.default, {
            schema: this.props.schema,
            initialData: this.state.data,
            onDataChange: this._onExcelDataChange.bind(this)
          })
        ),
        this.state.addnew ? _react2.default.createElement(
          _Dialog2.default,
          {
            modal: true,
            header: 'ADD ITEM',
            confirmLabel: 'ADD',
            onAction: this._addNew.bind(this)
          },
          _react2.default.createElement(_Form2.default, {
            ref: 'form',
            fields: this.props.schema
          })
        ) : null
      );
    }
  }]);

  return Whinepad;
}(_react.Component);

Whinepad.propTypes = {
  schema: _propTypes2.default.arrayOf(_propTypes2.default.object),
  initialData: _propTypes2.default.arrayOf(_propTypes2.default.object)
};

exports.default = Whinepad;