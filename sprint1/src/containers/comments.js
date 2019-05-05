import React, { Component } from "react";
import Comment from "../components/comment";

import avatar_mohan from "../assets/Images/Mohan-muruge.jpg"; // Ensure we have avatar image

class Comments extends Component {
  state = {
    comments: this.props.comments
  };

  submitComment = (commentText) => {
    const newComment = {
      name: 'Mohan Muruge',
      timestamp: Date.now(),
      comment: commentText
    }
    const newCommentsList = [newComment, ...this.state.comments];
    this.setState({
      comments: newCommentsList
    })
  }

  render() {
    return (
      <>
        <CommentSubmissionBlock
          numComments={this.state.comments.length}
          avatar={avatar_mohan}
          submitComment={this.submitComment} />
        <Comment comments={this.state.comments} />
      </>
    );
  }
}


class CommentSubmissionBlock extends Component {

  state = {
    submissionMsg: "Comment text is required!",
    submissionMsgClasses: ['submissionMsg--hidden']
  }
  submitHandler = (event) => {
    const commentField = event.target.commentText;
    event.preventDefault();
    if (!this.isEmptySubmission(commentField)) {
      this.props.submitComment(commentField.value);
      commentField.value = "";
      this.handleErrorStyling(false);
    }
    else {
      this.handleErrorStyling(true);
    }

  }

  /**
 * Check if fields are empty/default value and call functions to apply/remove error styling
 */
  isEmptySubmission = (commentField) => {
    if (
      commentField.value === commentField.defaultValue ||
      !commentField.value.trim() //Checks for all whitespace (newline, space, tab, etc)
    ) {
      return true;
    }
  }

  handleErrorStyling = (applyStyling) => {
    let newClasses;
    if (applyStyling) {
      newClasses = ['submissionMsg--errorGroup'];
    }
    else {
      newClasses = ['submissionMsg--hidden'];
    }

    this.setState({
      submissionMsgClasses: newClasses
    })
  }
  render() {
    let { numComments, avatar } = this.props;
    return (
      <div className='submission'>
        <h2 className='submission__commentCount'>{numComments} Comments</h2>
        <h5 className='submission__title'> JOIN THE CONVERSATION</h5>
        <div className='submission__container'>
          <img className="avatar submission__avatar" src={avatar} alt="Avatar" />
          <form onSubmit={this.submitHandler}>
            <div className='inputGroup'>
              <textarea name='commentText' placeholder='Add a comment' />
              <h3 className={String(...this.state.submissionMsgClasses)}> {this.state.submissionMsg}</h3>
            </div>
            <button type='submit'> COMMENT </button>
          </form>
        </div>
        <hr />
      </div >
    );
  }
}


export default Comments;
