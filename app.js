const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurants })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => { return restaurant.id.toString() === req.params.restaurant_id })
  console.log(req.params.restaurant_id)
  console.log(restaurant)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter(
    (restaurant) => restaurant.name.toLowerCase().includes(req.query.keyword.trim().toLowerCase())
  )
  res.render('index', { restaurants, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})