jest
  .dontMock('../source/components/Suggest');

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Suggest from '../source/components/Suggest';

const options = [
  'test1',
  'test2',
  'test3'
];

describe('1. renders correct Suggest Component.', () => {
  it('1-1. will haz options.', () => {
    const suggest = TestUtils.renderIntoDocument(
      <Suggest options={options} />
    );
    const optionsElements = TestUtils.scryRenderedDOMComponentsWithTag(suggest, 'option');
    expect(optionsElements[0].value).toEqual('test1');
    expect(optionsElements[1].value).toEqual('test2');
    expect(optionsElements[2].value).toEqual('test3');
  });

  it('1-2. can get value.', () => {
    const suggest = TestUtils.renderIntoDocument(
      <Suggest options={options} defaultValue="test3" />
    );
    expect(suggest.getValue()).toEqual('test3');
  });

  it('1-3. state be changed by onchange event.', () => {
    const suggest = TestUtils.renderIntoDocument(
      <Suggest options={options} />
    );
    const suggestInput = TestUtils.findRenderedDOMComponentWithTag(suggest, 'input');
    suggestInput.value = 'test4';
    TestUtils.Simulate.change(suggestInput);
    expect(suggest.getValue()).toEqual('test4');
  });
});
