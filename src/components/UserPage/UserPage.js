import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { Link } from 'react-router-dom';
import {
  withStyles,
  // Link,
  Grid,
  // IconButton,
} from '@material-ui/core';
const styles = () => ({
  allContainer: {},
  one: {
    'background-color': '#53DD6C',
    '&:hover': {
      'background-color': '#161616',
      // border: '#161616 solid 1px',
    },
    flexGrow: 1,
    height: 860,
  },
  two: {
    'background-color': '#e53935',
    '&:hover': {
      'background-color': '#161616',
      // border: '#161616 solid 1px',
    },
    flexGrow: 1,
    height: 860,
  },
  three: {
    'background-color': 'gold',
    '&:hover': {
      'background-color': '#161616',
      // border: '#161616 solid 1px',
    },
    flexGrow: 1,
    height: 860,
  },
  four: {
    'background-color': '#33A1FD',
    '&:hover': {
      'background-color': '#161616',
      // border: '#161616 solid 1px',
    },
    flexGrow: 1,
    height: 860,
  },
  blackKey: { 'background-color': '#fff', flexGrow: 1, height: 860 },
  checkboxIcon: {
    color: '#161616',
    // justify: 'center',
    // 'text-align': 'center',
    alignContent: 'center',
    alignItems: 'center',
    // width: 'auto',
    width: '100%',
    // height: '100%',
    // 'text-align': 'center',
    margin: '90px auto 20px auto',
    // border: '#161616 solid 1px',
    // display: 'inline-block',
    'font-size': '500px',
    '&:hover': {
      color: '#53DD6C',
      // border: '#161616 solid 1px',
    },
    // display: 'block',
  },
  lightbulbIcon: {
    color: '#161616',
    // justify: 'center',
    // 'text-align': 'center',
    alignContent: 'center',
    alignItems: 'center',
    // width: 'auto',
    width: '100%',
    // height: '100%',
    // 'text-align': 'center',
    margin: '90px auto 20px auto',
    // border: '#161616 solid 1px',
    // display: 'inline-block',
    'font-size': '500px',
    '&:hover': {
      color: 'gold',
      // border: '#161616 solid 1px',
    },
    // display: 'block',
  },
  bellIcon: {
    color: '#161616',
    // justify: 'center',
    // 'text-align': 'center',
    alignContent: 'center',
    alignItems: 'center',
    // width: 'auto',
    width: '100%',
    // height: '100%',
    // 'text-align': 'center',
    margin: '90px auto 20px auto',
    // border: '#161616 solid 1px',
    // display: 'inline-block',
    'font-size': '500px',
    '&:hover': {
      color: '#e53935',
      // border: '#161616 solid 1px',
    },
    // display: 'block',
  },
  bubbleIcon: {
    color: '#161616',
    // justify: 'center',
    // 'text-align': 'center',
    alignContent: 'center',
    alignItems: 'center',
    // width: 'auto',
    width: '100%',
    // height: '100%',
    // 'text-align': 'center',
    margin: '90px auto 20px auto',
    // border: '#161616 solid 1px',
    // display: 'inline-block',
    'font-size': '500px',
    '&:hover': {
      color: '#33A1FD',
      // border: '#161616 solid 1px',
    },
    // display: 'block',
  },
  welcome: {
    'text-align': 'center',
    margin: '0px 0px 0px 0px',
    font: '500 25px Montserrat, sans-serif',
    // color: '#161616',
  },
});
class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    const { classes } = this.props;
    return (
      <span>
        <Nav />
        <Grid container spacing={24}>
          <Grid className={classes.one} item xs={3}>
            <Link to="/tasks">
              <CheckBoxIcon className={classes.checkboxIcon} />
            </Link>
            <div className="userPage">
              {/* <h1 id="welcome" className={classes.welcome}>
                Welcome, {this.props.user.first_name}!
              </h1> */}

              {/* <p>Your ID is: {this.props.user.id}</p> */}
              {/* <LogOutButton className="log-in" /> */}
            </div>
          </Grid>{' '}
          <Grid className={classes.two} item xs={3}>
            {' '}
            <Link to="/reminders">
              <NotificationsIcon className={classes.bellIcon} />
            </Link>
          </Grid>
          <Grid className={classes.three} item xs={3}>
            {' '}
            <Link to="/ideas">
              <EmojiObjectsIcon className={classes.lightbulbIcon} />
            </Link>
          </Grid>{' '}
          <Grid className={classes.four} item xs={3}>
            {' '}
            <Link to="/memories">
              <BubbleChartIcon className={classes.bubbleIcon} />
            </Link>
          </Grid>
        </Grid>
        <Footer />
      </span>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(UserPage));
