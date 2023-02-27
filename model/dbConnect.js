const mongoose = require("mongoose");
module.exports = mongoose.connect('mongodb://localhost:27017/myapp', (err) => {
  if (err) {
    console.log("Failed to connect : " + err);
    return;
  }
  console.log("db connection established");
});
