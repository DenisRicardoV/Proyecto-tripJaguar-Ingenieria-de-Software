'use strict'

module.exports = function setupTour (db) {

  function create(reserva, callback){
    db.collection('reservaciones').add(reserva)
    .then(ref => {
      callback(null,ref.id)
    })
    .catch(function (error) {
        callback(error , null);
    })
    
  }

  function findByIdTurist(id, callback){
    return  db.collection('reservaciones').where('idTurista','==',id).get()
              .then(doc => {
                    if (doc.empty) {
                      callback(true,null);
                    }
                    var resultado = [];
                    doc.forEach(doc => {
                      resultado.push(doc.data());
                    });
                    callback(null, resultado);
              })
              .catch(function (error) {
                  callback(error , null);
              })
  }



  function findAll () {

  }

  function findById () {

  }


  return {
    create,
    findAll,
    findById,
    findByIdTurist
  }

  
}
