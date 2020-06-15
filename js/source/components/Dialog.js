/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Button from './Button';

type Props = {
  header: string,
  confirmLabel: string,
  modal: Boolean,
  onAction: Function,
  hasCancel: ?boolean,
  children?: Array<any>
}

class Dialog extends Component {

  props: Props;

  static defaultProps = {
    confirmLabel: 'OK',
    modal: false,
    onAction: () => { },
    hasCancel: true
  }

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
        this.props.onAction('dismiss');
      }
    }
  }

  render() {
    return (
      <div className={classNames({
        'Dialog': true,
        'DialogModal': this.props.modal
      })}
        onClick={this.props.onAction.bind(this, 'dismiss')}>
        <div className={classNames({
          'DialogModalWrap': this.props.modal
        })}>
          <div className="DialogModalContainer"
            onClick={e => e.stopPropagation()}>
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
      </div>
    );
  }
}

export default Dialog
