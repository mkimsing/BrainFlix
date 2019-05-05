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

function CommentSubmissionBlock(props) {
  let { numComments, avatar, submitComment } = props;
  let submitHandler = (event) => {
    event.preventDefault();
    submitComment(event.target.commentText.value);
    event.target.commentText.value = "";
  }

  return (
    <div className='submission'>
      <h2 className='submission__commentCount'>{numComments} Comments</h2>
      <h5 className='submission__title'> JOIN THE CONVERSATION</h5>
      <div className='submission__container'>
        <img className="avatar submission__avatar" src={avatar} alt="Avatar" />
        <form onSubmit={submitHandler}>
          <textarea name='commentText' placeholder='Add a comment' />
          <button type='submit'> COMMENT </button>
        </form>
      </div>
      <hr />
    </div>
  );
}


export default Comments;
