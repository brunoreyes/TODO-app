import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Link } from 'react-router-dom';

// This is the infinity icon
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

// This is the lightbulb icon
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { withStyles } from '@material-ui/core';
// import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import LockIcon from '@material-ui/icons/Lock';
// import PersonIcon from '@material-ui/icons/Person';
const styles = (theme) => ({
  titleIcon: {
    color: 'white',
    fontSize: '50px',
    margin: '16px 1px -13px 10px',
    padding: '0px 0px 0px 10px',
  },
  linkIcon: {
    // color: 'white',
    // 'background-color': 'white',
    margin: '0px 5px -5px 10px',
    fontSize: '25px',
  },
});
let classes = {};
const Nav = (props) => (
  ({ classes } = props),
  (
    // <Paper elevation={2}>

    <div className="nav">
      <Link to="/home">
        <AllInclusiveIcon className={classes.titleIcon} />
        <h2 className="nav-title"> TODO</h2>
      </Link>
      {/* <NavBar className="nav-center" /> */}

      <div className="nav-right">
        <Link className="nav-link" to="/tasks">
          <CheckBoxIcon className={classes.linkIcon} />
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Tasks' : 'Tasks'}
        </Link>

        <Link className="nav-link" to="/reminders">
          <NotificationsIcon className={classes.linkIcon} />
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Reminders' : 'Reminders'}
        </Link>

        <Link className="nav-link" to="/ideas">
          <EmojiObjectsIcon className={classes.linkIcon} />
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Ideas' : 'Ideas'}
        </Link>
        <Link className="nav-link" to="/memories">
          <BubbleChartIcon className={classes.linkIcon} />
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Memories' : 'Memories'}
        </Link>
        <Link className="nav-link" to="/statistics">
          <BarChartIcon className={classes.linkIcon} />
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Statistics' : 'Statistics'}
        </Link>
        {/* <Link className="nav-link" to="/home">
          <PersonIcon className={classes.linkIcon} />

          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* {props.user.id ? 'Account' : 'Account'}
        </Link> */}
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.user.id && (
          <>
            {/* <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            <LogOutButton className="nav-link" />
            {/* <ExitToAppIcon /> */}
          </>
        )}
        {/* Always show this link since the about page is not protected */}
      </div>
    </div>
  )
  // </Paper>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
});

export default withStyles(styles)(connect(mapStateToProps)(Nav));
