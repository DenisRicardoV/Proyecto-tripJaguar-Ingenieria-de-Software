// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase :{
    apiKey: "AIzaSyDSUM1GJox6mQcA-NTCFz_USK9MCT1o0Bw",
    authDomain: "tripjaguardb.firebaseapp.com",
    databaseURL: "https://tripjaguardb.firebaseio.com",
    projectId: "tripjaguardb",
    storageBucket: "tripjaguardb.appspot.com",
    messagingSenderId: "694059137238"
  },
  API_ENDPOINT : 'http://localhost:3000/tripJaguar/',
  PUBLIC_FILE : 'http://localhost:3000/'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
