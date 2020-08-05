const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=300ab0d58f43a4819ddf7f4126e94a9a&query=' + longtitude + ',' + latitude
  request({ url: url, json: true }, (error, response) => {
    var errorValue = undefined
    var dataValue = undefined
    if (error) {
      errorValue = 'Unable to connect to weather service'
    } else if (response.body.error) {
      errorValue = 'Unable to find the Locations'
    } else {
      const currentObject = response.body.current
      dataValue = currentObject.weather_descriptions + ' It is currently ' + currentObject.temperature + ' degress out. It feels like ' + currentObject.feelslike + ' degress out.'
    }
    callback(errorValue, dataValue)
  })
}

module.exports = {
  forecast: forecast
}
