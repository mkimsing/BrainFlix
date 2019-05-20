import React, { Component } from 'react'
import vidThumb from "../assets/Images/Upload-video-preview.jpg";
import Upload from "../components/Upload"

import apiInfo from "../utils/apiInfo";
import axios from "axios";
import AxiosError from "../components/errors/AxiosError";

export default class UploadContainer extends Component {
  state = {
    submissionMsg: "Please enter a title and a description!",
    submissionMsgClass: "submissionMsg--hidden",
    error: {}
  }

  publishVideo = (title, description) => {
    console.log('Uploading!')
    axios
      .post(
        `${apiInfo.API_URL}/videos${
        apiInfo.API_KEY
        }`,
        {
          title: title,
          channel: "Mohan Muruge",
          image: vidThumb,
          description: description,
          video: 'https://project-2-api.herokuapp.com/stream',
          duration: '3:22'
        }
      )
      .then(response => {
        // Navigate user to their newly published video
        let location = {
          pathname: `/videos/${response.data.id}`,
        }
        this.props.history.push(location)
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: {
            caught: true,
            response: error.response
          }
        });
      });
  }

  //Change msg text and apply success message styling
  handleSuccessMessage = applyStyling => {
    let newClass;
    if (applyStyling) {
      newClass = ["submissionMsg--success"];
      this.setState({
        submissionMsg: "Thanks for Uploading!"
      });
    } else {
      newClass = ["submissionMsg--hidden"];
    }

    this.setState({
      submissionMsgClass: newClass
    });
  };

  //Change msg text and apply error msg styling
  handleErrorMessage = applyStyling => {
    let newClass;
    if (applyStyling) {
      newClass = ["submissionMsg--error"];
      this.setState({
        submissionMsg: "Please enter a title and a description!"
      });
    } else {
      newClass = ["submissionMsg--hidden"];
    }

    this.setState({
      submissionMsgClass: newClass
    });
  };

  render() {
    let { error } = this.state
    if (error.caught) {
      return (
        <AxiosError
          error={error.response}
          unsetError={this.unsetError}
        />
      );
    }
    return (
      <Upload
        publishVideo={this.publishVideo}
        submissionMsg={this.state.submissionMsg}
        submissionMsgClass={this.state.submissionMsgClass}
        handleErrorMessage={this.handleErrorMessage}
        handleSuccessMessage={this.handleSuccessMessage} />
    )
  }
}
