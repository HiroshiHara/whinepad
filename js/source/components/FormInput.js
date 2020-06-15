/* @flow */

import React, { Component } from 'react';
import Rating from './Rating';
import Suggest from './Suggest';

type FormInputFieldType = 'input' | 'text' | 'year' | 'suggest' | 'rating';
export type FormInputFieldValue = string | number;
export type FormInputField = {
  type: FormInputFieldType,
  defaultValue: ?FormInputFieldValue,
  id: ?string,
  options: ?Array<string>,
  label: ?string
}

class FormInput extends Component<FormInputField> {
  // props: FormInputField;

  getValue(): FormInputFieldValue {
    // refを用いて汎用的に使えるgetValueを定義
    const inputValue = this.refs.input;
    if (inputValue["value"] !== undefined) {
      return this.refs.input.value;
    } else {
      return this.refs.input.getValue();
    }
    // DOMのvalue属性がある→textかtextareaなのでそのまま返せる
    // 独自入力フィールドのときはそのコンポーネントのgetValueを実行
  }

  render() {
    // 全ての入力フィールドに共通のプロパティ
    const common: Object = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue
    }
    // this.props.typeに応じて描画する入力フィールドを変更する
    switch (this.props.type) {
      case 'input':
        return <input type="text" {...common} />
      case 'text':
        return <textarea {...common}></textarea>
      case 'year':
        return (
          <input type="number" {...common}
            defaultValue={this.props.defaultValue || new Date().getFullYear()} />
        );
      case 'suggest':
        return <Suggest {...common} options={this.props.options} />
      case 'rating':
        return <Rating {...common}
          defaultValue={parseInt(this.props.defaultValue, 10)} />
      default:
        console.error('invalid type.');
        return <p style={{ fontColor: 'red' }}>invalid type.</p>
    }
  }
}

export default FormInput
