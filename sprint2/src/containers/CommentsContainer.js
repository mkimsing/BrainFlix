import React, { Component } from "react";
import Comment from "../components/Comment";
import CommentSubmission from '../components/CommentSubmission'

import avatar_mohan from "../assets/Images/Mohan-muruge.jpg"; // Ensure we have avatar image

class Comments_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionMsg: "Comment text is required!",
      submissionMsgClass: 'submissionMsg--hidden',
    };
  }

  //Change msg text and apply success message styling
  handleSuccessMessage = (applyStyling) => {
    let newClass;
    if (applyStyling) {
      newClass = ['submissionMsg--success'];
      this.setState({
        submissionMsg: "Thanks for commenting!"
      })
    }
    else {
      newClass = ['submissionMsg--hidden'];
    }

    this.setState({
      submissionMsgClass: newClass
    })
  }

  //Change msg text and apply error msg styling
  handleErrorMessage = (applyStyling) => {
    let newClass;
    if (applyStyling) {
      newClass = ['submissionMsg--error'];
      this.setState({
        submissionMsg: "Comment text is required!"
      })
    }
    else {
      newClass = ['submissionMsg--hidden'];
    }

    this.setState({
      submissionMsgClass: newClass
    })
  }

  render() {
    return (
      <section>
        <CommentSubmission
          numComments={this.props.comments.length}
          avatar={avatar_mohan}
          submitComment={this.props.submitComment}
          submissionMsg={this.state.submissionMsg}
          submissionMsgClass={this.state.submissionMsgClass}
          handleErrorMessage={this.handleErrorMessage}
          handleSuccessMessage={this.handleSuccessMessage} />
        {this.props.comments.map(comment => {
          return <Comment comment={comment} />
        })}
      </section>
    );
  }
}


export default Comments_Container;
