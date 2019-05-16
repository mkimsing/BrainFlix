const fs = require("fs");
const axios = require("axios");

//Populate server data
let API_KEY = "?api_key=28aa92a7-4c80-4cc0-b6b7-ca60b6b07dd3";
let API_URL = "https://project-2-api.herokuapp.com";

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

//Query the given API for data and create/reset JSON files
function populateData() {
  let mainVideosData = [];
  axios.get(`${API_URL}/videos${API_KEY}`).then(response => {
    fs.writeFileSync(
      "./model/videoList.json",
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
        "./model/mainVideos.json",
        JSON.stringify(mainVideosData),
        err => {
          console.log(err);
        }
      );
      console.log("Finished writing files!");
    }, 5000);
  });
}

function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
  console.log(`changes saved to file ${filename}....`);
}

function readJSONFile(filename) {
  return JSON.parse(fs.readFileSync(filename, "utf8"));
}

module.exports = {
  makeID,
  populateData,
  writeJSONFile,
  readJSONFile
};
