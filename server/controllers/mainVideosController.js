const fs = require("fs");
const helper = require("../helpers/helper");

class videoController {
  constructor() {
    this.mainVideosFile = fs.openSync("../model/mainVideos.json");
  }

  getVideo = id => {
    let mainVideosData = helper.readJSONFile(this.mainVideosFile);
    let retVal;
    if (mainVideosData.some(video => video.id === id)) {
      retVal = mainVideosData.find(video => {
        return video.id === id;
      });
    } else {
      retVal = {
        errorCode: 404,
        errorMsg: `Video with ID: ${id} not found`
      };
    }
    return retVal;
  };
}

module.exports = videoController;
