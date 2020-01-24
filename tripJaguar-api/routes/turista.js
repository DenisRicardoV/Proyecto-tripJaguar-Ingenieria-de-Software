'use strict'

const debug = require('debug')('tripJaguar:api:routes:reserva')
const express = require('express')
const asyncify = require('express-asyncify')

const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const config = require('../config/index');

const api = asyncify(express.Router())

module.exports = function (db) {
    const {Auth, Reserva} = db;

    api.get('/turista/reserva/list/:id' ,auth(config.auth),  guard.check(['turista']),(req,res,next)=>{
        debug('Reques to turista/reservas/list/:id')
        var id =  req.params.id
        Reserva.findByIdTurist(id, function(error, data){
            if(error){
              console.log('ERROR',error);
              return next(new Error('Failed Server Firebase Error al registrar, intentelo mas tarde'));
            }
            res.send(data);
        });
       
    });




    return api
}



