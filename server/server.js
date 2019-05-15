const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");

//Populate server
let API_KEY = "?api_key=28aa92a7-4c80-4cc0-b6b7-ca60b6b07dd3";
let API_URL = "https://project-2-api.herokuapp.com";

//Ensure routes are defined before listening
const PORT = process.env.PORT || 5000;

app.use(express.json()); //Body parser
app.use(cors()); //Allow cross origin

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}...`);
  // populateData(); //Regenerate data from Brainstation API
});

//Get a specific video
app.get("/videos/:id", (req, res) => {
  let mainVideosData = JSON.parse(
    fs.readFileSync(`${__dirname}/data/mainVideos.json`, "utf8")
  );
  if (mainVideosData.some(video => video.id === req.params.id))
    res.json(
      mainVideosData.filter(video => {
        return video.id === req.params.id;
      })
    );
  else {
    res.status(404).send(`Video with ID: ${req.params.id} not found`);
  }
});

//Get array of all videos
app.get("/videos", (req, res) => {
  res.json(
    JSON.parse(fs.readFileSync(`${__dirname}/data/videoList.json`, "utf8"))
  );
});

//TODO move to helpers file
//Generate a <numDigits> digit unique ID
function makeID(numDigits) {
  let baseDigits = 8; //Random only guaranteed to make 8 digits
  let num = numDigits >= baseDigits ? 8 : numDigits;
  let id = Math.random()
    .toString(36)
    .substr(2, num);
  if (numDigits > baseDigits) {
    for (
      let i = 0;
      i < Math.floor((numDigits - baseDigits) / baseDigits);
      i++
    ) {
      id +=
        "-" +
        Math.random()
          .toString(36)
          .substr(2, baseDigits);
    }
    id +=
      "-" +
      Math.random()
        .toString(36)
        .substr(2, numDigits % baseDigits);
  }
  return id;
}

//TODO check for casing (upper/lowers)
//Add a new video
app.post("/videos", (req, res) => {
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
        id: makeID(12),
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
        fs.readFileSync(`${__dirname}/data/mainVideos.json`, "utf8")
      );
      mainVideos.push(newVideo);
      fs.writeFileSync(
        `${__dirname}/data/mainVideos.json`,
        JSON.stringify(mainVideos),
        "utf8"
      );

      //Add video to videoList array/file
      let videoList = JSON.parse(
        fs.readFileSync(`${__dirname}/data/videoList.json`, "utf8")
      );
      videoList.push({
        id: newVideo.id,
        title: newVideo.id,
        channel: newVideo.channel,
        image: newVideo.image
      });
      fs.writeFileSync(
        `${__dirname}/data/videoList.json`,
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
app.put("/videos/:id/likes", (req, res) => {
  let mainVideos = JSON.parse(
    fs.readFileSync(`${__dirname}/data/mainVideos.json`, "utf8")
  );
  if (mainVideos.some(video => video.id === req.params.id)) {
    let filteredVideos = mainVideos.filter(video => {
      return video.id === req.params.id;
    });
    let responseStr = "";
    filteredVideos.forEach(video => {
      let numLikes = parseInt(video.likes.replace(/,/g, "")) + 1; // Remove commas and increment by 1
      video.likes = String(numLikes.toLocaleString("en-US")); //Add comma seperators back
      responseStr += `Incremented like counter for ${
        video.id
      } to ${numLikes}\n`;
    });
    fs.writeFileSync(
      `${__dirname}/data/mainVideos.json`,
      JSON.stringify(mainVideos),
      "utf8"
    );
    res.status(200).send(responseStr.trim());
  } else {
    res.status(404).send(`Video with ID: ${req.params.id} not found`);
  }
});

// Post a new comment
app.post("/videos/:id/comments", (req, res) => {
  let mainVideos = JSON.parse(
    fs.readFileSync(`${__dirname}/data/mainVideos.json`, "utf8")
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
      id: `${makeID(36)}`,
      likes: 0,
      timestamp: Date.now()
    };
    foundVideo.comments.push(newComment);
    fs.writeFileSync(
      `${__dirname}/data/mainVideos.json`,
      JSON.stringify(mainVideos),
      "utf8"
    );
    res
      .status(200)
      .send(`Added new comment to video with ID: ${req.params.id}`);
  }
});

//Query the given API for data and create/reset JSON files
function populateData() {
  let mainVideosData = [];
  axios.get(`${API_URL}/videos${API_KEY}`).then(response => {
    fs.writeFileSync(
      "./data/videoList.json",
      JSON.stringify(response.data),
      err => {
        console.log(err);
      }
    );

    let ids = response.data.map(video => {
      return video.id;
    });

    ids.forEach(id => {
      axios.get(`${API_URL}/videos/${id}${API_KEY}`).then(response => {
        mainVideosData.push(response.data);
      });
    });

    //Wait for async to complete... naive way
    setTimeout(() => {
      fs.writeFileSync(
        "./data/mainVideos.json",
        JSON.stringify(mainVideosData),
        err => {
          console.log(err);
        }
      );
      console.log("Finished writing files!");
    }, 5000);
  });
}
