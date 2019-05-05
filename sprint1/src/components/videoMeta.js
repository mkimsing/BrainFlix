import React from "react";

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
      <Description description={description} />
    </section>
  );
}

function PostedMeta(props) {
  let { channel, timestamp } = props;
  return (
    <div className="postedContainer">
      <h2>By {channel}</h2>
      <Timestamp timestamp={timestamp} />
    </div>
  );
}
//TODO add dynamic timestamp here eg. "X time ago"
function Timestamp(props) {
  let date = new Date(parseInt(props.timestamp));
  return (
    <h5>
      {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
    </h5>
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

function Description(props) {
  return <h4 className='description'>{props.description}</h4>;
}

export default VideoMeta;
