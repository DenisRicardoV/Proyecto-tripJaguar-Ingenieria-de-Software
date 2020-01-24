'use strict'

const debug = require('debug')('tripJaguar:api:routes:auth')

const express = require('express')
const asyncify = require('express-asyncify')
const crypto = require('../../config/crypto')


const api = asyncify(express.Router())
const controller = require('../controllers/index')


module.exports = function () {
    const { Auth } = controller()

    api.post('/auth/login',
      function(req,res,next){ debug('A request /auth/login'); next();},
      Auth.login
    )


    api.get('/auth/logout',
      function(req,res,next){ debug('A request /auth/logout'); next();},
      Auth.logout
    )

    //registrar turista
    api.post('/auth/turista/registrar',
      function(req,res,next){ debug('A request /auth/turista/registrar'); next();},
      Auth.registrarTurista
    )


    //registrar agencia
    api.post('/auth/agencia/registrar',
      function(req,res,next){ debug('A request /auth/agencia/registrar'); next();}  ,
      Auth.verifyEmailUser, 
      Auth.verifyRuc,
      Auth.verifySunatRuc, 
      Auth.registrarAgencia
    )

    //registrar agencia
    api.get('/auth/activate/:id',
      function(req,res,next){ debug('A request /auth/activate/:id'); next();}  ,
      Auth.activateAccount
    )

    return api

}




function desencrypt(req,res,next){
  if(req.body.representante)req.body.representante.password = crypto.desencrypt(req.body.representante.password );
  else req.body.password = crypto.desencrypt(req.body.password );
  next();
}

function encrypt(password){
  return crypto.encrypt(password );
}
