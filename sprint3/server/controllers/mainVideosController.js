const helper = require("../helpers/helper");
const MainVideos_File = `${__dirname}/../model/mainVideos.json`;
const VideosList_File = `${__dirname}/../model/videoList.json`;
const mainVideoController = {
  getVideo: id => {
    let mainVideos = helper.readJSONFile(MainVideos_File);
    let retVal;
    if (mainVideos.some(video => video.id === id)) {
      retVal = mainVideos.find(video => {
        return video.id === id;
      });
    } else {
      retVal = {
        errorCode: 404,
        errorMsg: `Video with ID: ${id} not found`
      };
    }
    return retVal;
  },
  postVideo: videoInfo => {
    //TODO check for casing (upper/lowers)
    //Add a new video
    if (!videoInfo) {
      return ({
        errorCode: 400,
        errorMsg: `Please provide a title, channel, image, description, video and duration in the body `
      })
    } else {
      let { title, channel, image, description, video, duration } = videoInfo;
      if (videoInfo && title && channel && image && description && video && duration) {
        const newVideo = {
          id: helper.makeID(12),
          title: title,
          channel: channel,
          image: image,
          description: description,
          views: '0',
          likes: '0',
          duration: duration,
          video: video,
          timestamp: Date.now(),
          comments: []
        };
        //Add video to mainVideos array / file
        let mainVideos = helper.readJSONFile(MainVideos_File)
        mainVideos.push(newVideo);
        helper.writeJSONFile(MainVideos_File, mainVideos)

        //Add video to videoList array/file
        let videoList = helper.readJSONFile(VideosList_File)
        videoList.push({
          id: newVideo.id,
          title: newVideo.title,
          channel: newVideo.channel,
          image: newVideo.image
        });
        helper.writeJSONFile(VideosList_File, videoList)

        return newVideo;
      } else {
        return ({
          errorCode: 400,
          errorMsg: `Please provide a title, channel, image, description, video and duration in the body `
        })
      }
    }
  },
  incrementVideoLikes: id => {
    let mainVideos = helper.readJSONFile(MainVideos_File)
    if (mainVideos.some(video => video.id === id)) {
      let foundVideo = mainVideos.find(video => {
        return video.id === id;
      });
      let numLikes = parseInt(foundVideo.likes.replace(/,/g, "")) + 1; // Remove commas and increment by 1
      foundVideo.likes = String(numLikes.toLocaleString("en-US")); //Add comma separators back
      helper.writeJSONFile(MainVideos_File, mainVideos)
      return foundVideo;
    } else {
      return ({
        errorCode: 404,
        errorMsg: `Video with ID: ${id} not found`
      })
    }
  },
  postComment: (id, commentInfo) => {
    let mainVideos = helper.readJSONFile(MainVideos_File)
    if (!commentInfo || !commentInfo.name || !commentInfo.comment) {
      return ({
        errorCode: 400,
        errorMsg: `Please provide a name and comment in the body `
      })
    } else if (!mainVideos.some(video => video.id === id)) {
      return ({
        errorCode: 404,
        errorMsg: `Video with ID: ${id} not found`
      })
    } else {
      let foundVideo = mainVideos.find(video => {
        return video.id === id;
      });
      newComment = {
        name: commentInfo.name,
        comment: commentInfo.comment,
        id: `${helper.makeID(36)}`,
        likes: 0,
        timestamp: Date.now()
      };
      foundVideo.comments.push(newComment);
      helper.writeJSONFile(MainVideos_File, mainVideos)
      return newComment;
    }
  },
  likeComment: (videoId, commentId) => {
    let mainVideos = helper.readJSONFile(MainVideos_File);
    if (!mainVideos.some(video => video.id === videoId)) {
      return ({
        errorCode: 404,
        errorMsg: `Video with ID: ${videoId} not found`
      })
    }
    else {
      let foundVideo = mainVideos.find(video => {
        return video.id === videoId;
      });
      let commentToLike = foundVideo.comments.find(comment => {
        return comment.id === commentId
      })
      if (!commentToLike) {
        return ({
          errorCode: 404,
          errorMsg: `Comment with ID: ${commentId} not found`
        })
      }
      else {
        commentToLike.likes++;
        helper.writeJSONFile(MainVideos_File, mainVideos)
        return commentToLike;
      }
    }
  },
  deleteComment: (videoId, commentId) => {
    let mainVideos = helper.readJSONFile(MainVideos_File);
    if (!mainVideos.some(video => video.id === videoId)) {
      return ({
        errorCode: 404,
        errorMsg: `Video with ID: ${videoId} not found`
      })
    }
    else {
      let foundVideo = mainVideos.find(video => {
        return video.id === videoId;
      });
      let commentToDelete = foundVideo.comments.find(comment => {
        return comment.id === commentId
      })
      if (!commentToDelete) {
        return ({
          errorCode: 404,
          errorMsg: `Comment with ID: ${commentId} not found`
        })
      }
      else {
        foundVideo.comments.splice(foundVideo.comments.indexOf(commentToDelete), 1)
        helper.writeJSONFile(MainVideos_File, mainVideos)
        return commentToDelete;
      }
    }
  }
}

module.exports = mainVideoController;


