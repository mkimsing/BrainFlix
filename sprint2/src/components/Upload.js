import React from "react";
import vidThumb from '../assets/Images/Upload-video-preview.jpg'
import { Link } from 'react-router-dom'
function Upload() {

  return (
    <main>
      <hr className='upperDivider' />
      <h1>Upload Video</h1>
      <hr className='lowerDivider' />
      <div className="upload-container">
        <div className="thumbnail">
          <h5 className='thumbnail__title'>VIDEO THUMBNAIL</h5>
          <img src={vidThumb} alt="video thumbnail" className='thumbnail__image' />
        </div>
        {/* <div className="upload__form"> */}
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
          <div className='cancelContainer'>
            <Link to='/'> Cancel </Link>
          </div>
        </form>
      </div>
      {/* </div> */}
    </main>
  );
}

export default Upload;
