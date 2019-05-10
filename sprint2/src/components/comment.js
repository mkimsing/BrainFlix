import React from "react";
import timestampHelpers from "../utils/timestamp";

function Comment(props) {
  let { name, timestamp, comment, avatar, id } = props.comment;

  let deleteHandler = () => {
    props.deleteComment(id)
  }
  return (
    <>
      <div className="comment">
        <img className="avatar comment__avatar" src={avatar} alt="Avatar" />
        <div className="comment__container">
          <div className="comment__titleContainer">
            <h2 className="comment__name">{name}</h2>
            <div className="comment__date">
              <h5>{timestampHelpers.generateDateString(timestamp)}</h5>
              <h5>{timestampHelpers.generateTimeSince(timestamp)}</h5>
            </div>
          </div>
          <h4 className="comment__text">{comment}</h4>
          <button className="deleteComment" onClick={deleteHandler}>Delete</button>
        </div>
      </div>
      <hr />
    </>
  );
}



export default Comment;
