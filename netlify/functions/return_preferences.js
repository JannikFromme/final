// Goal: Provide a function to return a user's preferences from Firebase.

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []  

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // get the querystring parameter userId and store it in memory
  let userId = event.queryStringParameters.userId

  // perform a query against firestore for the user's preferences, wait for it to return, store in memory
  let preferencesQuery = await db.collection(`preferences`).doc(userId).get()

  // retrieve the data from the query
  let preferences = preferencesQuery.data()

  // add the Object to the return value
  returnValue.push(preferences)

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
