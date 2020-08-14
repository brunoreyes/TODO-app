import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMemories() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/memories', config);
    console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_MEMORIES', payload: response.data });
  } catch (error) {
    console.log('Trouble getting memories to display', error);
  }
}
// update user input changes
function* editMemory(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put('api/memories/' + action.payload.id, action.payload);
    // const response =
    // yield axios.get('api/memories/' + action.payload.id);

    //  yield put({ type: 'SET_MEMORIES', payload: response.data });
    yield put({ type: 'FETCH_MEMORIES' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing memory from server', error);
  }
}

function* addMemory(action) {
  try {
    yield axios.post('/api/memories', action.payload);
    console.log('response from /api/memories post', action.payload);
    // console.log(action.payload);

    //call refresh of Get Data list
    yield put({ type: 'FETCH_MEMORIES' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* deleteMemory(action) {
  try {
    // const response =
    yield axios.delete(`/api/memories/${action.payload}`);
    console.log('response from /api/memories delete', action.payload);
    //call refresh of Get Data list
    yield put({ type: 'FETCH_MEMORIES' });
  } catch (error) {
    console.log('Error with user logout:', error);
    console.log('response from /api/memories delete', action);
  }
}

function* memoriesSaga() {
  yield takeLatest('FETCH_MEMORIES', getMemories);
  yield takeLatest('ADD_MEMORY', addMemory);
  yield takeLatest('DELETE_MEMORY', deleteMemory);
  yield takeLatest('UPDATE_MEMORY', editMemory);
}

export default memoriesSaga;
