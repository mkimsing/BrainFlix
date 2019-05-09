import React, { Component } from "react";
import RelatedVideo from "../components/relatedVideo";

class RelatedVideos extends Component {
  state = {
    relatedVideos: this.props.relatedVideos
  };
  render() {
    return (
      <>
        <aside className=" relatedVideos">
          <h5 className="relatedVideos__title">NEXT VIDEO</h5>
          {this.state.relatedVideos.map(video => {
            return <RelatedVideo video={video} />;
          })}
        </aside>
      </>
    );
  }
}

export default RelatedVideos;
