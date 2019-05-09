import React, { Component } from "react";
import Comment from "../components/comment";

import avatar_mohan from "../assets/Images/Mohan-muruge.jpg"; // Ensure we have avatar image

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
  }

  submitComment = (commentText) => {
    const newComment = {
      name: 'Mohan Muruge',
      avatar: avatar_mohan,
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
      <section>
        <CommentSubmissionBlock
          numComments={this.state.comments.length}
          avatar={avatar_mohan}
          submitComment={this.submitComment} />
        {this.state.comments.map(comment => {
          return <Comment comment={comment} />
        })}
      </section>
    );
  }
}


/**************************************
 * Submission Section
 **************************************/
class CommentSubmissionBlock extends Component {

  state = {
    submissionMsg: "Comment text is required!",
    submissionMsgClass: 'submissionMsg--hidden'
  }
  submitHandler = (event) => {
    const commentField = event.target.commentText;
    event.preventDefault();
    if (!this.isEmptySubmission(commentField)) {
      this.props.submitComment(commentField.value);
      commentField.value = "";
      this.handleSuccessMessage(true);
      let btn = event.target.commentButton;
      btn.disabled = true;
      setTimeout(() => {
        this.handleSuccessMessage(false)
        btn.disabled = false;
      }, 1500);
    }
    else {
      this.handleErrorMessage(true);
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
              <h3 className={this.state.submissionMsgClass}> {this.state.submissionMsg}</h3>
            </div>
            <button type='submit' name='commentButton'> COMMENT </button>
          </form>
        </div>
        <hr />
      </div >
    );
  }
}


export default Comments;
