firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    console.log(user)

    window.addEventListener('DOMContentLoaded', async function() {
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
        console.log(playerFirst)
        // - Get a reference to the element containing the user-entered last name
        let playerLastInput = document.querySelector(`#playerLastName`)
    
        // - Get the user-entered player last name from the element's value
        let playerLast = playerLastInput.value
  
        // - Get a reference to the element containing the user-entered year
        let yearInput = document.querySelector(`#year`)
  
        // - Get the user-entered days from the element's value
        let year = yearInput.value
    
        // - Check to see if the user entered anything; if so:
        // if (playerFirst.length > 0 && playerLast.length > 0 && year.length > 0 ) {
              // - Construct a URL to call the player ID API
              let url = `http://data.nba.net/10s/prod/v1/2020/players.json`
              console.log(url)
              // - Fetch the url, wait for a response, store the response in memory
              let response = await fetch(url)
      
              // - Ask for the json-formatted data from the response, wait for the data, store it in memory
              let json = await response.json()
      
              // - Write the json-formatted data to the JavaScript console
              console.log(json)
      
              // - Store the returned location, current weather conditions, the forecast as three separate variables
              // let interpretedLocation = json.location
              // let currentWeather = json.current
              // let dailyForecast = json.forecast.forecastday
      
              // Store a reference to the "current" element
              // let currentElement = document.querySelector(`.current`)
      
              // Fill the current element with the location and current weather conditions
              // currentElement.innerHTML = `
              //     <div class="text-center space-y-2">
              //         <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
              //         <div class="font-bold">
              //         <img src="https:${currentWeather.condition.icon}" class="inline-block">
              //         <span class="temperature">${currentWeather.temp_f}</span>° 
              //         and
              //         <span class="conditions">${currentWeather.condition.text}</span>
              //         </div>
              //     </div>
              // `
              // Store a reference to the "forecast" element
              // let enteredDays = document.querySelector(`.forecast`)
  
              // Fill the entered days element with the user-entered days condition
              // enteredDays.innerHTML = `
              //     <div class="text-center space-y-8">
              //     <div class="font-bold text-3xl">${days} Day Forecast</div>
              // `
              // if (days > 3) {
              //     // Store a reference to the current element
              //     let daysCheck = document.querySelector(`.current`)
  
              //     // If days enterd is outside of conditions return error message
              //     daysCheck.insertAdjacentHTML("beforebegin", `
              //         <div class="text-center">
              //             You are using the free weatherAPI.com version. Please enter a days value between 1 and 3 only!
              //         </div>
              //     `)
              // }
              // Loop through days entered to get forecast
              // for (let i = 0; i < days; i++) {
              //     // Create a variable to store each day in the forecast
              //     let requestedForecast = dailyForecast[i]
              //     // Store a reference to the "forecast" element
              //     let forecast = document.querySelector(`.forecast`)
  
              //     // Fill the entered forecast values based on user-entered days condition
              //     forecast.insertAdjacentHTML(`beforeend`, `
              //         <div class="text-center">
              //             <img src="https:${requestedForecast.day.condition.icon}" class="mx-auto">
              //             <h1 class="text-2xl text-bold text-gray-500">${requestedForecast.date}</h1>
              //             <h2 class="text-xl">High ${requestedForecast.day.maxtemp_f}° – Low ${requestedForecast.day.mintemp_f}°</h2>
              //             <p class="text-gray-500">${requestedForecast.day.condition.text}</h2>
              //         </div>
              //     `)
              // }
          // }
      })
    })

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
    <button class="text-pink-500 underline sign-out">Sign Out</button>
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
