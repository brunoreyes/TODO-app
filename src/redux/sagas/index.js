import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import imageInfoSaga from './imageInfoSaga';
import ideasSaga from './ideasSaga';
import categorySaga from './categorySaga';
import favoriteSaga from './favoriteSaga';
import memoriesSaga from './memoriesSaga';
import remindersSaga from './remindersSaga';
import tasksSaga from './tasksSaga';
import completeSaga from './completeSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    imageInfoSaga(),
    ideasSaga(),
    categorySaga(),
    favoriteSaga(),
    memoriesSaga(),
    remindersSaga(),
    tasksSaga(),
    completeSaga(),
  ]);
}
