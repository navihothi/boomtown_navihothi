import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Query } from "react-apollo";
import Select from 'react-select';
import gql from "graphql-tag";

const tagOptions = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' },
];

class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('tags', value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('tags', true);
  };

  render() {
    return (
      <div>
        <label>tags (select at least 3) </label>
        <Select
          id="color"
          options={tagOptions}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
          )}
        {/* <Query
            query={gql`
                query {
                  tags {
                      id
                      title
                      description
                  }
                }
                `}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) {
                console.log(error);
                return <p>Test There was an error</p>
              }
              console.log(data);
              return data.viewer.borrowed.map(({ id, title }) => (
                <div key={id}>
                  <p>Item {id}: {title}</p>
                </div>
              ));
            }}
          </Query> */}
      </div>
    );
  }
}

export default MySelect;