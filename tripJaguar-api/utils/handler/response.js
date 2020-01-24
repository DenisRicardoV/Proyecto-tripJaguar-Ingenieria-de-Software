'use strict'

module.exports = (res) => {
    return {
        resp404: function(message = '') {
            return res.status(404).json({
                status: false,
                message: 'Not Found: Recurso no encontrado ' + message
            })
        },
        resp401: function(message = '') {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized: No tienes los permisos necesarios ' + message
            })
        },
        resp403: function(err, req, res, next) {

            if (err.code === 'permission_denied') {
                res.status(403).json({
                    status: false,
                    message: 'Forbidden: No tiene los permisos necesarios'
                });
            }
        },
        resp200: function(item, message = '') {
            return res.status(200).json({
                status: true,
                item: item,
                message: 'Ok: Operacion exitosa ' + message
            })
        },
        resp201: function(item, message = '') {
            return res.status(201).json({
                status: true,
                item: item,
                message: 'Ok: Recurso creado con exito ' + message
            })
        },
        resp500: function(message = '') {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error: Ha ocurrido un error en el servidor ' + message
            })
        }
    }
}