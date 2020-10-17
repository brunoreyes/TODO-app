import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Displaying Categories
function* getCategories() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // The config includes credentials which
    //  allow the server session to recognize the user
    // If a user is logged in, this will return their information
    //  from the server session (req.user)

    const response = yield axios.get('/api/category', config);
    yield console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_CATEGORIES', payload: response.data });
  } catch (error) {
    console.log('Trouble getting ideas to display', error);
  }
}

// Adding a Category
function* addCategory(payload) {
  try {
    const response = yield axios.post('/api/category', payload.payload);
    yield console.log('response from /api/category post', response);
    //call refresh of Get Data list
    yield put({ type: 'FETCH_CATEGORIES' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* categorySaga() {
  yield takeLatest('FETCH_CATEGORIES', getCategories);
  yield takeLatest('ADD_CATEGORY', addCategory);
}

export default categorySaga;
