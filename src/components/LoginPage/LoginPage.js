import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';
import {
  withStyles,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  Link,
  Grid,
  // IconButton,
} from '@material-ui/core';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Fade from 'react-reveal/Fade';
// import PersonIcon from '@material-ui/icons/Person';
// import LockIcon from '@material-ui/icons/Lock';

const styles = () => ({
  allContainer: {},
  leftSide: { 'background-color': '#161616', flexGrow: 1, height: 860 },
  rightSide: { 'background-color': 'white', flexGrow: 1, height: 860 },
  infinityIcon: {
    color: '#ffffff',
    // justify: 'center',
    // 'text-align': 'center',
    alignContent: 'center',
    alignItems: 'center',
    // width: 'auto',
    width: '100%',
    // height: '100%',
    // 'text-align': 'center',
    margin: '90px auto 20px auto',
    // display: 'inline-block',
    'font-size': '500px',

    display: 'block',
  },
  infinityControl: { 'text-align': 'center', width: 'auto' },
  infinitytext: {
    font: '500 30px Montserrat, sans-serif',
    color: 'white',
    margin: '-100px auto 20px auto',
  },
  formContainer: {
    'background-color': 'white',
    'text-align': 'center',
  },
  logoControl: {
    font: '700 50px Montserrat, sans-serif',
    margin: '0px 0px 20px 0px',
  },
  formControl: { margin: '0px 0px 15px 0px', width: '100%' },
  inputControl: { margin: '0px 0px 15px 0px', width: '100%' },
  inputLabel: {
    font: '  500 15px Montserrat, sans-serif',
  },
  inputHelper: { font: '500 12px Montserrat, sans-serif' },
  submitButton: {
    color: '#fff',
    'background-color': '#161616',
    'font-size': '15px',
    'font-family': ' Montserrat',
    'text-transform': 'capitalize',
    border: '#161616 solid 1px',
    margin: '10px 0px 80px 0px',
    padding: '8px 16px 8px 16px',
    'border-radius': '25px',
    '&:hover': {
      color: '#161616',
      'background-color': '#fff',
      border: '#161616 solid 1px',
    },
    'text-align': 'center',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  register: {
    'text-align': 'center',
    margin: '0px 0px 0px 0px',
    font: '500 15px Montserrat, sans-serif',
    color: '#161616',
  },
});
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid className={classes.leftSide} item xs={6}>
          <div className={classes.infinityControl}>
            <Fade>
              {' '}
              <AllInclusiveIcon className={classes.infinityIcon} />{' '}
            </Fade>
            <p className={classes.infinitytext}>It Means Everything</p>
          </div>
        </Grid>
        <Grid className={classes.rightSide} item xs={6}>
          <div className="loginPage">
            {this.props.errors.loginMessage && (
              <h2 className="alert" role="alert">
                {this.props.errors.loginMessage}
              </h2>
            )}
            <form
              className={classes.formContainer}
              onSubmit={this.login}
              autocomplete="off"
            >
              <h2 className={classes.logoControl}>TODO</h2>
              <FormControl className={classes.formControl}>
                <div>
                  <InputLabel className={classes.inputLabel} htmlFor="username">
                    Username
                    {/* Username */}
                  </InputLabel>
                  <Input
                    type="text"
                    name="username"
                    className={classes.inputControl}
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                  />
                  <FormHelperText className={classes.inputHelper}>
                    Required *
                  </FormHelperText>
                </div>
              </FormControl>
              <FormControl className={classes.formControl}>
                <div>
                  <InputLabel className={classes.inputLabel} htmlFor="password">
                    Password
                    {/* Password */}
                  </InputLabel>
                  <Input
                    type="password"
                    name="password"
                    className={classes.inputControl}
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
                  <FormHelperText className={classes.inputHelper}>
                    Required *
                  </FormHelperText>
                </div>
              </FormControl>

              <div>
                <Button
                  disableElevation
                  className={classes.submitButton}
                  // className="log-in"
                  type="submit"
                  name="submit"
                  value="Log In"
                >
                  Submit
                </Button>
                <Link
                  className={classes.register}
                  type="button"
                  // className="link-button"
                  onClick={() => {
                    this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
                  }}
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
