import React from "react";
import vidThumb from "../assets/Images/Upload-video-preview.jpg";
import { Link } from "react-router-dom";
import { withLastLocation } from 'react-router-last-location'

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.publishBtn = React.createRef();
  }
  /**
    * Check if fields are empty/default value and call functions to apply/remove error styling
    */
  isEmptySubmission = (field) => {
    if (
      field.value === field.defaultValue ||
      !field.value.trim() //Checks for all whitespace (newline, space, tab, etc)
    ) {
      return true;
    }
  }

  render() {
    let { publishVideo, submissionMsg, submissionMsgClass, handleSuccessMessage, handleErrorMessage, lastLocation } = this.props;
    let submitHandler = (event) => {
      event.preventDefault();
      const titleField = event.target.videoTitle;
      const descriptionField = event.target.videoDescription;
      if (!this.isEmptySubmission(titleField) && !this.isEmptySubmission(descriptionField)) {
        publishVideo(titleField.value, descriptionField.value, this.publishBtn.current);
        titleField.value = "";
        descriptionField.value = '';
        handleSuccessMessage(true);
      }
      else {
        handleErrorMessage(true);
      }
    }
    let path = lastLocation ? lastLocation : '/'
    return (
      <main>
        <hr className="upperDivider" />
        <h1>Upload Video</h1>
        <hr className="lowerDivider" />
        <div className="upload-container">
          <div className="main-content__flexContainer">
            <div className="thumbnail">
              <h5 className="thumbnail__title">VIDEO THUMBNAIL</h5>
              <img
                src={vidThumb}
                alt="video thumbnail"
                className="thumbnail__image"
              />
            </div>
            <form id='uploadForm' onSubmit={submitHandler}>
              <label htmlFor="videoTitle">
                <h5> TITLE YOUR VIDEO</h5>
              </label>
              <input
                type="text"
                name="videoTitle"
                placeholder="Add a title to your video"
              />

              <label htmlFor="videoDescription">
                <h5> ADD A VIDEO DESCRIPTION</h5>
              </label>
              <textarea
                name="videoDescription"
                placeholder="Add a description of your video"
              />
              <h3 className={submissionMsgClass}> {submissionMsg}</h3>
            </form>
          </div>
          <hr className="buttonsDivider" />
          <div className="buttonsContainer">
            <button className="publishBtn" form='uploadForm' ref={this.publishBtn}>PUBLISH</button>
            <div className="cancelContainer">
              <Link to={path}> Cancel </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default withLastLocation(Upload);
