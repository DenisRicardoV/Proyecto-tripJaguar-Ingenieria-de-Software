'use strict'

const express = require('express')
const cors = require('cors')
const http = require('http')
const chalk = require('chalk')
const asyncify = require('express-asyncify')
const jwt = require('express-jwt');
var blacklist = require('express-jwt-blacklist');
const bodyParser = require('body-parser')


const api = require('./app/routes/index')

const errorMiddleware = require('./middlewares/error-middleware')

const port = process.env.PORT || 3000
const app = asyncify(express())

const server = http.createServer(app)

// config cors
const originsWhitelist = [
  'http://localhost:4200', // this is my front-end url for development
  'http://www.myproductionurl.com'
]
// const corsOptions = {
//   origin: function (origin, callback) {
//     var isWhitelisted = originsWhitelist.indexOf(origin) !== -1
//     callback(null, isWhitelisted)
//   },
//   credentials: false
// }
app.use(cors())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }))

blacklist.configure({
  tokenId: 'email'
});

const config = require('./config/index')
app.use(jwt({
  secret: config.auth.secret,
  credentialsRequired: false,
  isRevoked: blacklist.isRevoked
}));



//Servicio de archivos estáticos
app.use(express.static('./public'));

api(app)
app.use(errorMiddleware);


if (!module.parent) {
  server.listen(port, () => {
    console.log(`${chalk.green('[tripJaguar-api]')} server listening on port :`, port)
  })
}
module.exports = server
