const express = require("express");
const router = express.Router();
const fs = require("fs");
const helper = require(`${__dirname}/../helpers/helper`);
const mainVideosController = require(`../controllers/mainVideosController`);

//Get a specific video
router.get("/:id", (req, res) => {
  let test = new mainVideosController();
  console.log(test);
  test.getVideo(req.params.id);
});

//Get array of all videos
router
  .route("/")
  .get((_req, res) => {
    res.json(
      JSON.parse(
        fs.readFileSync(`${__dirname}/../model/videoList.json`, "utf8")
      )
    );
  })
  .post((req, res) => {
    //TODO check for casing (upper/lowers)
    //Add a new video
    if (!req.body) {
      res
        .status(400)
        .send(
          `Please provide a title, channel, image, description, video and duration in the body `
        );
    } else {
      let { title, channel, image, description, video, duration } = req.body;
      if (title && channel && image && description && video && duration) {
        const newVideo = {
          id: helper.makeID(12),
          title: title,
          channel: channel,
          image: image,
          description: description,
          views: 0,
          likes: 0,
          duration: duration,
          video: video,
          timestamp: Date.now(),
          comments: []
        };
        //Add video to mainVideos array / file
        let mainVideos = JSON.parse(
          fs.readFileSync(`${__dirname}/../model/mainVideos.json`, "utf8")
        );
        mainVideos.push(newVideo);
        fs.writeFileSync(
          `${__dirname}/../model/mainVideos.json`,
          JSON.stringify(mainVideos),
          "utf8"
        );

        //Add video to videoList array/file
        let videoList = JSON.parse(
          fs.readFileSync(`${__dirname}/../model/videoList.json`, "utf8")
        );
        videoList.push({
          id: newVideo.id,
          title: newVideo.id,
          channel: newVideo.channel,
          image: newVideo.image
        });
        fs.writeFileSync(
          `${__dirname}/../model/videoList.json`,
          JSON.stringify(videoList),
          "utf8"
        );

        res.status(201).json(newVideo);
      } else {
        res
          .status(400)
          .send(
            `Please provide a title, channel, image, description, video and duration in the body `
          );
      }
    }
  });

//Increment likes in a comment
router.put("/:id/likes", (req, res) => {
  let mainVideos = JSON.parse(
    fs.readFileSync(`${__dirname}/../model/mainVideos.json`, "utf8")
  );
  if (mainVideos.some(video => video.id === req.params.id)) {
    let filteredVideos = mainVideos.filter(video => {
      return video.id === req.params.id;
    });
    let responseStr = "";
    filteredVideos.forEach(video => {
      let numLikes = parseInt(video.likes.replace(/,/g, "")) + 1; // Remove commas and increment by 1
      video.likes = String(numLikes.toLocaleString("en-US")); //Add comma separators back
      responseStr += `Incremented like counter for ${
        video.id
      } to ${numLikes}\n`;
    });
    fs.writeFileSync(
      `${__dirname}/../model/mainVideos.json`,
      JSON.stringify(mainVideos),
      "utf8"
    );
    res.status(200).send(responseStr.trim());
  } else {
    res.status(404).send(`Video with ID: ${req.params.id} not found`);
  }
});

// Post a new comment
router.post("/:id/comments", (req, res) => {
  let mainVideos = JSON.parse(
    fs.readFileSync(`${__dirname}/../model/mainVideos.json`, "utf8")
  );
  if (!req.body || !req.body.name || !req.body.comment) {
    res.status(400).send(`Please provide a name and comment in the body `);
  } else if (!mainVideos.some(video => video.id === req.params.id)) {
    res.status(404).send(`Video with ID: ${req.params.id} not found`);
  } else {
    let foundVideo = mainVideos.find(video => {
      return video.id === req.params.id;
    });
    newComment = {
      name: req.body.name,
      comment: req.body.comment,
      id: `${helper.makeID(36)}`,
      likes: 0,
      timestamp: Date.now()
    };
    foundVideo.comments.push(newComment);
    fs.writeFileSync(
      `${__dirname}/../model/mainVideos.json`,
      JSON.stringify(mainVideos),
      "utf8"
    );
    res
      .status(200)
      .send(`Added new comment to video with ID: ${req.params.id}`);
  }
});

module.exports = router;
