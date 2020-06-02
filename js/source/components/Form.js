import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import FormInput from './FormInput';

class Form extends Component {
  getData() {
    let data = {};
    this.props.fields.forEach(field =>
      data[field.id] = this.refs[field.id].getValue()
    );
    return data;
  }
  render() {
    return (
      <form className="Form">
        {this.props.fields.map(field => {
          // if accepted initialData prop, then assigned to varialble prefilled.
          const prefilled = this.props.initialData && this.props.initialData[field.id];
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

Form.propTypes = {
  // PropTypes.shape...
  // An object taking on a particular shape.
  // below code require particulation Mapping form fields property.
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  initialData: PropTypes.object,
  readonly: PropTypes.bool
}

export default Form
