const request = require('request')
const accessToken = 'pk.eyJ1IjoiZGlrc2hpdHVwYWRoeWEiLCJhIjoiY2s0aWpyOW1vMWd4NjNtcXFlb3FnN212MCJ9.4A4snBOU6nZUG2R8hk3QvQ'

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place&country=in&access_token=${accessToken}`
  request ({ url, json:true } , (error, response) => {
    if(error){
      callback('Unable to connecting to the geocode services!', undefined)
    } else if( response.body.features.length === 0 ) {
      callback('Sorry, the info provided is not correct!', undefined)
    }
    else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
    // console.log(error, response)
  })
}

module.exports = {
  geocode
}
