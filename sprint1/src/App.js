import React from "react";
import Header from "./components/header";
import VideoFrame from "./components/videoFrame";
import VideoMeta from "./components/videoMeta";
import Comments from "./containers/comments";

import "./styling/App.css";

import videoPoster from "./assets/Images/video-list-0.jpg";
import SubmitComment from "./components/submitComment";

function App() {

  const sampleVideoData = {
    id: 'abc-123-def-456',
    title: "BMX Rampage: 2018 Highlights",
    description: `On a gusty day in Southern Utah, a group of 25 daring 
    mountain bikers blew the doors off what is possible on two wheels, unleashing 
    some of the biggest moments the sport has ever seen. While mother nature only 
    allowed for one full run before the conditions made it impossible to ride, that was 
    all that was needed for event veteran Kyle Strait, who won the event for the second time -- 
    eight years after his ﬁrst Red Cow Rampage title`,
    channel: "Red Cow",
    image: { videoPoster }, //TODO clean this up... currently nested object
    views: "1,104,561",
    likes: "165,312",
    duration: '3:51',
    video: 'VIDEO URL HERE!',
    timestamp: 1545120000000,// 12/18/2018
    comments: [
      {
        name: "Michael Lyons",
        timestamp: 1556934071867,
        comment: `They BLEW the ROOF off at their last show, once everyone started ﬁguring
             out they were going. This is still simply the greatest opening of a concert I have EVER witnessed`
      },
      {
        name: "Gary Wong",
        timestamp: 1547046189000,
        comment: `Every time I see him shred I feel so motivated to get off my couch and hop 
          on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!`
      },
      {
        name: "Theodore Duncan",
        timestamp: 1543871776000,
        comment: `How can someone be so good!!! You can tell he lives for this and loves to do it
         every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!`
      }
    ]
  };

  return (
    <div>
      <Header />
      <VideoFrame
        video={sampleVideoData.video}
        duration={sampleVideoData.duration}
        image={sampleVideoData.image.videoPoster}
      />
      <div className='mainFlexContainer'>
        <VideoMeta {...sampleVideoData} />
        <SubmitComment />
        <Comments comments={sampleVideoData.comments} />
      </div>
    </div>
  );
}

export default App;
