'use strict'

const IncomingForm = require('formidable').IncomingForm
const db = require('../../db/index')


const URLDirectory = './public/images/agencies';
const { DateUtil } = require('../../utils/index');
const crypto = require('../../config/crypto');
module.exports = function(){
    const { User, Agency } = db();


    async function verifyAccount(req, res, next){
        const user = req.user
        try{
            const agencia = await Agency.findByIdRepresentante(user.id);
            if(agencia){
                if(agencia.account){
                    res.send({message: 'La agencia tiene una cuenta activa de paypal'});
                }else{
                    return next(new Error('Not Authorization No cuenta con una cuenta de paypal'));
                }
            }else{
                return next(new Error('Not found No se pudo verificar cuenta'));
            }

        }catch(error){
            return next(new Error('Server Failed Usuario no encontrado'));

        }

    }

    async function findSingle(req, res, next){
        const user = req.user
        try{
            const agencia = await Agency.findByIdRepresentante(user.id);
            if(agencia){
                res.send(agencia);
            }else{
                return next(new Error('Not found No se pudo verificar cuenta'));

            }

        }catch(error){
            return next(new Error('Server Failed Usuario no encontrado'));
        }
    }

    async function registrarCuenta(req, res, next){
        const { account, id } = req.body

        try{
            const registro = await Agency.registerAccountById(account, id);
            if(registro){
                res.send({message: 'Se registro la cuenta con éxito'});
            }else{
                return next(new Error('Not found La agencia no está registrada'));
            }
            
        }catch(error){
            console.log('ERROR::', error);
            return next(new Error('Server Failed Ocurrió un problema'));
        }

    }

    async function getTransaction(req, res, next){
        const uuid = req.body.id;
        console.log(uuid);

        let agencia = null;
        try{
            agencia = await Agency.findById(uuid);
        }catch(error){
            return next(new Error('Server Failed Ocurrió un problema'));
        }

        if(agencia){
            res.send({transaction: agencia.account.transaction}) 
        }else{
            return next(new Error('Not found No se pudo verificar cuenta'));
        }

    }

    function uploadLogo(req, res, next){
        const { id } = req.params
        let logourl = '';

        var form = new IncomingForm()
        form.uploadDir = URLDirectory;
        form.multiples = true;

        form.on('fileBegin', function (name, file){
            //Modificamos el nombre
            const [fileName, fileExt] = file.name.split('.');
            logourl =  crypto.encryptHash(id + fileName + DateUtil.getDate()) + '.'+fileExt;
            file.path = URLDirectory + "/" + logourl;
        });

        form.on('file', (field, file) => {
            // Do something with the file
            // e.g. save it to the database
            // you can access it using file.path
            console.log("evento file");
        })
        form.on('end', async () => {
            try{
               await  Agency.updateLogo(id, logourl);
                res.send({message: "Logo registrado correctamente"});
            }catch(e){
                return next(new Error('Server Failed Ocurrió un problema, intentelo de nuevo mas tarde'));
            }

        })
        form.parse(req)

    }


    

  
    

    return{
        uploadLogo,
        verifyAccount,
        findSingle,
        registrarCuenta,
        getTransaction
    }
}