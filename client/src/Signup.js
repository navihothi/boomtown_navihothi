import React from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import * as Yup from 'yup'
import gql from "graphql-tag";
import App from './App.js'

import { makeStyles } from '@material-ui/styles'
import { ThemeProvider} from '@material-ui/styles'
import { unstable_Box as Box } from '@material-ui/core/Box';
import { 
         Typography,
         TextField,
         Button,
   } from '@material-ui/core';

   const useStyles = makeStyles ({
    signupForm: {
      marginLeft: 100,
    },
    signIn: {
      color: '#000',
      textDecoration: 'none',
      fontSize: 11,
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    inputField: {
      width: 325,
      marginBottom: 15
    },
    
  })


const SIGN_UP = gql`
  mutation signupMutation ($user: NewUserInput!) {
    signup( input:$user ) {
      user {
        id
        username
      }
      csrfToken
    }
  } 
`;

const Signup = ({
  setCSRFToken
  }) => {
    const classes = useStyles();
    return (
    <ThemeProvider>
      <div>
        <Mutation 
          mutation={SIGN_UP}
          onCompleted= {(data) => {
            console.log('csrf token:', data.signup.csrfToken)
            localStorage.setItem('token', data.signup.csrfToken)
            setCSRFToken(data.signup.csrfToken)
          }}
          onError={(error) => {
            alert(error)
          }}>
        {(signup, { data }) => (
          <div className="signupForm">
            <Typography variant = 'overline'>sign-up here</Typography>
            <Formik
              initialValues={
                {
                  username: '',
                  email: '',
                  password: ''
                }
              }
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  signup({variables: {user: values}})
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
                name="username"
                label="username"
                type="text"
                margin="dense"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`{
                  ${classes.inputField}
                  ${errors.username && touched.username ? 'text-input error' : 'text-input'}
                }`
              }
              /> <br/>
              {errors.username &&
                touched.username && <div className="input-feedback">{errors.username}</div>}
        
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
              /><br/>
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
              /><br/>
              {errors.password &&
                touched.password && <div className="input-feedback">{errors.password}</div>}

                <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="15px">
                  <Button
                    type="submit"
                    className="outline"
                    disabled={isSubmitting}
                    variant="contained"
                    color="secondary"
                  >
                    submit
                  </Button>

                  <Link to="/" className={classes.signIn}>
                    login to existing account
                  </Link>
                </Box>
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
)};
export default Signup;

