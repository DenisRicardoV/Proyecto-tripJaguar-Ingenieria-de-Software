'use strict'
const firebase = require('firebase-admin')
let app = null
const serviceAccount = require('./tripjaguardb-firebase-adminsdk-d7lwg-9cf295794a.json');

module.exports = function setupDatabase () {
  if (!app) {
    app = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: 'https://tripjaguardb.firebaseio.com'
    })
  }

  const apiFirestore = app.firestore()
  apiFirestore.settings({
    timestampsInSnapshots: true
  })

  const apiAuth = app.auth()
  const apiStorage = app.storage()

  return {
    apiFirestore,
    apiAuth,
    apiStorage
  }
}
