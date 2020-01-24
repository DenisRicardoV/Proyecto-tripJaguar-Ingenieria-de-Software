'use strict'
const db = require('../../db/index')
var request = require('request');
var blacklist = require('express-jwt-blacklist');


const  { Token, Email } = require('../../utils/index')
const config = require('../../config/index')
const crypto = require("../../config/crypto");

function generateUrlActivation(uuid){
    var url = config.URLWEB + 'activacion-cuenta/'+uuid;
    return url;
}

module.exports = function(){

    const { User, Agency } = db();

    //iniciar la base de datos
    function login(req, res , next){
        const user = req.body
        User.findByEmail(user.email, async function(error, dataUser){
            if(error){
                return next(new Error('Not found Usuario no encontrado'));
            }
            if(crypto.desencrypt(user.password) == crypto.desencrypt(dataUser.password)){
                delete dataUser.password

                if(dataUser.type == 1){
                    delete dataUser.document

                    let agencia = null;
                    try{
                        agencia = await Agency.findByIdRepresentante(dataUser.id);
                    }catch(error){
                        agencia = null;
                    }
                    if(agencia){
                        delete agencia.account
                        delete agencia.verify
                        delete agencia.idRepresentante

                        dataUser.agency = agencia
                    } 
                }
                
                var token =  Token.sign(dataUser, config.auth.secret);
                res.status(200).send({token});
            }else{
                return next(new Error('Not Authorization Credenciales invalidas'));
            }
        })
    }

    function logout(req, res , next){
        blacklist.revoke(req.user);
        res.send({message: "logout correct"});
    }

    async function activateAccount(req, res , next){
        const { id } = req.params
        try{
            const user = await User.findById(id);
            if(user){

                if(user.verify){
                    res.send({message: 'La cuenta del usuario ya se encuentra activada'});
                }else{
                    await User.activate(id);
                    res.send({message: 'Su cuenta fue activada exitosamente, gracias por unirse a nosotros'});
                }
            }else{
                return next(new Error('Not found El usuario no se encuentra registrado'));
            }
        }catch(e){
            return next(new Error('Server Failed Ocurrio un problema'));

        }
    }
    
    function registrarTurista(req, res , next){
        let  turista = req.body
        

        User.findByEmail(turista.email, function(error, data){
            if(data){
                return next(new Error('Not Authorization El correo electrónico ya ha sido registrado'));
            }
            turista.type = 0
            turista.verify = false


            User.create(turista,function(errorUser, uid){
                if(errorUser){
                    return next(new Error('Server Failed Ocurrió un problema, intentelo de nuevo mas tarde'));
                }
                Email.sendEmailRegisterAndVerificationTurista(turista.email, generateUrlActivation(uid) );
                //enviamos correo electronico
                res.send({message:'Gracias por registrarse a TripJaguar, enviamos un link  a su correo para que pueda activar su cuenta'})
            })


        })

    }


    function verifyEmailUser(req, res, next){
        let  { representante } = req.body
        User.findByEmail(representante.email, function(error, data){
            if(data){
                return next(new Error('Not Authorization El correo electrónico ya ha sido registrado'));
            }
            next();
        })
    }

    function verifyEmailAgencia(req, res, next){
        let  { empresa } = req.body
        Agency.findByEmail(empresa.email, function(error, data){
            if(data){
                return next(new Error('Not Authorization El correo electrónico de la agencia ya ha sido registrado'));
            }
            next();
        })
    }

    function verifyRuc(req, res ,next){
        let  { empresa } = req.body
        Agency.findByRuc(empresa.ruc, function(error, data){

            if(data){
                return next(new Error('Not Authorization El ruc de la empresa ya ha sido registrado'));
            }
            next();
        })
        

    }

    function verifySunatRuc(req, res, next){
        let  { empresa } = req.body
        var options = {
            url: 'https://api.sunat.cloud/ruc/'+empresa.ruc
        };
         
        request.get(options,function (error, response, body) {
            if(!body){
                return next(new Error('Not Authorization El ruc no esta registrado en Sunat'));
            }
            next();
        });

    }


    function registrarAgencia(req, res, next){
        let  { representante, empresa } = req.body
        const dni = representante.document;
        representante.document = {
            type: 'dni',
            num: dni
        };
        representante.type = 1;
        representante.verify = false;
        empresa.verify = false;
        //comprobamos RUC
        User.create(representante,function(errorUser, uid){
            if(errorUser){
                return next(new Error('Server Failed Ocurrió un problema, intentelo de nuevo mas tarde'));
            }
            empresa.idRepresentante = uid;
            empresa.logo = '';
            empresa.email = representante.email;
            Agency.create(empresa,function(errorAgencia, uidAgencia){
                if(errorAgencia){
                    return next(new Error('Server Failed Ocurrió un problema, intentelo de nuevo mas tarde'));
                }

                Email.sendEmailRegisterAndVerificationRepresentante(representante.email, generateUrlActivation(uid), empresa );
                res.send({message:'Gracias por registrar a tu Empresa a TripJaguar, enviamos un link  a su correo para que pueda activar su cuenta', id: uidAgencia})
            })
        })
    }
  
    

    return{
        login,
        logout,
        registrarTurista,
        registrarAgencia,
        verifyEmailUser,
        verifyRuc,
        verifySunatRuc,
        verifyEmailAgencia,
        activateAccount
    }
}