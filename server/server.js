const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");

//Populate server
let API_KEY = "?api_key=28aa92a7-4c80-4cc0-b6b7-ca60b6b07dd3";
let API_URL = "https://project-2-api.herokuapp.com";
let mainVideosData = [];

//Ensure routes are defined before listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}...`);
  fs.readFileSync("./data/videoList.json", "utf8", (err, data) => {
    if (err) console.log(err);
    console.log(JSON.parse(data));
  });
});

let videoList = "";
app.get("/videos", (req, res) => {
  // res.send("Testing");
  fs.readFileSync("./data/videoList.json", "utf8", (err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});

//TODO when post, error checking to ensure the proper data is provided

//Query the given API for data and create JSON files
function populateData() {
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
    }, 10000);
  });
}
