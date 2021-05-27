// Goal: Provide a function to save the user preferences to Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {

  // get the querystring parameters and store in memory
  let userId = event.queryStringParameters.userId
  let stat1 = event.queryStringParameters.stat1
  let stat2 = event.queryStringParameters.stat2

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // save preferences (create if user hasn't saved preferences before, otherwise update)
  await db.collection(`preferences`).doc(userId).set({
    userId: userId,
    stat1: stat1,
    stat2: stat2,
    updated: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}
