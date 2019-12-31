const hbs = require('hbs')
const path = require('path')
const express = require('express')
const { geocode } = require('./model/geocode')
const { forecast } = require('./model/forecast')

const app = express()
const port = process.env.PORT

const indexDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(indexDir))

app.get('', (req,res) => {
  res.render('index', {
    temperature: '13',
    summary: 'Partly Cloudy',
    location: 'Duliajan'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Weather2Help',
    help: 'Help page for weather 2 project',
    string: 'This is an express passed in string',
    name: 'Dikshit Upadhya',
    pageType: 'HELP page...'
  })
})

app.get('/about', (req,res) => {
  res.render('about',{
    title: 'Weather2About',
    about: 'About page for weather 2 project',
    string: 'This is an express passed in string for about',
    name: 'Dikshit Upadhya',
    pageType: 'ABOUT page...'
  })
})

app.get('/weather', (req,res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Please enter an address'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if(error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, {temp , summary }={}) => {
      if(error) {
        return res.send({
          error
        })
      }

      res.send({
        summary,
        temperature: temp,
        address: location
      })
    })
  })

})


app.listen(port,() => {
  console.log('the server is just working fine!')
})
