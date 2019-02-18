import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"

import App from './App'
import MyItems from './MyItems'
import CreateItem from './CreateItem'
import BorrowItem from './BorrowItem'
import ItemLibrary from './ItemLibrary'
import Logout from './Logout'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function ClippedDrawer({classes, setCSRFToken}) {

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            B O O M town
          </Typography>
          <Logout setCSRFToken={setCSRFToken}/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} /> 
        <List>
          <ListItem className={classes.listItemm} button component={Link} to='/'>
            <ListItemText primary='I T E M S' />
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem} button component={Link} to='/CreateItem'>
            <ListItemText primary='A D D    I T E M' />
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem} button component={Link} to='/BorrowItem'>
            <ListItemText primary='B O R R O W ' />
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem} button component={Link} to='/ItemLibrary'>
            <ListItemText primary='L I B R A R Y ' />
          </ListItem>
        </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} /> 
            <Route path='/' exact component={MyItems} />
            <Route path='/CreateItem' component={CreateItem} />
            <Route path='/BorrowItem' component={BorrowItem} />
            <Route path='/ItemLibrary' component={ItemLibrary} />
        </main>
    </div>
  )
};

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
