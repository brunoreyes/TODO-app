import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import './ImageUpload.css';
import ImageIcon from '@material-ui/icons/Image';

// s3 comes from react
const dropStyles = {
  'margin-top': '20px',
};
class ImageUpload extends Component {
  // handleFinishedUpload = (info) => {
  //   console.log('info:', info);
  //   console.log('File uploaded with filename:', info.filename);
  //   console.log('Access it on s3 at:', info.fileUrl);
  //   this.props.dispatch({ type: 'POST_IMAGE_URL', payload: info.fileUrl });
  // };
  render() {
    const uploadOptions = {
      server: 'https://warm-shore-09020.herokuapp.com',
      //   server: 'https://localhost:5000',
    };

    const s3Url = 'http://brunobucket.s3.amazonaws.com';

    const innerDropElement = (
      <div className="inner-drop">
        <p>
          Upload <ImageIcon className="image-icon" />
        </p>
      </div>
    );
    return (
      <span className="uploaderContainer">
        <DropzoneS3Uploader
          children={innerDropElement}
          onFinish={this.props.handleFinishedUpload}
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
