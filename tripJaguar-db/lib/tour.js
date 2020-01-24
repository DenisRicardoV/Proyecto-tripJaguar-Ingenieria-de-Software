'use strict'

module.exports = function setupTour (db) {

  function create(tour){
    return db.collection('tours').add(tour)
          .then(docRef => {
            return docRef.id;
          })
          .catch(function (error) {
              return null;
          });
    
  }

  function addImage(uid,urlImg){
    var docRef = db.collection('tours').doc(uid);

    db.runTransaction(transaction => {
        return transaction.get(docRef).then(snapshot => {

          const largerArray = snapshot.get('imagenes');
          largerArray.push(urlImg);
          
          transaction.update(docRef, 'imagenes', largerArray);

        });
    });

  }

  function updateImages(uid, images){
      return db.collection('tours').doc(uid).update({images});
  }

  function findAll () {
    return db.collection('tours').get()
      .then((snapshot) => {
        var data = [];
        snapshot.forEach((doc) => {
          var paquete = doc.data();
          paquete.id = doc.id;
          data.push(paquete);
        });
        return data;

      })
      .catch((err) => {
        return null;
      });
  }

  function filtrarPorActividadAndDepartamento (actividad, departamento) {

    return db.collection('tours').get()
      .then((snapshot) => {
        var data = [];
        snapshot.forEach((doc) => {
          var paquete = doc.data();
          paquete.id = doc.id;

          if(paquete.departamento == departamento) {
            data.push(paquete);
          }else{
            for (let index = 0; index < paquete.actividades.length; index++) {
                const element = paquete.actividades[index];
                if(element.descripcion == actividad){
                  data.push(paquete);
                }
            }
          }
        });

        return data;

      })
      .catch((err) => {
        return null;
      });
  }

  async function findByAgencia(uid){
  
    return await db.collection("tours").where("idAgency", "==", uid).get()
      .then(function(querySnapshot) {
          var data = [];
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var tour = doc.data();
              tour.id = doc.id;
              data.push(tour);
          });
         return data;
      })
      .catch(function(error) {
          return null;
      });
  }

  function findById(){
  }

 


  return {
    create,
    findAll,
    findById,
    addImage,
    updateImages,
    findByAgencia,
    filtrarPorActividadAndDepartamento
  }

  
}
