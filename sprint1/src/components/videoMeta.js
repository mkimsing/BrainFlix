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
      <hr />
      <Description description={props.description} />
    </section>
  );
}

function PostedMeta(props) {
  return (
    <div className="postedContainer">
      <h2>By {props.author}</h2>
      <Timestamp timestamp={props.timestamp} />
    </div>
  );
}
function Timestamp(props) {
  let date = new Date(parseInt(props.timestamp));
  return (
    <h5>
      {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
    </h5>
  );
}
function ReactionMeta(props) {
  return (
    <div className="reactionMeta">
      <div className="reactionMeta__views">
        <div className="viewsIcon" />
        <h4>{props.viewCount}</h4>
      </div>
      <div className="reactionMeta__likes">
        <div className="likesIcon" />
        <h4>{props.likesCount}</h4>
      </div>
    </div>
  );
}

function Description(props) {
  return <h4>{props.description}</h4>;
}

export default VideoMeta;
