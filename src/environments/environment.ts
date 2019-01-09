// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  site_name:'EbooksDen',
  firebase: {
    apiKey: "AIzaSyAPz9pIm1RTfj8Nil854WnLvO3vkPi0wss",
    authDomain: "ebooksden-449c7.firebaseapp.com",
    databaseURL: "https://ebooksden-449c7.firebaseio.com",
    projectId: "ebooksden-449c7",
    storageBucket: "ebooksden-449c7.appspot.com",
    messagingSenderId: "112188517712"
    // apiKey: "AIzaSyDyyvLXBYg95v5Bf34l0_aLM61JjgG0jV8",
    // authDomain: "ebooksden-91dca.firebaseapp.com",
    // databaseURL: "https://ebooksden-91dca.firebaseio.com",
    // projectId: "ebooksden-91dca",
    // storageBucket: "ebooksden-91dca.appspot.com",
    // messagingSenderId: "690754521255"
  },
  externalPath: 'http://library1.org/',
  site_url:'https://www.ebooksden.com',
  cors_api:'http://localhost:8080/',
  site_config:{
    imagePath:'http://library1.org/covers/',
    dPath:'http://library1.org/_ads/'
  },
  googleAnalytics: {
    domain: 'auto',
    trackingId: 'UA-131453082-1' // replace with your Tracking Id
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
