import React, { Component } from "react";
import VideoFrame from "../components/VideoFrame";
import VideoMeta from "../components/VideoMeta";
import CommentsContainer from "./CommentsContainer";
import RelatedVideosContainer from "./RelatedVideosContainer";

import avatar_mohan from "../assets/Images/Mohan-muruge.jpg"; // Ensure we have avatar image
import avatars from "../utils/avatars"; //Import avatar array
import apiInfo from "../utils/apiInfo";
import axios from "axios";

//Import video file
// import video from "../assets/Video/BrainStation Sample Video.mp4";

//TODO rename this if needed (is different from file name)
class MainVideoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainVideoData: {
        video: "",
        duration: 0,
        image: "",
        comments: []
      } //Need blank data to avoid undefined errors for now
    };
    this.randomAvatars = this.randomizeArray(avatars); //TODO check if Issue with re-randomizing
  }

  //Shuffle avatar array to generate order of avatars using Fisher-Yates
  randomizeArray = arr => {
    for (
      var j, x, i = arr.length;
      i;
      j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  };

  fetchVideoData = () => {
    let queryId = "";
    if (this.props.match.params.id) {
      queryId = this.props.match.params.id;
    } else {
      queryId = "1af0jruup5gu";
    }
    axios
      .get(apiInfo.API_URL + "/videos/" + queryId + apiInfo.API_KEY)
      .then(response => {
        let randomAvatars = this.randomizeArray(avatars); //TODO check if Issue with re-randomizing

        //Add in avatar images to the loaded comments
        response.data.comments = response.data.comments.map(
          (comment, index) => {
            //Pseudo checking on name to keep 'Mohan' avatar image on reload
            let newAvatar =
              comment.name === "Mohan Muruge"
                ? avatar_mohan
                : randomAvatars[index % randomAvatars.length];
            return {
              ...comment,
              avatar: newAvatar
            };
          }
        );

        this.setState({
          mainVideoData: response.data
        });
      });
  };

  componentDidMount() {
    this.fetchVideoData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id === prevProps.match.params.id) {
      return; // Prevent repeat calls as per documentation
    } else {
      this.fetchVideoData();
    }
  }

  submitComment = commentText => {
    axios
      .post(
        `${apiInfo.API_URL}/videos/${this.state.mainVideoData.id}/comments${
          apiInfo.API_KEY
        }`,
        { name: "Mohan Muruge", comment: commentText }
      )
      .then(response => {
        let newComment = {
          ...response.data,
          avatar: avatar_mohan
        };

        this.setState({
          mainVideoData: {
            ...this.state.mainVideoData,
            comments: this.state.mainVideoData.comments.concat(newComment)
          }
        });
      });

    //TODO catch errors from axios
  };

  deleteComment = commentId => {
    axios
      .delete(
        `${apiInfo.API_URL}/videos/${
          this.state.mainVideoData.id
        }/comments/${commentId}${apiInfo.API_KEY}`
      )
      .then(response => {
        let newArr = this.state.mainVideoData.comments.filter(
          comment => comment.id !== commentId
        );
        this.setState({
          mainVideoData: {
            ...this.state.mainVideoData,
            comments: newArr
          }
        });
      });
  };

  render() {
    let { video, duration, image, comments, id } = this.state.mainVideoData;
    return (
      <>
        <VideoFrame
          video={video + apiInfo.API_KEY}
          duration={duration}
          image={image}
        />
        <div className="mainFlexContainer">
          <div>
            <VideoMeta {...this.state.mainVideoData} />
            <CommentsContainer
              comments={comments.slice().reverse()}
              submitComment={this.submitComment}
              deleteComment={this.deleteComment}
            />
          </div>
          <RelatedVideosContainer id={id} />
        </div>
      </>
    );
  }
}

export default MainVideoContainer;
