import React, { Component } from "react";
import Comment from "../components/comment";

class Comments extends Component {
  state = {
    comments: this.props.comments
  };
  render() {
    return (
      //<SubmissionBlock/>
      <Comment comments={this.state.comments} />
    );
  }
}

export default Comments;