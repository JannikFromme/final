// Goal: Provide a function to return a user's saved notes for a specific player from Firebase.

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []  

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // get the querystring parameters and store them in memory
  let userId = event.queryStringParameters.userId
  let playerId = event.queryStringParameters.playerId

  // perform a query against firestore for the user's preferences, wait for it to return, store in memory
  let notesQuery = await db.collection(`notes`).doc(`${userId}${playerId}`).get()

  // retrieve the data from the query
  let notesData = notesQuery.data()

  // add the Object to the return value
  returnValue.push(notesData)

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}