// requirers

const fs = require("fs");
const express = require("express");

// using express with this server
var app = express();

// a port to listen for incoming requests
var PORT = process.env.PORT || 8080;

// set up Express to read static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,'public')));

const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

apiRoutes(app);
htmlRoutes(app);


// listener

app.listen(PORT, function(){
    console.log("Application listening on PORT" + PORT );
})