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


    api.post('/reservar/tour' ,auth(config.auth),  guard.check(['turista']),(req,res,next)=>{
        console.log("RESERVAR::", req.body);
        Reserva.create(req.body, function(error, success){
            if(error){
              console.log('ERROR',error);
              return next(new Error('Failed Server Firebase Error al registrar, intentelo mas tarde'));
            }
      
            res.send({message:'Reservacion Registrado Exitosamente'});
      
        })
    })



    return api
}



