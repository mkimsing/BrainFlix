import React, { Component } from "react";
import RelatedVideo from "../components/RelatedVideo";
import axios from "axios";
import { Link } from "react-router-dom";
import apiInfo from "../utils/apiInfo";

class RelatedVideosContainer extends Component {
  state = {
    relatedVideos: [],
    error: false
  };

  componentDidMount() {
    axios.get(apiInfo.API_URL + "/videos" + apiInfo.API_KEY).then(response => {
      this.setState({
        relatedVideos: response.data
      });
    })
    //TODO add error catching
  }

  render() {
    return (
      <>
        <aside className=" relatedVideos">
          <h5 className="relatedVideos__title">NEXT VIDEO</h5>
          {this.state.relatedVideos.map(video => {
            //Do not include the video being played
            if (!(video.id === this.props.id)) {
              return (
                <Link to={`/videos/${video.id}`}>
                  <RelatedVideo video={video} />
                </Link>
              );
            } else return <></>;
          })}
        </aside>
      </>
    );
  }
}

export default RelatedVideosContainer;
