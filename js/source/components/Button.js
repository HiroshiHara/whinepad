/* @flow */

import React from 'react'
/*
  classnames library
  You can get classnames library by 'npm install --save-dev classnames'.
  It have only classNames([className]...) method.
  This method return multiple classNames.
  More detail @see https://www.npmjs.com/package/classnames
*/
import classNames from 'classnames';

type Props = {
  href: ?string,
  classNmae: ?string
}

// functional component
// functional component is only return DOM elements.
// It has not state.
// argument 'props' has all properties from Caller.
const Button = (props: Object) => {
  const cssclasses = classNames('Button', props.className);
  if (props.href) {
    return <a {...props} className={cssclasses} />
  } else {
    return <button {...props} className={cssclasses} />
  }
}

export default Button
