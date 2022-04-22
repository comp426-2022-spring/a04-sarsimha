const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
if (args.port == undefined) {
  args.port = 5000
}
var port = args.port;

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});


app.get('/app/', (req, res) => {
  // Respond with status 200
    res.statusCode = 200;
  // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
  });

  app.get('/app/flip/', (req, res) => {
    let flip = coinFlip();
    res.status(200).json({'flip' : flip})
});

//endpoint that returns json object with raw random number flips and summary 
app.get('/app/flips/:number', (req, res) => {
	let raw_flips = coinFlips(req.params.number);
    let sum_flips = countFlips(raw_flips)
    res.json({'raw': raw_flips, 'summary': sum_flips})
});

//return result of flip
app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin('heads'));
})

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin('tails'));
})


//coin flips code

function coinFlip() {
    return Math.random() > .5 ? ("heads") : ("tails")
  }
  
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */
  
function coinFlips(flips) {
    const results = new Array();
    
    for(let i = 0; i < flips; i++) {
      results.push(coinFlip());
    }
  
    return results
  
  }
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
function countFlips(array) {
    let heads = 0;
    let tails = 0;
    let count = { heads: heads, tails: tails};
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "heads") {
        heads++;
      }
      else {
        tails++;
      }
    }
  
    if (tails == 0) {
      count = {heads};
    }
    else if (heads == 0) {
      count = {tails};
    }
    else {
      count = {heads, tails};
    }
    return count;
  
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
function flipACoin(call) {
    let flips = coinFlip();
    let result;
    if (call === flips) {
      result = "win";
    }
    else {
      result = "lose";
    }
    
    let output = {call: call, flip: flips, result: result}
    return output
  
  }