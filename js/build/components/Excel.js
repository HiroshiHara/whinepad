'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormInput = require('./FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _Rating = require('./Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Actions = require('./Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _CRUDStore = require('../flux/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _CRUDActions = require('../flux/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Excel = function (_Component) {
  _inherits(Excel, _Component);

  function Excel() {
    _classCallCheck(this, Excel);

    var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this));

    _this.schema = _CRUDStore2.default.getSchema();
    _this.state = {
      data: _CRUDStore2.default.getData(),
      // schema.id
      sortby: null,
      descending: false,
      // {row: rowidx, key: schema.id}
      edit: null,
      // {type: inputtype, idx: cellidx}
      dialog: null
    };
    _CRUDStore2.default.addListener('change', function () {
      _this.setState({
        data: _CRUDStore2.default.getData()
      });
    });
    return _this;
  }

  /**
   * 列ヘッダーをクリックしたときにコールされ、
   * 文字コード基準で昇降順で並び替える
   * @param {string} key clicked column id
   */


  _createClass(Excel, [{
    key: '_sort',
    value: function _sort(key) {
      // ソート基準が操作前後で同じであれば昇降順を逆転させる
      var descending = this.state.sortby === key && !this.state.descending;
      _CRUDActions2.default.sort(key, descending);
      // stateを更新
      this.setState({
        sortby: key,
        descending: descending
      });
    }

    /**
     * 現在編集中のセルの情報を記録するメソッド
     * @param {Event} e doubleClicked cell info
     */

  }, {
    key: '_showEditor',
    value: function _showEditor(e) {
      var target = e.target;
      this.setState({
        edit: {
          row: parseInt(target.dataset.row, 10),
          key: target.dataset.key
        }
      });
    }

    /**
     * セルの入力値で表を更新し、現在の編集セル情報をリセットする
     * @param {Object} e edited cell info
     */

  }, {
    key: '_save',
    value: function _save(e) {
      // デフォルトのイベントをOFFにする
      e.preventDefault();
      (0, _invariant2.default)(this.state.edit, 'Invalid this.state.edit.');
      _CRUDActions2.default.updateField(this.state.edit.row, this.state.edit.key, this.refs.input.getValue());
      this.setState({
        edit: null
      });
    }

    /**
     * Actionsボタンのどれかがクリックされたとき、
     * dialogプロパティをセットする。
     * @param {Number} rowidx アクション実行元の行番号
     * @param {string} action どのActionsボタンかを判断する文字列(info, edit, delete)
     */

  }, {
    key: '_actionClick',
    value: function _actionClick(rowidx, action) {
      this.setState({
        dialog: {
          type: action,
          idx: rowidx
        }
      });
    }

    /**
     * 削除ダイアログでボタンを押下したときにコールされる
     * @param {string} action
     */

  }, {
    key: '_deleteConfirmationClick',
    value: function _deleteConfirmationClick(action) {
      if (action === 'dismiss') {
        this._closeDialog();
        return;
      }
      var idx = this.state.dialog ? this.state.dialog.idx : null;
      (0, _invariant2.default)(typeof idx === 'number', 'Invalid this.state.dialog');
      _CRUDActions2.default.delete(idx);
      this.setState({
        dialog: null
      });
    }
  }, {
    key: '_closeDialog',
    value: function _closeDialog() {
      this.setState({
        dialog: null
      });
    }

    /**
     * 編集ダイアログでボタンを押下したときにしたときにコールされる
     * @param {string} action
     */

  }, {
    key: '_saveDataDialog',
    value: function _saveDataDialog(action) {
      if (action === 'dismiss') {
        this._closeDialog();
        return;
      }
      var idx = this.state.dialog ? this.state.dialog.idx : null;
      (0, _invariant2.default)(typeof idx === 'number', 'Invalid this.state.dialog');
      _CRUDActions2.default.updateRecord(idx, this.refs.form.getData());
      this.setState({
        dialog: null
      });
    }

    /**
     * 削除ダイアログを表示する
     */

  }, {
    key: '_renderDeleteDialog',
    value: function _renderDeleteDialog() {
      var idx = this.state.dialog ? this.state.dialog.idx : null;
      (0, _invariant2.default)(typeof idx === 'number', 'Invalid this.state.dialog.');
      var first = this.state.data[idx];
      var nameguess = first[Object.keys(first)[0]];
      return _react2.default.createElement(
        _Dialog2.default,
        {
          modal: true,
          header: 'Confirmation Delete',
          confirmLabel: 'Delete',
          onAction: this._deleteConfirmationClick.bind(this)
        },
        'Are you sure you want to delete "' + nameguess + '"?'
      );
    }

    /**
     * 編集/照会ダイアログを表示する
     * @param {boolean} readonly 読み取り専用かどうか
     */

  }, {
    key: '_renderFormDialog',
    value: function _renderFormDialog(readonly) {
      var idx = this.state.dialog ? this.state.dialog.idx : null;
      (0, _invariant2.default)(typeof idx === 'number', 'Invalid this.state.dialog.');
      return _react2.default.createElement(
        _Dialog2.default,
        {
          modal: true,
          header: readonly ? 'Information' : 'Edit item',
          confirmLabel: readonly ? 'OK' : 'SAVE',
          hasCancel: !readonly,
          onAction: this._saveDataDialog.bind(this)
        },
        _react2.default.createElement(_Form2.default, {
          recordId: idx,
          readonly: readonly,
          ref: 'form'
        })
      );
    }

    /**
     * 各種ダイアログ表示メソッドをコールする
     */

  }, {
    key: '_renderDialog',
    value: function _renderDialog() {
      if (!this.state.dialog) {
        return null;
      }
      var dialogType = this.state.dialog.type;
      if (dialogType === 'delete') {
        return this._renderDeleteDialog();
      }
      if (dialogType === 'info') {
        return this._renderFormDialog(true);
      }
      if (dialogType === 'edit') {
        return this._renderFormDialog();
      }
      throw Error('Invalid Dialog: ' + this.state.dialog.type);
    }

    /**
     * 表を描画するrender()
     */

  }, {
    key: '_renderTable',
    value: function _renderTable() {
      var _this2 = this;

      return _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            this.schema.map(function (item) {
              // schemaのshowプロパティがtrueでないなら表示しない
              if (!item.show) {
                return null;
              }
              // thをonClick時にsortbyが決定するので、そのカラムに昇降順を示す記号をつける
              var title = item.label;
              if (_this2.state.sortby === item.id) {
                title += _this2.state.descending ? '\u2191' : '\u2193';
              }
              return _react2.default.createElement(
                'th',
                {
                  className: 'schema-' + item.id,
                  key: item.id,
                  onClick: _this2._sort.bind(_this2, item.id)
                },
                title
              );
            }, this),
            _react2.default.createElement(
              'th',
              { className: 'ExcelNotSortable' },
              'Actions'
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          { onDoubleClick: this._showEditor.bind(this) },
          this.state.data.map(function (row, rowidx) {
            return _react2.default.createElement(
              'tr',
              { key: rowidx },
              Object.keys(row).map(function (cell, idx) {
                var _classNames;

                var schema = _this2.schema[idx];
                if (!schema || !schema.show) {
                  return null;
                }
                var isRating = schema.type === 'rating';
                var edit = _this2.state.edit;
                var content = row[cell];
                // 1.Ratingでないセル && 編集中セル情報あり
                //   編集中セルがこのセル自身である時
                if (!isRating && edit) {
                  if (edit.row === rowidx && edit.key === schema.id) {
                    // contentの内容を編集用セルに変更
                    content = _react2.default.createElement(
                      'form',
                      { onSubmit: _this2._save.bind(_this2) },
                      _react2.default.createElement(_FormInput2.default, _extends({
                        ref: 'input'
                      }, schema, {
                        defaultValue: content
                      }))
                    );
                  }
                  // 2.Ratingであるとき
                } else if (isRating) {
                  content = _react2.default.createElement(_Rating2.default, { readonly: true,
                    defaultValue: Number(content) });
                }
                return _react2.default.createElement(
                  'td',
                  {
                    className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, 'schema-' + schema.id, true), _defineProperty(_classNames, 'ExcelEditable', !isRating), _defineProperty(_classNames, 'ExcelDataLeft', schema.align === 'left'), _defineProperty(_classNames, 'ExcelDataRight', schema.align === 'right'), _defineProperty(_classNames, 'ExcelDataCenter', schema.align !== 'left' && schema.align !== 'right'), _classNames)),
                    key: idx,
                    'data-row': rowidx,
                    'data-key': schema.id
                  },
                  content
                );
              }, _this2),
              _react2.default.createElement(
                'td',
                { className: 'ExcelDataCenter' },
                _react2.default.createElement(_Actions2.default, { onAction: _this2._actionClick.bind(_this2, rowidx) })
              )
            );
          }, this)
        )
      );
    }

    /**
     * 表、ダイアログのrender()をコールする
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Excel' },
        this._renderTable(),
        this._renderDialog()
      );
    }
  }]);

  return Excel;
}(_react.Component);

exports.default = Excel;