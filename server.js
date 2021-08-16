const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api.js");
const htmlRoutes = require("./routes/html.js")

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

