import React, { Component } from 'react'
// Since React v15.5, PropTypes is separated from React.
// You should import PropTypes and Replace decralation of React.PropTypes to PropTypes.
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Form from './Form';
import FormInput from './FormInput';
import Rating from './Rating';
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
      // {row: rowidx, key: schema.id}
      edit: null,
      // {type: inputtype, idx: cellidx}
      dialog: null
    }
  }

  /**
   * 親コンポーネントからプロパティの変更があったとき、
   * Excelコンポーネントのプロパティを更新するメソッド
   * @param {Object} newProps new Properties
   */
  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.initialData
    });
  }

  /**
   * 親コンポーネントにdataの変更を通知し、ストレージ更新の
   * メソッドをコールする
   * @param {Array} data new Table data
   */
  _fireDataChange(data) {
    this.props.onDataChange(data);
  }

  /**
   * 列ヘッダーをクリックしたときにコールされ、
   * 文字コード基準で昇降順で並び替える
   * @param {string} key clicked column id
   */
  _sort(key) {
    let data = Array.from(this.state.data);
    // ソート基準が操作前後で同じであれば昇降順を逆転させる
    const descending = (this.state.sortby === key) && !this.state.descending;
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
  _showEditor(e) {
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

  /**
   * Actionsボタンのどれかがクリックされたとき、
   * dialogプロパティをセットする。
   * @param {Number} rowidx アクション実行元の行番号
   * @param {string} action どのActionsボタンかを判断する文字列(info, edit, delete)
   */
  _actionClick(rowidx, action) {
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

  /**
   * 編集ダイアログでボタンを押下したときにしたときにコールされる
   * @param {string} action
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

  /**
   * 削除ダイアログを表示する
   */
  _renderDeleteDialog() {
    const first = this.state.data[this.state.dialog.idx];
    const nameguess = first[Object.keys(first)[0]];
    return (
      <Dialog
        modal={true}
        header="Confirmation Delete"
        confirmLabel="Delete"
        onAction={this._deleteConfirmationClick.bind(this)}
      >
        {`Are you sure you want to delete "${nameguess}"?`}
      </Dialog>
    )
  }

  /**
   * 編集/照会ダイアログを表示する
   * @param {boolean} readonly 読み取り専用かどうか
   */
  _renderFormDialog(readonly) {
    return (
      <Dialog
        modal={true}
        header={readonly ? 'Information' : 'Edit item'}
        confirmLabel={readonly ? 'OK' : 'SAVE'}
        hasCancel={!readonly}
        onAction={this._saveDataDialog.bind(this)}
      >
        <Form
          fields={this.props.schema}
          initialData={this.state.data[this.state.dialog.idx]}
          readonly={readonly}
          ref="form"
        >
        </Form>
      </Dialog>
    );
  }

  /**
   * 各種ダイアログ表示メソッドをコールする
   */
  _renderDialog() {
    if (!this.state.dialog) {
      return null;
    }
    const dialogType = this.state.dialog.type;
    if (dialogType === 'delete') {
      return this._renderDeleteDialog();
    }
    if (dialogType === 'info') {
      return this._renderFormDialog(true);
    }
    if (dialogType === 'edit') {
      return this._renderFormDialog();
    }
    throw Error(`Invalid Dialog: ${this.state.dialog.type}`);
  }

  /**
   * 表を描画するrender()
   */
  _renderTable() {
    return (
      <table>
        <thead>
          <tr>
            {
              this.props.schema.map(item => {
                // schemaのshowプロパティがtrueでないなら表示しない
                if (!item.show) {
                  return null;
                }
                // thをonClick時にsortbyが決定するので、そのカラムに昇降順を示す記号をつける
                let title = item.label;
                if (this.state.sortby === item.id) {
                  title += this.state.descending ? '\u2191' : '\u2193';
                }
                return (
                  <th
                    className={`schema-${item.id}`}
                    key={item.id}
                    onClick={this._sort.bind(this, item.id)}
                  >
                    {title}
                  </th>
                );
              }, this)
            }
            <th className="ExcelNotSortable">Actions</th>
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor.bind(this)}>
          {
            this.state.data.map((row, rowidx) => {
              return (
                <tr key={rowidx}>
                  {
                    Object.keys(row).map((cell, idx) => {
                      const schema = this.props.schema[idx];
                      if (!schema || !schema.show) {
                        return null;
                      }
                      const isRating = schema.type === 'rating';
                      const edit = this.state.edit;
                      let content = row[cell];
                      // 1.Ratingでないセル && 編集中セル情報あり
                      //   編集中セルがこのセル自身である時
                      if (!isRating && edit) {
                        if (edit.row === rowidx && edit.key === schema.id) {
                          // contentの内容を編集用セルに変更
                          content = (
                            <form onSubmit={this._save.bind(this)}>
                              <FormInput
                                ref="input"
                                {...schema}
                                defaultValue={content}
                              >
                              </FormInput>
                            </form>
                          );
                        }
                        // 2.Ratingであるとき
                      } else if (isRating) {
                        content = <Rating readonly={true}
                          defaultValue={Number(content)}></Rating>
                      }
                      return (
                        <td
                          className={classNames({
                            [`schema-${schema.id}`]: true,
                            'ExcelEditable': !isRating,
                            'ExcelDataLeft': schema.align === 'left',
                            'ExcelDataRight': schema.align === 'right',
                            'ExcelDataCenter': schema.align !== 'left' && schema.align !== 'right'
                          })}
                          key={idx}
                          data-row={rowidx}
                          data-key={schema.id}
                        >
                          {content}
                        </td>
                      );

                    }, this)
                  }
                  {/* ActionsコンポーネントのonActionプロパティに_actionClick()を渡す */}
                  <td className="ExcelDataCenter">
                    <Actions onAction={this._actionClick.bind(this, rowidx)}></Actions>
                  </td>
                </tr>
              );
            }, this)
          }
        </tbody>
      </table>
    );
  }

  /**
   * 表、ダイアログのrender()をコールする
   */
  render() {
    return (
      <div className="Excel">
        {this._renderTable()}
        {this._renderDialog()}
      </div>
    );
  }
}

Excel.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.object
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.object
  ),
  onDataChange: PropTypes.func
}

export default Excel
