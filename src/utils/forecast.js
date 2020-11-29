const request = require('postman-request')

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=780ae3d66d5af710c3e96e30e947880d&query=' + encodeURIComponent(location) + '&units=f'
    // console.log(url)

    request({ url: url, json: true }, (error, {body}) => {
        if (error) { // this error object is for lower level OS issue. Such as network connection issues.
            callback('unable to connect to weatherstack!')
        } else if (body.error) {
            callback('Unable to find location. Try Another Search')
        } else {
            // console.log(response.body)
            const { temperature, feelslike } = body.current
            const { name:locationName, region:locationRegion } = body.location
            // const feelsLike = response.body.current.feelslike
            callback(undefined, locationName + ', ' + locationRegion + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast