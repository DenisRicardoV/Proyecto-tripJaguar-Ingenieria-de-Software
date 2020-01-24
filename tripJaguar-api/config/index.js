'use strict'

module.exports = {
  auth: {
    secret: process.env.SECRET || 'TripJaguar2019IngenieriaDeSoftware'
  },
  URLWEB : process.env.URLWEB || 'http://localhost:4200/',
  URLAPI: process.env.URLAPI || 'http://server-chatbox.herokuapp.com/',
  GoogleAuth:{
    service: 'Gmail',
    auth: {
        user: "tripjaguar@gmail.com",
        pass: "15121015"
    }
  }
}
