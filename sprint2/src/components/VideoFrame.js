import React from "react";
// =============================================================================
//            Video Frame/Player
// =============================================================================

//TODO move to container folder?
class VideoFrame extends React.Component {
  constructor(props) {
    super(props);
    this.videoElement = React.createRef();
    this.controlsBarElement = React.createRef();
    this.state = {
      videoDuration: this.formatDuration(0),
      playBtnModifier: "play--play"
    };
    this.intervalRef = "";
  }

  componentDidMount() {
    this.setState({
      videoDuration: this.formatDuration(this.videoElement.current.currentTime)
    });
  }

  //TODO have this work when clicking the frame as well as button
  togglePlay = () => {
    let video = this.videoElement.current;
    if (video.paused) {
      video.play();
      this.setState({
        playBtnModifier: "play--pause"
      });
      //Have interval tick every half second to update duration
      this.intervalRef = setInterval(() => {
        this.setState({
          videoDuration: this.formatDuration(
            this.videoElement.current.currentTime
          )
        });
      }, 500);
    } else {
      video.pause();
      clearInterval(this.intervalRef);
      this.setState({
        playBtnModifier: "play--play"
      });
    }
  };

  /**
   * Takes a number in seconds and formats in mm:ss
   * Note: will not work for times greater than 59:59
   */
  formatDuration = seconds => {
    let str = new Date(1000 * seconds).toISOString().substr(15, 4);
    return str;
  };

  render() {
    let { image, video, duration } = this.props;
    return (
      <div className="video">
        <div className="video__container">
          <video
            className="video__frame"
            poster={image}
            src={video}
            ref={this.videoElement}
          />
          <div className="video__controls">
            <button
              className={`play ${this.state.playBtnModifier}`}
              onClick={this.togglePlay}
            />
            <div className="scrubBar">
              <div className="scrubBar__timeline">
                <div className="scrubBar__scrub" />
              </div>
              <div className="scrubBar__time">
                {this.state.videoDuration} / {duration}
              </div>
            </div>
            <div className="buttons-right">
              <button className="fullscreen" />
              <button className="volume" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoFrame;
