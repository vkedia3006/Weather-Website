const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Vedant Kedia"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Vedant Kedia"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Vedant Kedia",
        msg: "Click back button to go back"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Adress must be provided"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, data1) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: data1
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404 Page Not Found",
        name: "Vedant Kedia",
        errorLine: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "404 Page Not Found",
        name: "Vedant Kedia",
        errorLine: "Page not found"
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})