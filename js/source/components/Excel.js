/* @flow */

import React, { Component } from 'react'
import classNames from 'classnames';
import invariant from 'invariant'
import Form from './Form';
import FormInput from './FormInput';
import Rating from './Rating';
import Actions from './Actions';
import Dialog from './Dialog';
import CRUDStore from '../flux/CRUDStore';
import CRUDActions from '../flux/CRUDActions';

type Data = Array<Object>;

type EditState = {
  row: number,
  key: string,
}

type DialogState = {
  type: string,
  idx: number
}

type Props = {

}

type State = {
  data: Data,
  sortby: ?string,
  descending: boolean,
  edit: ?EditState,
  dialog: ?DialogState
}

class Excel extends Component<Props, State> {
  state: State;
  schema: Array<Object>;
  constructor() {
    super();
    this.schema = CRUDStore.getSchema();
    this.state = {
      data: CRUDStore.getData(),
      // schema.id
      sortby: null,
      descending: false,
      // {row: rowidx, key: schema.id}
      edit: null,
      // {type: inputtype, idx: cellidx}
      dialog: null
    }
    CRUDStore.addListener('change', () => {
      this.setState({
        data: CRUDStore.getData()
      })
    });
  }

  /**
   * 列ヘッダーをクリックしたときにコールされ、
   * 文字コード基準で昇降順で並び替える
   * @param {string} key clicked column id
   */
  _sort(key: string) {
    // ソート基準が操作前後で同じであれば昇降順を逆転させる
    const descending = (this.state.sortby === key) && !this.state.descending;
    CRUDActions.sort(key, descending);
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
  _showEditor(e: Event) {
    const target: HTMLElement = ((e.target: any): HTMLElement);
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
  _save(e: Event) {
    // デフォルトのイベントをOFFにする
    e.preventDefault();
    invariant(this.state.edit, 'Invalid this.state.edit.');
    CRUDActions.updateField(
      this.state.edit.row,
      this.state.edit.key,
      this.refs.input.getValue()
    )
    this.setState({
      edit: null,
    });
  }

  /**
   * Actionsボタンのどれかがクリックされたとき、
   * dialogプロパティをセットする。
   * @param {Number} rowidx アクション実行元の行番号
   * @param {string} action どのActionsボタンかを判断する文字列(info, edit, delete)
   */
  _actionClick(rowidx: number, action: string) {
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
  _deleteConfirmationClick(action: string) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    const idx = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof idx === 'number', 'Invalid this.state.dialog');
    CRUDActions.delete(idx);
    this.setState({
      dialog: null,
    });
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
  _saveDataDialog(action: string) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    const idx = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof idx === 'number', 'Invalid this.state.dialog');
    CRUDActions.updateRecord(idx, this.refs.form.getData());
    this.setState({
      dialog: null,
    });
  }

  /**
   * 削除ダイアログを表示する
   */
  _renderDeleteDialog() {
    const idx = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof idx === 'number', 'Invalid this.state.dialog.');
    const first = this.state.data[idx];
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
  _renderFormDialog(readonly: ?boolean) {
    const idx = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof idx === 'number', 'Invalid this.state.dialog.');
    return (
      <Dialog
        modal={true}
        header={readonly ? 'Information' : 'Edit item'}
        confirmLabel={readonly ? 'OK' : 'SAVE'}
        hasCancel={!readonly}
        onAction={this._saveDataDialog.bind(this)}
      >
        <Form
          recordId={idx}
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
              this.schema.map(item => {
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
                      const schema = this.schema[idx];
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

export default Excel
