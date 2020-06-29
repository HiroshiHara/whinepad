/* eslint-disable react/no-find-dom-node */
jest
  .dontMock('../source/components/Dialog')
  .dontMock('../source/components/Button')
  .dontMock('classnames');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Dialog from '../source/components/Dialog';

describe('1. renders with action buttons', () => {
  it('1-1. can haz Cancel', () => {
    const dialog = TestUtils.renderIntoDocument(
      <Dialog>Body Msg</Dialog>
    );
    const cancel = TestUtils.findRenderedDOMComponentWithClass(dialog, 'DialogDismiss');
    expect(cancel.nodeName).toBe('SPAN');
    const ok = TestUtils.findRenderedDOMComponentWithTag(dialog, 'button');
    expect(ok.textContent).toBe(Dialog.defaultProps.confirmLabel);
  });

  it('1-2. con haz a single dismiss button', () => {
    const dialog = TestUtils.renderIntoDocument(
      <Dialog hasCancel={false} confirmLabel="confirm">Body Msg</Dialog>
    );
    const cancels = TestUtils.scryRenderedDOMComponentsWithClass(dialog, 'DialogDismiss');
    expect(cancels.length).toBe(0);
    const ok = TestUtils.findRenderedDOMComponentWithTag(dialog, 'button');
    expect(ok.textContent).toBe('confirm');
  });

  it('1-3. can be modal', () => {
    const dialog = TestUtils.renderIntoDocument(
      <Dialog modal={true}>Body Msg</Dialog>
    );
    expect(Array.from(document.body.classList)).toContain('DialogModalOpen');
    const dialogModal = TestUtils.scryRenderedDOMComponentsWithClass(dialog, 'DialogModal');
    expect(dialogModal.length).toBe(1);
    // when removing the dialog
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dialog).parentNode);
    expect(Array.from(document.body.classList)).not.toContain('DialogModalOpen');
  });

  it('1-4. haz head and body', () => {
    const dialog = TestUtils.renderIntoDocument(
      <Dialog header="Header Msg">Body Msg</Dialog>
    );
    const header = TestUtils.findRenderedDOMComponentWithClass(dialog, 'DialogHeader');
    expect(header.textContent).toEqual('Header Msg');
    const body = TestUtils.findRenderedDOMComponentWithClass(dialog, 'DialogBody');
    expect(body.textContent).toEqual('Body Msg');
  });

  it('1-5. click cancel button.', () => {
    const callback = jest.fn();
    const dialog = TestUtils.renderIntoDocument(
      <Dialog onAction={callback}></Dialog>
    );
    const yescancel = TestUtils.findRenderedDOMComponentWithTag(dialog, 'button');
    TestUtils.Simulate.click(yescancel);
    const calls = callback.mock.calls;
    expect(calls[0][0]).toEqual('confirm');
  });

  it('1-6. click dismiss button.', () => {
    const callback = jest.fn();
    const dialog = TestUtils.renderIntoDocument(
      <Dialog onAction={callback} hasCancel={false}></Dialog>
    );
    const nocancel = TestUtils.findRenderedDOMComponentWithTag(dialog, 'button');
    TestUtils.Simulate.click(nocancel);
    const calls = callback.mock.calls;
    expect(calls[0][0]).toEqual('dismiss');
  });

  it('1-7. Close the dialog when click outside', () => {
    const callback = jest.fn();
    const dialog = TestUtils.renderIntoDocument(
      <Dialog onAction={callback} modal={true}></Dialog>
    );
    const outsideModal = TestUtils.findRenderedDOMComponentWithClass(dialog, 'DialogModal');
    TestUtils.Simulate.click(outsideModal);
    const calls = callback.mock.calls;
    expect(calls[0][0]).toEqual('dismiss');
  });

  // it('1-8. Close the dialog when keydown Esc.', () => {
  //   const callback = jest.fn();
  //   const dialog = TestUtils.renderIntoDocument(
  //     <Dialog onAction={callback} modal={true}></Dialog>
  //   );
  //   const body = TestUtils.findRenderedDOMComponentWithClass(dialog, 'DialogModal');
  //   TestUtils.Simulate.keyDown(document, {
  //     key: "Ecs",
  //     keyCode: 27
  //   });
  //   const calls = callback.mock.calls;
  //   expect(calls[0][0]).toEqual('dismiss');
  // });
});
