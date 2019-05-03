import React from "react";
import Header from "./components/header";
import VideoFrame from "./components/videoFrame";
import "./styling/App.css";
import videoImg from "./assets/Images/video-list-0.jpg";

function App() {
  const videoData = {
    title: "BMX Rampage: 2018 Highlights",
    author: "Red Cow",
    timestamp: "1545120000000", // 12/18/2018
    viewCount: "1104561",
    likesCount: "165312",
    description: `On a gusty day in Southern Utah, a group of 25 daring 
    mountain bikers blew the doors off what is possible on two wheels, unleashing 
    some of the biggest moments the sport has ever seen. While mother nature only 
    allowed for one full run before the conditions made it impossible to ride, that was 
    all that was needed for event veteran Kyle Strait, who won the event for the second time -- 
    eight years after his ﬁrst Red Cow Rampage title`
  };

  return (
    <div>
      <Header />
      <VideoFrame source={videoImg} />
      <VideoMeta {...videoData} />
    </div>
  );
}

function VideoMeta(props) {
  return (
    <section>
      <h1> {props.title} </h1>
      <h3>
        Author: {props.author} <Timestamp timestamp={props.timestamp} />
      </h3>
      <Likes />
    </section>
  );
}

function Likes(props) {
  return (
    <div className="likes">
      <div className="likesIcon" />
      <p>LikesCount: {props.likesCount}</p>
    </div>
  );
}

function Views(props) {
  return (
    <div className="views">
      <div className="viewsIcon" />
      <p>ViewCount: {props.viewCount}</p>
    </div>
  );
}

function Timestamp(props) {
  let date = new Date(parseInt(props.timestamp));
  return (
    <>
      - {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
    </>
  );
}

export default App;
