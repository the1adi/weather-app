const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths... Express Config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up HBS engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aditya Shahani'
    })
})

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About',
        name: 'Aditya Shahani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Aditya Shahani',
        message: 'This is the Help Page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    forecast(req.query.location, (error, data) => {
        if (error) {
            res.send({ error: error })
        } else {
            res.send({
                forecast: data,
                location: req.query.location
            })
        }
    })
})

// Error for any subpages of Help section
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Page',
        name: 'Aditya Shahani',
        message: 'Help Article not found!!!'
    })
})

// Error page for non existant routes
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Aditya Shahani',
        message: 'The page you are looking for does not exist'
    })
})

// This allows the app server to listen on a specific port
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
