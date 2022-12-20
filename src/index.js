const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mepsbisht:india1124@cluster0.wl58p.mongodb.net/sample?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));

app.use(require("./routes/route.js"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Express is running on port" + (process.env.PORT || 3000));
});
