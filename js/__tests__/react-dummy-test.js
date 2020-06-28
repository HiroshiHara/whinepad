/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

describe('Rendering Button.', () => {
  it('changes the text after Click.', () => {

    const button = TestUtils.renderIntoDocument(
      <button onClick={e => e.target.innerHTML = 'Good by.'}>
        Hello.
      </button>
    )

    expect(ReactDOM.findDOMNode(button).innerHTML).toEqual('Hello.');
    TestUtils.Simulate.click(button);
    expect(ReactDOM.findDOMNode(button).innerHTML).toEqual('Good by.');
  });
});
