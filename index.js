var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const routes = require(`./src/routes/routes.js`);
var app = express()
const port = 8080;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json());
app.use("/lexicalDensity", routes);

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });

app.get("/", (req, res) => res.send(`API to calculate lexical Density`));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))