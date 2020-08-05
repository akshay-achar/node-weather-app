const request = require('postman-request')

const gecode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtzaGF5a2Fya2FsYSIsImEiOiJja2RlNjh0dTIwajBjMnFucnk5dzMyNnUyIn0.WWvcBF5f5R0qv0muiecxIQ'

  request({ url, json: true }, (error, response) => {
    var errorValue = undefined
    var dataValue = undefined
    if (error) {
      errorValue = 'Unable to connect to location service'
    } else if (response.body.message === 'Not Authorized - Invalid Token') {
      errorValue = 'Token Invalid'
    } else if (response.body.features.length === 0) {
      errorValue = 'Unable to find the Map details provided'
    } else {
      const features = response.body.features[0]
      dataValue = {
        latitude: features.center[0],
        longtitude: features.center[1],
        location: features.place_name
      }
    }
    callback(errorValue, dataValue)
  })
}

module.exports = {
  gecode: gecode
}
