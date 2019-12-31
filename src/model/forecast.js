const request = require('request')
const key = 'b5963dc1745238495afbaa4f0e99424b'


const forecast = (lattitude,longitude,callback) => {
  const url = `https://api.darksky.net/forecast/${key}/${lattitude},${longitude}`   //the form is /{lattitude},{longitude}
  request ({ url, json: true} , (error,response) => {
    if(error) {
      callback('Unable to connect to the forecasting services!', undefined)
    } else if( response.error ) {
      callback('The provided url is faulty!',undefined)
    }
    else {
      callback(undefined, {
        timezone: response.body.timezone,
        temp: response.body.currently.temperature,
        rainChances: response.body.currently.precipProbability,
        summary: response.body.hourly.data[0].summary
      })
    }
    // console.log(response)
  })
}

module.exports = {
  forecast
}
