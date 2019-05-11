import React from "react";
import Header from "./components/Header";
import VideoPageContainer from "./containers/VideoPageContainer";

import Upload from "./components/Upload";
import ErrorBoundary from "./components/Errors/ErrorBoundary"
import UnspecifiedRoute from "./components/Errors/UnspecifiedRoute"

import { Switch, Route } from "react-router-dom";
import "./styling/App.css";

function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact component={VideoPageContainer} />
          <Route path="/videos/:id" component={VideoPageContainer} />
          <Route path="/upload" component={Upload} />
          <Route component={UnspecifiedRoute} />
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default App;
