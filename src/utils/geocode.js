import axios from 'axios'

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXZyZWxpYSIsImEiOiJjbDZ0ZHF2OWQxMjY1M2twYm84OW4wdDU0In0.YlHk1tcjM97ZehdcoiLtmQ&limit=1`
    axios.get(url).then(({data, status}) => {
        if(status === 200 && data.features.length > 0){
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name   
            })
        } else if (data.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback('Unable to connect to location services!', undefined)
        }
    })
}

export default geoCode