import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIdeas() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/ideas', config);
    console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_IDEAS', payload: response.data });
  } catch (error) {
    console.log('Trouble getting ideas to display', error);
  }
}
// update user input changes
function* editIdea(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put('api/ideas/' + action.payload.id, action.payload);
    // const response =
    // yield axios.get('api/ideas/' + action.payload.id);

    //  yield put({ type: 'SET_IDEAS', payload: response.data });
    yield put({ type: 'FETCH_IDEAS' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing idea from server', error);
  }
}

function* addIdea(action) {
  try {
    yield axios.post('/api/ideas', action.payload);
    console.log('response from /api/ideas post', action.payload);
    // console.log(action.payload);

    //call refresh of Get Data list
    yield put({ type: 'FETCH_IDEAS' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* deleteIdea(action) {
  try {
    // const response =
    yield axios.delete(`/api/ideas/${action.payload}`);
    console.log('response from /api/ideas delete', action.payload);
    //call refresh of Get Data list
    yield put({ type: 'FETCH_IDEAS' });
  } catch (error) {
    console.log('Error with user logout:', error);
    console.log('response from /api/ideas delete', action);
  }
}

function* IdeasSaga() {
  yield takeLatest('FETCH_IDEAS', getIdeas);
  yield takeLatest('ADD_IDEA', addIdea);
  yield takeLatest('DELETE_IDEA', deleteIdea);
  yield takeLatest('UPDATE_IDEA', editIdea);
}

export default IdeasSaga;
