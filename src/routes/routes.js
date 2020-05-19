var server = require("express").Router();
const services = require('../services/services.js');

// API routes for calculating lexical density

/**
 * @name Get all words
 * @route {GET} /getAllWords
 */
server.route("/getAllWords").get(services.find);

/**
 * @name Post add word to wordList
 * @route {POST} /addWords
 */
server.route("/addWords").post(services.create);

/**
 * @name POST calculate lexical density of sentence
 * @route {POST} /complexity
 */
server.route("/complexity").post(services.complexity);

/**
 * @name POST calculate lexical density of multiple sentences
 * @route {POST} /complexity
 */
server.route("/complexity/verbose").post(services.complexityVerbose);

module.exports = server;