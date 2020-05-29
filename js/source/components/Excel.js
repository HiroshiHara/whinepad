import React, { Component } from 'react'
// Since React v15.5, PropTypes is separated from React.
// You should import PropTypes and Replace decralation of React.PropTypes to PropTypes.
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Form from './Form';
import FormInput from './FormInput';
import Rating from './Rating';
import Suggest from './Suggest';
import Actions from './Actions';
import Dialog from './Dialog';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.initialData,
      // schema.id
      sortby: null,
      descending: false,
      // {row: rowidx, cell: cellidx}
      edit: null,
      // {type: inputtype, idx: cellidx}
      dialog: null
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.initialData
    });
  }

  _fireDataChange(data) {
    this.props.onDataChange(data);
  }

  /* 表のソーティングを行う関数 */
  _sort(key) {
    let data = Array.from(this.state.data);
    // ソート基準が操作前後で同じであれば昇降順を逆転させる
    const descending = (this.state.sortby === key) && !this.state.descending;
    data.sort(function (a, b) {
      if (descending) {
        return a[column] < b[column] ? 1 : -1;
      } else {
        return a[colmun] > b[column] ? 1 : -1;
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

  _showEditer(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.dataset.key
      }
    });
  }

  /* セルの入力値で表を更新し、現在の編集セル情報をリセットする */
  _save(e) {
    // デフォルトのイベントをOFFにする
    e.preventDefault();
    const value = this.refs.input.getValue();
    let data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.key] = value;
    this.setState({
      edit: null,
      data: data
    });
    this._fireDataChange(data);
  }

  _actionClick(rowidx, action) {
    this.setState({
      dialog: {
        type: action,
        idx: rowidx
      }
    });
  }

  /* 削除ダイアログでの操作
  ・'Dismiss'をクリック：ダイアログを閉じる
  ・削除確認時：ダイアログ呼び出し元となった行を削除する
   */
  _deleteConfirmationClick(action) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    // 配列dataからdialogの呼び出し元となった行を削除する
    data.splice(this.state.dialog.idx, 1);
    this.setState({
      dialog: null,
      data: data
    });
    this._fireDataChange(data);
  }

  _closeDialog() {
    this.setState({
      dialog: null
    });
  }

  /* 保存ダイアログでの操作
  ・'Dismiss'クリック時：ダイアログを閉じる
  ・保存時：フォームの入力内容でダイアログ呼び出し元の行を上書きする
   */
  _saveDataDialog(action) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    data[this.state.dialog.idx] = this.refs.form.getData();
    this.setState({
      dialog: null,
      data: data
    });
    this._fireDataChange(data);
  }

  /* @render */
  render() {
    return (
      <div className="Excel">
        {this._renderTable()}
        {this._renderDialog()}
      </div>
    );
  }
}

export default Excel
