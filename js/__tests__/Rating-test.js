jest
  .dontMock('../source/components/Actions')
  .dontMock('classnames');

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Rating from '../source/components/Rating';

describe('1. Rendering Rating.', () => {
  it('1-1. Resposing users action.', () => {
    const rating = TestUtils.renderIntoDocument(
      <Rating />
    );
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(rating, 'span');

    TestUtils.Simulate.mouseOver(stars[3]);
    expect(stars[0].className).toBe('RatingOn');
    expect(stars[3].className).toBe('RatingOn');
    expect(stars[4].className).toBeFalsy();
    expect(rating.state.rating).toBe(0);
    expect(rating.state.tmpRating).toBe(4);

    TestUtils.Simulate.mouseOut(stars[3]);
    expect(stars[0].className).toBeFalsy();
    expect(stars[3].className).toBeFalsy();
    expect(stars[4].className).toBeFalsy();
    expect(rating.state.rating).toBe(0);
    expect(rating.state.tmpRating).toBe(0);

    TestUtils.Simulate.click(stars[3]);
    expect(stars[0].className).toBe('RatingOn');
    expect(stars[3].className).toBe('RatingOn');
    expect(stars[4].className).toBeFalsy();
    expect(rating.state.rating).toBe(4);
    expect(rating.state.tmpRating).toBe(4);
    expect(rating.getValue()).toBe(4);
  });

  it('1-2. has not hidden params when readonly.', () => {
    const rating = TestUtils.renderIntoDocument(
      <Rating readonly={true} defaultValue={3} />
    );
    const hidden = TestUtils.scryRenderedDOMComponentsWithTag(rating, 'INPUT');
    expect(hidden.length).toBe(0);
  });

  it('1-3. has hidden params when not readonly.', () => {
    const rating = TestUtils.renderIntoDocument(
      <Rating defaultValue={3} id="dummy" />
    );
    const hidden = TestUtils.scryRenderedDOMComponentsWithTag(rating, 'input');
    expect(hidden[0].value).toEqual("3");
  });

  it('1-4. hidden params are 0 when not readonly, and default raiting.', () => {
    const rating = TestUtils.renderIntoDocument(
      <Rating id="dummy" />
    );
    const hidden = TestUtils.scryRenderedDOMComponentsWithTag(rating, 'input');
    expect(hidden[0].value).toEqual("0");
  });
});
