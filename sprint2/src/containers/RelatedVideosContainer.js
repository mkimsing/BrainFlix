import React, { Component } from "react";
import RelatedVideo from "../components/RelatedVideo";
import axios from "axios";
import { Link } from "react-router-dom";
import apiInfo from "../utils/apiInfo";
import AxiosError from "../components/Errors/AxiosError";
class RelatedVideosContainer extends Component {
  state = {
    relatedVideos: [],
    error: false
  };

  componentDidMount() {
    axios.get(apiInfo.API_URL + "/videos" + apiInfo.API_KEY)
      .then(response => {
        this.setState({
          relatedVideos: response.data
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

  render() {
    if (this.state.error.caught) {
      return <AxiosError error={this.state.error.response} unsetError={this.unsetError} />
    }
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
