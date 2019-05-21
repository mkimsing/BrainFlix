import React from "react";
import Header from "./components/Header";
import VideoPageContainer from "./containers/VideoPageContainer";

import UploadContainer from "./containers/UploadContainer";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import UnspecifiedRoute from "./components/errors/UnspecifiedRoute";
import AutoCompleteSearch from "./components/AutoCompleteSearch";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact component={VideoPageContainer} />
          <Route path="/videos/:id" component={VideoPageContainer} />
          <Route path="/upload" component={UploadContainer} />
          <Route path="/search" component={AutoCompleteSearch} />
          <Route component={UnspecifiedRoute} />
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default App;
