import React from 'react'

function CommentSubmission(props) {

  /**
  * Check if fields are empty/default value and call functions to apply/remove error styling
  */
  let isEmptySubmission = (commentField) => {
    if (
      commentField.value === commentField.defaultValue ||
      !commentField.value.trim() //Checks for all whitespace (newline, space, tab, etc)
    ) {
      return true;
    }
  }

  let { submitComment, handleErrorMessage, handleSuccessMessage } = props;

  let submitHandler = (event) => {
    const commentField = event.target.commentText;
    event.preventDefault();

    if (!isEmptySubmission(commentField)) {
      submitComment(commentField.value);
      commentField.value = "";
      handleSuccessMessage(true);
      let btn = event.target.commentButton;
      btn.disabled = true;
      setTimeout(() => {
        handleSuccessMessage(false)
        btn.disabled = false;
      }, 1500);
    }
    else {
      handleErrorMessage(true);
    }

  }

  let { numComments, avatar, submissionMsg, submissionMsgClass } = props;
  return (
    <div className='submission'>
      <h2 className='submission__commentCount'>{numComments} Comments</h2>
      <h5 className='submission__title'> JOIN THE CONVERSATION</h5>
      <div className='submission__container'>
        <img className="avatar submission__avatar" src={avatar} alt="Avatar" />
        <form onSubmit={submitHandler}>
          <div className='inputGroup'>
            <textarea name='commentText' placeholder='Add a comment' />
            <h3 className={submissionMsgClass}> {submissionMsg}</h3>
          </div>
          <button type='submit' name='commentButton'> COMMENT </button>
        </form>
      </div>
      <hr />
    </div >
  );
}



export default CommentSubmission