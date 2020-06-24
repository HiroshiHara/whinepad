jest
  .dontMock('../source/components/Actions')
  .dontMock('./Wrap');

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Actions from '../source/components/Actions';
import Wrap from './Wrap';

describe('1. call event by onclick.', () => {
  it('1-1. call callback function.', () => {
    const callback = jest.fn();
    const actions = TestUtils.renderIntoDocument(
      <Wrap><Actions onAction={callback} /></Wrap>
    );
    TestUtils
      .scryRenderedDOMComponentsWithTag(actions, 'span')
      .forEach(span => TestUtils.Simulate.click(span));
    const calls = callback.mock.calls;
    expect(calls.length).toEqual(3);
    expect(calls[0][0]).toEqual('info');
    expect(calls[1][0]).toEqual('edit');
    expect(calls[2][0]).toEqual('delete');
  })
})
