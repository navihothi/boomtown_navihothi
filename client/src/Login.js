import React from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/styles'
import * as Yup from 'yup'
import gql from "graphql-tag";
import Select from 'react-select'

import App from './App.js'

import { ThemeProvider} from '@material-ui/styles'
import {
         Typography,
         TextField,
         Button,
         Portal
   } from '@material-ui/core';

  const useStyles = makeStyles ({
    createAccount: {
      color: '#000',
      textDecoration: 'none',
      fontSize: 11,
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    inputField: {
      width: 325,
    },
    linkContainer: {
      display: 'flex'
    }
  })

const LOG_IN = gql`
  mutation loginMutation ($user: LoginInput!) {
    login( input:$user ) {
      user {
        id
        username
      }
      csrfToken
    }
  } 
`;

const Login = ({
  setCSRFToken
  }) => {
  const classes = useStyles();
    return (
  <ThemeProvider >
    <div>
      <Typography variant="overline">welcome back fam</Typography>
      <Mutation
        mutation={LOG_IN}
        onCompleted={ (data) => {
          console.log('csrf token:', data.login.csrfToken)
          localStorage.setItem('token', data.login.csrfToken)
          setCSRFToken(data.login.csrfToken)
        }}
        onError={ (error) => {
          alert(error)
        }}>
          {(login, { data }) => (
            <div className="loginForm">
              <Formik
                initialValues={
                  {
                    email: '',
                    password: ''
                  }
                }
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    login({variables: {user: values}})
                    setSubmitting(false);
                  }, 500);
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email()
                    .required('Required'),
                  password: Yup.string(),
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
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      name="email"
                      label="email"
                      type="text"
                      margin="dense"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`{
                        ${classes.inputField}
                        ${errors.email && touched.email ? 'text-input error' : 'text-input'}
                      }`
                    }
                    /><br />
                    {errors.email &&
                      touched.email && <div className="input-feedback">{errors.email}</div>}

                    <TextField
                      name="password"
                      label="password"
                      type="text"
                      margin="dense"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`{
                        ${classes.inputField}
                        ${errors.password && touched.password? 'text-input error' : 'text-input'}
                      }` 
                    }
                    /><br />
                    {errors.password &&
                      touched.password && <div className="input-feedback">{errors.password}</div>}

                
                    <Button
                      type="submit"
                      className="outline"
                      disabled={isSubmitting}
                      variant="contained"
                      color="secondary"
                    >
                      submit
                    </Button>

                    <Link to="/Signup" className={classes.createAccount}>
                      create an account
                    </Link>
               
                  {/* <DisplayFormikState {...props} /> */}
                </form>
              );
            }}
        </Formik>
        </div>
      )}
      </ Mutation>
    </div>
  </ThemeProvider>
  )
}

export default Login;