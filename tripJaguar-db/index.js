'use strict'
const setupDatabase = require('./lib/db')
const setupViajero = require('./lib/viajero')

const setupUser = require('./lib/user')
const setupAuth = require('./lib/auth')
const setupAgency = require('./lib/agency')
const setupTour = require('./lib/tour')
const setupTarjeta = require('./lib/tarjeta')
const setupReserva = require('./lib/reserva')

module.exports = function () {
  const firebase = setupDatabase()

  const Viajero = setupViajero(firebase.apiFirestore)
  const User = setupUser(firebase.apiFirestore)
  const Auth = setupAuth(firebase.apiAuth)
  const Agency = setupAgency(firebase.apiFirestore)
  const Tour = setupTour(firebase.apiFirestore);
  const Tarjeta = setupTarjeta(firebase.apiFirestore)
  const Reserva = setupReserva(firebase.apiFirestore)

  return {
    Viajero,
    User,
    Auth,
    Agency,
    Tour,
    Tarjeta,
    Reserva
  }

}
