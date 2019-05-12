import React, { Component } from "react";
import VideoFrame from "../components/VideoFrame";
import VideoMeta from "../components/VideoMeta";
import CommentsContainer from "./CommentsContainer";
import RelatedVideosContainer from "./RelatedVideosContainer";

import avatar_mohan from "../assets/Images/Mohan-muruge.jpg"; // Ensure we have avatar image
import avatars from "../utils/avatars"; //Import avatar array
import apiInfo from "../utils/apiInfo";
import axios from "axios";

import AxiosError from "../components/Errors/AxiosError";

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
      }, //Need blank data to avoid undefined errors for now
      videoPaths: [], //TODO move the related videos container's state into this state here?
      error: {
        caught: false,
        response: ''
      }
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
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: {
            caught: true,
            response: error.response
          }
        })
      })
  };

  componentDidMount() {
    this.fetchVideoData();
    axios.get(apiInfo.API_URL + "/videos" + apiInfo.API_KEY)
      .then(response => {
        this.setState({
          videoPaths: response.data.map(video => {
            return video.id;
          })
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: {
            caught: true,
            response: error.response
          }
        })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id === prevProps.match.params.id) {
      return; // Prevent repeat calls as per documentation
    } else {
      this.fetchVideoData();
      this.setState({
        error: {
          caught: false,
          response: ''
        }
      })
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
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: {
            caught: true,
            response: error.response
          }
        })
      })
  };

  deleteComment = commentId => {
    //TODO add better confirmation before deleting
    if (!window.confirm("Are you sure you want to delete the comment?")) {
      return;
    }
    axios
      .delete(
        `${apiInfo.API_URL}/videos/${
        this.state.mainVideoData.id
        }/comments/${commentId}${apiInfo.API_KEY}`
      )
      .then(response => {
        //As per requirements, re-query for new mainVideoData object
        this.fetchVideoData();
      });
  };

  isEmptyObj = obj => {
    return Object.keys(obj).length === 0;
  };

  unsetError = () => {
    this.setState({
      error: {
        caught: false,
        response: ''
      }
    })
  }

  render() {
    if (this.isEmptyObj(this.state.mainVideoData) || this.state.videoPaths.length === 0) {
      return <h3> Loading Content...</h3>;
    }
    if (this.state.error.caught) {
      return <AxiosError error={this.state.error.response} unsetError={this.unsetError} />
    }
    let { video, duration, image, comments, id } = this.state.mainVideoData;

    return (
      <>
        <VideoFrame
          video={video + apiInfo.API_KEY}
          duration={duration}
          image={image}
        />
        <div className="mainFlexContainer">
          <div className='mainContent'>
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
