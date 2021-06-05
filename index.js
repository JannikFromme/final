firebase.auth().onAuthStateChanged(async function(user) {
  
  if (user) {
    // Signed in
    console.log('signed in')
    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <div class="text-right">
        <button class="pr-8  text-blue-500 underline sign-out">Sign Out</button>
      </div>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

  // Define url    
  let url = `http://data.nba.net/10s/prod/v1/2020/players.json`
  
  // - Fetch the url, wait for a response, store the response in memory
  let response = await fetch(url)

  // - Ask for the json-formatted data from the response, wait for the data, store it in memory
  let json = await response.json()

  // - Write the json-formatted data to the JavaScript console
  console.log(json)

    // Get a reference to the "get stats" button
    let getStatsButton = document.querySelector(`.get-stats`)
  
    // When the "get stats" button is clicked:
    getStatsButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered first name
      let playerFirstInput = document.querySelector(`#playerFirstName`)
      
      // - Get the user-entered player first name from the element's value
      let playerFirst = playerFirstInput.value
      
      // - Get a reference to the element containing the user-entered last name
      let playerLastInput = document.querySelector(`#playerLastName`)
  
      // - Get the user-entered player last name from the element's value
      let playerLast = playerLastInput.value
      console.log(`${playerFirst} ${playerLast}`)

      // Introduce player stats profile object
      let playerCareerProfile = []

      // Introduce season stats profile object
      let playerProfile = {
        points: [],
        assists: [],
        rebounds: [],
        steals: [],
        blocks: [],
        fgp: [],
        tpp: [],
        ftp: []
      }
      
       // loop through database to find matching player name
       for (let i = 0; i < json.league.standard.length; i++) {
        if (playerFirst == json.league.standard[i].firstName && playerLast == json.league.standard[i].lastName) {
          let playerId = json.league.standard[i].personId
          console.log(playerId)
          let url2 = `http://data.nba.net/data/10s/prod/v1/2020/players/${playerId}_profile.json`
          let response2 = await fetch(url2)
          let json2 = await response2.json()
          console.log(json2)

          // Check for points check box being checked, if true display ppg for selected player
          if (returnJson[0].points == `true`) {
            playerCareerProfile.playerPoints = json2.league.standard.stats.careerSummary.ppg

            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let pointsData = json2.league.standard.stats.regularSeason.season[j].total.ppg
              playerProfile.points.push(pointsData)
            }
          }

          // check for assists check box being checked, if true display apg for selected player
          if (returnJson[0].assists == `true`) {
            playerCareerProfile.playerAssists = json2.league.standard.stats.careerSummary.apg
            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let assistsData = json2.league.standard.stats.regularSeason.season[j].total.apg
              playerProfile.assists.push(assistsData)
            }
          }

          // check for rebounds check box being checked, if true display rpg for selected player
          if (returnJson[0].rebounds == `true`) {
            playerCareerProfile.playerRebounds = json2.league.standard.stats.careerSummary.rpg
            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let reboundData = json2.league.standard.stats.regularSeason.season[j].total.rpg
              playerProfile.rebounds.push(reboundData)
            }
          }

          // check for steals check box being checked, if true display rpg for selected player
          if (returnJson[0].steals == `true`) {
            playerCareerProfile.playerSteals = json2.league.standard.stats.careerSummary.spg
            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let stealData = json2.league.standard.stats.regularSeason.season[j].total.spg
              playerProfile.steals.push(stealData)
            }
          }

          // check for blocks check box being checked, if true display rpg for selected player
          if (returnJson[0].blocks == `true`) {
            playerCareerProfile.playerBlocks = json2.league.standard.stats.careerSummary.bpg
            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let blockData = json2.league.standard.stats.regularSeason.season[j].total.bpg
              playerProfile.blocks.push(blockData)
            }
          }

          // check for fg% check box being checked, if true display fgp for selected player
          if (returnJson[0].fgp == `true`) {
            playerCareerProfile.playerFgp = json2.league.standard.stats.careerSummary.fgp
            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let fgpData = json2.league.standard.stats.regularSeason.season[j].total.fgp
              playerProfile.fgp.push(fgpData)
            }
          }

          // check for 3 pt% check box being checked, if true display tpp for selected player
          if (returnJson[0].tpp == `true`) {
            playerCareerProfile.playerTpp = json2.league.standard.stats.careerSummary.tpp
            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let tppData = json2.league.standard.stats.regularSeason.season[j].total.tpp
              playerProfile.tpp.push(tppData)
            }
          }

          // check for ft% check box being checked, if true display ftp for selected player
          if (returnJson[0].ftp == `true`) {
            playerCareerProfile.playerFtp = json2.league.standard.stats.careerSummary.ftp
            for (let j = 0; j < json2.league.standard.stats.regularSeason.season.length; j++) {
              let ftpData = json2.league.standard.stats.regularSeason.season[j].total.ftp
              playerProfile.ftp.push(ftpData)
            }
          }

          // Reference Stats Table
          document.getElementById(`statsTable`).innerHTML=`<thead></thead><tbody></tbody>`

          // Create Table Header
          var statsTableHeaderRef = document.getElementById(`statsTable`).getElementsByTagName('thead')[0];
          statsTableHeaderRef.classList.add("border-solid")
          statsTableHeaderRef.classList.add("border-4")
          statsTableHeaderRef.classList.add("border-light-blue-500")

          let headerRow = statsTableHeaderRef.insertRow()
          headerRow.style.fontSize = "16px"
          headerRow.style.fontWeight = "bolder"

          // Add column for Season to table
          headerRow.insertCell().appendChild(document.createTextNode(`Season`))

          // Add columb for Points to table, if selected by user
          if (playerProfile.points.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`Points`))
          }

          // Add rest of stats to table, if selected by user
          if (playerProfile.assists.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`Assists`))
          }

          if (playerProfile.rebounds.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`Rebounds`))
          }

          if (playerProfile.steals.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`Steals`))
          }

          if (playerProfile.blocks.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`Blocks`))
          }

          if (playerProfile.fgp.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`FG %`))
          }

          if (playerProfile.tpp.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`3P %`))
          }

          if (playerProfile.ftp.length > 0) {
            headerRow.insertCell().appendChild(document.createTextNode(`FT %`))
          }

          // Add body to table
          var statsTableBodyRef = document.getElementById(`statsTable`).getElementsByTagName('tbody')[0];

          // function for rows
          for (let y = 0; y < json2.league.standard.stats.regularSeason.season.length; y++){
            let row = statsTableBodyRef.insertRow()
            row.classList.add("border-solid")
            row.classList.add("border-2")
            row.classList.add("border-light-blue-500")
            

            // season years
            let seasonCell = row.insertCell()
            seasonCell.style.fontWeight = "bold"
            seasonCell.appendChild(document.createTextNode(`${2021-(y+1)}-${2021-y}`))

            let pointsCell = playerProfile.points[y]
            if (pointsCell != null) {
              row.insertCell().appendChild(document.createTextNode(pointsCell))
            }

            let assistsCell = playerProfile.assists[y]
            if (assistsCell != null) {
              row.insertCell().appendChild(document.createTextNode(assistsCell))
            }

            let reboundsCell = playerProfile.rebounds[y]
            if (reboundsCell != null) {
              row.insertCell().appendChild(document.createTextNode(reboundsCell))
            }

            let stealsCell = playerProfile.steals[y]
            if (stealsCell != null) {
              row.insertCell().appendChild(document.createTextNode(stealsCell))
            }

            let blocksCell = playerProfile.blocks[y]
            if (blocksCell != null) {
              row.insertCell().appendChild(document.createTextNode(blocksCell))
            }

            let fgpCell = playerProfile.fgp[y]
            if (fgpCell != null) {
              row.insertCell().appendChild(document.createTextNode(fgpCell))
            }

            let tppCell = playerProfile.tpp[y]
            if (tppCell != null) {
              row.insertCell().appendChild(document.createTextNode(tppCell))
            }

            let ftpCell = playerProfile.ftp[y]
            if (ftpCell != null) {
              row.insertCell().appendChild(document.createTextNode(ftpCell))
            }

          }

          //get reference to notes section
          let notes = document.querySelector(`#notes`)

        
          //get reference to newly created save button and the text area
          let saveNotesButton = document.querySelector(`#saveNotesButton`)
          let textArea = document.querySelector(`#textArea`)

          //Load previously saved notes

            // Build the URL for the return notes API
            let returnNotesUrl = `/.netlify/functions/return_notes?userId=${user.uid}&playerId=${playerId}`

            // Fetch the url, wait for a response, store the response in memory
            let returnNotes = await fetch(returnNotesUrl)

            // Ask for the json-formatted data from the response, wait for the data, store it in memory
            let returnNotesJson = await returnNotes.json()

            //set text area to previously saved notes (if user saved notes for this player before)
            if (returnNotesJson[0] != null) {
            textArea.innerHTML= returnNotesJson[0].body
            }

          //save notes' body when save button is clicked
          saveNotesButton.addEventListener(`click`, async function(event) {
              
            // prevent default
              event.preventDefault()

            // Build the URL for the save API (".checked" indicates whether a box is checked - true/false)
            let saveNotesUrl = `/.netlify/functions/save_notes?body=${textArea.value}&playerId=${playerId}&userId=${user.uid}`

            //Fetch the url, wait for a response, store the response in memory
            let saveResponse = await fetch(saveNotesUrl)

          })
          
        }
      }
      console.log(playerCareerProfile)
      console.log(playerProfile)
    })
    

  // Get the preferences for the logged-in user
  
    // Build the URL for the return API
    let returnUrl = `/.netlify/functions/return_preferences?userId=${user.uid}`

    // Fetch the url, wait for a response, store the response in memory
    let returnResponse = await fetch(returnUrl)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let returnJson = await returnResponse.json()

    // Get a reference to the checkboxes
    let pointsBox = document.querySelector(`#points`)
    let assistsBox = document.querySelector(`#assists`)
    let reboundsBox = document.querySelector(`#rebounds`)
    let stealsBox = document.querySelector(`#steals`)
    let blocksBox = document.querySelector(`#blocks`)
    let fgpBox = document.querySelector(`#fgp`)
    let tppBox = document.querySelector(`#tpp`)
    let ftpBox = document.querySelector(`#ftp`)

    // Toggle checkboxes based on a user's saved preferences (i.e., only if user has saved preferences before)
    // (stored as string in Firestore, therefore we must transform into boolean)
    // if (returnJson[0])
    if (returnJson[0] != null) {
    pointsBox.checked = (returnJson[0].points === 'true')
    assistsBox.checked = (returnJson[0].assists === 'true')
    reboundsBox.checked = (returnJson[0].rebounds === 'true')
    stealsBox.checked = (returnJson[0].steals === 'true')
    blocksBox.checked = (returnJson[0].blocks === 'true')
    fgpBox.checked = (returnJson[0].fgp === 'true')
    tppBox.checked = (returnJson[0].tpp === 'true')
    ftpBox.checked = (returnJson[0].ftp === 'true')
    }
    console.log(returnJson)

  // Save preferences for the logged-in user

    // Get a reference to the save button
    let saveButton = document.querySelector(`#save-button`)

    // Create an event listener for the save button
    saveButton.addEventListener(`click`, async function(event) {
      
      // prevent default
      event.preventDefault()

      // Build the URL for the save API (".checked" indicates whether a box is checked - true/false)
      let saveUrl = `/.netlify/functions/save_preferences?points=${pointsBox.checked}&assists=${assistsBox.checked}&rebounds=${reboundsBox.checked}&steals=${stealsBox.checked}&blocks=${blocksBox.checked}&fgp=${fgpBox.checked}&tpp=${tppBox.checked}&ftp=${ftpBox.checked}&userId=${user.uid}`

      // Fetch the url, wait for a response, store the response in memory
      let saveResponse = await fetch(saveUrl)

      // // refresh the page
      location.reload()
    })

  } else {
    
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
  // let returnValue = json
   // return the standard response
  //  return {
  //   statusCode: 200,
  //   body: JSON.stringify(returnValue)
  // }
})
