const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to a basic express App')
})

const routes = require('./api/routes/botRoutes')
routes(app)

app.listen(port)

console.log('github bot RESTful API server started on: ' + port)
