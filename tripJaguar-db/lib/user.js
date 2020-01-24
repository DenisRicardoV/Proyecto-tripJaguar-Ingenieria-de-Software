'use strict'

module.exports = function setupUser (db) {

  function create(user, callback){
    db.collection('users').add(user)
    .then(ref => {
      callback(null,ref.id)
    })
    .catch(function (error) {
        callback(error , null);
    })
  }

  function findAll () {
    

  }

  function findByIdAuth (uid,callback) {
    console.log("UUID RECIBIDI", uid);
    return db.collection("users").where('uid', '==', uid)
      .get().then(function(doc) {       
        if (doc.empty) {
          callback(true,null);
        }
    
        doc.forEach(doc => {
          callback(null, doc.data());
        });
      })
      .catch(function(error) {
          callback(error,null);
      });

  }

  function findByEmail (email,callback) {
    return db.collection("users").where('email', '==', email)
      .get().then(function(doc) {       
        if (doc.empty) {
          callback(true,null);
        }
    
        doc.forEach(doc => {
          var agencia = doc.data();
          agencia.id = doc.id;
          callback(null, agencia);
        });
      })
      .catch(function(error) {
          callback(error,null);
      });

  }
  async function findById (uid) {

    const response =  db.collection("users").doc(uid)
          .get().then(function(doc) {
            if (doc.exists) {
              return doc.data();
            } 
            return null;
          })
          .catch(function(error) {
              return null;
          });
    return response;

  }

  async function activate (uid) {

    return db.collection("users").doc(uid).update({verify:true})

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
    findByIdAuth,
    findByEmail,
    findById,
    activate
  }

  
}
