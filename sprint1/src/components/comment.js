import React from "react";
import avatars from "./avatars";

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
                <h5>{generateDateString(comment.timestamp)}</h5>
                <h5>{generateTimeSince(comment.timestamp)}</h5>
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

/**
 * Generates a string for the supplied date with form mm/dd/yyyy
 * @param {int} timestamp timestampe in ms for which to generate a string
 */
function generateDateString(timestamp) {
  let dateObj = new Date(Number(timestamp));
  //Find date string and manipulate it to get required form
  let dd = String(dateObj.getDate()).padStart(2, "0");
  let mm = String(dateObj.getMonth() + 1).padStart(2, "0"); //Jan is 0
  let yyyy = dateObj.getFullYear();
  return mm + "/" + dd + "/" + yyyy;
}

/**
 * Generates string representing time since the time of supplied date object
 * @param {int} timestampe Timestampe in ms to base calculation off
 */
function generateTimeSince(timestamp) {
  let dateObj = new Date(Number(timestamp));
  let secPerYear = 31536000;
  let secPerMonth = 2592000;
  let secPerDay = 86400;
  let secPerHour = 3600;
  let interval = [];

  let currSeconds = Math.floor((new Date() - dateObj) / 1000);
  interval[0] = Math.floor(currSeconds / secPerYear);
  interval[1] = Math.floor(currSeconds / secPerMonth);
  interval[2] = Math.floor(currSeconds / secPerDay);
  interval[3] = Math.floor(currSeconds / secPerHour);
  interval[4] = Math.floor(currSeconds / 60);
  interval[5] = currSeconds;

  let timeUnit = [];
  timeUnit[0] = " year";
  timeUnit[1] = " month";
  timeUnit[2] = " day";
  timeUnit[3] = " hour";
  timeUnit[4] = " minute";
  timeUnit[5] = " second";

  let dateString = " - ";
  let index = -1;

  for (let i = 0; i < interval.length; i++) {
    if (interval[i] >= 1) {
      dateString += interval[i] + timeUnit[i];
      index = i;
      break;
    }
  }

  if (interval[index] > 1 || interval[index] === 0) {
    dateString += "s";
  }

  if (index === -1) {
    return "- now"; //Handle same second comments (eg 0 seconds)
  } else {
    dateString += " ago";
  }

  return dateString;
}

export default Comment;
