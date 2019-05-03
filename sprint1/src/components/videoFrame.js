import React from "react";
// =============================================================================
//            Video Frame/Player
// =============================================================================
function Video(props) {
  return (
    <div className="video">
      <div className="video__container">
        <video className="video__frame" poster={props.source} />
        <VideoControls />
      </div>
    </div>
  );
}

function VideoControls() {
  return (
    <div className="video__controls">
      <button className="play" />
      <div className="scrubBar">
        <div className="scrubBar__timeline">
          {/*TODO change this to ranger slider?*/}
          <div className="scrubBar__scrub" />
        </div>
        <div className="scrubBar__time"> 0:00 / 4:34 </div>
      </div>
      <div className="buttons-right">
        <button className="fullscreen" />
        <button className="volume" />
      </div>
    </div>
  );
}

export default Video;
