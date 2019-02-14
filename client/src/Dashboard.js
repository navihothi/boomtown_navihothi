import React from 'react'
import { BrowserRouter as Router,
         Route, 
         Link
        } from "react-router-dom"

import './assets/App.css';
import App from './App'
import MyItems from './MyItems'
import CreateItem from './CreateItem'
import BorrowItem from './BorrowItem'
import ItemLibrary from './ItemLibrary'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles ({

})

const Dashboard = ({
  setCSRFToken
  }) => {

  const classes = useStyles();

  return (
  <Router>
    <div>
      dashboard
      <ul className={classes}>
        <li><Link to='/'><button>my items</button></Link></li>
        <li><Link to='/CreateItem'><button>create item</button></Link></li>
        <li><Link to='/BorrowItem'><button>borrow an item</button></Link></li>
        <li><Link to='/ItemLibrary'><button>items library</button></Link></li>
      </ul>

      <Route path='/' exact component={MyItems}/>
      <Route path='/CreateItem' component={CreateItem}/>
      <Route path='/BorrowItem' component={BorrowItem}/>
      <Route path='/ItemLibrary' component={ItemLibrary}/>
    </div>
  </Router>
  )
}

export default Dashboard;

