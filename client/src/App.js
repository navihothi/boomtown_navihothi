import React, {useState} from 'react';
import { ApolloProvider } from "react-apollo"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { makeStyles } from '@material-ui/styles'


import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Logout from './Logout'
import apolloClient from './apolloClient'


import { ThemeProvider} from '@material-ui/styles'
import { createMuiTheme,
         Typography
   } from '@material-ui/core';

const intialCSRFToken = localStorage.getItem('token')

const theme = createMuiTheme({
  palette: {
    primary:{
      light: '#FFFFFF',
      main: '#F9F9F9',
      dark: '#C6C6C6',
      contrastText: '#00000'
    },
    secondary: {
      light: '#708690',
      main: '#445963',
      dark: '#1B3039',
      contrastText: '#FFFFFF'
    }
  }
})

const useStyles = makeStyles ({
  container: {
    background: '#EEE',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#1B3039',
    size: 100,
  },
})



 const App = () => {
  const [csrfToken, setCSRFToken] = useState(intialCSRFToken);
  const classes = useStyles();
  return (
   <Router>
    <ApolloProvider client={apolloClient}>
      <div className={classes.container}>
        <ThemeProvider theme={theme}>
          <Typography variant="h1" className={classes.title}>share. <br/> borrow. <br/> tools.</Typography>
          { csrfToken == null && (
            <React.Fragment>
              <Route path='/' exact render={() => (
                <Login setCSRFToken={setCSRFToken} />
              )} />
              <Route path='/signup' render={() => (
                <Signup setCSRFToken={setCSRFToken} />
              )} />
            </React.Fragment>
          )}
            {csrfToken != null && (
              <React.Fragment>
                <Route path='/' component = {Dashboard} />
                <Logout setCSRFToken={setCSRFToken} />
              </React.Fragment>
            )}
        </ThemeProvider>
      </div>
    </ApolloProvider>
  </Router>
   )
  };


export default App;
