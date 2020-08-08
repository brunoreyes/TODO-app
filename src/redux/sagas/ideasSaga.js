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
    yield console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_IDEAS', payload: response.data });
  } catch (error) {
    console.log('Trouble getting ideas to display', error);
  }
}

function* addIdea(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.post('/api/ideas', action.payload, config);
    yield console.log(
      'response from /api/ideas post',
      response,
      action.payload
    );
    //call refresh of Get Data list
    yield put({ type: 'FETCH_IDEAS' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

// function* addIdea(payload) {
//   try {
//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//     };
//     const response = yield axios.post('/api/ideas', payload.payload);
//     yield console.log('response from /api/ideas post', response);
//     //call refresh of Get Data list
//     yield put({ type: 'FETCH_IDEAS' });
//   } catch (error) {
//     console.log('Error with user logout:', error);
//   }
// }

function* IdeasSaga() {
  yield takeLatest('FETCH_IDEAS', getIdeas);
  yield takeLatest('ADD_IDEA', addIdea);
}

export default IdeasSaga;
