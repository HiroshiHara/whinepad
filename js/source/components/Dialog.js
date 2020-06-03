import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';

class Dialog extends Component {
  // When Dialog was closed, remove gray style.
  componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
  }

  // When open Dialog on modal, add gray style to body.
  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
    // When user keydown 'Esc', close Dialog.
    document.onkeydown = (e) => {
      if (e.keyCode === 27) {
        this.componentWillUnmount();
      }
    }
  }

  render() {
    return (
      <div className={classNames({
        'Dialog': true,
        'DialogModal': this.props.modal
      })}>
        <div className={classNames({
          'DialogModalWrap': this.props.modal
        })}>
          <div className="DialogHeader">{this.props.header}</div>
          <div className="DialogBody">{this.props.children}</div>
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <span
                className="DialogDismiss"
                onClick={this.props.onAction.bind(this, 'dismiss')}>
                Cancel
              </span>
              : null
            }
            <Button onClick={this.props.onAction.bind(this,
              this.props.hasCancel ? 'confirm' : 'dismiss'
            )}>{this.props.confirmLabel}</Button>
          </div>
        </div>
      </div>
    );
  }
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
