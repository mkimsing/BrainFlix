import React from "react";
import Header from "./components/header";
import Video from "./components/video";
import VideoMeta from "./components/videoMeta";
import Comments from "./containers/Comments_Container";
import RelatedVideos from "./containers/RelatedVideos_Container";

import Upload from "./components/Upload";

import { Switch, Route } from "react-router-dom";
import "./styling/App.css";

import SampleData from "./utils/sampleData";
let sampleVideoData = SampleData[0];
let sampleSideData = SampleData[1];

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={VideoPage} />
        <Route path="/videos" component={VideoPage} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </div>
  );
}

function VideoPage() {
  return (
    <>
      <Video
        video={sampleVideoData.video}
        duration={sampleVideoData.duration}
        image={sampleVideoData.image}
      />
      <div className="mainFlexContainer">
        <div>
          <VideoMeta {...sampleVideoData} />
          <Comments comments={sampleVideoData.comments} />
        </div>
        <RelatedVideos relatedVideos={sampleSideData} />
      </div>
    </>
  );
}

export default App;
