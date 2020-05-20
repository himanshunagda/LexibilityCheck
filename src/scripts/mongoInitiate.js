var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//array of non lexical words
var wordList = ["to", "got", "is", "have", "and", "although", "or", "that", "when", "while", "a", "either", "more", "much", "neither", "my", "the", "as", "no", "nor", "not", "at", "between", "in", "of", "without", "i", "you", "he", "she", "it", "we", "they", "anybody", "one"];

let words = [];
wordList.forEach(word => {
    words.push({ "word": word })
})

//Initiating mongodb to create database and collection
MongoClient.connect(url, function (err, db) {
    var dbo = db.db("density");
    dbo.collection("dbWord").insertMany(words, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});