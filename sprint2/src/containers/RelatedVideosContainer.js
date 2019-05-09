import React, { Component } from "react";
import RelatedVideo from "../components/RelatedVideo";
import axios from 'axios'

import apiInfo from "../utils/apiInfo"

class RelatedVideosContainer extends Component {
  state = {
    relatedVideos: []
  };

  //TODO query API for sideVideos here
  componentDidMount() {
    axios.get(apiInfo.API_URL + '/videos' + apiInfo.API_KEY)
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
