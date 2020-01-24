'use strict'
module.exports = function setupAuth (auth) {


  function signInWithEmailAndPassword(user, callback){
    console.log("DATOS LISTOS PARA VALIDAR SESION ", user.password)

    auth.signInWithEmailAndPassword(user.email, user.password)
      
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR SESION: ", error.message)
        callback(error , null);
        // ...
      });
  }


  function createToken (uid , callback) {

    auth.createCustomToken(uid)
      .then(function (customToken) {
        // Send token back to client
        callback(null , customToken);
      })
      .catch(function (error) {
        callback(error , null);
      })
  }

  function verifyToken(token, callback){

    auth.verifyIdToken(token)
      .then((decodedToken) => {          

          callback(null,decodedToken);
      })
      .catch(err => {
          callback(err , null);
      })
  }

  function setCustomUserClaims(UID, claims, callback){
    auth.setCustomUserClaims(UID, claims)
      .then(data => {
        callback(null,true)
      })
      .catch(function (error) {
          callback(error , null);
      });

  }
  function create (User, callback) {
    auth.createUser(User)
      .then(function (userRecord) {
        callback(null , userRecord.uid);
      })
      .catch(function (error) {
        callback(error , null);
    })
  }

  function update (uid) {
    auth.updateUser(uid, {
      email: 'modifiedUser@example.com',
      phoneNumber: '+11234567890',
      emailVerified: true,
      password: 'newPassword',
      displayName: 'Jane Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: true
    })
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully updated user', userRecord.toJSON())
      })
      .catch(function (error) {
        console.log('Error updating user:', error)
      })
  }
  function erase (uid) {
    auth().deleteUser(uid)
      .then(function () {
        console.log('Successfully deleted user')
      })
      .catch(function (error) {
        console.log('Error deleting user:', error)
      })
  }

  function findAll () {

  }

  async function findById (uid) {
    const response  = await auth.getUser(uid);
    console.log("RESPONSEE:", response);
    return response.toJSON();
  }
  function findByEmail (email,callback) {
    return auth.getUserByEmail(email)
            .then(function (userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              // console.log('Successfully fetched user data:', userRecord.toJSON())
              callback(null,userRecord.toJSON())
            })
            .catch(function (error) {
              // return error.errorInfo;
              callback(error,null)
            })
  }
  function findByPhoneNumber (phoneNumber) {
    auth.getUserByPhoneNumber(phoneNumber)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON())
      })
      .catch(function (error) {
        console.log('Error fetching user data:', error)
      })
  }

  return {
    signInWithEmailAndPassword,
    create,
    update,
    erase,
    findAll,
    findById,
    findByEmail,
    findByPhoneNumber,
    createToken,
    setCustomUserClaims,
    verifyToken
  }

}
