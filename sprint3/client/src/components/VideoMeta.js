import React from "react";
import timestampHelpers from "../utils/timestamp";

//Note: receives entire video data object as props
function VideoMeta(props) {
  let { title, channel, timestamp, likes, views, description, likeVideo } = props;

  const likeHandler = () => {
    likeVideo();
  }
  return (
    <section className="videoMeta">
      <h1> {title} </h1>
      <div className="videoMeta__container">
        <PostedMeta channel={channel} timestamp={timestamp} />
        <ReactionMeta likes={likes} views={views} likeHandler={likeHandler} />
      </div>
      <hr />
      <h4 className="description">{description}</h4>
    </section>
  );
}

//Meta data about when video was posted
function PostedMeta(props) {
  let { channel, timestamp } = props;
  return (
    <div className="postedContainer">
      <h2>By {channel}</h2>
      <h5>
        {timestampHelpers.generateDateString(timestamp)}
        {timestampHelpers.generateTimeSince(timestamp)}
      </h5>
    </div>
  );
}

//Meta data about reaction to the video
function ReactionMeta(props) {
  let { likes, views } = props;
  return (
    <div className="reactionMeta">
      <div className="reactionMeta__views">
        <div className="viewsIcon" />
        <h4>{views}</h4>
      </div>
      <div className="reactionMeta__likes">
        <button className="likesIcon" onClick={props.likeHandler}></button>
        <h4>{likes}</h4>
      </div>
    </div>
  );
}

export default VideoMeta;
