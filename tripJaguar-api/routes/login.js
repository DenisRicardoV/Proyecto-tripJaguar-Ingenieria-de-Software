'use strict'

const debug = require('debug')('tripJaguar:api:routes:login')
const express = require('express')
const asyncify = require('express-asyncify')
const crypto = require('../config/crypto')
var blacklist = require('express-jwt-blacklist');


var validate = require('../lib/index');
const Token = require('../lib/Token');
var schemaLogin = require('../test/validation/login');

const config = require('../config/index');

const api = asyncify(express.Router())

module.exports = function (db) {
  const {Auth, User, Agency } = db;
 
  api.post('/login', (req, res, next) => {    
    debug('A request has come to /login')
    const user = req.body;

    User.findByEmail(user.email, function(error, dataUser){
      if(error){
        return next(new Error('auth user not found'));
      }

      if(user.password = dataUser.password){
        delete dataUser.password
        var token =  Token.sign(dataUser, config.auth.secret);
        res.status(200).send({token});

      }else{
        return next(new Error('auth user not found'));
      }
    })


  })


  api.get('/logout',async (req, res, next) => {
    debug(`request to logout`)
    blacklist.revoke(req.user);
    res.send({message: "logout correct"});
  })

  api.post('/registrarse/viajero',desencrypt,async (req, res, next) => {
    debug(`request to registrarse/viajero`)
    const viajero = req.body;
    Auth.create(viajero, function(error, uid){
      if(error){
        return next(new Error('Not found El correo ya sido registrado'));
      }

      viajero.password = encrypt(viajero.password);
      viajero.roles = { tourist:true}
      viajero.uid = uid;
      User.create(viajero,function(errUser, state){
          if(errUser){
            return next(new Error('Server Failed Intentelo mas tarde'));
          }
          res.send({message:'Usuario Registrado, Valide Su correo Electrónico durante las 24 horas'})
      })

    })
    
  })

  api.post('/registrarse/agencia',desencrypt, (req, res, next) => {
    debug(`request to registrarse`)
    const  {representante, empresa } = req.body;
    Auth.create(representante, function(error, uid){

          if(error){
            return next(new Error('Not found El correo ya sido registrado'));
          }
          console.log('REGISTRO REPRESENTANTE');

          empresa.authorId = uid;
          representante.uid = uid;
          representante.password = encrypt(representante.password);
          representante.roles = { agency:true}

          Agency.create(empresa,function(errAgency, state){
            console.log('REGISTRO AGENCIA');
            User.create(representante,function(errUser, state){});
            res.send({message:'Agencia Registrada, Valide Su correo Electrónico durante las 24 horas'})
          })
          
    });
    console.log('registrarse agencia accediendo', req.body)
  })

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
