import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Fade from 'react-reveal/Fade';

class TasksPage extends Component {
  state = {
    id: this.props.match.params.id,
  };

  componentDidMount() {
    //   use component did mount to dispatch an action to request the SearchList from the API
    // this.props.dispatch({
    //   type: 'FETCH_DETAIL',
    //   payload: this.props.match.params.id,
    //   //
    // });
    // this.props.dispatch({ type: 'FETCH_MOVIES' });
  }
  componentDidMount() {
    // //     //   use component did mount to dispatch an action to request the SearchList from the API
    // //     this.props.dispatch({
    // //       type: 'FETCH_DETAIL',
    // //       payload: this.props.match.params.id,
    // //       //
    // //     });
    // this.props.dispatch({ type: 'FETCH_EDITS' });
  }
  editClicked = () => {
    this.props.history.push(`/Edit/${this.state.id}`);
    // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id
  };
  backClicked = () => {
    this.props.history.push(`/`);
    // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id
  };

  render() {
    return (
      <Fade left>
        <div>
          {/* Examples of conditional rendering: */}
          {/* {this.props.reduxState.details.title !== '' ? 'error' : 'okay'} */}
          {/* {this.props.reduxState.details.title !== undefined ? 'error' : 'okay'} */}

          {/* We used the above two steps to test if details was coming back from the server with something */}
          {/* <pre>{JSON.stringify(this.props.match.params.id)}</pre> */}
          {/* <pre>{JSON.stringify(this.props.reduxState.details)}</pre> */}

          {/* <button onClick={} */}
          {/* {this.props.reduxState.details.map((movieDetails, arraySpot) => ( */}
          {/* {this.props.reduxState.details.title !== undefined ? (
            'error'
          ) : ( */}
          <tr>
            <td>
              <img src={this.props.reduxState.details.poster}></img>
              <h4>{this.props.reduxState.details.title}</h4>
              {/* <p>{this.props.reduxState.details.array_agg}</p> */}

              {/* {this.props.reduxState.details.array_agg.map((genre, index) => (
                <pre key={index}>{genre}</pre>
              ))} */}
              <p>{this.props.reduxState.details.array_agg} </p>

              <p>{this.props.reduxState.details.description}</p>

              <Button
                className="Button"
                variant="contained"
                onClick={this.backClicked}
              >
                BACK
              </Button>
              <span className="ButtonContainer">
                <Button
                  className="Button"
                  variant="contained"
                  onClick={this.editClicked}
                >
                  Edit
                </Button>
              </span>
            </td>
          </tr>
          {/* )} */}
          {/* <button onClick={this.handleEdit}>Edit Information</button> */}
          {/* </span> */}
        </div>
      </Fade>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState,
});

export default connect(putReduxStateOnProps)(TasksPage);
