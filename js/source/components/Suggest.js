/* @flow */

/*
  Destructuring assignment + import syntax
  React... using default keyword. so it is unnessessary '{}'.
  Component... getting properties from 'react' by Destructuring assginment.
 */
import React, { Component } from 'react';

type Props = {
  id?: string,
  defaultValue?: string,
  options: Array<string>
}

type State = {
  value: string
}

class Suggest extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: (props.defaultValue || '')
    }
  }
  // フォームに入力されている値を取得するメソッド
  getValue(): string {
    return this.state.value;
  }
  render() {
    // 適当な英数字の羅列を生成
    const randomid: string = Math.random().toString(16).substring(2);
    return (
      <div>
        <input type="text"
          list={randomid}
          defaultValue={this.props.defaultValue}
          onChange={e => this.setState({ value: e.target.value })}
          id={this.props.id} />
        <datalist id={randomid}>
          {this.props.options.map(
            (item: string, idx: number) =>
              <option value={item} key={idx} />
          )}
        </datalist>
      </div>
    );
  }
}

export default Suggest
