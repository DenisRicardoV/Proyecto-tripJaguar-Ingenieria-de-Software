'use strict'

const IncomingForm = require('formidable').IncomingForm
const db = require('../../db/index')

const URLDirectory = './public/images/tours';
const { DateUtil, Email } = require('../../utils/index');
const crypto = require('../../config/crypto');



module.exports = function(){
    const { Tour, Reserva } = db();

    async function registrar(req, res , next){
        const { agency } = req.user
        let newTour = req.body

        newTour.agency = agency;
        newTour.idAgency = agency.id;

       
        try{
            const idTour = await Tour.create(newTour);
            if(idTour){
                res.send({message: 'Paquete turístico creado exitosamente', id: idTour});
            }else{
                return next(new Error('Not found No se pudo registrar el nuevo paquete turistico'));
            }
        }catch(error){
            //Fallo del servidor
            return next(new Error('Server Failed Ocurrio un problema, intentlo de nuevo mas tare'));

        }


        
    }

    function editar(req, res, next){

    }

    function listar(req, res, next){

    }

    function upload(req, res, next){
        const { id } = req.params
        let images = [];


        var form = new IncomingForm()
        form.uploadDir = URLDirectory;
        form.multiples = true;

        form.on('fileBegin', function (name, file){
            //Modificamos el nombre
            const [fileName, fileExt] = file.name.split('.');
            const generateSrc =  crypto.encryptHash(id + fileName + DateUtil.getDate()) + '.'+fileExt;
            file.path = URLDirectory + "/" + generateSrc;

            images.push(generateSrc);
        });

        form.on('file', (field, file) => {
        })
        form.on('end', async () => {
            console.log('Se subio todas las imagenes');
            console.log('imagenes::', images);
            try{
                await  Tour.updateImages(id, images);
                res.send({message: "Archivos subidos correctamente"});
            }catch(e){
                return next(new Error('Server Failed Ocurrió un problema subiendo archivos'));
            }

        })
        form.parse(req)
    }
    
    async function getByAgencia(req, res, next){
        const { agency } = req.user

        let paquetes = [];
        try{
            console.log('IDD:', agency.id)
            paquetes = await Tour.findByAgencia(agency.id);
            console.log('paquetes', paquetes);
            res.send(paquetes);
        }catch(error){
            return next(new Error('Server Failed Ocurrio un problema, intentlo de nuevo mas tarde'));
        }
    }

    async function filtrar(req, res, next){
        const { departamento , actividad } = req.body
        
        let paquetes = [];
        try{
            paquetes = await Tour.filtrarPorActividadAndDepartamento(actividad, departamento);
            res.send(paquetes);

        }catch(error){
            return next(new Error('Server Failed Ocurrio un problema, intentlo de nuevo mas tarde'));
        }


    }

    async function all(req, res, next){
        
        let paquetes = [];
        try{
            paquetes = await Tour.findAll();
            res.send(paquetes);

        }catch(error){
            return next(new Error('Server Failed Ocurrio un problema, intentlo de nuevo mas tarde'));
        }


    }

    async function registrarCompra(req, res, next){
        const { user } = req;
        const data = req.body;

        data.idTurista = user.id;
        Reserva.create(data, function(error, success){
            if(error) {
                return next(new Error('Server Failed Ocurrio un problema, intentlo de nuevo mas tarde'));
            }
            //ENVIAMOS CORREO DE CONFIRMACION DE COMPRA O RESERVA
            if(data.payment){
                //correo de compra realizada
                Email.sendEmailConfirmationcompraTurista(user.email, user, data, data.tour);
                
            }else{
                //correo de reserva realizada
                Email.sendEmailConfirmationReservaTurista(user.email, user, data, data.tour);
            }
            res.send({message: 'Acción realizada con éxito'});
        })

        
    }

    function findReservaForuser(req, res, next){
        const { id}  =  req.user
        Reserva.findByIdTurist(id, function(error, data){
            if(error){
              console.log('ERROR',error);
              return next(new Error('Failed Server Firebase Error al registrar, intentelo mas tarde'));
            }
            res.send(data);
        });
    }

    return{
        registrar,
        editar,
        listar,
        upload,
        getByAgencia,
        filtrar,
        all,
        registrarCompra,
        findReservaForuser
        
    }
}