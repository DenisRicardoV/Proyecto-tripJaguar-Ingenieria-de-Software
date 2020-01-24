'use strict'

//iniciando Base de Datos
const firebase = require('tripJaguar-db')()

//iniciando api
const debug = require('debug')('tripJaguar:api:routes:login')
const express = require('express')

//iniciando middleware


const login = require('./login')(firebase)
const agencia = require('./agencia')(firebase)
const reserva = require('./reserva')(firebase)
const turista = require('./turista')(firebase)

function api (app) {


  app.use('/tripJaguar',reserva)
  app.use('/tripJaguar', agencia)
  app.use('/tripJaguar', login)
  app.use('/tripJaguar', turista)
  
  // app.use('/tripJaguar',authMiddleware.isAuthenticatedAgency ,agencia)
  

}

module.exports = api
