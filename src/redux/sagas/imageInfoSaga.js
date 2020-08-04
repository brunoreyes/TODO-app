import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postImageUrl(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('POSTING IMAGE URL!');
    const data = {
      imageUrl: action.payload,
    };
    console.log('data:', data, 'config:', config);

    const response = yield axios.post('/api/imageurl', data, config);
    console.log(response);

    //   After post comes back successful do a get
  } catch (error) {
    console.log('Image URL post failed:', error);
  }
}
function* imageInfoSaga() {
  yield takeLatest('POST_IMAGE_URL', postImageUrl);
}

export default imageInfoSaga;
