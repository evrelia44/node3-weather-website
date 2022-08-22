import axios from 'axios'

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9a86d5a878a429a8f7bbbd4806a710ad&query=' + latitude + ',' + longitude
    axios.get(url).then(({data, status}) => {
        if (status !== 200) {
            callback('Unable to connect to weather service!', undefined)
        } else {
            callback(undefined, data.current.weather_descriptions[0] + '. It is currently ' + data.current.temperature + ' degrees out. There is a ' + data.current.precip + '% chance of rain.')
        }
    })
}

export default forecast