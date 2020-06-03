'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Since React v15.5, PropTypes is separated from React.
// You should import PropTypes and Replace decralation of React.PropTypes to PropTypes.


var Excel = function (_Component) {
  _inherits(Excel, _Component);

  function Excel(props) {
    _classCallCheck(this, Excel);

    var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this, props));

    _this.state = {
      data: _this.props.initialData,
      // schema.id
      sortby: null,
      descending: false,
      // {row: rowidx, key: schema.id}
      edit: null,
      // {type: inputtype, idx: cellidx}
      dialog: null
    };
    return _this;
  }

  /**
   * 親コンポーネントからプロパティの変更があったとき、
   * Excelコンポーネントのプロパティを更新するメソッド
   * @param {Object} newProps new Properties
   */


  _createClass(Excel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        data: newProps.initialData
      });
    }

    /**
     * 親コンポーネントにdataの変更を通知し、ストレージ更新の
     * メソッドをコールする
     * @param {Array} data new Table data
     */

  }, {
    key: '_fireDataChange',
    value: function _fireDataChange(data) {
      this.props.onDataChange(data);
    }

    /**
     * 列ヘッダーをクリックしたときにコールされ、
     * 文字コード基準で昇降順で並び替える
     * @param {string} key clicked column id
     */

  }, {
    key: '_sort',
    value: function _sort(key) {
      var data = Array.from(this.state.data);
      // ソート基準が操作前後で同じであれば昇降順を逆転させる
      var descending = this.state.sortby === key && !this.state.descending;
      data.sort(function (a, b) {
        if (descending) {
          return a[key] < b[key] ? 1 : -1;
        } else {
          return a[key] > b[key] ? 1 : -1;
        }
      });
      // stateを更新
      this.setState({
        data: data,
        sortby: key,
        descending: descending
      });
      this._fireDataChange(data);
    }

    /**
     * 現在編集中のセルの情報を記録するメソッド
     * @param {Object} e doubleClicked cell info
     */

  }, {
    key: '_showEditor',
    value: function _showEditor(e) {
      this.setState({
        edit: {
          row: parseInt(e.target.dataset.row, 10),
          key: e.target.dataset.key
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
      var value = this.refs.input.getValue();
      var data = Array.from(this.state.data);
      data[this.state.edit.row][this.state.edit.key] = value;
      this.setState({
        edit: null,
        data: data
      });
      this._fireDataChange(data);
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
      var data = Array.from(this.state.data);
      // 配列dataからdialogの呼び出し元となった行を削除する
      data.splice(this.state.dialog.idx, 1);
      this.setState({
        dialog: null,
        data: data
      });
      this._fireDataChange(data);
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
      var data = Array.from(this.state.data);
      data[this.state.dialog.idx] = this.refs.form.getData();
      this.setState({
        dialog: null,
        data: data
      });
      this._fireDataChange(data);
    }

    /**
     * 削除ダイアログを表示する
     */

  }, {
    key: '_renderDeleteDialog',
    value: function _renderDeleteDialog() {
      var first = this.state.data[this.state.dialog.idx];
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
          fields: this.props.schema,
          initialData: this.state.data[this.state.dialog.idx],
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
            this.props.schema.map(function (item) {
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

                var schema = _this2.props.schema[idx];
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

Excel.propTypes = {
  schema: _propTypes2.default.arrayOf(_propTypes2.default.object),
  initialData: _propTypes2.default.arrayOf(_propTypes2.default.object),
  onDataChange: _propTypes2.default.func
};

exports.default = Excel;