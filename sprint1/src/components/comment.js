import React from "react";
import avatars from "./avatars";
import timestampHelpers from "../utils/timestamp"

function Comment(props) {
  let avatarSrc = `${avatars[2]}`; //TODO randomize avatars so they are different per comment
  const commentsContents = props.comments.map(comment => {
    return (
      <>
        <div className="comment">
          <img className="avatar comment__avatar" src={avatarSrc} alt="Avatar" />
          <div className="comment__container">
            <div className="comment__titleContainer">
              <h2 className="comment__name">{comment.name}</h2>
              <div className="comment__date">
                <h5>{timestampHelpers.generateDateString(comment.timestamp)}</h5>
                <h5>{timestampHelpers.generateTimeSince(comment.timestamp)}</h5>
              </div>
            </div>
            <h4 className="comment__text">{comment.comment}</h4>
          </div>
        </div>
        <hr />
      </>
    );
  });

  return <section className="commentsBlock">{commentsContents}</section>;
}

export default Comment;
