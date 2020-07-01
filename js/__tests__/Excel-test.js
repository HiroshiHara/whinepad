jest.disableAutomock();

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Excel from '../source/components/Excel';
import schema from '../source/schema';

let data = [{}];
schema.forEach(item => data[0][item.id] = item.sample);

describe('1. Editing data.', () => {
  it('1-1. rewrite name column.', () => {
    // prepare onDataChange mock.
    const onDataChangeMock = jest.fn();
    // rendering Excel.
    const excel = TestUtils.renderIntoDocument(
      <Excel
        schema={schema}
        initialData={data}
        onDataChange={onDataChangeMock}
      />
    );
    // modify name.
    const newname = 'Pescado branc';
    const cell = TestUtils.scryRenderedDOMComponentsWithTag(excel, 'td')[0];
    // cell.dataset = {
    //   row: cell.getAttribute('data-row'),
    //   key: cell.getAttribute('data-key')
    // };
    TestUtils.Simulate.doubleClick(cell);
    cell.getElementsByTagName('input')[0].value = newname;
    TestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);
    // after modified name verify.
    expect(cell.innerHTML).toEqual(newname);
    // submitted cell info verify.
    const calls = onDataChangeMock.mock.calls;
    console.log(calls[0][0]);
    expect(calls[0][0][0].name).toEqual(newname);
  });

  it('1-2. delete 1 row.', () => {
    // prepare onDataChange mock.
    const onDataChangeMock = jest.fn();
    // rendering Excel.
    const excel = TestUtils.renderIntoDocument(
      <Excel
        schema={schema}
        initialData={data}
        onDataChange={onDataChangeMock}
      />
    );
    // click delete button.
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(excel, 'ActionsDelete')
    );
    // click dialog's confirm button.
    TestUtils.Simulate.doubleClick(
      TestUtils.findRenderedDOMComponentWithClass(excel, 'Button')
    );
    const calls = onDataChangeMock.mock.calls;
    console.log(calls);
    expect(calls.length).toBe(0);
  });

  it('1-3. add row.', () => {
    const onDataChangeMock = jest.fn();
    const excel = TestUtils.renderIntoDocument(
      <Excel
        schema={schema}
        initialData={data}
        onDataChange={onDataChangeMock}
      />
    );

  });
});
