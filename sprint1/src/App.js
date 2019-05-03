import React from "react";
import Header from "./components/header";
import VideoFrame from "./components/videoFrame";
import VideoMeta from "./components/videoMeta";
import "./styling/App.css";
import videoImg from "./assets/Images/video-list-0.jpg";

function App() {
  const videoData = {
    title: "BMX Rampage: 2018 Highlights",
    author: "Red Cow",
    timestamp: "1545120000000", // 12/18/2018
    viewCount: "1,104,561",
    likesCount: "165,312",
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

export default App;
