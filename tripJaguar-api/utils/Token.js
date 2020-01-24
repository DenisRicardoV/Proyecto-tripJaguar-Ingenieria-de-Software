'use strict'

const jwt = require('jsonwebtoken')

function sign (payload, secret) {
  payload.permissions = crearPermisos(payload);
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

function verify (token, secret, callback) {
  jwt.verify(token, secret, callback)
}

function crearPermisos(payload){
  //Creamos los permisos correspondientes
  var permissions=[];
  switch(payload.type){
    case 0:
        permissions.push("turista");
        permissions.push("turista:read")
        if(payload.verify){
          permissions.push("turista:write");
        }
      break;
    case 1:
        permissions.push("agencia");
        permissions.push("agencia:read")
        if(payload.verify){
          permissions.push("agencia:write");
        }
      break;
  }

  return permissions;
}

module.exports = {
  sign,
  verify
}
