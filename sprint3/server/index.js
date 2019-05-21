const express = require("express");
const app = express();
const cors = require("cors");
const videosRouter = require("./routes/videos");

//Ensure routes are defined before listening
const PORT = process.env.PORT || 5000;

app.use(express.json()); //Body parser
app.use(cors()); //Allow cross origin

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}...`);
  // require('./helpers/helper').populateData(); //Used generate/regenerate data from Brainstation API
});

app.use("/videos", videosRouter);
