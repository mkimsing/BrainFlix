const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");

//Populate server
let API_KEY = "?api_key=28aa92a7-4c80-4cc0-b6b7-ca60b6b07dd3";
let API_URL = "https://project-2-api.herokuapp.com";
let mainVideosData = [];

app.listen(8080, () => {
  console.log("Server now listening on port 8080...");
});

let videoList;
app.get("/videos"),
  (req, res) => {
    fs.readFile("./data/mainVideos.json", (err, data) => {
      if (err) throw err;
      videosList = JSON.parse(data);
      console.log(videoList);
    });
  };

//Query the given API for data and create JSON files
function populateData() {
  axios.get(`${API_URL}/videos${API_KEY}`).then(response => {
    fs.writeFile(
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
  });
  setTimeout(() => {
    fs.writeFile(
      "./data/mainVideos.json",
      JSON.stringify(mainVideosData),
      err => {
        console.log(err);
      }
    );
  }, 10000);
}
