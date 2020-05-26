import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Dialog extends Component {

}

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  onAction: PropTypes.func,
  hasCancel: PropTypes.bool
}

Dialog.defaultProps = {
  confirmLabel: 'OK',
  modal: false,
  onAction: () => { },
  hasCancel: true
}

export default Dialog
