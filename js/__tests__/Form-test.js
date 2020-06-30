jest
  .dontMock('../source/components/Rating')
  .dontMock('../source/components/FormInput')
  .dontMock('../source/components/Form');

import React from 'react';
import Form from '../source/components/Form';
import TestUtils from 'react-dom/test-utils';
import schema from '../source/schema';

const initialData = {
  name: 'wine',
  year: '2020',
  grape: 'Merlot',
  rating: 3,
  comments: 'Nice.'
};

describe('1. render corrent Form Component.', () => {
  it('1-1. render FormInput Components, with initialData.', () => {
    const form = TestUtils.renderIntoDocument(
      <Form fields={schema} initialData={initialData} readonly={false} />
    );

    const input = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');
    expect(input[0].type).toBe('text');
    expect(input[1].type).toBe('number');
    expect(input[3].type).toBe('hidden');

    const datalist = TestUtils.findRenderedDOMComponentWithTag(form, 'datalist');
    expect(datalist.id).toBeTruthy();
    const textarea = TestUtils.findRenderedDOMComponentWithTag(form, 'textarea');
    expect(textarea.nodeName).toBe('TEXTAREA');
  });

  it('1-2. render any return FormInput, without initialData.', () => {
    const form = TestUtils.renderIntoDocument(
      <Form fields={schema} readonly={true} />
    );
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');
    expect(input.length).toBe(0);
  });

  it('1-3. render readonly FormInput. with initialData.', () => {
    const form = TestUtils.renderIntoDocument(
      <Form fields={schema} initialData={initialData} readonly={true} />
    );
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input');
    expect(input.length).toBe(0);
    const div = TestUtils.scryRenderedDOMComponentsWithClass(form, 'FormLabel');
    expect(div[0].nextSibling.innerHTML).toEqual('wine');
    expect(div[1].nextSibling.innerHTML).toEqual('2020');
    expect(div[2].nextSibling.innerHTML).toEqual('Merlot');
    expect(div[4].nextSibling.innerHTML).toEqual('Nice.');
  })

  it('1-4. can get data.', () => {
    const form = TestUtils.renderIntoDocument(
      <Form fields={schema} initialData={initialData} readonly={false} />
    );
    expect(form.getData()).toEqual(initialData);
  });
});
