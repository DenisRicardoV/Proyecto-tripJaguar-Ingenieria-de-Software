'use strict'

const db = require('tripJaguar-db')


const { error } = require('../utils/index').handler


let services = null

module.exports =  function initDatabase() {
    if (!services) {
        // debug('Connecting to database')
        try {
            services =  db()
        } catch (e) { error().handleFatalError(e) }
    }
    return services // Organization, User
}