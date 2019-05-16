const VideosList_File = `${__dirname}/../model/videoList.json`;
const helper = require("../helpers/helper");

const videoListController = {
  getList: () => {
    return helper.readJSONFile(VideosList_File)
  }
}

module.exports = videoListController;
