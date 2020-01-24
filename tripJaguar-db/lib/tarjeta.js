'use strict'

module.exports = function setupTour (db) {

  function verify(tarjeta,callback){
    db.collection("tarjetas").where("numero", "==",Number.parseInt(tarjeta.numero) ).get()
      .then(function(querySnapshot) {
          var result = [];
            querySnapshot.forEach(function(doc) {
                result.push(doc.data());
            });
            if(!result[0]){
                callback(new Error('No existe La Tarjeta'),null);
            }
            if(result[0].codigo != tarjeta.codigo || result[0].nombre!=tarjeta.nombre || result[0].type !=tarjeta.type){
                callback(new Error('Datos de la Tarjeta son Incorrectos'),null);
            }
            
            callback(null,result[0]);

      })
      .catch(function(error) {
          callback(error,null);
      });
  }


  return {
    verify
  }

  
}
