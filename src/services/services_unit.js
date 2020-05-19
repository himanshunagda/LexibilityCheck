const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const chai = require('chai');
chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;
const assert = chai.assert;
const services = require('./services.js');
var wordList = ["to", "got", "is", "have", "and", "although", "or", "that", "when", "while", "a", "either", "more", "much", "neither", "my", "the", "as", "no", "nor", "not", "at", "between", "in", "of", "without", "i", "you", "he", "she", "it", "we", "they", "anybody", "one"];

describe('lexibal density check tests', () => {
    describe('Function exports', () => {
        it("Test exported functions", function () {
            assert.property(services, 'calDensity');
            assert.property(services, 'create');
            assert.property(services, 'find');
            assert.property(services, 'complexity');
            assert.property(services, 'complexityVerbose');
        });
    });

    describe('lexical density', () => {
        it("if input is valid", function () {
            const inputData = 'Hello';
            let lexibalDensity = services.calDensity(inputData, wordList);
            assert.isNumber(lexibalDensity);
            expect(lexibalDensity).to.be.equal(1);
        });

        it("if input is valid with multiple words", function () {
            const inputData = 'Hello to any';
            let lexibalDensity = services.calDensity(inputData, wordList);
            assert.isNumber(lexibalDensity);
            expect(lexibalDensity).to.be.equal(0.67);
        });
        it("if input is a number", async function () {
            const inputData = 2;
            let lexibalDensity = services.calDensity(inputData, wordList);
            expect(lexibalDensity).to.be.equal('input is invalid')
        });

        it("if no inputData is provided", async function () {
            const inputData = '';
            let lexibalDensity = services.calDensity(inputData, wordList);
            expect(lexibalDensity).to.be.equal('input is invalid')
        });
    });
})