const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");

//Populate server
let API_KEY = "?api_key=28aa92a7-4c80-4cc0-b6b7-ca60b6b07dd3";
let API_URL = "https://project-2-api.herokuapp.com";

//Ensure routes are defined before listening
const PORT = process.env.PORT || 5000;

//  body parser
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}...`);
});

app.get("/videos/:id", (req, res) => {
  let mainVideosData = JSON.parse(fs.readFileSync(`${__dirname}/data/mainVideos.json`, "utf8"));
  if (mainVideosData.some(video => video.id === req.params.id))
    res.json(mainVideosData.filter(video => {
      return video.id === req.params.id
    }))
  else {
    res.status(404).send(`Video with ID: ${req.params.id} not found`)
  }
})

app.get("/videos", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(`${__dirname}/data/videoList.json`, "utf8")))
});

//TODO move to helpers file
//Generate 12 digit unique ID
function makeID() {
  return '_' + Math.random().toString(36).substr(2, 12);
};

app.post('/videos', (req, res) => {
  if (!req.body) {
    res.status(400).send(`Please provide a title, channel, image, description, video and duration in the body `)
  }
  else {
    let { title, channel, image, description, video, duration } = req.body;
    if (title && channel && image && description && video && duration) {
      const newVideo = {
        id: makeID(),
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
      }
      //Add video to mainVideos array / file
      let mainVideos = JSON.parse(fs.readFileSync(`${__dirname}/data/mainVideos.json`, "utf8"));
      mainVideos.push(newVideo);
      fs.writeFileSync(`${__dirname}/data/mainVideos.json`, JSON.stringify(mainVideos), 'utf8')

      //Add video to videoList array/file
      let videoList = JSON.parse(fs.readFileSync(`${__dirname}/data/videoList.json`, "utf8"));
      videoList.push({
        id: newVideo.id,
        title: newVideo.id,
        channel: newVideo.channel,
        image: newVideo.image
      });
      fs.writeFileSync(`${__dirname}/data/videoList.json`, JSON.stringify(videoList), 'utf8')

      res.status(201).json(newVideo);
    }
    else {
      res.status(400).send(`Please provide a title, channel, image, description, video and duration in the body `)
    }
  }
})

app.put('/videos/:id/likes', (req, res) => {
  let mainVideos = JSON.parse(fs.readFileSync(`${__dirname}/data/mainVideos.json`, "utf8"));
  if (mainVideos.some(video => video.id === req.params.id)) {
    let filteredVideos = mainVideos.filter(video => {
      return video.id === req.params.id
    })
    let responseStr = '';
    filteredVideos.forEach(video => {
      let numLikes = parseInt(video.likes.replace(/,/g, "")) + 1 // Remove commas and increment by 1
      video.likes = String(numLikes.toLocaleString('en-US')); //Add comma seperators back
      responseStr += `Incremented like counter for ${video.id} to ${numLikes}\n`
    })
    fs.writeFileSync(`${__dirname}/data/mainVideos.json`, JSON.stringify(mainVideos), 'utf8')
    res.status(200).send(responseStr.trim())
  }
  else {
    res.status(404).send(`Video with ID: ${req.params.id} not found`)
  }
})

//TODO when post, error checking to ensure the proper data is provided

//Query the given API for data and create/reset JSON files
function populateData() {
  let mainVideosData = [];
  axios.get(`${API_URL} / videos${API_KEY}`).then(response => {
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
      axios.get(`${API_URL} / videos / ${id}${API_KEY}`).then(response => {
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
    }, 10000);
  });
}
