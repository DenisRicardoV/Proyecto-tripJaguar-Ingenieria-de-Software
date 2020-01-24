'use strict'

const debug = require('debug')('tripJaguar:api:routes:agencia')
const express = require('express')
const asyncify = require('express-asyncify')

const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const config = require('../../config/index');




const api = asyncify(express.Router())

const controller = require('../controllers/index')
const { Upload } = require('../../utils/index')

var directorio = 'images/agencies/';

module.exports = function () {
    const { Agencia } = controller()

    api.post('/agencia/logo/registrar/upload/:id' , Agencia.uploadLogo)

    api.get('/agencia/verify-acount' , 
        function(req,res,next){ debug('A request /agencia/verify-account'); next();},
        auth(config.auth),
        guard.check(['agencia:write']),
        Agencia.verifyAccount
    );

    api.get('/agencia/single', 
        function(req,res,next){ debug('A request /agencia/single'); next();},
        auth(config.auth),
        guard.check(['agencia:read']),
        Agencia.findSingle
    );

    api.post('/agencia/account/registrar', 
        function(req,res,next){ debug('A request /agencia/account/registrar/:id'); next();},
        auth(config.auth),
        guard.check(['agencia:write']),
        Agencia.registrarCuenta
    );

    api.post('/agencia/transaction', 
        function(req,res,next){ debug('A request /agencia/transaction'); next();},
        auth(config.auth),
        guard.check(['turista:write']),
        Agencia.getTransaction
    );

    return api
}

