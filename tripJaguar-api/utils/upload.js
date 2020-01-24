'use strict'

const cripto = require('../config/crypto');
const IncomingForm = require('formidable').IncomingForm

 function registrar(req, res, next){
    // console.log("REGISTRANDO IMAGEN: ", files.length);
    // const path = urlPublic + data.directorio;
    
    // var saveFiles = [];
    // for (var i = 0; i < files.length; i++) {

    //     //generamos nuevo nombre
    //     const nuevoNombre= cripto.encryptHash(files[i].name+ data.id+getDate());
    //     const info = {
    //         path,
    //         nuevoNombre
    //     }
    //     console.log("GUARDAMOSSSSSSSSS");
    //     guardar(files[i],info);
    // }

    var form = new IncomingForm()
    form.uploadDir = './public/images';
    form.multiples = true;

    form.on('fileBegin', function (name, file){
        //Modificamos el nombre
        const [fileName, fileExt] = file.name.split('.')
        file.path = './public/images/' + file.name;
    });

    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        console.log("evento file");
    })
    form.on('end', () => {
        console.log("evento end");

        res.json()
    })
    form.parse(req)

    // callback(saveFiles);
}
    
function convertirFilesToArray(files){
    const array = []
    let i = 0;
    for (const key in files) {
        if (files.hasOwnProperty(key)) {
            const element = files[key];
            array.push(element)
        }
    }

    return array;
}

module.exports = {
    registrar,
    convertirFilesToArray
}


function guardar(file,data) {
    var imagen = file;
    //PATH DE DONDE SE OBTUVO
    var temporalPath = imagen.name;


    var name = data.nuevoNombre+'.'+getExtension(imagen.name);
    //ruta final donde alojaremos el archivo, le cambiamos el nombre para que 
    //sea estilo imagen-4365436.extension
    var finalPath = data.path+ name;
    //si la extension no está permitida salimos con un mensaje

    console.log("temporalPath:", file);
    console.log("finalPath:", finalPath);

    if(checkExtension(imagen.name) === false)
    {
        return false;
    }
    //guardamos el archivo
    fs.exists(finalPath, function(exists) 
    {
        //leemos y escribimos el nuevo archivo para guardarlo
        fs.rename(temporalPath, finalPath, function(error) 
        {
            //si hay errores lanzamos una excepcion
            if(error)
            {
                console.log("ERRORRR:", error);
                throw error;
            }
            fs.unlink(temporalPath, function() 
            {
                //si hay errores lanzamos una excepcion
                if(error)
                {
                    throw error;
                }   
            });
        }); 

    });

    //obtenemos la extensión de la imagen
    function getExtension(file)
    {
        return file.split('.').pop();
    }
    //obtenemos el nombre de la imagen
    function getFirstFileName(carpeta,id,extension)
    {
        return carpeta+'_'+id+'.'+extension;
    }
    //obtenemos un número entero aleatorio para el nombre de la imagen
    function getIntRandom(min,max)
    {
        return Math.floor((Math.random() * ((max + 1) - min)) + min);
    }
    //separamos entre el - y el .
    function getBetweenSeparators(str)
    {
        return str.substring(str.lastIndexOf('-')+1,str.lastIndexOf('.'));
    }
    //comprobamos si está permitida la extensión del archivo
    function checkExtension(file)
    {
        //extensiones permitidas
        var allowedExtensions = ['jpg','jpeg','gif','png'];
        //extension del archivo
        var extension = file.split('.').pop();
        //hacemos la comprobación
        return inArray(extension, allowedExtensions) === true ? true : false;
    }
    //funcion para comprobar valores en un array
    function inArray(needle, haystack)
    {
        var key = '';
        for(key in haystack){
            if(haystack[key] === needle.toLowerCase()){
                return true;
            }
        }
        return false;
    }

}

function getDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}