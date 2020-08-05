const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const gecodeService = require('./util/gecode')
const forecastService = require('./util/forecast')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    name: 'AKSHAY K'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'AKSHAY K'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'AKSHAY K'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'You must provid an address'
    })
  }
  gecodeService.gecode(address, (error, data) => {
    if (error) {
      return res.send({
        error: 'Unable to get the forecast details'
      })
    }
    forecastService.forecast(data.latitude, data.longtitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: 'Unable to get the forecast details'
        })
      }
      return res.send({
        forecast: forecastData,
        location: data.location,
        address: address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Article Not Found',
    name: 'AKSHAY K'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'AKSHAY K'
  })
})

app.listen(port, () => {
  console.log('Server is listening to port ' + port)
})
