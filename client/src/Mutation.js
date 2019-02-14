import React from 'react'
import { Mutation } from 'react-apollo';

import gql from "graphql-tag";

import App from './App.js'

const Mutation = () => (
  <Mutation
    mutation={gql`
      {
        rockets {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (data) {
        const options = data.rockets.map(({id, name}) => (
          {value: name, label: name}
        )); 
        return (     
          <div class="formPage">
            <Formik
              initialValues={{
                name:'', 
                email: '',
                number: '',
                rockets:[] 
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email()
                  .required('Required'),
                name: Yup.string()
                  .required('Required'),
                number: Yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
                        // USED REGEX 
                rocket: Yup.array()
                  .of(
                    Yup.object().shape({
                      label: Yup.string().required(),
                      value: Yup.string().required()
                    })
                  ),
              })}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                  setFieldValue,
                  setFieldTouched,
                } = props;
                return (
                  <form onSubmit={handleSubmit} className="rocketForm">

                  <label htmlFor="name" className="labelBox">
                    name
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.name &&
                    touched.name && <div className="input-feedback">{errors.name}</div>}
                  
                  <label htmlFor="phone number" className="labelBox">
                    phone #
                  </label>
                  <input
                    id="number"
                    placeholder="Enter phone number"
                    type="text"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.number && touched.number ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.number &&
                    touched.number && <div className="input-feedback">{errors.number}</div>}

                  <label htmlFor="email" className="labelBox">
                    e-mail
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.email &&
                    touched.email && <div className="input-feedback">{errors.email}</div>}

                  <MySelect
                    value={values.rockets}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.rockets}
                    touched={touched.rockets}
                    options={options}
                  />
                  <div class="btn">
                    <button
                      type="button"
                      className="outline"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      reset
                    </button>
                    <button type="submit" disabled={isSubmitting} className="submitbtn">
                      submit
                    </button>
                  </div>

                    {/* <DisplayFormikState {...props} /> */}
                  </form>
                );
              }}
            </Formik>
          </div>
        )}
    }}
  </Mutation>
)

export default Mutation;