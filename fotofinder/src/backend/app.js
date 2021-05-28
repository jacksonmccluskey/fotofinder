const Words = require('../spelling/Words')
const express = require('express')
const app = express();

app.get("/", function(req, res) {
  res.send(Words.fetchWords());
});

let port = process.env.PORT;

if(port === null || port === "") {
  port = 5000;
}
  
app.listen(port, function() {
  console.log("Server started successfully")
})