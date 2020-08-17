import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* completeTask(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put('api/complete/' + action.payload.id, action.payload);
    yield put({ type: 'FETCH_TASKS' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing task to complete status from server', error);
  }
}

function* completeSaga() {
  yield takeLatest('CHANGE_COMPLETE_STATUS_TASK', completeTask);
}

export default completeSaga;
