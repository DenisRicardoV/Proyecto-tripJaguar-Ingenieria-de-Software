'use strict'

const debug = require('debug')('tripJaguar:api:routes:agencia')
const express = require('express')
const asyncify = require('express-asyncify')
const crypto = require('../config/crypto')

var validate = require('../lib/index');
var upload  = require('../lib/upload');
var schemaLogin = require('../test/validation/login');

const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const config = require('../config/index');

const api = asyncify(express.Router())
const authMiddleware= require('../middlewares/auth-middleware')()

module.exports = function (db) {
  const {Auth, User, Agency, Tour} = db;

  const uploadTour = upload(User, Agency, Tour);
 
  api.post('/agencia/tours/nuevo' , auth(config.auth),  guard.check(['agencia']), authMiddleware.getUser, (req, res, next) => {    
    debug('A request has come to /agencia/tours/nuevo')
    req.body.authorId = res.locals.user.uid;
    req.body.imagenes = [];
    const tour = req.body;


    Tour.create(tour, function(error, uid){
      if(error){
        console.log('ERROR',error);
        return next(new Error('Failed Server Firebase Error al registrar, intentelo mas tarde'));
      }

      res.send({message:'Tour Registrado Exitosamente', uid:uid});

    })


  })


  api.post('/agencia/upload',uploadTour.fromTours);

  api.post('/agencia/transaction', auth(config.auth),  guard.check(['turista']), (req, res, next) =>{
      const uuid = req.body.id;
      User.findById(uuid, function(error, result){
        if(error){
          return next(new Error('not found ,intentelo mas tarde'));
        }
        res.send({transaction: result.account.idTransaction})

      })
  });

   
  return api
}

function desencrypt(req,res,next){
  if(req.body.representante)req.body.representante.password = crypto.desencrypt(req.body.representante.password );
  else req.body.password = crypto.desencrypt(req.body.password );
  next();
}
