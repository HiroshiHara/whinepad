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

  _sort(key) {
    let data = Array.from(this.state.data);
    // ソート基準が操作前後で同じであれば昇降順を逆転させる
    const descending = (this.state.sortby === key) && !this.state.descending;

  }
}

export default Excel
