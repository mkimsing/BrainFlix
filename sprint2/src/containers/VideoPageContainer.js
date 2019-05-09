import React, { Component } from 'react'
import VideoFrame from "../components/VideoFrame";
import VideoMeta from "../components/VideoMeta";
import CommentsContainer from "./CommentsContainer";
import RelatedVideosContainer from "./RelatedVideosContainer";

import avatars from "../components/avatars"; //Import avatar array
import axios from 'axios'

//Import video file
// import video from "../assets/Video/BrainStation Sample Video.mp4";

let API_KEY = '?api_key=28aa92a7-4c80-4cc0-b6b7-ca60b6b07dd3';
let API_URL = 'https://project-2-api.herokuapp.com';

//TODO rename this if needed (is different from file name)
class MainVideoContainer extends Component {
  state = {
    mainVideoData: {
      video: '',
      duration: 0,
      image: '',
      comments: []
    }
  }

  //Shuffle avatar array to generate order of avatars using Fisher-Yates
  randomizeArray = (arr) => {
    for (var j, x, i = arr.length;
      i; j = parseInt(Math.random() * i),
      x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  }

  componentDidMount() {
    axios.get(API_URL + '/videos/1af0jruup5gu' + API_KEY)
      .then(response => {
        let randomAvatars = this.randomizeArray(avatars); //TODO check if Issue with re-randomizing
        response.data.comments = response.data.comments.map((comment, index) => {
          return ({
            ...comment,
            avatar: randomAvatars[index]
          });
        })

        this.setState({
          mainVideoData: response.data
        })
      })
  }

  render() {
    let { video, duration, image, comments, id } = this.state.mainVideoData;
    return (
      <>
        <VideoFrame
          video={video + API_KEY}
          duration={duration}
          image={image}
        />
        <div className="mainFlexContainer">
          <div>
            <VideoMeta {...this.state.mainVideoData} />
            <CommentsContainer comments={comments} />
          </div>
          <RelatedVideosContainer id={id} />
        </div>
      </>
    )
  }
}


export default MainVideoContainer;