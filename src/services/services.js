var dburl = "mongodb://127.0.0.1:27017";
const MONGO = require('mongodb').MongoClient;

/**
 * find record from MongoDB
 * @param {*} req the request object
 * @return {Object | Error} the data object containing the parsed data
 */
const find = async (req, res) => {
    const client = await MONGO.connect(dburl);
    var db = await client.db('density');
    const dbWord = db.collection('dbWord');
    let result = await dbWord.find().toArray()
    res.status(200).send(result);
}
/**
 * Add record to MongoDB
 * @param {*} req the request object
 * @return {Object | Error} the data object containing the parsed data
 */
const create = async (req, res) => {
    let word = req.body.word;
    const client = await MONGO.connect(dburl);
    var db = await client.db('density');
    const dbWord = db.collection('dbWord');
    let result = await dbWord.save({ 'word': word });
    if (result) {
        res.status(200).send({ message: 'Successfully added to the database', data: word });
    } else {
        res.status(400).send('Could not add value to the database');
    }
}

/**
 * Calculate lexical density
 * @param {*} input the input from user
 * @param {*} nonLexicalArr non lexical mapped array
 * @return {number} result
 */
const calDensity = (input, nonLexicalArr) => {
    let overall_ld;
    if (input.length > 1000 || typeof (input) !== "string" || !nonLexicalArr || input.length < 1) {
        return ('input is invalid');
    } else {
        /**task done by below code: 
        will trim all spaces
        convert words into lowercase
        split sentence into words from spaces 
        filter words accordingly */
        let prepareInput = input.trim().toLowerCase().replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ``).split(" ").filter(item => item !== "");
        if (prepareInput.length > 100) {
            res.status(400).send({ error: "input data invalid" });
        } else {
            const count = prepareInput.length; //initial length
            let result = prepareInput.filter(word => !nonLexicalArr.includes(word));
            //calculate lexibility
            overall_ld = Number((result.length / count).toFixed(2));
            return overall_ld;
        }
    }

};

/**
 * Calculate complexity for one sentence
 * @param {*} rq the req from user
 * @return {Object | Error} the data object containing the parsed data
 */
const complexity = async (req, res) => {
    const client = await MONGO.connect(dburl);
    var db = await client.db('density');
    const dbWord = db.collection('dbWord');
    const allData = await dbWord.find().toArray();
    let { inputData } = req.body;
    if (!inputData) {
        res.status(400).send({ error: "input data is a required paramter" });
    } else {
        let nonLexicalWords = allData.map(x => x.word);
        console.log(nonLexicalWords);
        let overall_ld = calDensity(inputData, nonLexicalWords);
        res.send({
            data: { overall_ld }
        });
    }
};

/**
 * Calculate complexity for multiple sentences
 * @param {*} rq the req from user
 * @return {Object | Error} the data object containing the parsed data
 */
const complexityVerbose = async (req, res) => {
    let overall_ld;
    let sentence_ld = [];
    let { inputData } = req.body;
    if (inputData.includes(".") === false) {
        res.status(400).send({ error: "sentence is not complete, please complete with full stop" });
    }
    const client = await MONGO.connect(dburl);
    var db = await client.db('density');
    const dbWord = db.collection('dbWord');
    const allData = await dbWord.find().toArray();
    if (!inputData) {
        res.status(400).send({ error: "input data is a required paramter" });
    } else {
        let chunks = inputData.match(/[^\.!\?]+[\.!\?]+/g);
        let nonLexicalWords = allData.map(x => x.word);
        if (!chunks) {
            res.status(400).send({ error: "no input data provided" });
        } else {
            chunks.forEach(sentence => {
                let calulatedDensity = calDensity(sentence, nonLexicalWords);
                sentence_ld.push(calulatedDensity);
            });
        }
        overall_ld = Number((sentence_ld.reduce((x, y) => x + y, 0) / sentence_ld.length).toFixed(2));
        res.send({ data: { sentence_ld, overall_ld } });
    }
};
module.exports = {
    find,
    create,
    calDensity,
    complexity,
    complexityVerbose
}