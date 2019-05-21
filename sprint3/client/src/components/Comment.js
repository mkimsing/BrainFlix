import React from "react";
import timestampHelpers from "../utils/timestamp";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteConfirmClass: 'cancelConfirmation--hide'
    }
  }

  deleteHandler = () => {
    if (this.state.deleteConfirmClass === 'cancelConfirmation--hide') {
      this.setState({
        deleteConfirmClass: 'cancelConfirmation--show'
      })
    }
    else {
      this.setState({
        deleteConfirmClass: 'cancelConfirmation--hide'
      })
    }

  };

  confirmDelete = () => {
    this.setState({
      deleteConfirmClass: 'cancelConfirmation--hide'
    })
    this.props.deleteComment(this.props.id);
  }

  hideDelete = () => {
    this.setState({
      deleteConfirmClass: 'cancelConfirmation--hide'
    })
  }

  likeHandler = () => {
    this.props.likeComment(this.props.id)
  }
  render() {
    let { name, timestamp, comment, avatar, likes } = this.props.comment;
    return (
      <>
        <div className="comment">
          <img className="avatar comment__avatar" src={avatar} alt="Avatar" />
          <div className="comment__container">
            <div className="comment__titleContainer">
              <h2 className="comment__name">{name}</h2>
              <div className="comment__date">
                <h5>{timestampHelpers.generateDateString(timestamp)}</h5>
                <h5>{timestampHelpers.generateTimeSince(timestamp)}</h5>
              </div>
            </div>
            <h4 className="comment__text">{comment}</h4>
            <div className='comment__actionsContainer'>
              <div className='likesContainer'>
                <button className='comment__like' onClick={this.likeHandler}> Like </button>
                <h5> {likes} </h5>
              </div>
              <button className="deleteComment" onClick={this.deleteHandler}>
                Delete
          </button>
            </div>
            <div className={this.state.deleteConfirmClass}>
              <h5> Really delete this comment?</h5>
              <button className='cancel' onClick={this.hideDelete}> Cancel</button>
              <button className='confirm' onClick={this.confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
        <hr />
      </>
    );
  }
}

export default Comment;
