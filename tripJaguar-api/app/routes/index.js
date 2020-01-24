'use strict'


//iniciando api
const debug = require('debug')('tripJaguar:api:routes:index')
const express = require('express')

//iniciando middleware
const tour = require('./tour')
const agencia = require('./agencia')
const auth = require('./auth')

function api (app) {

    app.use('/tripJaguar',tour())
    app.use('/tripJaguar',agencia())
    app.use('/tripJaguar',auth())
  
  // app.use('/tripJaguar',authMiddleware.isAuthenticatedAgency ,agencia)

}

module.exports = api
