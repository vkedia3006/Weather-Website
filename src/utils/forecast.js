const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=e05b0088deed81bbceb13f43fcca94f7&query=' + longitude + ',' + latitude
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find Location!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
        }
    })
}

module.exports = forecast