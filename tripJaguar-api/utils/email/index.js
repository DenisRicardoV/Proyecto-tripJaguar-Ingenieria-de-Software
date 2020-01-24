'use strict'
const { GoogleAuth, URLAPI } = require('../../config/index')

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport(GoogleAuth);
const fs = require('fs');
const handlebars = require('handlebars');


function sendEmailRegisterAndVerificationTurista(destinatario, urlActivacion){
    console.log( GoogleAuth.auth.user)
    readHTMLFile('utils/email/welcome-turista.html', async function(err, html) {
        var template = handlebars.compile(html);
            var replacements = {
                destinatario: destinatario,
                url: urlActivacion,
                URLAPI
            }

        var htmlToSend = template(replacements);

        var mailOptions = {
            from: `"TripJaguar" <${ GoogleAuth.auth.user}>`, // sender address
            to: destinatario, // list of receivers
            subject: "Bienvenido", // Subject line
            text: "Confirmación de Registro", // plain text body
            html: htmlToSend
        }
    
        await transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log('ERROR',error);
            }
        })
    })

  

}

function sendEmailRegisterAndVerificationRepresentante(destinatario, urlActivacion, empresa){
    console.log( GoogleAuth.auth.user)
    readHTMLFile('utils/email/welcome-agencia.html', async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            destinatario: destinatario,
            url: urlActivacion,
            URLAPI,
            nombreEmpresa:empresa.name
        }

        var htmlToSend = template(replacements);

        var mailOptions = {
            from: `"TripJaguar" <${ GoogleAuth.auth.user}>`, // sender address
            to: destinatario, // list of receivers
            subject: "Bienvenido", // Subject line
            text: "Confirmación de Registro", // plain text body
            html: htmlToSend
        }
    
        await transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log('ERROR',error);
            }
        })
    })

  

}

function sendEmailConfirmationcompraTurista(destinatario, turista, reserva, tour){
    readHTMLFile('utils/email/confirmation-compra-turista.html', async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            URLAPI,
            nombreTurista: turista.name,
            tourNombre: tour.nombre,
            tourFecha: reserva.fecha,
            reservaCantidad: reserva.numeroPersonas,
            reservaMonto: reserva.monto,
            empresa: tour.agency.name
        }

        var htmlToSend = template(replacements);

        var mailOptions = {
            from: `"TripJaguar" <${ GoogleAuth.auth.user}>`, // sender address
            to: destinatario, // list of receivers
            subject: "Compra", // Subject line
            text: "Confirmación de su compra", // plain text body
            html: htmlToSend
        }
    
        await transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log('ERROR',error);
            }
        })
    })
}

function sendEmailConfirmationReservaTurista(destinatario, turista, reserva, tour){
    readHTMLFile('utils/email/confirmation-reservacion-turista.html', async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            URLAPI,
            nombreTurista: turista.name,
            tourNombre: tour.nombre,
            tourFecha: reserva.fecha,
            reservaCantidad: reserva.numeroPersonas,
            reservaMonto: reserva.monto,
            empresa: tour.agency.name,
            telefono: tour.agency.phone
        }

        var htmlToSend = template(replacements);

        var mailOptions = {
            from: `"TripJaguar" <${ GoogleAuth.auth.user}>`, // sender address
            to: destinatario, // list of receivers
            subject: "Reserva", // Subject line
            text: "Confirmación de su reserva", // plain text body
            html: htmlToSend
        }
    
        await transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log('ERROR',error);
            }
        })
    })
}


var readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

module.exports = {
    sendEmailRegisterAndVerificationTurista,
    sendEmailRegisterAndVerificationRepresentante,
    sendEmailConfirmationcompraTurista,
    sendEmailConfirmationReservaTurista
}

