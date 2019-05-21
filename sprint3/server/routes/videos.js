const express = require("express");
const router = express.Router();
const mainVideosController = require(`../controllers/mainVideosController`);
const videoListController = require(`../controllers/videoListController`)


router.route("/")
  //Get array of all videos
  .get((_req, res) => {
    res.json(videoListController.getList())
  })
  //Post new video
  .post((req, res) => {
    let response = mainVideosController.postVideo(req.body)
    if (response.errorCode) {
      res.status(response.errorCode).send(response.errorMsg)
    } else {
      res.status(201).json(response)
    }
  });

//Get a specific video
router.get("/:id", (req, res) => {
  let response = mainVideosController.getVideo(req.params.id);
  if (response.errorCode) {
    res.status(response.errorCode).send(response.errorMsg)
  } else {
    res.json(response)
  }
});

//Like a video
router.put("/:id/likes", (req, res) => {
  let response = mainVideosController.incrementVideoLikes(req.params.id);
  if (response.errorCode) {
    res.status(response.errorCode).send(response.errorMsg)
  } else {
    res.status(200).json(response)
  }
});

// Post a new comment to specified video
router.post("/:id/comments", (req, res) => {
  let response = mainVideosController.postComment(req.params.id, req.body);
  if (response.errorCode) {
    res.status(response.errorCode).send(response.errorMsg)
  } else {
    res.status(200).send(response)
  }
});

//Delete comment
router.delete("/:videoId/comments/:commentId", (req, res) => {
  let response = mainVideosController.deleteComment(req.params.videoId, req.params.commentId);
  if (response.errorCode) {
    res.status(response.errorCode).send(response.errorMsg)
  } else {
    res.status(200).send(response)
  }
})

//Like comment
router.put("/:videoId/comments/:commentId", (req, res) => {
  let response = mainVideosController.likeComment(req.params.videoId, req.params.commentId);
  if (response.errorCode) {
    res.status(response.errorCode).send(response.errorMsg)
  } else {
    res.status(200).send(response)
  }
})

module.exports = router;
