'use strict';
const debug = require('debug')('middleware:error')
var ev = require('express-validation');

// error handler
function middleware(err, req, res, next){


    //ERRORES PARA FIREBASE 
    if (err.message.match(/auth user/) ) {
        return res.status(404).send({ error: err.message })
    }

    if (err.message.match(/Server Failed /) ) {
        return res.status(500).send({ message: err.message.replace(/Failed Server/i,''), status: false, error:'Server Failed '})
    }

    if(err.message.match(/Not Authorization/)){
        return res.status(500).send({ message: err.message.replace(/Not Authorization/i,''), status: false, error:'Not Authorization'})
    }

    if (err.message.match(/Not found/) ) {
        return res.status(404).send({ message: err.message.replace(/Not found/i,''), status: false, error:'Not found' } )
    }

    // if(err.message.match(/not found/)) {
    //     return res.status(404).send({ error: err.message })
    // }

    
    
    res.status(500).send({ error: err.message })
}


module.exports = middleware;