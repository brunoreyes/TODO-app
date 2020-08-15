import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTasks() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/tasks', config);
    console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_TASKS', payload: response.data });
  } catch (error) {
    console.log('Trouble getting tasks to display', error);
  }
}
// update user input changes
function* editTask(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put('api/tasks/' + action.payload.id, action.payload);
    // const response =
    // yield axios.get('api/tasks/' + action.payload.id);

    //  yield put({ type: 'SET_TASKS', payload: response.data });
    yield put({ type: 'FETCH_TASKS' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing task from server', error);
  }
}

function* addTask(action) {
  try {
    yield axios.post('/api/tasks', action.payload);
    console.log('response from /api/tasks post', action.payload);
    // console.log(action.payload);

    //call refresh of Get Data list
    yield put({ type: 'FETCH_TASKS' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* deleteTask(action) {
  try {
    // const response =
    yield axios.delete(`/api/tasks/${action.payload}`);
    console.log('response from /api/tasks delete', action.payload);
    //call refresh of Get Data list
    yield put({ type: 'FETCH_TASKS' });
  } catch (error) {
    console.log('Error with user logout:', error);
    console.log('response from /api/tasks delete', action);
  }
}

function* tasksSaga() {
  yield takeLatest('FETCH_TASKS', getTasks);
  yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('DELETE_TASK', deleteTask);
  yield takeLatest('UPDATE_TASK', editTask);
}

export default tasksSaga;
