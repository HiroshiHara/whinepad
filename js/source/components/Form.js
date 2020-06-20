/* @flow */

import React, { Component } from 'react';
import Rating from './Rating';
import FormInput from './FormInput';
import type { FormInputField, FormInputFieldValue } from './FormInput';

type Props = {
  fields: Array<FormInputField>,
  initialData: ?Object,
  readonly: ?boolean
}

class Form extends Component<Props> {
  getData() {
    let data: Object = {};
    this.props.fields.forEach((field: FormInputField) =>
      data[field.id] = this.refs[field.id].getValue()
    );
    return data;
  }
  render() {
    return (
      <form className="Form">
        {this.props.fields.map((field: FormInputField) => {
          // if accepted initialData prop, then assigned to varialble prefilled.
          const prefilled: FormInputFieldValue = (this.props.initialData && this.props.initialData[field.id]) || '';
          if (!this.props.readonly) {
            return (
              <div className="FormRow" key={field.id}>
                <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
                <FormInput {...field} ref={field.id} defaultValue={prefilled} />
              </div>
            );
          }
          // readonly and have some defaultValue, then show component.
          if (!prefilled) {
            return null;
          }
          return (
            <div className="FormRow" key={field.id}>
              <span className="FormLabel">{field.label}:</span>
              {
                // readonly Rating component or prefilled.
                field.type === 'rating'
                  ? <Rating readonly={true} defaultValue={parseInt(prefilled, 10)} />
                  : <div>{prefilled}</div>
              }
            </div>
          );
        }, this)}
      </form>
    )
  }
}

export default Form
