'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Since React v15.5, PropTypes is separated from React.
// You should import PropTypes and Replace decralation of React.PropTypes to PropTypes.


var Excel = function (_React$Component) {
  _inherits(Excel, _React$Component);

  function Excel(props) {
    _classCallCheck(this, Excel);

    var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this, props));

    _this.headers = _this.props.headers;
    _this.initialData = _this.props.initialData;
    _this._preSearchData = null;
    _this._log = [];
    _this._logIdx = 0;
    // instead getInitialState()
    _this.state = {
      // 表の初期データ
      data: _this.initialData,
      // 並べ替えの基準となっている列のインデックス
      sortby: null,
      // 昇順か降順かを表す真偽値
      descending: false,
      // row: 行番号, cell: 列番号
      edit: null,
      // 検索機能のON/OFFを管理する真偽値
      search: false
    };
    _this._toggleSearch = _this._toggleSearch.bind(_this);
    _this._sort = _this._sort.bind(_this);
    _this._showEditor = _this._showEditor.bind(_this);
    _this._logSetState = _this._logSetState.bind(_this);
    _this._search = _this._search.bind(_this);
    _this._save = _this._save.bind(_this);
    return _this;
  }
  // ===============リプレイ機能のためのメソッド群===============


  _createClass(Excel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.onkeydown = function (e) {
        // Alt + Shift + Rでリプレイ実行
        if (e.altKey && e.shiftKey && e.keyCode === 82) {
          this._reply();
        }
        // Alt + z でアンドゥ
        if (e.altKey && e.keyCode === 90) {
          this._undo();
        }
        // Alt + Shift + zでリドゥ
        if (e.altKey && e.shiftKey && e.keyCode === 88) {
          this._redo();
        }
      }.bind(this);
    }
  }, {
    key: '_reply',
    value: function _reply() {
      if (this._log.length === 0) {
        console.warn('stateが記録されていません');
        return;
      }
      var idx = -1;
      var interval = setInterval(function () {
        idx++;
        if (idx === this._log.length - 1) {
          clearInterval(interval);
        }
        this.setState(this._log[idx]);
      }.bind(this), 1000);
    }
  }, {
    key: '_undo',
    value: function _undo() {
      if (this._logIdx === 0) {
        console.warn('これより前のstateはありません');
        return;
      }
      this.setState(this._log[this._logIdx - 1]);
      this._logIdx--;
    }
  }, {
    key: '_redo',
    value: function _redo() {
      if (this._log.length <= this._logIdx) {
        console.warn('これより後のstateはありません');
        return;
      }
      this._logIdx++;
      this.setState(this._log[this._logIdx - 1]);
    }
    // ===============ヘッダーをクリックしてソートするメソッド===============

  }, {
    key: '_sort',
    value: function _sort(e) {
      console.log('----------- start _sort()----------------');
      // tableに対してcellIndexプロパティを指定すると、そのth(td)の行内における添字を取得できる(ReactではなくDOMの機能)
      var column = e.target.cellIndex;
      // 昇順か降順かを決定する
      var descending = false;
      // 1.クリックされた列が現在の基準の列と同じ
      if (column === this.state.sortby) {
        // 2.現在昇順でソートされている
        if (!this.state.descending) {
          // 降順に変更する
          descending = true;
        }
      }
      // 並べ替えの元となるデータを現在のstateからコピーする(Array.from(配列)で配列のシャローコピーを取得)
      var data = Array.from(this.state.data);
      // 配列のコピーをArray.sort()で行う
      data.sort(function (a, b) {
        // 文字コードが若いほうが先にくるソート
        return descending ? a[column] > b[column] ? 1 : -1 : a[column] < b[column] ? 1 : -1;
      });
      // ソートしたdataを_logSetStateで更新する
      this._logSetState({
        data: data,
        sortby: column,
        descending: descending
      });
      console.log('----------- end   _sort()----------------');
    }
    // ===============セルをダブルクリックしたとき、そのセルの位置を記憶するメソッド===============

  }, {
    key: '_showEditor',
    value: function _showEditor(e) {
      console.log('----------- start _showEditor()----------------');
      // stateにeditプロパティを追加する
      this._logSetState({
        edit: {
          // 各行にdata-*(カスタムデータ属性)を追加し、datasetから行番号を取得できるようにする
          row: parseInt(e.target.dataset.row, 10),
          cell: e.target.cellIndex
        }
      });
      console.log('----------- end   _showEditor()----------------');
    }
    // ===============セルの入力フィールドでEnterしたときのメソッド===============

  }, {
    key: '_save',
    value: function _save(e) {
      console.log('----------- start _save()----------------');
      // formのsubmit処理(デフォルトで発生する)を無効化する
      e.preventDefault();
      // form要素の子(input)を取得する
      var input = e.target.firstChild;
      // 現在の表データのシャローコピーを取得する
      var data = Array.from(this.state.data);
      data[this.state.edit.row][this.state.edit.cell] = input.value;
      // stateを更新する
      this._logSetState({
        data: data,
        // イベントが終わるので保持していたセルの情報をクリアする
        edit: null
      });
      console.log('----------- end   _save()----------------');
    }
    // ===============検索ボタンの押下時に検索機能のON/OFFを切り替えるメソッド===============

  }, {
    key: '_toggleSearch',
    value: function _toggleSearch() {
      console.log('----------- start _toggleSearch()----------------');
      if (this.state.search) {
        // 検索機能をOFFにするとき、表データを保存しておいたものに戻す
        this._logSetState({
          search: false,
          data: this._preSearchData
        });
        this._preSearchData = null;
      } else {
        // 検索機能をONにするとき、表データを保存しておく
        this._preSearchData = this.state.data;
        this._logSetState({
          search: true
        });
      }
      console.log('----------- end   _toggleSearch()----------------');
    }
    // ===============検索を実行するメソッド===============

  }, {
    key: '_search',
    value: function _search(e) {
      console.log('----------- start _search()----------------');
      // 入力文字列を取得
      var needle = e.target.value.toLowerCase();
      // 検索文字列が空文字だったとき
      if (!needle) {
        // 表データをもとに戻す
        this._logSetState({ data: this._preSearchData });
        return;
      }
      // 入力欄の列インデックスを取得
      var idx = e.target.dataset.idx;
      // 保存してある元データの参照から検索結果を取得
      var searchdata = this._preSearchData.filter(function (row) {
        // 行データを文字列にしてその中に検索文字列が見つかるか否か
        return row[idx].toString().toLowerCase().indexOf(needle) > -1;
      });
      this._logSetState({ data: searchdata });
      console.log('----------- end   _search()----------------');
    }
    // ===============setState実行とともにStateを記録するメソッド===============

  }, {
    key: '_logSetState',
    value: function _logSetState(newState) {
      this._log.push(JSON.parse(JSON.stringify(this._log.length === 0 ? this.state : newState)));
      this.setState(newState);
      this._logIdx++;
    }
    // ===============json, csvのダウンロードメソッド===============

  }, {
    key: '_download',
    value: function _download(format, ev) {
      var outputdata = null;
      if (format === 'json') {
        outputdata = JSON.stringify(this.state.data);
      } else {
        outputdata = this.state.data.reduce(function (result, row) {
          return result + row.reduce(function (rowresult, cell, idx) {
            return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (idx < row.length - 1 ? ',' : '');
          }, '') + "\n";
        }, '');
      }
      var URL = window.URL || window.webkitURL;
      var blob = new Blob([outputdata], { type: 'text/' + format });
      ev.target.href = URL.createObjectURL(blob);
      ev.target.download = 'data.' + format;
    }
    // ===============検索機能がONのときに表に検索バーを描画するrender===============

  }, {
    key: '_renderSearch',
    value: function _renderSearch() {
      if (!this.state.search) {
        return null;
      }
      return _react2.default.createElement(
        'tr',
        { onChange: this._search },
        this.props.headers.map(function (_ignore, idx) {
          return _react2.default.createElement(
            'td',
            { key: idx },
            _react2.default.createElement('input', { type: 'text', 'data-idx': idx })
          );
        })
      );
    }
    // ===============検索ボタンを描画するrender===============

  }, {
    key: '_renderToolbar',
    value: function _renderToolbar() {
      return _react2.default.createElement(
        'div',
        { className: 'toolbar' },
        _react2.default.createElement(
          'button',
          { onClick: this._toggleSearch },
          '\u691C\u7D22'
        ),
        _react2.default.createElement(
          'a',
          { href: 'data.json', onClick: this._download.bind(this, 'json') },
          'JSON\u3067\u4FDD\u5B58'
        ),
        _react2.default.createElement(
          'a',
          { href: 'data.csv', onClick: this._download.bind(this, 'csv') },
          'CSV\u3067\u4FDD\u5B58'
        )
      );
    }
    // ===============表を描画するrender===============

  }, {
    key: '_renderTable',
    value: function _renderTable() {
      return _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'thead',
          { onClick: this._sort },
          _react2.default.createElement(
            'tr',
            null,
            this.props.headers.map(function (title, idx) {
              if (this.state.sortby === idx) {
                title += this.state.descending ? '↑' : '↓';
              }
              return _react2.default.createElement(
                'th',
                { key: idx },
                title
              );
            }, this)
          )
        ),
        _react2.default.createElement(
          'tbody',
          { onDoubleClick: this._showEditor },
          this._renderSearch(),
          this.state.data.map(function (row, rowidx) {
            return _react2.default.createElement(
              'tr',
              { key: rowidx },
              console.log(row),
              row.map(function (cell, idx) {
                var content = cell;
                var edit = this.state.edit;
                if (edit) {
                  if (edit.row === rowidx && edit.cell === idx) {
                    content = _react2.default.createElement(
                      'form',
                      { onSubmit: this._save },
                      _react2.default.createElement('input', { type: 'text', defaultValue: content })
                    );
                  }
                }
                return _react2.default.createElement(
                  'td',
                  { key: idx, 'data-row': rowidx },
                  content
                );
              }, this)
            );
          }, this)
        )
      );
    }
    // ===============操作方法を表示するrender===============

  }, {
    key: '_renderDescription',
    value: function _renderDescription() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          '\u30FBAlt + Shift + Z ... \u64CD\u4F5C\u3092\u518D\u751F'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u30FBAlt + Z         ... \u30A2\u30F3\u30C9\u30A5'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u30FBAlt + Shift + X ... \u30EA\u30C9\u30A5'
        )
      );
    }
    // ===============メインのrender===============

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Excel' },
        this._renderToolbar(),
        this._renderTable()
      );
    }
  }]);

  return Excel;
}(_react2.default.Component);

exports.default = Excel;