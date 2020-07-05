/* @flow */

import React, { Component } from 'react';
import Button from './Button';
import Dialog from './Dialog';
import Excel from './Excel';
import Form from './Form';
import CRUDStore from '../flux/CRUDStore';
import CRUDActions from '../flux/CRUDActions';

type Props = {

}

type State = {
  addnew: boolean,
  count: number
}

class Whinepad extends Component<Props, State> {

  state: State;

  constructor() {
    super();
    this.state = {
      addnew: false,
      count: CRUDStore.getCount()
    };
    CRUDStore.addListener('change', () => {
      this.setState({
        count: CRUDStore.getCount()
      })
    });
  }

  /**
   * Optimize rendering component.
   * It would be update when changed count for records.
   * @param {Object} newProps
   * @param {Object} newState
   */
  shouldComponentUpdate(newProps: Object, newState: State): boolean {
    return (
      newState.addnew !== this.state.addnew ||
      newState.count !== this.state.count
    )
  }

  /**
   * 追加ダイアログを表示させるフラグを立てるメソッド。
   */
  _addNewDialog() {
    this.setState({
      addnew: true
    });
  }

  /**
   * 追加ダイアログのonActionプロパティにセットされる関数。
   * @param {string} action
   */
  _addNew(action: string) {
    if (action === 'dismiss') {
      this.setState({
        addnew: false
      });
      return;
    }
    if (action === 'confirm') {
      CRUDActions.create(this.refs.form.getData());
    }
    this.setState({
      addnew: false,
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
              placeholder={`Search by ${this.state.count} entries...`}
              onChange={CRUDActions.search.bind(CRUDActions)}
              onFocus={CRUDActions.startSearching.bind(CRUDActions)}
            />
          </div>
        </div>
        {/* 表の描画 */}
        <div className="WhinepadDatagrid">
          <Excel />
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
              <Form ref="form" />
            </Dialog>
            : null
        }
      </div >
    );
  }

}

export default Whinepad
