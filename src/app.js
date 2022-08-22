import express from 'express'
import { join } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import hbs from 'hbs'
import geoCode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//Setup handlebars location and views folder
const viewsPath = join(__dirname, '../templates/views')
const partialsPath = join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static('public'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sam Stoffel'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sam Stoffel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'We are here to help you.',
        title: 'Help',
        name: 'Sam Stoffel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: '404 - Help Page Not Found',
        title: '404',
        name: 'Sam Stoffel'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 - Page Not Found',
        title: '404',
        name: 'Sam Stoffel'
    })
})

app.listen(3000, () => {
    console.log('Server Started')
})