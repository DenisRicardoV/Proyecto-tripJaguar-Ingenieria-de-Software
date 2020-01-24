'use strict'

let controllers = null
const tour = require('./tour')
const agencia = require('./agencia')
const auth = require('./auth')

module.exports = function(){

    if(!controllers){
        console.log('Iniciando controladores')
        const Tour = tour()
        const Agencia = agencia()
        const Auth = auth()

        controllers = {
            Tour,
            Agencia,
            Auth
        }
    }
    return controllers
}