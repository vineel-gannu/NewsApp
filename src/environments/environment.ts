// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authRegister: 'http://localhost:9000/auth/register',
  authLogin: 'http://localhost:9000/auth/login',
  authUser: 'http://localhost:9000/auth/isAuthenticated', 
  newsHeadLines: 'https://newsapi.org/v2/top-headlines',
  newsAPIKey: 'faa810aa73ba49509d4f71fb14bd1675',
  favorites: 'http://localhost:3000/favorites',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
