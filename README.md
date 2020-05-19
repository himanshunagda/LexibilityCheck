# LexibilityCheck
API implementation for calculating lexical density

### Getting Started ###
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites ###
Nodejs
MongoDB
Expressjs

### Development Setup ###
Explain how to install all development dependencies.

`git clone https://github.com/himanshunagda/LexibilityCheck.git`

 `cd LexibilityCheck`
 
 `npm i`
 
 ### How to initiate MongoDB ###
 `node src/scripts/mongoInitiate.js`
 
 ### Start the Development server ###
 `npm start`
 
 It starts project on http://localhost:8080/
 
 ### HTTP calls ###
 Make http post request on URL http://localhost:8080/lexicalDensity/complexity/ to test lexical density of a sentence.
 
 Make http post request on URL http://localhost:8080/lexicalDensity/complexity/verbose to test lexical density of a multiple sentences.
 
 Required paramter in a body of request:
 
 `{
	"inputData": "test expression"
  }`
  
  test expression should be a sentence for which lexibal density has to be calculated.
  
  ### Project Requirements ###
 You have been tasked to build an API where a user can query the complexity of a text
segment. In the first iteration your PM asked you to use lexical density. Please use NodeJs +
Express (or any of the more well known frameworks) to develop your API.
Definitions
Lexical density is defined as the number of lexical words (or content words) divided by the
total number of words. In the following sentence the green words are lexical words and the
density is 67%.
Kim loves going to the cinema
For the sake of simplicity, we define a lexical word as all words not contained in the
provided list of non lexical words in the Appendix. Case sensitivity should be ignored.
Requirements

● Route: /complexity

○ Description:
Return the lexical density of the inputted text. The input text should be
provided via the request.

○ output :
{ “data”:{
overall_ld: 0.42
}
}

● Route: /complexity?mode=verbose

○ Description:
Return the lexical density of the text broken down into sentences. The input
text should be provided via the request.

○ output :
{ “data”:{
sentence_ld: [ 0.23, 0.1, 1.0, 0.0],
overall_ld: 0.42
}
}

● Error case: Only texts with up to 100 words or up to 1000 characters are valid input.
Please cover these cases with tests using the framework of your choice.

● Storage: The provided non-lexical words should be stored in a Mongo DB. If time
allows, please provide a protected endpoint where new words can be added over
time.

### How to run test ###
`npm test`
