console.log('client side javascript file is already loaded')

// basic elements to be brought earlier
const searchButton = document.querySelector('.search_button_submit')
const searchField = document.querySelector('.search_field_input')
const summaryField = document.querySelector('.weather_condition_description_element')
const temperatureField = document.querySelector('.weather_condition_temperature_element_numeric')
const errorField = document.querySelector('.container')

// network requirements 
const url = 'http://localhost:3000/weather?address='

// DOM requirements


// basic do's and dont's 
errorField.innerHTML = `
  <h1 class="error-message">Heyy there, welcome to dikshit's weather services</h1>
  <h2 class="error-message-lower">Search the weather of your city and get the best and fastest results :-)</h2>
`

// event listeners
searchButton.addEventListener('click', e => {
  e.preventDefault()
  
  const value = searchField.value
  console.log(value)
  errorField.innerHTML = `<h1 class="error-message">LOADING...</h1>`
  fetch(`${url}${value}`).then(response => {
    response.json().then( ({ error , summary , temperature , address }={}) => {
      if(error) {
        errorField.innerHTML = `<h1 class="error-message-lower">${error}</h1>`
      } else {
        const containerDisplay = `
          <div class="row">
          <!-- @@@@@@@@ section for primary info @@@@@@@@@@@@ -->
          <div class="col-6 container-1">
            <div class="weather_condition_icon">
              <!-- weather icon -->
            </div>

            <div class="weather_condition_description">
              <h1 class="weather_condition_description_element">
                ${summary}
              </h1>
            </div>

            <div class="weather_condition_temperature">
              <h2 class="weather_condition_temperature_element">The present average temperature is <span class="weather_condition_temperature_element_numeric">${temperature} <sup>o</sup>C</span> of location ${address}
              </h2>
            </div>

          </div>
          <!-- @@@@@@@@@@@ section for secondary info @@@@@@@2-->
          <!-- @@ secondary info contains presuure, humidity, min max temp, wind speed,  sunrise, sunset. @@ -->
          <div class="col-6 container-2">

            <div class="weather_sec_min_temp">
              <!-- a small icon for some what nice looking thing -->
              The minimum temperature is 23 <sup>o</sup>C
            </div>

            <div class="weather_sec_max_temp">
              <!-- a small icon for some what nice looking thing -->
              The maximum temperature is 33 <sup>o</sup>C
            </div>

            <div class="weather_sec_humidity">
              <!-- a small icon for some what nice looking thing -->
              Humidity of the area is ...
            </div>

            <div class="weather_sec_pressure">
              <!-- a small icon for some what nice looking thing -->
              Pressure of the area is newton per meter.
            </div>

            <div class="weather_sec_wind_speed">
              <!-- a small icon for some what nice looking thing -->
              Wind speed of London is 1 kmph.
            </div>

            <div class="weather_sec_sunInfo">
              <!-- a small icon for some what nice looking thing -->
              The sun rises at ... and sets at ....
            </div>
          </div>
          </div>
          `
        errorField.innerHTML = containerDisplay
               
      }
    })
  })
  
})
