import React from "react";

function Upload() {
  //TODO remove hr below title in desktop size
  return (
    <>
      <h1>Title</h1>
      <hr />
      <div className="flexBoxForDesktop">
        <div className="thumbnailContainer">
          <h5>VIDEO THUMBNAIL</h5>
          <img src="" alt="video thumbnail" />
        </div>
        <div className="inputContainer">
          <form>
            <label for="videoTitle">
              <h5> TITLE YOUR VIDEO</h5>
            </label>
            <input
              type="text"
              name="videoTitle"
              placeholder="Add a title to your video"
            />

            <label for="videoDescription">
              <h5> ADD A VIDEO DESCRIPTION</h5>
            </label>
            <textarea
              name="videoDescription"
              placeholder="Add a description of your video"
            />

            <button className="publishBtn">PUBLISH</button>
            <button className="cancelBtn">CANCEL</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Upload;
