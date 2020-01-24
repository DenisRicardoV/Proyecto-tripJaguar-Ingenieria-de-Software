'use strict'

module.exports = function setupAgency (db) {

  function create(agency, callback){
    db.collection('agencies').add(agency)
    .then(ref => {
      callback(null,ref.id)
    })
    .catch(function (error) {
        callback(error , null);
    })

  }

  async function findByIdRepresentante(id){
    const agencia = await  db.collection("agencies").where("idRepresentante", "==", id).get()
          .then(snapshot => {
            var data = null;
            snapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                data = doc.data();
                data.id = doc.id;
            });
            if(data){
              return data;

            }else{
              return null;
            }

          })
          .catch(function(error) {
              return null;
          });
    return agencia;

  }

  function registerAccountById(account, id){
    return db.collection('agencies').doc(id).update({account});

  }

  function findAll () {
  }

  function findById (id) {
    return  db.collection('agencies').doc(id).get()
        .then(function(doc) {
            var agencia = null;

            if (doc.exists) {
              agencia =  doc.data();
              agencia.id = doc.id;
            } 

            return agencia;
        })
        .catch(function(error) {
          console.log(error);
            return null;
        });
  }

  function findByEmail (email, callback){
    db.collection("agencies").where("email", "==", email).get()
      .then(function(querySnapshot) {
        var data = null;
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              data = doc.id;
          });
          if(data){
            callback(null,data);

          }else{
            callback(true,null);
          }
      })
      .catch(function(error) {
          callback(error,null);
      });
  }

  function findByRuc (ruc, callback){
    db.collection("agencies").where("ruc", "==", ruc).get()
      .then(function(querySnapshot) {
          var data = null;
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              data = doc.id;
          });
          if(data){
            callback(null,data);

          }else{
            callback(true,null);

          }
      })
      .catch(function(error) {
          callback(error,null);
      });
  }

  function updateLogo(uid, url){
    return db.collection('agencies').doc(uid).update({logo: url});
  }

  //   db.collection('users').get()
  //   .then((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       console.log(doc.id, '=>', doc.data());
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('Error getting documents', err);
  //   });

  return {
    create,
    findAll,
    findById,
    findByIdRepresentante,
    findByEmail,
    findByRuc,
    updateLogo,
    registerAccountById
  }

  
}
