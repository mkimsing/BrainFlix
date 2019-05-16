const express = require("express");
const app = express();
const cors = require("cors");
const videosRouter = require("./routes/videos");
const helper = require("./helpers/helper");

//Ensure routes are defined before listening
const PORT = process.env.PORT || 5000;

app.use(express.json()); //Body parser
app.use(cors()); //Allow cross origin

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}...`);
  // helper.populateData(); //Regenerate data from Brainstation API
});

app.use("/videos", videosRouter);
