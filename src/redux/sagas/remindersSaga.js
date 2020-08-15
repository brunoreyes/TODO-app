import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getReminders() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/reminders', config);
    console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_REMINDERS', payload: response.data });
  } catch (error) {
    console.log('Trouble getting reminders to display', error);
  }
}
// update user input changes
function* editReminder(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put('api/reminders/' + action.payload.id, action.payload);
    // const response =
    // yield axios.get('api/reminders/' + action.payload.id);

    //  yield put({ type: 'SET_REMINDERS', payload: response.data });
    yield put({ type: 'FETCH_REMINDERS' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing reminder from server', error);
  }
}

function* addReminder(action) {
  try {
    yield axios.post('/api/reminders', action.payload);
    console.log('response from /api/reminders post', action.payload);
    // console.log(action.payload);

    //call refresh of Get Data list
    yield put({ type: 'FETCH_REMINDERS' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* deleteReminder(action) {
  try {
    // const response =
    yield axios.delete(`/api/reminders/${action.payload}`);
    console.log('response from /api/reminders delete', action.payload);
    //call refresh of Get Data list
    yield put({ type: 'FETCH_REMINDERS' });
  } catch (error) {
    console.log('Error with user logout:', error);
    console.log('response from /api/reminders delete', action);
  }
}

function* RemindersSaga() {
  yield takeLatest('FETCH_REMINDERS', getReminders);
  yield takeLatest('ADD_REMINDER', addReminder);
  yield takeLatest('DELETE_REMINDER', deleteReminder);
  yield takeLatest('UPDATE_REMINDER', editReminder);
}

export default RemindersSaga;
