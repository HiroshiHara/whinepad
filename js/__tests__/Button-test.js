jest
  .dontMock('../source/components/Button')
  .dontMock('classnames');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Button from '../source/components/Button';

describe('Rendering Button Component.', () => {
  it('rendering <button>.', () => {
    const button = TestUtils.renderIntoDocument(
      <div>
        <Button>
          Hello.
        </Button>
      </div>
    );
    // eslint-disable-next-line react/no-find-dom-node
    expect(ReactDOM.findDOMNode(button).firstChild.nodeName).toEqual('BUTTON');
  })
})
