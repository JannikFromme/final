// Goal: Provide a function to save the user preferences to Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {

  // get the querystring parameters and store in memory
  let userId = event.queryStringParameters.userId
  let points = event.queryStringParameters.points
  let assists = event.queryStringParameters.assists
  let rebounds = event.queryStringParameters.rebounds
  let steals = event.queryStringParameters.steals
  let blocks = event.queryStringParameters.blocks
  let fgp = event.queryStringParameters.fgp
  let tpp = event.queryStringParameters.tpp
  let ftp = event.queryStringParameters.ftp

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // save preferences (create if user hasn't saved preferences before, otherwise update)
  await db.collection(`preferences`).doc(userId).set({
    userId: userId,
    points: points,
    assists: assists,
    rebounds: rebounds,
    steals: steals,
    blocks: blocks,
    fgp: fgp,
    tpp: tpp,
    ftp: ftp,
    updated: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}
