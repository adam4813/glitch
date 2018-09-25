// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res) {
  console.log(req.params);
  let return_date;
  let date = req.params.date_string;
  
  if (date === "") {
    return_date = new Date();
  }
  else if (!isNaN(date)) {
    let date_int = parseInt(date);
    return_date = new Date(date_int);
  }
  else {
   return_date = new Date(date); 
  }
  
  console.log(return_date);
  
  if (return_date instanceof Date && !isNaN(return_date.valueOf())) {
    res.json({"unix": return_date.getTime(), "utc" : return_date.toUTCString() });
  }
  else {
    res.json({"error" : "Invalid Date" });
  }
});

// your first API endpoint... 
app.get("/api/timestamp/", function (req, res) {
    let return_date = new Date();
    res.json({"unix": return_date.getTime(), "utc" : return_date.toUTCString() });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});