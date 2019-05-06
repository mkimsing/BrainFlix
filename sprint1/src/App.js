import React from "react";
import Header from "./components/header";
import Video from "./components/video";
import VideoMeta from "./components/videoMeta";
import Comments from "./containers/comments";

import "./styling/App.css";

import SampleData from "./utils/sampleData";
import RelatedVideos from "./containers/relatedVideos";
let sampleVideoData = SampleData[0];
let sampleSideData = SampleData[1];

function App() {

  return (
    <div>
      <Header />
      <Video
        video={sampleVideoData.video}
        duration={sampleVideoData.duration}
        image={sampleVideoData.image}
      />
      <div className='mainFlexContainer'>
        <div>
          <VideoMeta {...sampleVideoData} />
          <Comments comments={sampleVideoData.comments} />
        </div>
        <RelatedVideos relatedVideos={sampleSideData} />
      </div>
    </div>
  );
}

export default App;
