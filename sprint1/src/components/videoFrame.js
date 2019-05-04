import React from "react";
// =============================================================================
//            Video Frame/Player
// =============================================================================
function Video(props) {
  return (
    <div className="video">
      <div className="video__container">
        <video className="video__frame" poster={props.image} />
        <VideoControls duration={props.duration} />
      </div>
    </div>
  );
}

//TODO change scrubber to range-slider?
function VideoControls(props) {
  return (
    <div className="video__controls">
      <button className="play" />
      <div className="scrubBar">
        <div className="scrubBar__timeline">
          <div className="scrubBar__scrub" />
        </div>
        <div className="scrubBar__time"> 0:00 / {props.duration}</div>
      </div>
      <div className="buttons-right">
        <button className="fullscreen" />
        <button className="volume" />
      </div>
    </div>
  );
}

export default Video;
