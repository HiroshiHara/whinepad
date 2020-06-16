/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';

type Props = {
  id?: string,
  defaultValue: number,
  readonly: boolean,
  max: number
}

type State = {
  rating: number,
  tmpRating: number
}

class Rating extends Component<Props, State> {
  static defaultProps = {
    defaultValue: 0,
    readonly: false,
    max: 5
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue
    }
  }
  getValue(): number {
    return this.state.rating;
  }
  /* Fire on Mouseover. */
  setTemp(rating: number) {
    this.setState({
      tmpRating: rating
    });
  }
  /* Fire on Click. */
  setRating(rating: number) {
    this.setState({
      tmpRating: rating,
      rating: rating
    });
  }
  /* Fire on Mouseout, then clear rating. */
  reset() {
    this.setTemp(this.state.rating);
  }
  /* Response external access to props */
  componentWillReceiveProps(newProps: Props) {
    this.setRating(newProps.defaultValue);
  }
  render() {
    // Print stars this.props.max time.
    const stars = [];
    for (let i: number = 1; i <= this.props.max; i++) {
      stars.push(
        <span
          /* 現在の☆の数まで色づけ */
          className={i <= this.state.tmpRating ? 'RatingOn' : null}
          key={i}
          /* readonlyでないならonClick時にRatingを決定 */
          onClick={!this.props.readonly ? this.setRating.bind(this, i) : undefined}
          /* readonlyでないならonMouseOver時に現在の☆の数を更新 */
          onMouseOver={!this.props.readonly ? this.setTemp.bind(this, i) : undefined}
        >
          &#9734;
        </span>
      );
    }
    return (
      <div
        className={classNames({
          'Rating': true,
          'RatingReadonly': this.props.readonly
        })}
        /* マウスアウト時に☆の数をRaitingに戻す */
        onMouseOut={this.reset.bind(this)}
      >
        {stars}
        {/* 読み取り専用、またはidがないときは送信用の値を設定しない */}
        {this.props.readonly || !this.props.id
          ? null
          : <input type="hidden" id={this.props.id} value={this.state.rating || 0} />
        }
      </div>
    );
  }
}

export default Rating
