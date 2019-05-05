import React from "react";
import timestampHelpers from "../utils/timestamp"
//Receives entire video data object
function VideoMeta(props) {
  let { title, channel, timestamp, likes, views, description } = props;
  return (
    <section className="videoMeta">
      <h1> {title} </h1>
      <div className="videoMeta__container">
        <PostedMeta channel={channel} timestamp={timestamp} />
        <ReactionMeta
          likes={likes}
          views={views}
        />
      </div>
      <hr />
      <h4 className='description'>{description}</h4>
    </section>
  );
}

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

function ReactionMeta(props) {
  let { likes, views } = props;
  return (
    <div className="reactionMeta">
      <div className="reactionMeta__views">
        <div className="viewsIcon" />
        <h4>{views}</h4>
      </div>
      <div className="reactionMeta__likes">
        <div className="likesIcon" />
        <h4>{likes}</h4>
      </div>
    </div>
  );
}

export default VideoMeta;
