jest
  .dontMock('../source/components/Rating')
  .dontMock('../source/components/Suggest')
  .dontMock('../source/components/FormInput');

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import FormInput from '../source/components/FormInput';

describe('1. factory works.', () => {
  it('1-1. renders corrent input node.', () => {
    const formInput = TestUtils.renderIntoDocument(
      <FormInput type="input" />
    );
    const input = TestUtils.findRenderedDOMComponentWithTag(formInput, 'input');
    expect(input.type).toBe('text');
  });

  it('1-2. renders corrent textarea.', () => {
    const formInput = TestUtils.renderIntoDocument(
      <FormInput type="text" />
    );
    const input = TestUtils.findRenderedDOMComponentWithTag(formInput, 'textarea');
    expect(input.nodeName).toBe('TEXTAREA');
  });

  it('1-3-1. renders corrent year selector, with defaultValue.', () => {
    const formInput = TestUtils.renderIntoDocument(
      <FormInput type="year" defaultValue={2001} />
    );
    const input = TestUtils.findRenderedDOMComponentWithTag(formInput, 'input');
    expect(input.type).toBe('number');
    expect(formInput.props.defaultValue).toBe(2001);
  });

  it('1-3-2. render corrent year selector, without defaultValue.', () => {
    const formInput = TestUtils.renderIntoDocument(
      <FormInput type="year" />
    );
    const input = TestUtils.findRenderedDOMComponentWithTag(formInput, 'input');
    expect(input.type).toBe('number');
    expect(parseInt(formInput.getValue(), 10)).toBe(new Date().getFullYear());
  });

  it('1-4. render corrent Suggest Component.', () => {
    const options = ['test1', 'test2', 'test3'];
    const formInput = TestUtils.renderIntoDocument(
      <FormInput type="suggest" options={options} />
    );
    const input = TestUtils.findRenderedDOMComponentWithTag(formInput, 'datalist');
    expect(input.id).toBeTruthy();
  });

  it('1-5. render corrent Rating Commponent, with defaultValue', () => {
    const formInput = TestUtils.renderIntoDocument(
      <FormInput type="rating" defaultValue={3} id="dummy" />
    );
    const input = TestUtils.findRenderedDOMComponentWithTag(formInput, 'input');
    expect(input.type).toBe('hidden');
    expect(input.value).toBe("3");
  });

  it('1-6. returns input value.', () => {
    const textInput = TestUtils.renderIntoDocument(
      <FormInput type="input" defaultValue="test1-6" />
    );
    const ratingInput = TestUtils.renderIntoDocument(
      <FormInput type="rating" defaultValue={5} />
    )
    expect(textInput.getValue()).toBe("test1-6");
    expect(ratingInput.getValue()).toBe(5);
  });

  it('1-7. occur error on invalid type.', () => {
    const formInput = TestUtils.renderIntoDocument(
      <FormInput type="error" />
    );
    const errorMsg = TestUtils.findRenderedDOMComponentWithTag(formInput, 'p');
    expect(errorMsg.textContent).toBe('invalid type.');
  });
});
