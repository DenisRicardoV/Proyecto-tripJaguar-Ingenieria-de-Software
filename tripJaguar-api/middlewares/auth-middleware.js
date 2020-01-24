'use strict'

var jwt_decode = require('jwt-decode');


module.exports = function(){
    function getUser(req, res, next){
        const token = req.body.token || req.query.token || req.headers['authorization'];
        res.locals.user = jwt_decode(token);

        next(); 
    }
    // function isAuthenticatedAgency(req, res, next) {
    //     const token = req.body.token || req.query.token || req.headers['authorization'];

    //     Auth.verifyToken(token,function(error,decodedToken){
    //         if(error){
    //             return next(new Error('Not Authorization No esta autorizado'));  
    //         }

    //         User.findById(decodedToken.uid ,function(error, userData){
    //             if(error){
    //                 return next(new Error('Failed Server Firebase Problema del servidor, intentelo mas tarde'));  
    //             }
    //             if(!userData.roles.agency)
    //             {
    //                 return next(new Error('Not Authorization No esta autorizado')); 
    //             }

    //             Agency.findByIdAuthor(decodedToken.uid, function(error, uidAgency){
    //                 if(error){
    //                     return next(new Error('Failed Server Firebase Problema del servidor, intentelo mas tarde'));  
    //                 }
    //                 decodedToken.uidAgency = uidAgency;
    //                 res.locals.user = decodedToken;
    //                 console.log('ALLL FINNN');
    //                 next(); 
    //             })
                

                
    //         });
                                   
    //     });

    // }
    // function isAuthenticatedTourist(req, res, next) {
        
    //     const token = req.body.token || req.query.token || req.headers['authorization'];
        
    //     Auth.verifyToken(token,function(error,decodedToken){
    //         if(error){
    //             return next(new Error('Not Authorization No esta autorizado'));  
    //         }

    //         User.findById(decodedToken.uid ,function(error, userData){
    //             if(error){
    //                 console.log('ERROR',error);
    //                 return next(new Error('Failed Server Firebase Problema del servidor, intentelo mas tarde'));  
    //             }
    //             if(!userData.roles.tourist)
    //             {
    //                 return next(new Error('Not Authorization No esta autorizado')); 
    //             }
    //             res.locals.user = decodedToken;
    //             next(); 
    //         });
            
            
    //         // console.log('DECODE'+ decodedToken.uid); //Check decoding
    //         // res.locals.user = decodedToken;
    //     });

    // }

    return{
        getUser
    }
}

