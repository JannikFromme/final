let firebase = require('./firebase')

let url = `http://data.nba.net/10s/prod/v1/2020/players.json`
console.log(url)
// - Fetch the url, wait for a response, store the response in memory
let response = await fetch(url)
      
// - Ask for the json-formatted data from the response, wait for the data, store it in memory
let json = await response.json()

// - Write the json-formatted data to the JavaScript console
console.log(json)

exports.handler = async function(event) {
  let returnValue = [] // sample only...
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}