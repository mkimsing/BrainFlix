import React from "react";
import Header from "./components/Header";
import VideoPageContainer from './containers/VideoPageContainer'

import Upload from "./components/Upload";

import { Switch, Route } from "react-router-dom";
import "./styling/App.css";


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={VideoPageContainer} />
        <Route path="/videos" component={VideoPageContainer} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </div>
  );
}

export default App;
