import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* favoriteTask(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put(
      'api/favorite/favorite/' + action.payload.id,
      action.payload
    );
    yield put({ type: 'FETCH_TASKS' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing idea to favorite status from server', error);
  }
}

function* favoriteReminder(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put(
      'api/favorite/favorite/' + action.payload.id,
      action.payload
    );
    yield put({ type: 'FETCH_REMINDERS' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing idea to favorite status from server', error);
  }
}
function* favoriteIdea(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put(
      'api/favorite/favorite/' + action.payload.id,
      action.payload
    );
    yield put({ type: 'FETCH_IDEAS' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing idea to favorite status from server', error);
  }
}
function* favoriteMemory(action) {
  try {
    // Make sure to debug one at a time, comment out all but one
    console.log('put query with', action.payload);
    yield axios.put(
      'api/favorite/favorite/' + action.payload.id,
      action.payload
    );
    yield put({ type: 'FETCH_MEMORIES' });
  } catch (error) {
    console.log('error query with action.payload.id', action.payload.id);
    console.log('Problem changing idea to favorite status from server', error);
  }
}

function* favoriteSaga() {
  yield takeLatest('CHANGE_FAVORITE_STATUS_TASK', favoriteTask);
  yield takeLatest('CHANGE_FAVORITE_STATUS_REMINDER', favoriteReminder);
  yield takeLatest('CHANGE_FAVORITE_STATUS_IDEA', favoriteIdea);
  yield takeLatest('CHANGE_FAVORITE_STATUS_MEMORY', favoriteMemory);
}

export default favoriteSaga;
