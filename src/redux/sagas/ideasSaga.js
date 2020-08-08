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

    // const response = yield axios.get('/api/ideas');
    console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_IDEAS', payload: response.data });
  } catch (error) {
    console.log('Trouble getting ideas to display', error);
  }
}

function* addIdea(action) {
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };
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

// function* deleteIdea(payload) {
//   try {
//     // const response =
//     yield axios.delete(`/api/ideas/${payload.payload}`);
//     console.log('response from /api/ideas delete', payload.payload);
//     //call refresh of Get Data list
//     yield put({ type: 'FETCH_IDEAS' });
//   } catch (error) {
//     console.log('Error with user logout:', error);
//   }
// }

function* IdeasSaga() {
  yield takeLatest('FETCH_IDEAS', getIdeas);
  yield takeLatest('ADD_IDEA', addIdea);
  yield takeLatest('DELETE_THIS', deleteIdea);
}

export default IdeasSaga;
