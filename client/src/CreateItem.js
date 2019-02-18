import React from 'react'
import { Link } from 'react-router-dom'
import gql from "graphql-tag";
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Mutation } from 'react-apollo'
import MySelect from './MySelect'


const CREATE_ITEM = gql`
  mutation createitemMutation ($Item: NewItemInput!) {
    addItem( input: $Item ) {
      id
      title
      description
    }
  }
`;

const CreateItem = ({
  setCSRFToken
}) => (
    <div>
      <h3>create an item</h3>
      <Mutation
        mutation={CREATE_ITEM}
        onCompleted={(data) => {
          console.log(data);
        }}
        onError={(error) => {
          alert(error)
        }}>
        {(addItem, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error);
            return <p>This shit is broken.</p>
          }
          return (
            <div>
              <Formik
                initialValues={
                  {
                    title: '',
                    description: '',
                    tags: []
                  }
                }
                onSubmit={(values, { setSubmitting }) => {
                  alert(JSON.stringify(values, null, 2));
                  addItem({ variables: { Item: values } })
                  setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                  title: Yup.string()
                    .required('Required'),
                  description: Yup.string()
                    .required('Required'),
                  //password must contain a minimum eight characters, at least one letter and one number
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
                    setFieldTouched
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="title" style={{ display: 'block' }}>
                        title
            </label>
                      <input
                        id="title"
                        placeholder="Enter item"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.title && touched.title ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.title &&
                        touched.title && <div className="input-feedback">{errors.title}</div>}
                      <label htmlFor="description" style={{ display: 'block' }}>
                        description
            </label>
                      <input
                        id="description"
                        placeholder="item description"
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.description && touched.description ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.description &&
                        touched.description && <div className="input-feedback">{errors.description}</div>}

                  <MySelect
                          value={values.tags}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.tags}
                          touched={touched.tags}
                        />

                      <button
                        type="submit"
                        className="outline"
                        disabled={isSubmitting}
                      >
                        submit
            </button>

                      {/* <DisplayFormikState {...props} /> */}
                    </form>
                  );
                }}
              </Formik>
            </div>
          )
        }}
      </ Mutation>
    </div>
  )

export default CreateItem;

