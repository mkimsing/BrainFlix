import React from "react";

class RelatedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef(); //Ref to the related video card's title
    this.origTitle = this.props.video.title;
    this.state = {
      titleText: this.props.video.title
    };
  }

  render() {
    let { channel, image } = this.props.video;
    return (
      <div className="videoCard">
        <img
          src={image}
          className="videoCard__img"
          alt=" Related Video Thumbnail"
        />
        <div className="videoCard__text">
          <h2 className="videoCard__title" ref={this.titleRef}>
            {this.state.titleText}
          </h2>
          <h4 className="videoCard__channel">{channel}</h4>
        </div>
      </div>
    );
  }
}

export default RelatedVideo;
