import React, { Component } from 'react'
import RelatedVideo from "../components/relatedVideo"

class RelatedVideos extends Component {
  state = {
    relatedVideos: this.props.relatedVideos
  }
  render() {
    console.log(this.state.relatedVideos)
    return (
      <>
        <h5 className='relatedVideos__title'>NEXT VIDEO</h5>
        {this.state.relatedVideos.map(video => {
          return <RelatedVideo video={video} />;
        })}
      </>
    )
  }
}

export default RelatedVideos