import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import './ImageUpload.css';

// s3 comes from react
const dropStyles = {
  // width: '200px',
  // height: '70px',
  // border: '1px solid black',
  // 'background-color': '#dddddd',
  // margin: 'auto',
  'margin-top': '20px',
  // hover: {
  //   '&:hover': {
  //     backgroundColor: 'black',
  //   },
  // },
};
class ImageUpload extends Component {
  handleFinishedUpload = (info) => {
    console.log('info:', info);
    console.log('File uploaded with filename:', info.filename);
    console.log('Access it on s3 at:', info.fileUrl);
    this.props.dispatch({ type: 'POST_IMAGE_URL', payload: info.fileUrl });
  };
  render() {
    const uploadOptions = {
      server: 'https://warm-shore-09020.herokuapp.com',
      //   server: 'https://localhost:5000',
    };

    const s3Url = 'http://brunobucket.s3.amazonaws.com';

    const innerDropElement = (
      <div class="inner-drop">
        <p>or Upload/Drop Image</p>
      </div>
    );
    return (
      <span className="uploaderContainer">
        <DropzoneS3Uploader
          children={innerDropElement}
          onFinish={this.handleFinishedUpload}
          s3Url={s3Url}
          style={dropStyles}
          maxSize={1024 * 1024 * 5}
          upload={uploadOptions}
        />
      </span>
    );
  }
}

export default connect()(ImageUpload);
