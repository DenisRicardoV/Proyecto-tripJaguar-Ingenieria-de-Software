'use strict'

const debug = require('debug')('tripJaguar:api:routes:tour')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const config = require('../../config/index');

const api = asyncify(express.Router())

const controller = require('../controllers/index')

module.exports = function () {
    const { Tour } = controller()

    api.post('/tour/registrar' ,
        function(req,res,next){ 
            debug('A request /tour/registrar'); next();},
        auth(config.auth),  
        guard.check(['agencia:write']), 
        Tour.registrar
    );

    api.post('/tour/upload/:id' ,
        function(req,res,next){ 
            debug('A request /tour/upload/:id'); next();},
        auth(config.auth),  
        guard.check(['agencia:write']), 
        Tour.upload
    );

    api.get('/tour/agencia' ,
        function(req,res,next){ 
            debug('A request /tour/agencia'); next();},
        auth(config.auth),  
        guard.check(['agencia:read']), 
        Tour.getByAgencia
    );

    api.post('/tour/filtrar' ,
        function(req,res,next){ debug('A request /tour/filtrar'); next();},
        Tour.filtrar
    );

    api.get('/tour/all' ,
        function(req,res,next){ debug('A request /tour/all'); next();},
        Tour.all
    );

    api.post('/tour/comprar' ,
        function(req,res,next){ debug('A request /tour/comprar'); next();},
        auth(config.auth),
        guard.check(['turista:write']), 
        Tour.registrarCompra
    );

    api.post('/tour/reservar' ,
        function(req,res,next){ debug('A request /tour/reservar'); next();},
        auth(config.auth),
        guard.check(['turista:write']), 
        Tour.registrarCompra
    );




    api.get('/reserva/turista' ,
        function(req,res,next){ debug('A request /reserva/turista'); next();},
        auth(config.auth),
        guard.check(['turista:read']), 
        Tour.findReservaForuser
    );



    return api
}

