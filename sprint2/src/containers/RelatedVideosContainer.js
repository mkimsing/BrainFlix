import React, { Component } from "react";
import RelatedVideo from "../components/RelatedVideo";
import axios from 'axios'

let API_KEY = '?api_key=28aa92a7-4c80-4cc0-b6b7-ca60b6b07dd3';
let API_URL = 'https://project-2-api.herokuapp.com';

class RelatedVideosContainer extends Component {
  state = {
    relatedVideos: []
  };

  //TODO query API for sideVideos here
  componentDidMount() {
    axios.get(API_URL + '/videos' + API_KEY)
      .then(response => {
        this.setState({
          relatedVideos: response.data
        })
      })
  }
  render() {

    return (
      <>
        <aside className=" relatedVideos">
          <h5 className="relatedVideos__title">NEXT VIDEO</h5>
          {this.state.relatedVideos.map(video => {
            //Do not include the video being played
            if (!(video.id === this.props.id)) {
              return <RelatedVideo video={video} />;
            }
            else return <></>
          })}
        </aside>
      </>
    );
  }
}

export default RelatedVideosContainer;
