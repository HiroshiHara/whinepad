/* eslint-disable react/no-find-dom-node */
jest
  .dontMock('../source/components/Button')
  .dontMock('classnames');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Button from '../source/components/Button';

describe('1. Rendering Button Component.', () => {
  it('1-1. rendering <button>.', () => {
    const button = TestUtils.renderIntoDocument(
      <div>
        <Button>
          Hello.
        </Button>
      </div>
    );
    expect(ReactDOM.findDOMNode(button).firstChild.nodeName).toEqual('BUTTON');

  });
  it('1-2. rendering <a>.', () => {
    const button = TestUtils.renderIntoDocument(
      <div>
        <Button href="#">
          Hello.
        </Button>
      </div>
    );
    expect(ReactDOM.findDOMNode(button).firstChild.nodeName).toEqual('A');

  });
  it('1-3. Assign custom className.', () => {
    const button = TestUtils.renderIntoDocument(
      <div>
        <Button className="class1 class2">
          Hello.
        </Button>
      </div>
    )
    const buttonNode = ReactDOM.findDOMNode(button).firstChild;
    expect(buttonNode.getAttribute('class')).toEqual('Button class1 class2');
  })
})
