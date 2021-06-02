// Goal: Provide a function to save the user- and player-specific notes to Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {

  // get the querystring parameters and store in memory
  let userId = event.queryStringParameters.userId
  let playerId = event.queryStringParameters.playerId
  let body = event.queryStringParameters.body

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // save notes (create if user/player combination doesn't exist yet, otherwise update)
  await db.collection(`notes`).doc(`${userId}${playerId}`).set({
    userId: userId,
    playerId: playerId,
    body: body,
    updated: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}