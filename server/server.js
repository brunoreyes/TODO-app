const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const imageUrlRouter = require('./routes/image-url.router');
const ideasRouter = require('./routes/ideas.router');
const categoryRouter = require('./routes/category.router');
const favoriteRouter = require('./routes/favorite.router');
// UploaderS3Router added below
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/imageurl', imageUrlRouter);
app.use('/api/ideas', ideasRouter);
app.use('/api/category', categoryRouter);
app.use('/api/favorite', favoriteRouter);
// AWS S3 image upload
app.use(
  '/s3',
  UploaderS3Router({
    bucket: 'brunobucket', // required
    region: 'us-east-1', // optional
    headers: { 'Access-Control-Allow-Origin': '*' }, // optional
    ACL: 'public-read', // this is the default - set to `public-read` to let anyone view uploads
  })
);

// app.post('/*', (req, res) => {
//   console.log('GOT IT');

// })

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
