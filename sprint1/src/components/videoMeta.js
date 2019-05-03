import React from "react";

function VideoMeta(props) {
  return (
    <section className="videoMeta">
      <h1> {props.title} </h1>
      <div className="videoMeta__container">
        <PostedMeta author={props.author} timestamp={props.timestamp} />
        <ReactionMeta
          likesCount={props.likesCount}
          viewCount={props.viewCount}
        />
      </div>
    </section>
  );
}

function PostedMeta(props) {
  return (
    <div className="postedContainer">
      <h3>{props.author}</h3>
      <Timestamp timestamp={props.timestamp} />
    </div>
  );
}
function Timestamp(props) {
  let date = new Date(parseInt(props.timestamp));
  return (
    <p>
      - {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
    </p>
  );
}
function ReactionMeta(props) {
  return (
    <div className="reactionMeta">
      <div className="reactionMeta__views">
        <div className="viewsIcon" />
        <p>{props.viewCount}</p>
      </div>
      <div className="reactionMeta__likes">
        <div className="likesIcon" />
        <p>{props.likesCount}</p>
      </div>
    </div>
  );
}

export default VideoMeta;
