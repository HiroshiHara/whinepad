import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Dialog from './Dialog';
import Excel from './Excel';
import Form from './Form';

class Whinepad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      addnew: false
    }
    this._preSearchData = null;
  }

  /**
   * 追加ダイアログを表示させるフラグを立てるメソッド。
   */
  _addNewDialog() {
    this._setState({
      addnew: true
    });
  }

  /**
   * 追加ダイアログのonActionプロパティにセットされる関数。
   * @param {string} action
   */
  _addNew(action) {
    if (action === 'dismiss') {
      this.setState({
        addnew: false
      });
      return;
    }
    let data = Array.from(this.state.data);
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
  _onExcelDataChange(data) {
    this.setState({
      data: data
    });
    this._commitToStrage(data);
  }

  /**
   * LocalStrageに表データをJSON形式で保存する。
   * @param {Array} data
   */
  _commitToStrage(data) {
    localStorage.setItem('data', JOSN.stringify(data));
  }

  /**
   * 検索窓にonFocusをしたときにコールされる。
   * _preSearchDataプロパティに現在の表データを保存する。
   */
  _startSearching() {
    this._preSearchData = this.state.data;
  }

  /**
   * 検索窓からonBlurしたときにコールされる。
   * dataプロパティの中身を_preSearchData(検索前の表データ)でもとに戻す。
   */
  _doneSearching() {
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
  _search(e) {
    const needle = e.target.value.toLowerCase();
    // 1. 検索窓がブランクなら、表データを_preSerchDataでもとに戻す。
    if (!needle) {
      this.setState({
        data: this._preSearchData
      });
      return;
    }
    // 2. schemaからitem.idの配列を生成。
    const fields = this.props.schema.map(item => item.id);
    // 3. _preSearchDataの各行の各カラムに対し、検索文字が含まれるものを検索。
    const searchdata = this._preSearchData.filter(row => {
      for (let f = 0; f < fields.length; f++) {
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

  render() {
    return (
      <div className="Whinepad">
        <div className="WhinepadToolbar">
          {/* 追加ダイアログ表示ボタンの描画 */}
          <div className="WhinepadToolbarAdd">
            <Button
              onClick={this._addNewDialog.bind(this)}
              className="WhinepadtoolbarAddButton"
            >
              + ADD
            </Button>
          </div>
          {/* 検索窓の描画 */}
          <div className="WhinepadToolbarSearch">
            <input
              placeholder="SEARCH..."
              onChange={this._search.bind(this)}
              onFocus={this._startSearching.bind(this)}
              onBlur={this._doneSearching.bind(this)}
            />
          </div>
        </div>
        {/* 表の描画 */}
        <div className="WhinepadDatagrid">
          <Excel
            schema={this.props.schema}
            initialData={this.props.data}
            onDataChange={this._onExcelDataChange.bind(this)}
          >
          </Excel>
        </div>
        {/* 追加ダイアログの描画 */}
        {
          this.state.addnew
            ? <Dialog
              modal={true}
              header="ADD ITEM"
              confirmLabel="ADD"
              onAction={this._addNew.bind(this)}
            >
              <Form
                ref="form"
                fields={this.props.schema}
              >
              </Form>
            </Dialog>
            : null
        }
      </div >
    );
  }

}

Whinepad.PropTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.object
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.object
  )
}